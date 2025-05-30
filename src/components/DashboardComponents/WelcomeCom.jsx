import React from 'react'

const Welcome = () => {
  return (
    <div className='w-full bg-[#781454] h-[200px]  flex items-center justify-center'>
        <div className='flex flex-col justify-center items-center  h-full max-w-[1024px] w-full px-4'>
            <h1 className='text-4xl font-bold text-white'>Chào mừng đến với ReproTrack</h1>
            <p className='text-lg text-white mt-2'>Sức khoẻ của bạn là ưu tiên của chúng tôi</p>
        </div>  
    </div>
  )
}

export default Welcome