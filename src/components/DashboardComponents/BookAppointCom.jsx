import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

// Mảng ảnh - bạn thay đường dẫn ảnh thật ở đây
import Img1 from "../../assets/9798f7419779181ef543a915777553ff.jpg";
import Img2 from "../../assets/DoctorLogin1.jpg";
import Img3 from "../../assets/HiemmuonNam.png";
import Img4 from "../../assets/HiemmuonNu.png";
import Img5 from "../../assets/HiemmuonNu2.png";
import Img6 from "../../assets/Hiemmuonnam2.png";
import Img7 from "../../assets/HiemmuonNam3.png";
import Img8 from "../../assets/R.png";
import { useNavigate } from "react-router-dom";
// Mảng chứa các ảnh
const images = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8];

export default function BookAppointmentSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(1); // Dùng cho điều khiển hướng animation
  const navigation = useNavigate();
  const goToBooking = () => {
    navigation("/bookingAppointment");
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1); // Ảnh trượt từ phải sang trái
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // 5 giây

    return () => clearInterval(interval);
  }, []);

  // Biến animation để tái sử dụng
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section className="flex flex-col lg:flex-row w-full h-[600px] overflow-hidden bg-white">
      {/* Left Side - Image Slider */}
      <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.img
            key={currentImage}
            src={images[currentImage]}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "tween", ease: "easeInOut", duration: 1 },
              opacity: { duration: 0.8 },
            }}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>

      {/* Right Side - Content */}
      <motion.div
        className="w-full lg:w-1/2 bg-[#002f86] text-white flex flex-col justify-center items-start p-12"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h2 className="text-4xl font-bold mb-6">Book an Appointment</h2>
        <p className="text-lg mb-8 max-w-md leading-relaxed">
          STD testing, birth control, abortion, and more, in-person and online.
        </p>
        <button
          onClick={goToBooking}
          className="bg-[#4c9be8] hover:bg-[#3588cc] transition duration-300 font-semibold px-6 py-3 rounded-full shadow-md"
        >
          GET STARTED
        </button>
      </motion.div>
    </section>
  );
}
