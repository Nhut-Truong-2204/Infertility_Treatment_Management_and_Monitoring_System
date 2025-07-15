import React from "react";
// import { useDispatch } from "react-redux";
import heroImg from "../assets/images/hero-img.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faPlay } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  // const dispatch = useDispatch();
  return (
    <div className="relative bg-primary bg-cover bg-center -mt-[115px] pt-[200px] pb-[80px] overflow-hidden rounded-b-3xl">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 rounded-b-3xl"
        style={{ backgroundImage: "url('./src/assets/images/hero-bg-2.jpg')" }}
      ></div>
      <div className="absolute inset-0 bg-primary opacity-90 z-0 rounded-b-3xl"></div>
      <div className="relative z-10 max-w-[1480px] mx-auto">
        <div className="container-fluid px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2">
              <div className="hero-content text-white">
                <div className="section-title">
                  <h3 className="text-accent uppercase font-semibold text-sm tracking-widest pl-5 relative mb-2.5 before:content-[''] before:absolute before:w-2 before:h-2 before:bg-accent before:rounded-full before:left-0 before:top-1/2 before:-translate-y-1/2">
                    Chào mừng đến với Repro Track
                  </h3>
                  <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-0">
                    Giúp bạn xây dựng gia đình trong <span>mơ!</span>
                  </h1>
                  <p className="mt-5 text-lg">
                    Chúng tôi cung cấp dịch vụ chăm sóc sinh sản chuyên nghiệp,
                    các phương pháp điều trị tiên tiến và sự hỗ trợ tận tình để
                    giúp bạn thực hiện ước mơ làm cha mẹ.
                  </p>
                </div>
                <div className="mt-8">
                  <ul className="flex flex-wrap gap-x-8 gap-y-2">
                    <li className="flex items-center gap-2 text-accent">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="text-accent text-xl"
                      />
                      Tỷ lệ thành công cao
                    </li>
                    <li className="flex items-center gap-2 text-accent">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="text-accent text-xl"
                      />
                      Chuyên gia hàng đầu
                    </li>
                    <li className="flex items-center gap-2 text-accent">
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        className="text-accent text-xl"
                      />
                      Hỗ trợ tài chính
                    </li>
                  </ul>
                </div>
                <div className="flex flex-wrap items-center gap-x-10 mt-10 border-t border-white/10 pt-10">
                  <div className="hero-btn">
                    <button
                      // onClick={() => dispatch(openBookingModal())}
                      className="relative inline-block bg-accent text-white text-base font-bold capitalize rounded-lg pl-8 pr-12 py-4 overflow-hidden transition-all duration-500 hover:bg-white hover:text-primary group"
                    >
                      Tư vấn ngay
                    </button>
                  </div>
                  <div className="flex items-center">
                    <p className="mr-5 font-bold capitalize">Xem Video</p>
                    <a
                      href="https://www.youtube.com/watch?v=Y-x0efG1seA"
                      className="popup-video w-12 h-12 flex items-center justify-center border-4 border-accent rounded-full group"
                    >
                      <FontAwesomeIcon
                        icon={faPlay}
                        className="text-accent text-lg ml-1 group-hover:text-white transition-colors"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="hero-img lg:ml-20 flex justify-end items-end">
                <figure>
                  <img src={heroImg} alt="" className="w-full mb-[-80px]" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
