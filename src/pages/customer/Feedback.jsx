import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from '@/context/AuthContext';

const Feedback = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('view');
    const [feedbacks, setFeedbacks] = useState([]);
    const [newFeedback, setNewFeedback] = useState({
        rating: 5,
        title: '',
        content: '',
    });

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const tabVariants = {
        active: {
            backgroundColor: '#1e40af',
            color: 'white',
            scale: 1.05,
            transition: { duration: 0.2 }
        },
        inactive: {
            backgroundColor: 'white',
            color: '#1e40af',
            scale: 1
        }
    };

    // Mock feedback data
    const mockFeedbacks = [
        {
            id: 1,
            userName: "Nguyễn Văn A",
            rating: 5,
            title: "Dịch vụ tuyệt vời",
            content: "Đội ngũ y bác sĩ rất chuyên nghiệp và tận tâm. Tôi đã được tư vấn rất chi tiết về tình trạng của mình và các phương pháp điều trị phù hợp.",
            date: "2024-03-15",
            serviceType: "Tư vấn hiếm muộn",
        },
        {
            id: 2,
            userName: "Trần Thị B",
            rating: 4,
            title: "Hài lòng với dịch vụ",
            content: "Cơ sở vật chất hiện đại, sạch sẽ. Thời gian chờ đợi hơi lâu một chút nhưng nhìn chung là tốt.",
            date: "2024-03-14",
            serviceType: "Khám tổng quát",
        },
        {
            id: 3,
            userName: "Lê Văn C",
            rating: 5,
            title: "Kết quả điều trị rất tốt",
            content: "Sau 6 tháng điều trị, vợ chồng tôi đã có tin vui. Cảm ơn đội ngũ bác sĩ rất nhiều!",
            date: "2024-03-13",
            serviceType: "Điều trị hiếm muộn",
        },
        {
            id: 4,
            userName: "Phạm Thị D",
            rating: 3,
            title: "Dịch vụ tạm được",
            content: "Bác sĩ tư vấn tốt nhưng thời gian chờ đợi khá lâu. Mong cải thiện hơn về vấn đề này.",
            date: "2024-03-12",
            serviceType: "Tư vấn sinh sản",
        },
        {
            id: 5,
            userName: "Hoàng Văn E",
            rating: 5,
            title: "Đội ngũ y tế chuyên nghiệp",
            content: "Rất ấn tượng với cách bác sĩ giải thích chi tiết về tình trạng và phương pháp điều trị.",
            date: "2024-03-11",
            serviceType: "Khám chuyên khoa",
        },
        {
            id: 6,
            userName: "Vũ Thị F",
            rating: 5,
            title: "Chăm sóc tận tình",
            content: "Điều trị ở đây hơn 3 tháng, từ khám đến theo dõi đều rất chu đáo. Các y tá và bác sĩ rất nhiệt tình hỗ trợ.",
            date: "2024-03-10",
            serviceType: "Điều trị vô sinh",
        },
        {
            id: 7,
            userName: "Đặng Văn G",
            rating: 4,
            title: "Quy trình chuyên nghiệp",
            content: "Quy trình khám và điều trị rất bài bản. Nhân viên thân thiện, tư vấn chi tiết về các gói điều trị.",
            date: "2024-03-09",
            serviceType: "Tư vấn IVF",
        },
        {
            id: 8,
            userName: "Mai Thị H",
            rating: 5,
            title: "Kết quả ngoài mong đợi",
            content: "Sau nhiều năm điều trị không thành công ở nơi khác, cuối cùng đã thành công tại đây. Rất biết ơn đội ngũ y bác sĩ!",
            date: "2024-03-08",
            serviceType: "Điều trị IVF",
        },
        {
            id: 9,
            userName: "Trương Văn I",
            rating: 4,
            title: "Dịch vụ chất lượng cao",
            content: "Trang thiết bị hiện đại, đội ngũ y tế giàu kinh nghiệm. Giá cả hợp lý cho chất lượng dịch vụ được cung cấp.",
            date: "2024-03-07",
            serviceType: "Khám hiếm muộn",
        }
    ];

    useEffect(() => {
        setFeedbacks(mockFeedbacks);
    }, []);

    const handleSubmitFeedback = (e) => {
        e.preventDefault();
        // Implement feedback submission logic here
        console.log('Submitting feedback:', newFeedback);
    };

    const feedbackCardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (index) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.1,
                duration: 0.5
            }
        })
    };

    return (
        <motion.div
            className="pt-40 pb-20 min-h-screen bg-gradient-to-br from-blue-400 to-white px-4 sm:px-6 lg:px-8" // Thêm pt-20 để tránh đè lên header
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-blue-900 mb-4">
                        Đánh giá từ cộng đồng
                    </h1>
                    <p className="text-gray-600 max-w-3xl mx-auto mt-10">
                        Chia sẻ trải nghiệm của bạn và tham khảo đánh giá từ những người khác về dịch vụ của chúng tôi
                    </p>
                </div>

                {/* Tab Switcher */}
                <div className="flex justify-center gap-4 mb-8">
                    <motion.button
                        variants={tabVariants}
                        animate={activeTab === 'view' ? 'active' : 'inactive'}
                        onClick={() => setActiveTab('view')}
                        className="px-6 py-2 rounded-full border-2 border-blue-900 font-semibold"
                    >
                        Xem đánh giá
                    </motion.button>
                    {user && (
                        <motion.button
                            variants={tabVariants}
                            animate={activeTab === 'send' ? 'active' : 'inactive'}
                            onClick={() => setActiveTab('send')}
                            className="px-6 py-2 rounded-full border-2 border-blue-900 font-semibold"
                        >
                            Gửi đánh giá
                        </motion.button>
                    )}
                </div>

                {/* Content Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {activeTab === 'view' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {feedbacks.map((feedback, index) => (
                                <motion.div
                                    key={feedback.id}
                                    custom={index}
                                    initial="hidden"
                                    animate="visible"
                                    variants={feedbackCardVariants}
                                    whileHover={{ scale: 1.02 }}
                                    className="h-full"
                                >
                                    <Card className="p-6 h-full bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow">
                                        <div className="flex items-center mb-4">
                                            <div className="flex-shrink-0">
                                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <span className="text-blue-900 font-semibold">
                                                        {feedback.userName.charAt(0)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-semibold text-blue-900">{feedback.userName}</h3>
                                                <div className="flex items-center">
                                                    {[...Array(feedback.rating)].map((_, i) => (
                                                        <svg
                                                            key={i}
                                                            className="w-5 h-5 text-yellow-400"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-2 text-sm text-blue-600">{feedback.serviceType}</div>
                                        <h4 className="text-xl font-semibold mb-2 text-blue-800">{feedback.title}</h4>
                                        <p className="text-gray-600 mb-4">{feedback.content}</p>
                                        <div className="text-sm text-gray-500">{feedback.date}</div>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="max-w-2xl mx-auto"
                        >
                            <Card className="p-8 bg-white shadow-xl rounded-xl">
                                <form onSubmit={handleSubmitFeedback} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Đánh giá của bạn
                                        </label>
                                        <div className="flex gap-2 mb-4">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setNewFeedback({ ...newFeedback, rating: star })}
                                                    className={`text-3xl transition-colors duration-200 ${star <= newFeedback.rating ? 'text-yellow-400' : 'text-gray-300'
                                                        }`}
                                                >
                                                    ★
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Loại dịch vụ
                                        </label>
                                        <select
                                            value={newFeedback.serviceType}
                                            onChange={(e) => setNewFeedback({ ...newFeedback, serviceType: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">Chọn loại dịch vụ</option>
                                            <option value="Tư vấn hiếm muộn">Tư vấn hiếm muộn</option>
                                            <option value="Khám tổng quát">Khám tổng quát</option>
                                            <option value="Điều trị hiếm muộn">Điều trị hiếm muộn</option>
                                            <option value="Tư vấn sinh sản">Tư vấn sinh sản</option>
                                            <option value="Điều trị IVF">Điều trị IVF</option>
                                            <option value="Khám chuyên khoa">Khám chuyên khoa</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tiêu đề đánh giá
                                        </label>
                                        <Input
                                            type="text"
                                            value={newFeedback.title}
                                            onChange={(e) => setNewFeedback({ ...newFeedback, title: e.target.value })}
                                            placeholder="Nhập tiêu đề đánh giá của bạn"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nội dung đánh giá
                                        </label>
                                        <Textarea
                                            value={newFeedback.content}
                                            onChange={(e) => setNewFeedback({ ...newFeedback, content: e.target.value })}
                                            placeholder="Chia sẻ trải nghiệm của bạn về dịch vụ..."
                                            className="w-full h-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                        />
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 px-4 rounded-lg transition-colors duration-200 font-semibold"
                                    >
                                        Gửi đánh giá
                                    </motion.button>
                                </form>
                            </Card>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Feedback;