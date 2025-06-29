import React, { useState } from "react";
import ChatWidget from "../chat/Chat";
import VideoCall from "../chat/VideoCall";
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

const CommunicationWidget = () => {
  const [showChat, setShowChat] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [videoKey, setVideoKey] = useState(0); // Add key to force re-render

  const roomName = "RoomDemo123";
  const displayName = "Người dùng demo";
  const userRole = "user";

  const handleVideoCall = () => {
    setShowVideo(true);
    setVideoKey((prev) => prev + 1); // Force new instance
  };

  const handleCloseVideo = () => {
    setShowVideo(false);
    // Reset key after a delay to ensure cleanup
    setTimeout(() => {
      setVideoKey((prev) => prev + 1);
    }, 500);
  };

  return (
    <div className="font-sans">
      {/* Floating Chat Button */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 z-40 flex items-center justify-center group"
        >
          <MessageCircle
            size={24}
            className="group-hover:scale-110 transition-transform duration-200"
          />
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-bounce">
            1
          </div>
        </button>
      )}

      {/* Chat Widget */}
      {showChat && (
        <ChatWidget
          onClose={() => {
            setShowChat(false);
            setIsChatMinimized(false);
          }}
          onVideoCall={handleVideoCall}
          isMinimized={isChatMinimized}
          onToggleMinimize={() => setIsChatMinimized(!isChatMinimized)}
        />
      )}

      {/* Video Call - Fullscreen Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-6xl h-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl border border-gray-200/20 bg-gray-900 animate-in zoom-in-95 duration-300">
            <VideoCall
              key={videoKey}
              roomName={roomName}
              displayName={displayName}
              userRole={userRole}
              onClose={handleCloseVideo}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationWidget;
