import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderImage from "../../../../../assets/Hiemmuonnamnu2.png";
import Paragraph from "../../../../ui/Paragraph";
import Header from "../../../../ui/Header";
const Infertility = () => {
  const navigate = useNavigate();
  const routes = {
    goHomePage: () => navigate("/"),
  };

  return (
    <>
      {/* Header */}
      <Header title="Vô Sinh"
      description="Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content  "
      imageSrc={HeaderImage}/>

        {/* Body */}
      <div className="flex justify-center items-center">
        <div className=" relative mt-[100px] mb-[100px]">
          <div className="relative w-[1024px] ">

            {/* content */}
            <Paragraph title="Title" content={"Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content ContentContent Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content Content"} />
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Infertility;
