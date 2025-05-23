import React from 'react'
import { useNavigate } from "react-router-dom";
import BlogHeader from "../../../../ui/Header";
const BarrenFemale = () => {

  const navigate = useNavigate();
  const routes = {
    goHomePage: () => navigate("/"),
  };
  return (
    <>
      <BlogHeader title="Hiếm Muộn ở Nữ" />

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
  )
}

export default BarrenFemale