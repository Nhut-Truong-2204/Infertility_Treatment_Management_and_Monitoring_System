import React from "react";
import { motion } from "framer-motion";
import ScanHeart from "../ui/ScanHeart";
import { useNavigate } from "react-router-dom";



export default function Hero() {
  const navigate = useNavigate();
    
  // Animation variants for fade-in-up
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <section
      className="relative pt-16 overflow-hidden min-h-[700px] flex items-center justify-center rounded-b-[32px]"
      style={{
        background: "url('/hero-bg-2.jpg') center/cover no-repeat",
        borderLeft: "2px solid #e5e7eb",
        borderRight: "2px solid #e5e7eb",
        borderBottom: "2px solid #e5e7eb",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        marginLeft: "auto",
        marginRight: "auto",
        maxWidth: "1440px",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#252e6c] via-[#252e6c] to-[#252e6c] opacity-90 pointer-events-none z-0 rounded-b-[32px]" />

      

      {/* Main hero content */}
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center px-4 lg:px-12 relative z-20">
        {/* Hero Text */}
        <motion.div
          className="flex-1"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <motion.h3
            className="text-[#ff70a3] text-lg font-bold mb-2 tracking-wide uppercase"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
          >
            CHÀO MỪNG BẠN ĐẾN VỚI REPROTRACK
          </motion.h3>
          <motion.h1
            className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight text-white"
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            Trao hy vọng sống, đón{" "}
            <span className="text-[#ff70a3]">thiên thần nhỏ!</span>
          </motion.h1>
          <motion.p
            className=" text-lg mb-6 max-w-xl text-white"
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.7 }}
          >
            Chúng tôi luôn đồng hành với bạn bằng chuyên môn vững vàng, công nghệ hiện đại và trái tim đầy thấu cảm – vì hành trình làm cha mẹ xứng đáng được nâng niu.
          </motion.p>
          <motion.ul
            className="flex gap-6 mb-8 text-base font-medium"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.8 }}
          >
            <li className="flex items-center gap-2 text-green-600">
              <i className="fas fa-check-circle animate-bounce"></i> Tỷ lệ thành công cao
            </li>
            <li className="flex items-center gap-2 text-green-600">
              <i className="fas fa-check-circle animate-bounce"></i> Chuyên môn cao
            </li>
            <li className="flex items-center gap-2 text-green-600">
              <i className="fas fa-check-circle animate-bounce"></i> Hỗ trợ tài chính
            </li>
          </motion.ul>


          
          <div className="group flex flex-col w-20 ">
            <button
              className="group bg-pink-500 hover:bg-pink-600 text-white font-bold 
             rounded-2xl transition-all duration-500 shadow-md 
             
             w-[180px] h-[120px] group-hover:h-[160px]
             relative overflow-hidden"
              onClick={() => navigate("/bookingAppointment")} 
            >
              {/* ICON */}
              <ScanHeart
                className="w-12 h-12 transition-all duration-500 transform mt-6
               group-hover:-translate-y-2"
                strokeWidth={2}
              />

              {/* TEXT */}
              <span
                className="text-lg font-semibold opacity-0 translate-y-2
               group-hover:opacity-100 group-hover:translate-y-4
               transition-all duration-500 mt-4"
              >
                Đặt lịch hẹn
              </span>
            </button>
          </div>
        </motion.div>
        {/* Hero Image */}
        <div className="flex-1 flex justify-center lg:justify-end mt-10 lg:mt-0 transition-all duration-700 ease-out opacity-100 translate-y-0">
          <img
            src="/hero-img.png"
            alt="Hero"
            className="w-[350px] lg:w-[500px] xl:w-[644px] h-auto object-contain drop-shadow-2xl animate-float"
          />
        </div>
      </div>
    </section>
  );
}
