import React from 'react'
import { IconUserCircle, IconDeviceGamepad2, IconHistory, IconWallet, IconChartBar, IconSettings, IconLogout } from "@tabler/icons-react";

type MenuItem = {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const menuItems: MenuItem[] = [
  { label: "Play", icon: IconDeviceGamepad2 },
  { label: "History", icon: IconHistory },
  { label: "Wallet", icon: IconWallet },
  { label: "Leaderboard", icon: IconChartBar },
  { label: "Settings", icon: IconSettings },
];

const SideBar = () => {
  return (
    <>
      <div className='inter w-75 h-screen bg-[#0F172A] p-5 '>
        <header className='bg-[#13212E] p-5 rounded-lg'>
          <div className='flex justify-start items-center gap-5'>
            <IconUserCircle size={48} className='text-white'></IconUserCircle>
            <div>
              <p className='text-[#AFFF9A] font-bold'>Commander</p>
              <p className='text-[#64748B]'>Level 42 VIP</p>
            </div>
          </div>
          <div className='mt-4 flex justify-center'>
            <button className='px-10 py-2 bg-[#1E2D3D] text-[#AFFF9A] rounded-md border-1 border-[#AFFF9A] font-bold cursor-pointer'>UPGRADE RANK</button>
          </div>
        </header>
        <div className='mt-10 text-[#94A3B8]'>
          {menuItems.map((item) => {
            return (
              <>
                <div key={item.label} className='flex items-center gap-3 px-3 py-3 cursor-pointer hover:bg-[#1E293B] hover:rounded-md'>
                  <item.icon size={24}></item.icon>
                  <span>{item.label}</span>
                </div> 
              </>
            );
          })}
        </div>
        <div className='mt-54 flex items-center gap-3 px-3 py-3 cursor-pointer text-[#94A3B8] hover:bg-[#1E293B] hover:rounded-md'>
          <IconLogout size={24}></IconLogout>
          <span>Log out</span>
        </div> 
      </div>
    </>
  )
}

export default SideBar