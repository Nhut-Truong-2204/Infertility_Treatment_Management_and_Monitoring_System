import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Close as CloseIcon } from "@mui/icons-material";

const CreatePostForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "general",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        onClose();
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50"
                onClick={onClose}
            />

            {/* Form Container */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: -20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden"
            >
                <motion.div
                    className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-blue-600 to-blue-400 rounded-t-xl"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                        className="text-2xl font-bold text-white text-center flex-grow"
                    >
                        Tạo bài viết mới
                    </motion.h2>
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-full transition-all text-white"
                    >
                        <CloseIcon />
                    </motion.button>
                </motion.div>

                <motion.form
                    onSubmit={handleSubmit}
                    className="p-8 space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <motion.label
                            className="block text-sm font-medium text-gray-700 mb-2"
                            whileHover={{ x: 5 }}
                        >
                            Tiêu đề
                        </motion.label>
                        <motion.input
                            type="text"
                            required
                            whileFocus={{ scale: 1.01 }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <motion.label
                            className="block text-sm font-medium text-gray-700 mb-2"
                            whileHover={{ x: 5 }}
                        >
                            Danh mục
                        </motion.label>
                        <motion.select
                            required
                            whileFocus={{ scale: 1.01 }}
                            whileHover={{ scale: 1.01 }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="general">Chung</option>
                            <option value="experience">Chia sẻ kinh nghiệm</option>
                            <option value="question">Hỏi đáp</option>
                            <option value="news">Tin tức</option>
                        </motion.select>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <motion.label
                            className="block text-sm font-medium text-gray-700 mb-2"
                            whileHover={{ x: 5 }}
                        >
                            Nội dung
                        </motion.label>
                        <motion.textarea
                            required
                            whileFocus={{ scale: 1.01 }}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all min-h-[200px] resize-none"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        />
                    </motion.div>

                    <motion.div
                        className="flex justify-end space-x-4 pt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <motion.button
                            type="button"
                            onClick={onClose}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium"
                        >
                            Hủy
                        </motion.button>
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
                        >
                            Đăng bài
                        </motion.button>
                    </motion.div>
                </motion.form>
            </motion.div>
        </AnimatePresence>
    );
};

export default CreatePostForm;