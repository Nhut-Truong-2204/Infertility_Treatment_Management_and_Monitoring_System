import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../../../../../assets/HiemmuonNam3.png";
import Image from "../../../../ui/Image";
import Paragraph from "../../../../ui/Paragraph";
import Header from "../../../../ui/Header";

const BarrenMale = () => {
  const navigate = useNavigate();
  const routes = {
    goHomePage: () => navigate("/"),
  };

  return (
    <>
        {/* Header */}
      <Header title="Hiếm Muộn ở Nam"
      description="Nói một cách đơn giản, hiếm muộn nam là tình trạng người đàn ông đang ở độ tuổi sinh sản, đời sống tình dục bình thường (không sử dụng biện pháp an toàn) nhưng lại không thể có con theo cách tự nhiên."
      imageSrc={image}/>

        {/* Body */}
      <div className="flex justify-center items-center">
        <div className=" relative mt-[100px] mb-[100px]">
          <div className="relative w-[1024px] ">

            {/* content */}
            <Paragraph title="Title" content={"Nói một cách đơn giản, hiếm muộn nam là tình trạng người đàn ông đang ở độ tuổi sinh sản, đời sống tình dục bình thường (không sử dụng biện pháp an toàn) nhưng lại không thể có con theo cách tự nhiên."} />
            
          </div>
        </div>
      </div>
    </>
  );
};

export default BarrenMale;
