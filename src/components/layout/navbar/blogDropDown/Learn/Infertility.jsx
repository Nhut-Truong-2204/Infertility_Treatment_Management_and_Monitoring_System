import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../../../../assets/Capture.PNG";
import BlogHeader from "../../../../ui/Header";
const Infertility = () => {
  const navigate = useNavigate();
  const routes = {
    goHomePage: () => navigate("/"),
  };

  return (
    <>
      <BlogHeader title='Vô Sinh'/>

      {/* Overview */}
      <div className="flex justify-center mt-[100px] mb-[100px]">
        <div className="relative w-[1024px] ">
          <h1
            className="text-[40px] text-black"
            style={{ fontFamily: "Times New Roman, Times, serif" }}
          >
            Tổng Quan
          </h1>
          <img
            src={Image}
            alt="hiem-muon-nam"
            className="w-full h-[600px] mt-[20px]"
          />
          <p className="text-[25px] mt-[50px]">
            Nói một cách đơn giản, hiếm muộn nam là tình trạng người đàn ông
            đang ở độ tuổi sinh sản, đời sống tình dục bình thường nhưng lại
            không thể có con theo cách tự nhiên.
          </p>
        </div>
      </div>
    </>
  );
};

export default Infertility;
