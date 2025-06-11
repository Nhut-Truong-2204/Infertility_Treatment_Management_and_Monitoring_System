import React from "react";
import MainLayout from "../../components/layout/MainLayout";
import BookAppointmentSection from "../../components/DashboardComponents/BookAppointCom";
import Welcome from "../../components/DashboardComponents/WelcomeCom";
import Header from "../../components/layout/Header";
import ChromaGrid from "../../components/ui/ChromaGrid";

const DoctorItems = [
  {
    image: "https://th.bing.com/th/id/OIP.F7_AekOFoZ7NTUOUxlIBuQHaHa?rs=1&pid=ImgDetMain",
    title: "Sarah Johnson",
    subtitle: "Frontend Developer",
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/sarahjohnson"
  },

  {
    image: "https://down-id.img.susercontent.com/file/675a61a3739b40fdc774818e7535f05d",
    title: "Mike Chen",
    subtitle: "Backend Engineer",
    handle: "@mikechen",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://linkedin.com/in/mikechen"
  },
  {
    image: "https://th.bing.com/th/id/R.8d53a2ebfad3f832d1d55630d6d6149f?rik=2zd92Sc0dXvprQ&riu=http%3a%2f%2fyomorio.com%2fcdn%2fshop%2fproducts%2fplus-size-nurse-cosplay-costume-nurse-uniform-sexy-lingerie-for-women.jpg%3fv%3d1680082071%26width%3d1024&ehk=%2bfLn337DZf%2fyUpC%2fiLVwbjbILCbiVqQzXz6EjsIauJA%3d&risl=&pid=ImgRaw&r=0",
    title: "Sarah Johnson",
    subtitle: "Frontend Developer",
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/sarahjohnson"
  },
  {
    image: "https://dochoitinhyeu.org/upload/hinhanh/thumb/1399.jpg",
    title: "Mike Chen",
    subtitle: "Backend Engineer",
    handle: "@mikechen",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://linkedin.com/in/mikechen"
  },
  {
    image: "https://dochoitinhyeu.org/upload/hinhanh/thumb/1399.jpg",
    title: "Mike Chen",
    subtitle: "Backend Engineer",
    handle: "@mikechen",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://linkedin.com/in/mikechen"
  },

];


const HomePage = () => {
  return (
    <>
      <Header />


      <div className="w-screen h-20 bg-[#ff70a3] text-center text-2xl font-bold shadow-md flex justify-center items-center">
        Dòng chữ chạy ngang
      </div>
      <div className="w-screen h-200 flex items-center justify-center ">
        <div className="w-full h-full mx-auto   ">
          <ChromaGrid
            items={DoctorItems}
            radius={300}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
            className="px-10 py-20 w-[2000px]"
          />
        </div>
      </div>
      <div className=' w-screen  flex items-center justify-center '>
        <Welcome />
      </div>
      <div className=' w-screen flex items-center justify-center '>
        <BookAppointmentSection />
      </div>
    </>
  );
};

export default HomePage;
