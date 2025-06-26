import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import {
    Search as SearchIcon,
    FilterList as FilterListIcon,
    Add as AddIcon,
    Comment as CommentIcon,
    ThumbUp as ThumbUpIcon,
    Share as ShareIcon,
} from "@mui/icons-material";
import CreatePostForm from "./CreatePostForm";
import PostDetail from "./PostDetail";

const BlogForum = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("blog");
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [showFilter, setShowFilter] = useState(false);
    const [sortBy, setSortBy] = useState("latest");
    const [selectedPost, setSelectedPost] = useState(null);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const headerVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay: 0.2 }
        }
    };

    const buttonVariants = {
        hover: { scale: 1.05 },
        tap: { scale: 0.95 }
    };

    const filterVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        },
        exit: {
            opacity: 0,
            y: -10,
            transition: { duration: 0.2 }
        }
    };

    const searchVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 }
        }
    };

    const tabVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        }
    };

    const MOCK_POSTS = [
        // BLOG POSTS
        {
            id: 1,
            type: 'blog',
            category: 'medical',
            title: 'Tổng quan về các phương pháp điều trị vô sinh hiện đại',
            content: 'Ngày nay, y học sinh sản đã phát triển với nhiều phương pháp điều trị hiện đại như IUI, IVF, ICSI. Mỗi phương pháp có những ưu điểm và phù hợp với từng trường hợp cụ thể...',
            author: {
                name: 'BS. Nguyễn Văn An',
                avatar: 'https://i.pravatar.cc/150?img=1',
                role: 'Bác sĩ chuyên khoa'
            },
            stats: { likes: 458, comments: 89, shares: 56 },
            timeAgo: '2 giờ trước',
            tags: ['Y khoa', 'Điều trị', 'IVF']
        },
        {
            id: 2,
            type: 'blog',
            category: 'experience',
            title: 'Hành trình chiến thắng vô sinh - Câu chuyện của tôi',
            content: 'Sau 7 năm điều trị, cuối cùng vợ chồng tôi đã đón nhận tin vui. Hành trình này tuy gian nan nhưng đã cho chúng tôi nhiều bài học quý giá...',
            author: {
                name: 'Phạm Thị Bình',
                avatar: 'https://i.pravatar.cc/150?img=2',
                role: 'Người chiến thắng vô sinh'
            },
            stats: { likes: 1205, comments: 324, shares: 178 },
            timeAgo: '1 ngày trước',
            tags: ['Chia sẻ', 'Thành công', 'Động lực']
        },
        {
            id: 3,
            type: 'blog',
            category: 'nutrition',
            title: 'Chế độ dinh dưỡng tăng khả năng thụ thai',
            content: 'Dinh dưỡng đóng vai trò quan trọng trong việc tăng khả năng thụ thai. Bài viết chia sẻ những thực phẩm và chế độ ăn khoa học...',
            author: {
                name: 'ThS. Lê Thu Hà',
                avatar: 'https://i.pravatar.cc/150?img=3',
                role: 'Chuyên gia dinh dưỡng'
            },
            stats: { likes: 567, comments: 91, shares: 145 },
            timeAgo: '3 ngày trước',
            tags: ['Dinh dưỡng', 'Sức khỏe', 'Thụ thai']
        },
        {
            id: 4,
            type: 'blog',
            category: 'medical',
            title: 'Những tiến bộ mới trong điều trị vô sinh nam',
            content: 'Các phương pháp điều trị vô sinh nam đã có nhiều bước tiến đáng kể. Bài viết cập nhật những phương pháp điều trị hiện đại nhất...',
            author: {
                name: 'PGS.TS Trần Văn Cường',
                avatar: 'https://i.pravatar.cc/150?img=4',
                role: 'Giáo sư - Bác sĩ'
            },
            stats: { likes: 892, comments: 156, shares: 234 },
            timeAgo: '4 ngày trước',
            tags: ['Nam khoa', 'Điều trị', 'Công nghệ']
        },
        {
            id: 5,
            type: 'blog',
            category: 'psychology',
            title: 'Vượt qua áp lực tâm lý khi điều trị vô sinh',
            content: 'Áp lực tâm lý là một trong những thách thức lớn nhất với các cặp vợ chồng điều trị vô sinh. Cùng tham khảo các phương pháp vượt qua...',
            author: {
                name: 'ThS. Nguyễn Thị Tâm',
                avatar: 'https://i.pravatar.cc/150?img=5',
                role: 'Chuyên gia tâm lý'
            },
            stats: { likes: 743, comments: 234, shares: 89 },
            timeAgo: '5 ngày trước',
            tags: ['Tâm lý', 'Sức khỏe tinh thần', 'Hỗ trợ']
        },
        {
            id: 6,
            type: 'blog',
            category: 'lifestyle',
            title: 'Lối sống lành mạnh tăng cường khả năng sinh sản',
            content: 'Việc duy trì lối sống lành mạnh có thể cải thiện đáng kể khả năng sinh sản. Tìm hiểu những thói quen tốt cần áp dụng...',
            author: {
                name: 'BS. Hoàng Lan',
                avatar: 'https://i.pravatar.cc/150?img=6',
                role: 'Bác sĩ tư vấn'
            },
            stats: { likes: 621, comments: 145, shares: 167 },
            timeAgo: '1 tuần trước',
            tags: ['Lối sống', 'Sức khỏe', 'Sinh sản']
        },

        // FORUM POSTS
        {
            id: 7,
            type: 'forum',
            category: 'question',
            title: 'Xin tư vấn về chi phí điều trị IVF',
            content: 'Chào mọi người, vợ chồng mình dự định làm IVF. Mình muốn hỏi về chi phí và các khoản phát sinh cần chuẩn bị...',
            author: {
                name: 'Nguyễn Văn Minh',
                avatar: 'https://i.pravatar.cc/150?img=7',
                role: 'Thành viên mới'
            },
            stats: { likes: 25, comments: 48, shares: 3 },
            timeAgo: '30 phút trước',
            tags: ['Câu hỏi', 'IVF', 'Chi phí']
        },
        {
            id: 8,
            type: 'forum',
            category: 'support',
            title: 'Cần lời khuyên sau 2 lần thất bại IUI',
            content: 'Mình vừa trải qua thất bại IUI lần 2, cảm thấy rất chán nản. Có ai từng trải qua và vượt qua được không ạ?',
            author: {
                name: 'Trần Thị Hoa',
                avatar: 'https://i.pravatar.cc/150?img=8',
                role: 'Thành viên'
            },
            stats: { likes: 156, comments: 89, shares: 12 },
            timeAgo: '2 giờ trước',
            tags: ['Tâm sự', 'IUI', 'Hỗ trợ']
        },
        {
            id: 9,
            type: 'forum',
            category: 'experience',
            title: 'Chia sẻ kinh nghiệm chọn bệnh viện điều trị hiếm muộn',
            content: 'Sau quá trình tìm hiểu nhiều nơi, mình xin chia sẻ kinh nghiệm chọn bệnh viện phù hợp cho các cặp đôi...',
            author: {
                name: 'Lê Thị Mai',
                avatar: 'https://i.pravatar.cc/150?img=9',
                role: 'Thành viên tích cực'
            },
            stats: { likes: 234, comments: 67, shares: 45 },
            timeAgo: '5 giờ trước',
            tags: ['Kinh nghiệm', 'Bệnh viện', 'Lựa chọn']
        },
        {
            id: 10,
            type: 'forum',
            category: 'question',
            title: 'Thắc mắc về quy trình thụ tinh trong ống nghiệm',
            content: 'Mình đang tìm hiểu về IVF và có một số thắc mắc về quy trình. Mong các bác sĩ và người có kinh nghiệm tư vấn...',
            author: {
                name: 'Phạm Văn Đức',
                avatar: 'https://i.pravatar.cc/150?img=10',
                role: 'Thành viên mới'
            },
            stats: { likes: 45, comments: 78, shares: 8 },
            timeAgo: '8 giờ trước',
            tags: ['Câu hỏi', 'IVF', 'Quy trình']
        },
        {
            id: 11,
            type: 'forum',
            category: 'support',
            title: 'Tìm bạn đồng hành trong hành trình điều trị',
            content: 'Mình đang bắt đầu hành trình điều trị và muốn tìm bạn để chia sẻ, động viên nhau...',
            author: {
                name: 'Nguyễn Thị Hạnh',
                avatar: 'https://i.pravatar.cc/150?img=11',
                role: 'Thành viên'
            },
            stats: { likes: 89, comments: 134, shares: 15 },
            timeAgo: '12 giờ trước',
            tags: ['Kết nối', 'Hỗ trợ', 'Đồng hành']
        },
        {
            id: 12,
            type: 'forum',
            category: 'discussion',
            title: 'Thảo luận về các phương pháp tăng cường sinh lý nam',
            content: 'Cùng chia sẻ về các phương pháp tự nhiên và y học giúp cải thiện khả năng sinh lý nam giới...',
            author: {
                name: 'Trần Văn Khoa',
                avatar: 'https://i.pravatar.cc/150?img=12',
                role: 'Thành viên tích cực'
            },
            stats: { likes: 167, comments: 245, shares: 34 },
            timeAgo: '1 ngày trước',
            tags: ['Nam khoa', 'Sinh lý', 'Thảo luận']
        }
    ];

    const FILTER_OPTIONS = {
        categories: [
            { value: 'all', label: 'Tất cả' },
            { value: 'experience', label: 'Chia sẻ kinh nghiệm' },
            { value: 'medical', label: 'Kiến thức y khoa' },
            { value: 'question', label: 'Câu hỏi' },
            { value: 'support', label: 'Hỗ trợ tinh thần' },
            { value: 'nutrition', label: 'Dinh dưỡng' }
        ],
        sortBy: [
            { value: 'latest', label: 'Mới nhất' },
            { value: 'popular', label: 'Phổ biến nhất' },
            { value: 'discussed', label: 'Thảo luận sôi nổi' }
        ]
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-600 to-white">
            <AnimatePresence>
                {showCreatePost && <CreatePostForm onClose={() => setShowCreatePost(false)} />}
            </AnimatePresence>
            {/* Header Section */}
            <motion.div
                variants={headerVariants}
                initial="hidden"
                animate="visible"
                className=" text-white py-16 px-4 pt-35"
            >
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-4">Cộng Đồng ReproTrack</h1>
                    <p className="text-2xl opacity-90">Chia sẻ - Kết nối - Đồng hành</p>
                </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-7xl mx-auto px-4 py-8"
            >
                {/* Tab Navigation */}
                <motion.div className="flex justify-between items-center mb-8">
                    <motion.div
                        className="flex space-x-4"
                        variants={tabVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => setActiveTab("blog")}
                            className={`px-6 py-2 rounded-full transition-all ${activeTab === "blog"
                                ? "bg-blue-500 text-white"
                                : "bg-white text-blue-600 hover:bg-blue-50"
                                }`}
                        >
                            Bài Viết
                        </motion.button>
                        <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => setActiveTab("forum")}
                            className={`px-6 py-2 rounded-full transition-all ${activeTab === "forum"
                                ? "bg-blue-500 text-white"
                                : "bg-white text-blue-600 hover:bg-blue-50"
                                }`}
                        >
                            Diễn Đàn
                        </motion.button>
                    </motion.div>

                    {/* Search and Filter */}
                    <motion.div
                        className="flex space-x-4"
                        variants={searchVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            className="relative"
                            whileHover={{ scale: 1.02 }}
                        >
                            <motion.input
                                type="text"
                                placeholder="Tìm kiếm..."
                                className="pl-10 pr-4 py-2 rounded-full border-2 border-gray-200 focus:outline-none focus:border-blue-400 text-white placeholder-gray-300 bg-transparent"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                whileFocus={{ scale: 1.02 }}
                            />
                            <SearchIcon className="absolute left-3 top-2.5 text-gray-300" />
                        </motion.div>

                        <motion.div className="relative">
                            <motion.button
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="p-2 rounded-full bg-white border border-gray-200 hover:bg-blue-50"
                                onClick={() => setShowFilter(!showFilter)}
                            >
                                <FilterListIcon className="text-blue-600" />
                            </motion.button>

                            <AnimatePresence>
                                {showFilter && (
                                    <motion.div
                                        variants={filterVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg z-20 p-4"
                                    >
                                        <motion.h3
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-xl font-semibold mb-3 text-center text-blue-600"
                                        >
                                            Bộ lọc
                                        </motion.h3>

                                        <motion.div className="mb-4">
                                            <motion.label
                                                className="block text-sm font-medium text-gray-700 mb-2"
                                                whileHover={{ x: 3 }}
                                            >
                                                Danh mục
                                            </motion.label>
                                            <motion.select
                                                whileFocus={{ scale: 1.02 }}
                                                whileHover={{ scale: 1.02 }}
                                                className="w-full p-2 border border-gray-200 rounded-lg"
                                                value={filter}
                                                onChange={(e) => setFilter(e.target.value)}
                                            >
                                                {FILTER_OPTIONS.categories.map(cat => (
                                                    <option key={cat.value} value={cat.value}>
                                                        {cat.label}
                                                    </option>
                                                ))}
                                            </motion.select>
                                        </motion.div>

                                        <motion.div className="mb-4">
                                            <motion.label
                                                className="block text-sm font-medium text-gray-700 mb-2"
                                                whileHover={{ x: 3 }}
                                            >
                                                Sắp xếp theo
                                            </motion.label>
                                            <motion.select
                                                whileFocus={{ scale: 1.02 }}
                                                whileHover={{ scale: 1.02 }}
                                                className="w-full p-2 border border-gray-200 rounded-lg"
                                                value={sortBy}
                                                onChange={(e) => setSortBy(e.target.value)}
                                            >
                                                {FILTER_OPTIONS.sortBy.map(option => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </motion.select>
                                        </motion.div>

                                        <motion.button
                                            variants={buttonVariants}
                                            whileHover="hover"
                                            whileTap="tap"
                                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                                            onClick={() => setShowFilter(false)}
                                        >
                                            Áp dụng
                                        </motion.button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {user && (
                            <motion.button
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                onClick={() => setShowCreatePost(true)}
                                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition-all"
                            >
                                <AddIcon className="mr-1" />
                                Tạo bài viết
                            </motion.button>
                        )}
                    </motion.div>
                </motion.div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_POSTS
                        .filter(post => activeTab === 'blog' ? post.type === 'blog' : post.type === 'forum')
                        .filter(post => filter === 'all' || post.category === filter)
                        .sort((a, b) => {
                            switch (sortBy) {
                                case 'latest':
                                    return new Date(b.timeAgo) - new Date(a.timeAgo);
                                case 'popular':
                                    return b.stats.likes - a.stats.likes;
                                case 'discussed':
                                    return b.stats.comments - a.stats.comments;
                                default:
                                    return 0;
                            }
                        })
                        .map(post => (
                            <motion.div
                                key={post.id}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer"
                                onClick={() => setSelectedPost(post)}
                            >
                                <div className="p-6">
                                    {/* Author info */}
                                    <div className="flex items-center mb-4">
                                        <img
                                            src={post.author.avatar}
                                            alt={post.author.name}
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div className="ml-3">
                                            <h3 className="font-semibold">{post.author.name}</h3>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm text-gray-500">{post.timeAgo}</span>
                                                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                                                    {post.author.role}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <h2 className="text-xl font-bold mb-3">{post.title}</h2>
                                    <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center justify-between text-gray-500">
                                        <div className="flex items-center space-x-4">
                                            <button className="flex items-center space-x-1 hover:text-blue-600">
                                                <ThumbUpIcon fontSize="small" />
                                                <span>{post.stats.likes}</span>
                                            </button>
                                            <button className="flex items-center space-x-1 hover:text-blue-600">
                                                <CommentIcon fontSize="small" />
                                                <span>{post.stats.comments}</span>
                                            </button>
                                        </div>
                                        <button className="hover:text-blue-600">
                                            <ShareIcon fontSize="small" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                </div>

                {/* Pagination */}
                <motion.div
                    className="flex justify-center mt-8 space-x-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    {[1, 2, 3, 4, 5].map((page) => (
                        <motion.button
                            key={page}
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-full ${currentPage === page
                                ? "bg-blue-600 text-white"
                                : "bg-white text-blue-600 hover:bg-blue-50"
                                }`}
                        >
                            {page}
                        </motion.button>
                    ))}
                </motion.div>
            </motion.div>
            <AnimatePresence>
                {selectedPost && (
                    <PostDetail
                        post={selectedPost}
                        onClose={() => setSelectedPost(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default BlogForum;