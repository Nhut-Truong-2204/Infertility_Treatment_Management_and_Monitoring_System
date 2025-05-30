import React from 'react'
import MainLayout from '../../components/layout/MainLayout'
import BookAppointmentSection from '../../components/DashboardComponents/BookAppointCom'
import Welcome from '../../components/DashboardComponents/WelcomeCom'
const HomePage = () => {
  return (
    <div className='flex flex-col items-center  min-h-screen bg-gray-100'>
      <div className='bg-amber-500 w-screen  flex items-center justify-center '>
        <Welcome/>
      </div>
      <div className=' w-screen  flex items-center justify-center '>
        <BookAppointmentSection/>
      </div>
    </div>
  )
}

export default HomePage