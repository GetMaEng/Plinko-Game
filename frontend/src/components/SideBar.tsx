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

  const userId = Number(localStorage.getItem("userId"));
  const [user, setUser] = useState<User>();
  const [isOpen, setIsOpen] = useState(false);

  const getUserInfoById = async(userId: number) => {
    const response = await userApi.getUserInfoById(userId);
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
    getUserInfoById(userId);
  }, [userId]);

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className='lg:hidden fixed top-4 left-4 z-50 bg-[#0F172A] text-[#AFFF9A] p-2 rounded-md border border-[#1E293B]'
        aria-label="Toggle menu"
      >
        <div className='w-5 h-0.5 bg-[#AFFF9A] mb-1'></div>
        <div className='w-5 h-0.5 bg-[#AFFF9A] mb-1'></div>
        <div className='w-5 h-0.5 bg-[#AFFF9A]'></div>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className='lg:hidden fixed inset-0 bg-black/60 z-30'
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        inter fixed lg:static top-0 left-0 z-40
        w-64 lg:w-72 xl:w-90 min-h-screen bg-[#0F172A] p-4 lg:p-5
        flex flex-col justify-between
        transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div>
          <header className='mb-5 mt-2 lg:mt-0'>
            <h1 className='text-[#AFFF9A] text-xl lg:text-[24px] font-bold ml-2 lg:ml-5'>PLINKO GAME</h1>
          </header>
          <section className='bg-[#13212E] p-4 rounded-lg'>
            <div className='flex justify-start items-center gap-3 lg:gap-5'>
              <img
                src={user?.imageProfile}
                alt="Avatar"
                className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg"
              />
              <div>
                <p className='text-[#AFFF9A] font-bold text-sm lg:text-base'>{user?.username}</p>
              </div>
            </div>
          </section>
          <section>
            <div className='mt-8 lg:mt-10 text-[#94A3B8]'>
              {menuItems.map((item) => (
                <NavLink
                  to={item.link}
                  key={item.label}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 mb-1 rounded-md transition-colors text-sm lg:text-base
                    ${isActive
                      ? 'bg-[#1E293B] text-[#AFFF9A] border-r-4 border-[#AFFF9A]'
                      : 'text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#AFFF9A]'}`
                  }
                >
                  <item.icon size={22} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          </section>
        </div>
        <button
          onClick={async () => {
            await userApi.logoutUser();
            localStorage.removeItem("userId");
            localStorage.removeItem("token");
            setIsOpen(false);
          }}
          className='flex items-center gap-3 px-3 py-3 cursor-pointer text-[#94A3B8] hover:bg-[#1E293B] hover:text-[#AFFF9A] hover:rounded-md transition-colors text-sm lg:text-base'
        >
          <IconLogout size={22} />
          <NavLink to={'/login'}>Log out</NavLink>
        </button>
      </div>
    </>
  )
}

export default SideBar