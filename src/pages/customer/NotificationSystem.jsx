import React, { useState, useEffect } from 'react';
import { Bell, X, Check, Clock, User, Settings, MessageCircle, Heart, Star, Gift } from 'lucide-react';

const NotificationSystem = () => {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "Chào mừng bạn đến với hệ thống!",
            message: "Cảm ơn bạn đã tham gia cộng đồng của chúng tôi. Hãy khám phá những tính năng tuyệt vời!",
            type: "welcome",
            time: "2 phút trước",
            read: false,
            icon: Gift
        },
        {
            id: 2,
            title: "Cập nhật tính năng mới",
            message: "Chúng tôi đã thêm nhiều tính năng thú vị để cải thiện trải nghiệm của bạn.",
            type: "update",
            time: "1 giờ trước",
            read: false,
            icon: Star
        },
        {
            id: 3,
            title: "Tin nhắn từ admin",
            message: "Bạn có một tin nhắn mới từ quản trị viên. Vui lòng kiểm tra hộp thư.",
            type: "message",
            time: "3 giờ trước",
            read: true,
            icon: MessageCircle
        },
        {
            id: 4,
            title: "Ai đó đã thích bài viết của bạn",
            message: "Bài viết 'Hướng dẫn React' của bạn đã nhận được 15 lượt thích mới.",
            type: "like",
            time: "1 ngày trước",
            read: true,
            icon: Heart
        },
        {
            id: 5,
            title: "Nhắc nhở bảo mật",
            message: "Hãy cập nhật mật khẩu của bạn để đảm bảo tài khoản an toàn hơn.",
            type: "security",
            time: "2 ngày trước",
            read: false,
            icon: Settings
        }
    ]);

    const [showDropdown, setShowDropdown] = useState(false);
    const [showFullPage, setShowFullPage] = useState(false);
    const [filterType, setFilterType] = useState('all');

    const unreadCount = notifications.filter(n => !n.read).length;

    const typeColors = {
        welcome: 'bg-gradient-to-r from-purple-500 to-pink-500',
        update: 'bg-gradient-to-r from-blue-500 to-cyan-500',
        message: 'bg-gradient-to-r from-green-500 to-emerald-500',
        like: 'bg-gradient-to-r from-red-500 to-pink-500',
        security: 'bg-gradient-to-r from-orange-500 to-red-500'
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const filteredNotifications = notifications.filter(n => {
        if (filterType === 'unread') return !n.read;
        if (filterType === 'read') return n.read;
        return true;
    });

    const NotificationItem = ({ notification, isCompact = false, onClose }) => {
        const IconComponent = notification.icon;

        return (
            <div
                className={` group relative ${isCompact ? 'p-3' : 'p-4'} border border-gray-200 rounded-xl transition-all duration-300 hover:shadow-lg hover:border-gray-300 ${notification.read
                    ? 'bg-gray-50 hover:bg-gray-100'
                    : 'bg-white hover:bg-blue-50 border-blue-200'
                    }`}
                onClick={() => !notification.read && markAsRead(notification.id)}
            >
                {!notification.read && (
                    <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                )}

                <div className="flex items-start space-x-3 ">
                    <div className={`${typeColors[notification.type]} p-2 rounded-lg flex-shrink-0`}>
                        <IconComponent className="w-5 h-5 text-white" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                            <h4 className={`font-semibold ${notification.read ? 'text-gray-700' : 'text-gray-900'} ${isCompact ? 'text-sm' : 'text-base'}`}>
                                {notification.title}
                            </h4>
                            {onClose && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onClose(notification.id);
                                    }}
                                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded-full"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        <p className={`${notification.read ? 'text-gray-500' : 'text-gray-700'} ${isCompact ? 'text-xs' : 'text-sm'} mt-1 line-clamp-2`}>
                            {notification.message}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                            <span className={`text-xs ${notification.read ? 'text-gray-400' : 'text-gray-500'}`}>
                                {notification.time}
                            </span>

                            {!notification.read && (
                                <span className="text-xs text-blue-600 font-medium">Chưa đọc</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="relative ">
            {/* Notification Bell Icon */}
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className={`bg-gray-400 relative p-3 rounded-full transition-all duration-300 hover:bg-gray-100 ${unreadCount > 0 ? 'animate-pulse' : ''
                    }`}
            >
                <Bell className={`w-6 h-6 text-gray-600 transition-all duration-300 ${unreadCount > 0 ? 'animate-bounce text-blue-600' : ''
                    }`} />

                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse font-bold">
                        {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                )}
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
                <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 min-h-120 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 ">
                        <div className="flex items-center justify-between ">
                            <h3 className="font-bold text-gray-900">Thông báo</h3>
                            <div className="flex items-center space-x-2">
                                {unreadCount > 0 && (
                                    <button
                                        onClick={markAllAsRead}
                                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        Đánh dấu tất cả đã đọc
                                    </button>
                                )}
                                <button
                                    onClick={() => setShowFullPage(true)}
                                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Xem tất cả
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="max-h-120 overflow-y-auto ">
                        {notifications.slice(0, 5).map(notification => (
                            <div key={notification.id} className="p-2 border-b border-gray-50 last:border-b-0">
                                <NotificationItem
                                    notification={notification}
                                    isCompact={true}
                                    onClose={deleteNotification}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Full Page Notification */}
            {showFullPage && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">Trung tâm thông báo</h2>
                                <button
                                    onClick={() => setShowFullPage(false)}
                                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6 text-black" />
                                </button>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setFilterType('all')}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filterType === 'all'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                    >
                                        Tất cả ({notifications.length})
                                    </button>
                                    <button
                                        onClick={() => setFilterType('unread')}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filterType === 'unread'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                    >
                                        Chưa đọc ({unreadCount})
                                    </button>
                                    <button
                                        onClick={() => setFilterType('read')}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filterType === 'read'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                    >
                                        Đã đọc ({notifications.length - unreadCount})
                                    </button>
                                </div>

                                {unreadCount > 0 && (
                                    <button
                                        onClick={markAllAsRead}
                                        className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors text-sm font-medium"
                                    >
                                        Đánh dấu tất cả đã đọc
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                            <div className="space-y-4">
                                {filteredNotifications.map(notification => (
                                    <NotificationItem
                                        key={notification.id}
                                        notification={notification}
                                        onClose={deleteNotification}
                                    />
                                ))}
                            </div>

                            {filteredNotifications.length === 0 && (
                                <div className="text-center py-12">
                                    <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500 text-lg">Không có thông báo nào</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationSystem;