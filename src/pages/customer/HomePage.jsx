import React from "react";
import MainLayout from "../../components/layout/MainLayout";
import BookAppointmentSection from "../../components/DashboardComponents/BookAppointCom";
import Welcome from "../../components/DashboardComponents/WelcomeCom";
import Header from "../../components/layout/Header";
const HomePage = () => {
  return (
    <>
    <Header/>
    <div className=' w-screen  flex items-center justify-center '>
        <Welcome/>
      </div>
    <div className=' w-screen flex items-center justify-center '>
        <BookAppointmentSection/>
      </div>
    </>
  );
};

export default HomePage;
