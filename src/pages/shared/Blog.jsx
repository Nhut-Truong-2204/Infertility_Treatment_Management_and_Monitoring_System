import React from "react";
import { useAuth } from "../../hooks/useAuth";

const Blog = () => {
  const { isAuthenticated } = useAuth();

  const blogPosts = [
    {
      id: 1,
      title: "10 Lời Khuyên Sức Khỏe Hàng Ngày",
      excerpt:
        "Khám phá những thói quen đơn giản giúp cải thiện sức khỏe của bạn mỗi ngày.",
      image: "/post-1.jpg",
      date: "15/07/2024",
      author: "BS. Nguyễn Văn A",
      category: "Sức khỏe tổng quát",
    },
    {
      id: 2,
      title: "Tầm Quan Trọng Của Khám Sức Khỏe Định Kỳ",
      excerpt:
        "Tại sao việc khám sức khỏe định kỳ lại quan trọng và nên thực hiện như thế nào.",
      image: "/post-2.jpg",
      date: "12/07/2024",
      author: "BS. Trần Thị B",
      category: "Phòng ngừa",
    },
    {
      id: 3,
      title: "Dinh Dưỡng Hợp Lý Cho Mọi Lứa Tuổi",
      excerpt:
        "Hướng dẫn chi tiết về chế độ dinh dưỡng phù hợp cho từng giai đoạn cuộc đời.",
      image: "/post-3.jpg",
      date: "10/07/2024",
      author: "BS. Lê Văn C",
      category: "Dinh dưỡng",
    },
  ];

  return (
    <div className="bg-white py-16 sm:py-24 font-onest">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-accent uppercase font-semibold text-sm tracking-widest mb-2">
            TIN TỨC & BLOG
          </h3>
          <h1 className="text-4xl lg:text-5xl font-bold text-primary leading-tight mb-4">
            Kiến Thức Sức Khỏe
          </h1>
          <p className="text-lg text-text-color leading-relaxed max-w-3xl mx-auto">
            Cập nhật những thông tin hữu ích về sức khỏe, tips chăm sóc bản thân
            và các tin tức y tế mới nhất từ đội ngũ chuyên gia của chúng tôi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <span className="bg-accent/10 text-accent px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3 hover:text-accent transition-colors cursor-pointer">
                  {post.title}
                </h3>
                <p className="text-text-color mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <i className="fas fa-user-md text-gray-600 text-sm"></i>
                    </div>
                    <span className="text-sm text-gray-600">{post.author}</span>
                  </div>
                  <button className="text-accent hover:text-accent/80 font-medium">
                    Đọc thêm →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter subscription - chỉ hiện cho guest */}
        {!isAuthenticated && (
          <div className="mt-16 bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">
              Đăng Ký Nhận Tin Tức Sức Khỏe
            </h3>
            <p className="mb-6 opacity-90">
              Nhận những thông tin hữu ích về sức khỏe và các chương trình
              khuyến mãi đặc biệt
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-primary px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Đăng Ký
              </button>
            </div>
          </div>
        )}

        {/* Customer-specific content */}
        {isAuthenticated && (
          <div className="mt-16 bg-blue-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-primary mb-4">
              Bài Viết Dành Riêng Cho Bạn
            </h3>
            <p className="text-text-color mb-6">
              Dựa trên lịch sử khám và các dịch vụ bạn đã sử dụng, chúng tôi đề
              xuất những bài viết phù hợp
            </p>
            <button className="bg-accent text-white px-8 py-3 rounded-lg hover:bg-accent/90 transition-colors">
              Xem Đề Xuất Cá Nhân
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
