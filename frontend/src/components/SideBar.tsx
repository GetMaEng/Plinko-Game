import { useState, useEffect } from 'react'
import { IconDeviceGamepad2, IconHistory, IconWallet, IconChartBar, IconSettings, IconLogout } from "@tabler/icons-react";
import { NavLink } from 'react-router-dom';
import type { User } from "../types/User"
import * as userApi from "../api/user";

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

  const [user, setUser] = useState<User>();

  // API call getMe - user information
  const getMe = async () => {
    const response = await userApi.getMe();
    if (response.success) {
      setUser({
        username: response.data.username,
        email: response.data.email,
        imageProfile: response.data.imageProfile,
        userId: response.data.userId,
      })
    }
  }

  useEffect(() => {
    getMe();
  }, []);

  return (
    <>
      <div className='inter w-90 min-h-screen bg-[#0F172A] p-5 flex flex-col justify-between'>
        <div>
          <header className='mb-5'>
            <h1 className='text-[#AFFF9A] text-[24px] font-bold ml-5'>PLINKO GAME</h1>
          </header>
          <section className='bg-[#13212E] p-5 rounded-lg'>
            <div className='flex justify-start items-center gap-5'>
              <img 
                src={user?.imageProfile} 
                alt="Avatar" 
                className="w-12 h-12 rounded-lg"
                />
              <div>
                <p className='text-[#AFFF9A] font-bold'>{user?.username}</p>
              </div>
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