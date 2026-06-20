import React from 'react'
import FormLogin from "../components/FormLogin";

function LoginPage() {
  return (
    <>
    <header className='h-[55px] sm:h-[65px] flex justify-between items-center'>
      <div>
        <h1 className='text-[#AFFF9A] text-lg sm:text-[24px] font-bold ml-3 sm:ml-5'>PLINKO GAME</h1>
      </div>
      <div className='flex items-center gap-2 sm:gap-5 mr-3 sm:mr-5'>
        <p className='inter text-[#A2ACB9] text-xs sm:text-sm hidden xs:block sm:block'>SYSTEM STATUS: NOMINAL</p>
        <div className='w-2 h-2 rounded-full bg-[#AFFF9A] shadow-[0_0_100px_#AFFF9A] blur-[1px]'></div>
      </div>
    </header>
    <FormLogin />
    </>
  )
}

export default LoginPage