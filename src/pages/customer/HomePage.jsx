import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PaymentSuccess from "@/components/ui/paymentSuccess";
import PaymentFail from "@/components/ui/paymentFail";
import InfoCardHome from "@/components/DashboardComponents/InfoCardHome";
const doctors = [
  {
    name: "Dr. Nguyễn Văn A",
    role: "Chuyên gia Hiếm muộn",
    username: "@nguyenvana",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    hoverImg: "https://randomuser.me/api/portraits/men/33.jpg",
    bio: "20 năm kinh nghiệm trong lĩnh vực hỗ trợ sinh sản. Tốt nghiệp tại ĐH Y Hà Nội và tu nghiệp tại Nhật Bản.",
  },
  {
    name: "Dr. Trần Thị B",
    role: "Bác sĩ Sản phụ khoa",
    username: "@tranthib",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    hoverImg: "https://randomuser.me/api/portraits/women/45.jpg",
    bio: "Chuyên khám và điều trị các vấn đề phụ khoa, đồng hành cùng hàng nghìn ca mang thai thành công.",
  },
  {
    name: "Dr. Lê Văn C",
    role: "Tư vấn viên Tâm lý",
    username: "@levanc",
    img: "https://randomuser.me/api/portraits/men/54.jpg",
    hoverImg: "https://randomuser.me/api/portraits/men/55.jpg",
    bio: "Hơn 10 năm tư vấn tâm lý cho các cặp đôi hiếm muộn, luôn lắng nghe và đồng hành.",
  },
];

const reviews = [
  {
    name: "Nguyễn Thị Hồng",
    feedback:
      "Tôi rất hài lòng với đội ngũ bác sĩ tận tâm và chuyên nghiệp. Hệ thống dễ sử dụng và rất hữu ích.",
    rating: 5,
  },
  {
    name: "Trần Văn Nam",
    feedback:
      "Một trải nghiệm tuyệt vời! Đặt lịch nhanh chóng và được tư vấn kỹ càng.",
    rating: 4,
  },
  {
    name: "Lê Thị Hoa",
    feedback:
      "Bác sĩ tư vấn cực kỳ dễ hiểu và tận tình. Cảm thấy được an tâm hơn rất nhiều.",
    rating: 5,
  },
  {
    name: "Phạm Minh Quân",
    feedback: "Dịch vụ nhanh chóng, giao diện thân thiện, rất khuyên dùng.",
    rating: 4,
  },
  {
    name: "Đỗ Hồng Nhung",
    feedback: "Không gian đẹp và thân thiện, đội ngũ chuyên gia tuyệt vời.",
    rating: 5,
  },
  {
    name: "Ngô Quỳnh Anh",
    feedback: "Trang web dễ dùng, thông tin rõ ràng và hữu ích.",
    rating: 5,
  },
  {
    name: "Phan Tuấn Anh",
    feedback: "Tư vấn nhanh chóng và hỗ trợ nhiệt tình.",
    rating: 4,
  },
];

const HomePage = () => {
  const [hoveredDoctor, setHoveredDoctor] = useState(null);
  return (
    <>
    <InfoCardHome/>
      <section className="bg-gradient-to-tr from-white via-[#f2f4f8] to-white dark:from-[#1a1a1a] dark:via-[#2a2a2a] dark:to-[#1a1a1a] py-12 px-4">
        <div className="max-w-6xl mx-auto relative">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#2c3e50] dark:text-white mb-6">
            Đội ngũ Chuyên gia
          </h2>
          <p className="text-center max-w-xl mx-auto text-gray-600 dark:text-gray-300 mb-10">
            Những người đồng hành cùng bạn trong hành trình chăm sóc sức khoẻ
            sinh sản và tinh thần.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 relative">
            {doctors.map((doc, index) => {
              const isActive = hoveredDoctor?.name === doc.name;
              const isOther = hoveredDoctor && hoveredDoctor?.name !== doc.name;
              return (
                <motion.div
                  key={index}
                  className={`relative rounded-3xl transition-all duration-500 p-6 text-center cursor-pointer 
                    ${isActive ? "z-50 scale-[1.03] shadow-2xl" : ""}
                    ${
                      isOther
                        ? "opacity-30 translate-y-2 blur-[1px]"
                        : "opacity-100"
                    } 
                    bg-[#fdfdfd] dark:bg-[#2c2c2c]`}
                  onMouseEnter={() => setHoveredDoctor(doc)}
                  onMouseLeave={() => setHoveredDoctor(null)}
                >
                  <div className="relative w-28 h-28 mb-4 mx-auto group">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#A1C4FD] to-[#C2E9FB] p-[3px]">
                      <img
                        src={doc.img}
                        alt={doc.name}
                        className="w-full h-full object-cover rounded-full border-4 border-white dark:border-[#1f1f1f] shadow"
                      />
                      <motion.img
                        src={doc.hoverImg}
                        alt={doc.name + " hover"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isActive ? 1 : 0 }}
                        className="w-full h-full object-cover rounded-full border-4 border-white dark:border-[#1f1f1f] shadow absolute top-0 left-0"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-[#37474F] dark:text-white">
                    {doc.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">
                    {doc.role}
                  </p>
                  <p className="text-sm text-blue-500 dark:text-blue-300">
                    {doc.username}
                  </p>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-80 p-5 bg-white dark:bg-[#2a2a2a] text-left rounded-xl shadow-2xl z-50 border border-gray-200 dark:border-gray-700"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h4 className="text-lg font-bold text-[#16417e] dark:text-white mb-2">
                          {hoveredDoctor.name}
                        </h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {hoveredDoctor.bio}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
          <h3 className="text-2xl font-bold text-center text-[#2c3e50] dark:text-white mt-24 mb-6">
            Đánh giá từ người dùng
          </h3>
          <div className="overflow-x-scroll scrollbar-hide relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/white-wall.png')] opacity-10 pointer-events-none"></div>
            <motion.div
              className="flex gap-6 w-max px-2 py-6"
              animate={{ x: [0, -600, 0] }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            >
              {reviews.map((review, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white dark:bg-[#1f1f1f] min-w-[320px] max-w-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-[#A1C4FD] relative"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={`https://randomuser.me/api/portraits/${
                        idx % 2 === 0 ? "women" : "men"
                      }/${idx + 30}.jpg`}
                      alt={review.name}
                      className="w-12 h-12 object-cover rounded-full border-2 border-[#A1C4FD]"
                    />
                    <div>
                      <p className="text-sm font-bold text-[#16417e] dark:text-blue-400">
                        {review.name}
                      </p>
                      <p className="text-yellow-400 text-xs">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-800 dark:text-gray-300 italic text-sm">
                    "{review.feedback}"
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
