import React from 'react'
import { IconBell, IconWallet, IconUserCircle } from "@tabler/icons-react";

const TopBar = () => {
  return (
    <>
        <header className='space-grotesk w-full h-[65px] flex justify-end items-center text-2xl border-1 border-[#3f495415] bg-[#020617]'>
            {/* <h1 className='text-[#AFFF9A] text-[24px] font-bold ml-5'>PLINKO GAME</h1> */}
            <div className='flex w-100 justify-evenly items-center'>
                <div className='text-white text-center'>
                    <p className='text-[16px] font-medium text-[#64748B]'>BALANCE</p>
                    <p className='font-bold text-[16px] text-[#AFFF9A]'>$1,250.00</p>
                </div>
                <div>
                    <button className='px-5 py-2 bg-[#39FE2B] font-bold rounded-md'>Deposit</button>
                </div>
                <IconBell size={28} className='text-[#94A3B8] '></IconBell>
                <IconWallet size={28} className='text-[#94A3B8]'></IconWallet>
                <IconUserCircle size={28} className='text-[#94A3B8]'></IconUserCircle>
            </div>
        </header>
    </>
  )
}

export default TopBar