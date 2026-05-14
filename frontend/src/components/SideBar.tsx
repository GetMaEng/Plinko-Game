import React from 'react'
import { IconUserCircle, IconDeviceGamepad2, IconHistory, IconWallet, IconChartBar, IconSettings, IconLogout } from "@tabler/icons-react";
import { NavLink } from 'react-router-dom';

type MenuItem = {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  link: string;
};

const menuItems: MenuItem[] = [
  { label: "Play", icon: IconDeviceGamepad2, link: "/main-plinko-game" },
  { label: "History", icon: IconHistory, link: "/history-plinko" },
  { label: "Wallet", icon: IconWallet, link: "/wallet" },
  { label: "Leaderboard", icon: IconChartBar, link: "/leaderboard" },
  { label: "Settings", icon: IconSettings, link: "/setting" },
];

const SideBar = () => {
  return (
    <>
      <div className='inter w-90 min-h-screen bg-[#0F172A] p-5 flex flex-col justify-between'>
        <div>
          <header className='mb-5'>
            <h1 className='text-[#AFFF9A] text-[24px] font-bold ml-5'>PLINKO GAME</h1>
          </header>
          <section className='bg-[#13212E] p-5 rounded-lg'>
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
          </section>
          <section className=''>
            <div className='mt-10 text-[#94A3B8]'>
              {menuItems.map((item) => {
                return (
                  <>
                    <NavLink to={item.link} key={item.label} className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-3 mb-1 rounded-md transition-colors
                      ${isActive 
                        ? 'bg-[#1E293B] text-[#AFFF9A] border-r-4 border-[#AFFF9A]' 
                        : 'text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#AFFF9A]'}`
                    }>
                      <item.icon size={24}></item.icon>
                      <span>{item.label}</span>
                    </NavLink> 
                  </>
                );
              })}
            </div>
          </section>
        </div>
        <div className='flex items-center gap-3 px-3 py-3 cursor-pointer text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#AFFF9A] hover:rounded-md transition-colors'>
          <IconLogout size={24}></IconLogout>
          <NavLink to={'/login'}>Log out</NavLink>
        </div> 
      </div>
    </>
  )
}

export default SideBar