import React from "react";
import { useNavigate } from "react-router-dom";
import image from "../../../../../assets/Capture.PNG";
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
      <Header title="Hiếm Muộn ở Nam"
      description="There are many different types of cancer, including cancers that affect your breasts and genitals. Cancer can often be cured if you find it early and get treatment – that’s why it’s so important to get regular checkups and cancer screenings. Here’s more info on certain types of reproductive cancers and how to stay healthy."
      imageSrc={image}/>

      {/* Overview */}
      <div className="flex justify-center items-center">
        <div className=" relative mt-[100px] mb-[100px]">
          <div className="relative w-[1024px] ">

            <Image src={image}
              alt="hiem-muon-nam"
              className="w-full mt-[20px]" />
            <Paragraph title="Tổng Quan" content={""} />
            <Paragraph title="Hiếm muộn ở nam giới là gì?" content={"Nói một cách đơn giản, hiếm muộn nam là tình trạng người đàn ông đang ở độ tuổi sinh sản, đời sống tình dục bình thường (không sử dụng biện pháp an toàn) nhưng lại không thể có con theo cách tự nhiên."} />
            <Paragraph title="Có những loại hiếm muộn nào?" content={"Có hai loại hiếm muộn: Nguyên phát: Các cặp vợ chồng chưa từng có con dù có giao hợp thường xuyên và không sử dụng biện pháp tránh thai nào trong vòng 1 năm. Thứ phát: Các cặp vợ chồng từng có thai, hoặc có con nhưng sau đó quan hệ tự nhiên không sử dụng biện pháp tránh thai nhưng vẫn không thể có con."} />

          </div>
        </div>
      </div>
    </>
  );
};

export default BarrenMale;
