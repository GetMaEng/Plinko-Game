import { IconPencil, IconUser, IconFingerprint, IconLock, IconShield, IconArrowNarrowLeft, IconBolt } from '@tabler/icons-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ModalImage from "./ModalImage";
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

function FormRegister() {
    const [currentImg, setCurrentImg] = useState(POKER_IMAGES[0]);
    const [tempSelectedImg, setTempSelectedImg] = useState(POKER_IMAGES[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='inter flex justify-center mt-10'>
        <form action="" className='w-115 h-210 bg-[#0b1824] shadow-xl/30 p-10 rounded-lg'>
            <header className='mb-4'>
                <h1 className='text-[#DCE6F5] text-2xl font-bold mb-3'>New Uplink</h1>
            </header>
            <section className='flex justify-center'>
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
            </section>
            <section className='my-10'>
                <label htmlFor="" className='space-grotesk text-[#94A3B8] text-sm font-light'>USERNAME</label> <br />
                <div className='flex items-center bg-black px-4 py-4 mt-2 mb-5 gap-5 rounded-lg'>
                    <IconUser className='text-gray-600'></IconUser>
                    <input type="email" placeholder="Enter your username" className='text-white bg-black w-full placeholder:text-gray-600 border-none focus:outline-none focus:ring-0 focus:border-transparent'/>
                </div>
                <label htmlFor="" className='space-grotesk text-[#94A3B8] text-sm font-light'>IDENTIFICATION</label> <br />
                <div className='flex items-center bg-black px-4 py-4 mt-2 mb-5 gap-5 rounded-lg'>
                    <IconFingerprint className='text-gray-600'></IconFingerprint>
                    <input type="email" placeholder="Enter your email" className='text-white bg-black w-full placeholder:text-gray-600 border-none focus:outline-none focus:ring-0 focus:border-transparent'/>
                </div>
                <label htmlFor="" className='space-grotesk text-[#94A3B8] text-sm font-light'>ACCESS KEY</label> <br />
                <div className='flex items-center bg-black px-4 py-4 mt-2 mb-5 gap-5 rounded-lg'>
                    <IconLock className='text-gray-600'></IconLock>
                    <input type='password' placeholder='Enter your password' className='text-white bg-black w-full placeholder:text-gray-600 border-none focus:outline-none focus:ring-0 focus:border-transparent'/>
                </div>
                <label htmlFor="" className='space-grotesk text-[#94A3B8] text-sm font-light'>CONFIRM ACCESS KEY</label> <br />
                <div className='flex items-center bg-black px-4 py-4 mt-2 mb-5 gap-5 rounded-lg'>
                    <IconShield className='text-gray-600'></IconShield>
                    <input type='password' placeholder='Enter your confirm password' className='text-white bg-black w-full placeholder:text-gray-600 border-none focus:outline-none focus:ring-0 focus:border-transparent'/>
                </div>
            </section>
            <button type='submit' className='space-grotesk bg-[#39FE2B] w-full py-3 mb-10 font-bold rounded-md hover:bg-[#20df12] cursor-pointer flex justify-center items-center gap-2'>INITIALIZE ACCOUNT <IconBolt></IconBolt> </button>
            <section className='flex justify-center text-sm w-full'>
                <Link to={"/login"} className='text-[#94A3B8] hover:underline'>
                    <div className='flex gap-2'>
                        <IconArrowNarrowLeft></IconArrowNarrowLeft>
                        <p>Return to Login</p>
                    </div>
                </Link>
            </section>
        </form>
        {isModalOpen && <ModalImage 
            setCurrentImg={setCurrentImg} 
            tempSelectedImg={tempSelectedImg} 
            setIsModalOpen={setIsModalOpen} 
            setTempSelectedImg={setTempSelectedImg}
            currentTime={currentImg}>
        </ModalImage>
        }
    </div>
  )
}

export default FormRegister