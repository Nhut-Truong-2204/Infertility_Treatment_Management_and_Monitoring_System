import React from "react";
import MainLayout from "../../components/layout/MainLayout";
import BookAppointmentSection from "../../components/DashboardComponents/BookAppointCom";
import Welcome from "../../components/DashboardComponents/WelcomeCom";
import Header from "../../components/layout/Header";
import ChromaGrid from "../../components/ui/ChromaGrid";
import ScrollVelocity from "../../components/ui/ScrollVelocity";

const DoctorItems = [
  {
    image:
      "https://as1.ftcdn.net/jpg/01/16/15/00/1000_F_116150015_ObkGFoSkvmhXA6KXAZWCLZFfOVVfWD1k.jpg",
    title: "Nguyễn Văn An",
    subtitle: "Bác sĩ Nội tổng quát",
    handle: "@nguyenvanan",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://vi.wikipedia.org/wiki/Nguyễn_Văn_An",
  },
  {
    image:
      "https://img.freepik.com/premium-photo/young-vietnamese-doctor_274689-13801.jpg",
    title: "Trần Thị Bình",
    subtitle: "Bác sĩ Sản phụ khoa",
    handle: "@tranthibinh",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://vi.wikipedia.org/wiki/Trần_Thị_Bình",
  },
  {
    image:
      "https://thumbs.dreamstime.com/b/cheerful-middle-aged-doctor-portrait-his-assistant-background-52272871.jpg",
    title: "Lê Minh Đức",
    subtitle: "Bác sĩ Nhi",
    handle: "@leminhduc",
    borderColor: "#8B5CF6",
    gradient: "linear-gradient(145deg, #8B5CF6, #000)",
    url: "https://vi.wikipedia.org/wiki/Lê_Minh_Đức",
  },
  {
    image:
      "https://th.bing.com/th/id/OIP.Au578sTDf_rqROEIopRoJgAAAA?w=400&h=400&rs=1&pid=ImgDetMain&cb=idpwebpc2",
    title: "Phan Thị Hồng",
    subtitle: "Bác sĩ Tai – Mũi – Họng",
    handle: "@phanthihong",
    borderColor: "#F59E0B",
    gradient: "linear-gradient(180deg, #F59E0B, #000)",
    url: "https://vi.wikipedia.org/wiki/Phan_Thị_Hồng",
  },
];


const HomePage = () => {
  return (
    <>
      <Header />

      <div className="w-screen h-150 flex items-center justify-center ">
        <div className="relative w-full h-full mx-auto   ">
          <ChromaGrid
            items={DoctorItems}
            radius={300}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
            className="px-10 py-20 w-[2000px]"
          >
          </ChromaGrid>
        </div>
      </div>
      <div className=" w-screen  flex items-center justify-center ">
        <Welcome />
      </div>
      <div className=" w-screen flex items-center justify-center ">
        <BookAppointmentSection />
      </div>
    </>
  );
};

export default HomePage;
