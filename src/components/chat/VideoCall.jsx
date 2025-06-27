import React, { useEffect, useState, useRef } from "react";
import {
  MessageCircle,
  Video,
  X,
  Send,
  Maximize2,
  Minimize2,
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Camera,
  CameraOff,
} from "lucide-react";

const VideoCall = ({ roomName, displayName, userRole, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const jitsiContainerRef = useRef(null);
  const jitsiApiRef = useRef(null);
  const isInitializingRef = useRef(false);

  useEffect(() => {
    // Prevent multiple initializations
    if (isInitializingRef.current || jitsiApiRef.current) return;
    
    const loadJitsiScript = () => {
      if (window.JitsiMeetExternalAPI) return Promise.resolve();

      return new Promise((resolve, reject) => {
        // Check if script is already loading
        const existingScript = document.querySelector('script[src="https://meet.jit.si/external_api.js"]');
        if (existingScript) {
          existingScript.onload = resolve;
          existingScript.onerror = reject;
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://meet.jit.si/external_api.js';
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Không thể tải Jitsi'));
        document.head.appendChild(script);
      });
    };

    const initializeJitsi = async () => {
      if (isInitializingRef.current) return;
      isInitializingRef.current = true;

      try {
        await loadJitsiScript();
        
        if (!jitsiContainerRef.current || jitsiApiRef.current) {
          isInitializingRef.current = false;
          return;
        }

        // Clear container first
        jitsiContainerRef.current.innerHTML = '';

        const api = new window.JitsiMeetExternalAPI('meet.jit.si', {
          roomName: roomName,
          parentNode: jitsiContainerRef.current,
          width: '100%',
          height: '100%',
          userInfo: {
            displayName: displayName,
          },
          configOverwrite: {
            startWithAudioMuted: false,
            startWithVideoMuted: false,
            enableWelcomePage: false,
            prejoinPageEnabled: false,
            disableDeepLinking: true,
            resolution: 720,
          },
          interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            DEFAULT_BACKGROUND: '#1a1a1a',
            DISABLE_VIDEO_BACKGROUND: false,
            TOOLBAR_BUTTONS: [
              'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
              'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
              'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
              'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
              'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone'
            ],
          },
        });

        jitsiApiRef.current = api;

        // Event listeners
        api.addEventListener('videoConferenceJoined', () => {
          console.log(`${displayName} đã tham gia cuộc gọi`);
          setIsConnected(true);
          setIsLoading(false);
        });

        api.addEventListener('videoConferenceLeft', () => {
          console.log('Đã rời khỏi cuộc gọi');
          onClose();
        });

        api.addEventListener('readyToClose', () => {
          console.log('Chuẩn bị đóng cuộc gọi');
          onClose();
        });

        // Set loading to false after API is created
        setTimeout(() => {
          setIsLoading(false);
          isInitializingRef.current = false;
        }, 2000);

      } catch (error) {
        console.error('Lỗi khởi tạo Jitsi:', error);
        setIsLoading(false);
        isInitializingRef.current = false;
      }
    };

    initializeJitsi();

    return () => {
      isInitializingRef.current = false;
      if (jitsiApiRef.current) {
        try {
          jitsiApiRef.current.dispose();
        } catch (error) {
          console.error('Error disposing Jitsi API:', error);
        }
        jitsiApiRef.current = null;
      }
      if (jitsiContainerRef.current) {
        jitsiContainerRef.current.innerHTML = '';
      }
    };
  }, []); // Remove dependencies to prevent re-initialization

  return (
    <div className=" w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden relative">
      {/* Loading Screen */}
      {isLoading && (
        <div className="mt-60 absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black z-10">
          <div className="text-center text-white">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-lg font-medium">Đang khởi tạo cuộc gọi...</p>
            <p className="text-sm text-gray-300 mt-1">Vui lòng chờ trong giây lát</p>
          </div>
        </div>
      )}

      {/* Jitsi Container */}
      <div 
        ref={jitsiContainerRef} 
        className="w-full h-full rounded-2xl overflow-hidden"
        style={{ minHeight: '100%' }}
      />

      {/* Custom Close Button */}
      <button
        onClick={onClose}
        className="absolute top-10 right-4 z-20 p-3 bg-red-500/80 hover:bg-red-600 text-white rounded-full backdrop-blur-sm transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        title="Đóng cuộc gọi"
      >
        <X size={20} />
      </button>

      {/* Room Info */}
      <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm flex items-center space-x-2">
        <Video size={16} />
        <span>Phòng: {roomName}</span>
      </div>
    </div>
  );
};


export default VideoCall;
