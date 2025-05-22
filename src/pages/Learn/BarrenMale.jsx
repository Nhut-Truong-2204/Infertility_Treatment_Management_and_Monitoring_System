import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const BarrenMale = () => {
  return (
    <>
      <div className="flex items-center justify-center bg-[#2750aa] h-[200px] mt-[200px] mb-[40px]">
        <div className="relative w-[1024px] text-white ">
          <p className="hover:underline">
            <ArrowBackIosIcon fontSize="inherit" />
            Trở về Trang Chủ
          </p>
          <p
            className="text-[70px] text-white"
            style={{ fontFamily: "Times New Roman, Times, serif" }}
          >
            Hiếm Muộn ở Nam
          </p>
        </div>
      </div>

      {/* Overview */}
      <div className="flex justify-center">
        <div className="relative w-[1024px] ">
          <h1
            className="text-[40px] text-black"
            style={{ fontFamily: "Times New Roman, Times, serif" }}
          >
            Tổng quan
          </h1>
          <img src="Infertility_Treatment_Management_and_Monitoring_System/src/assets/Capture.PNG" />
          <p className="text-[30px] mt-[50px]">
            Nói một cách đơn giản, hiếm muộn nam là tình trạng người đàn ông đang ở độ tuổi sinh sản, đời sống tình dục bình thường nhưng lại không thể có con theo cách tự nhiên.
          </p>
        </div>
      </div>
    </>
  );
};

export default BarrenMale;
