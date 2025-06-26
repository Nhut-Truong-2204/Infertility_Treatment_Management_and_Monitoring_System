import { motion } from "framer-motion";
import { Close as CloseIcon, ThumbUp as ThumbUpIcon, Comment as CommentIcon, Share as ShareIcon } from "@mui/icons-material";

const PostDetail = ({ post, onClose }) => {
    return (
        <>
            {/* Overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50"
                onClick={onClose}
            />

            {/* Content */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl w-full max-w-4xl shadow-2xl overflow-hidden"
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-blue-600 to-blue-400">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl font-bold text-white"
                    >
                        Chi tiết bài viết
                    </motion.h2>
                    <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="p-2 hover:bg-white/20 rounded-full transition-all text-white"
                    >
                        <CloseIcon />
                    </motion.button>
                </div>

                {/* Content */}
                <div className="p-8">
                    {/* Author info */}
                    <div className="flex items-center mb-6">
                        <motion.img
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-12 h-12 rounded-full"
                        />
                        <div className="ml-4">
                            <h3 className="font-semibold text-lg">{post.author.name}</h3>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">{post.timeAgo}</span>
                                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                                    {post.author.role}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Title and Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">{post.content}</p>
                    </motion.div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.map(tag => (
                            <motion.span
                                key={tag}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                className="text-sm px-3 py-1 bg-gray-100 text-gray-600 rounded-full"
                            >
                                #{tag}
                            </motion.span>
                        ))}
                    </div>

                    {/* Interaction Stats */}
                    <div className="flex items-center justify-between text-gray-500 border-t pt-6">
                        <div className="flex items-center space-x-6">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="flex items-center space-x-2 hover:text-blue-600"
                            >
                                <ThumbUpIcon />
                                <span>{post.stats.likes} lượt thích</span>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="flex items-center space-x-2 hover:text-blue-600"
                            >
                                <CommentIcon />
                                <span>{post.stats.comments} bình luận</span>
                            </motion.button>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="hover:text-blue-600"
                        >
                            <ShareIcon />
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default PostDetail;