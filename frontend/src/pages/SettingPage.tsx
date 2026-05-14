import { useState } from 'react'
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'
import { IconUserCircle, IconPencil, IconShieldCheckeredFilled, IconArrowNarrowRight } from "@tabler/icons-react";
import ModalImage from "../components/ModalImage";
import ToggleSwitch from '../components/ToggleSwitch';
import avatar1 from '../images/avatar-1.PNG';
import avatar2 from '../images/avatar-2.PNG';
import avatar3 from '../images/avatar-3.PNG';
import avatar4 from '../images/avatar-4.PNG';
import avatar5 from '../images/avatar-5.PNG';
import avatar6 from '../images/avatar-6.PNG';
import avatar7 from '../images/avatar-7.PNG';

const POKER_IMAGES = [
  avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7
];

function SettingPage() {

  const [currentImg, setCurrentImg] = useState(POKER_IMAGES[0]);
  const [tempSelectedImg, setTempSelectedImg] = useState(POKER_IMAGES[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [enabled, setEnabled] = useState(true);

  return (
     <>
      <div className="flex">
        <SideBar></SideBar>
        <div className="w-full">
          <TopBar></TopBar>
          <header className='ml-10 my-10'>
            <h1 className='space-grotesk text-white text-4xl font-medium'>Account System</h1>
            <p className='inter text-[#A2ACB9] font-light'>Configure your tactical interface and security protocols.</p>
          </header>
          <div className='flex justify-center gap-10'>
          {/* Profile Identity */}
          <section className='inter bg-[#09141F] w-150 p-7 rounded-sm border-l-3 border-l-[#aeff9a50]'>
            <header className='text-[#AFFF9A] flex items-center gap-3 mb-5'>
              <IconUserCircle></IconUserCircle>
              <h2 className='text-xl font-bold'>Profile Identity</h2>
            </header>
            <div className='flex gap-10'>
              <div className="relative w-28 h-28 border-4 border-[#aeff9a50] rounded-lg overflow-visible shadow-2xl">
                <img 
                src={currentImg} 
                alt="Avatar" 
                className="w-full h-auto object-cover rounded-lg"
                />
                
                {/* Edit Button - Bottom Right */}
                <button type='button'
                onClick={() => setIsModalOpen(true)}
                className="absolute bottom-0 right-0 bg-[#AFFF9A] hover:bg-[#85bd77] text-black p-1 rounded-full shadow-lg transition-transform hover:scale-110"
                >
                <IconPencil size={18}></IconPencil>
                </button>
              </div>
              <div className='w-[70%]'>
                <label htmlFor="" className='text-[#94A3B8] text-xs font-bold'>USERNAME</label> <br />
                <div className='bg-black px-4 py-4 mt-2 mb-5 gap-5 rounded-lg'>
                    <input type="email" placeholder="Enter your username" className='text-white w-full placeholder:text-gray-600 border-none focus:outline-none focus:ring-0 focus:border-transparent'/>
                </div>
                <label htmlFor="" className='text-[#94A3B8] text-xs font-bold'>EMAIL ADDRESS</label> <br />
                <div className='bg-black px-4 py-4 mt-2 mb-5 gap-5 rounded-lg'>
                    <input type="email" placeholder="Enter your email" className='text-white w-full placeholder:text-gray-600 border-none focus:outline-none focus:ring-0 focus:border-transparent'/>
                </div>
                <div className='flex justify-end'>
                  <button className='text-[#AFFF9A] bg-[#192735] px-8 py-2 font-bold rounded-xs cursor-pointer hover:bg-[#16222e] '>Edit</button>
                </div>
              </div>
            </div>
          </section>
          {/* Security Matrix */}
          <section className='inter bg-[#09141F] w-100 p-7 rounded-sm'>
            <header className='text-[#AFFF9A] flex items-center gap-3 mb-5'>
              <IconShieldCheckeredFilled></IconShieldCheckeredFilled>
              <h2 className='text-xl font-bold'>Security Matrix</h2>
            </header>
            <div className='flex justify-between items-center bg-[#13212E] px-4 py-4 rounded-lg mb-10'>
              <div className=''>
                <h2 className='text-white font-bold'>Two-Factor Auth</h2>
                <p className='text-[#94A3B8] text-sm'>Secure your vault access</p>
              </div>
              <ToggleSwitch enabled={enabled} onToggle={() => setEnabled(!enabled)}></ToggleSwitch>
            </div>
            <button className='w-full flex justify-between bg-black rounded-lg px-4 py-5 cursor-pointer'>
              <h2 className='text-white font-bold'>Reset Password</h2>
              <IconArrowNarrowRight className='text-[#94A3B8]'></IconArrowNarrowRight>
            </button>
          </section>
        </div>
        </div>
        {isModalOpen && <ModalImage 
            setCurrentImg={setCurrentImg} 
            tempSelectedImg={tempSelectedImg} 
            setIsModalOpen={setIsModalOpen} 
            setTempSelectedImg={setTempSelectedImg}
            currentTime={currentImg}>
        </ModalImage>
        }
      </div>
    </>
  )
}

export default SettingPage