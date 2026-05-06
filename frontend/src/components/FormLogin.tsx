import { useState } from 'react';
import { IconFingerprint, IconLock, IconEye, IconEyeOff } from "@tabler/icons-react";
import { Link } from "react-router-dom";

function FormLogin() {

    const [isLock, setIsLock] = useState(true);

  return (
    <>
    <div className='inter flex justify-center mt-10'>
        <form action="" className='w-115 h-135 bg-[#0b1824] shadow-xl/30 p-10 rounded-lg'>
            <header className='text-center mb-4'>
                <h1 className='text-[#DCE6F5] text-2xl font-bold mb-3'>Secure Uplink</h1>
                <p className='text-[#94A3B8] text-sm font-light'>ENTER CREDENTIALS TO PROCEED</p>
            </header>
            <section className='my-10'>
                <label htmlFor="" className='space-grotesk text-[#94A3B8] text-sm font-light'>IDENTIFICATION</label> <br />
                <div className='flex items-center bg-black px-4 py-4 mt-2 mb-5 gap-5 rounded-lg'>
                    <IconFingerprint className='text-gray-600'></IconFingerprint>
                    <input type="email" placeholder="Enter your email" className='text-white bg-black w-full placeholder:text-gray-600 border-none focus:outline-none focus:ring-0 focus:border-transparent'/>
                </div>
                <label htmlFor="" className='space-grotesk text-[#94A3B8] text-sm font-light'>ACCESS KEY</label> <br />
                <div className='flex items-center bg-black px-4 py-4 mt-2 mb-5 gap-5 rounded-lg'>
                    <IconLock className='text-gray-600'></IconLock>
                    <input type={`${isLock ? "password" : "text"}`} placeholder='Enter your password' className='text-white bg-black w-full placeholder:text-gray-600 border-none focus:outline-none focus:ring-0 focus:border-transparent'/>
                    <button type="button" onClick={() => setIsLock(prev => !prev)}>
                    {isLock 
                        ? <IconEyeOff className='text-gray-600 cursor-pointer' /> 
                        : <IconEye className='text-gray-600 cursor-pointer' />
                    }
                    </button>
                </div>
            </section>
            <button type='submit' className='space-grotesk bg-[#39FE2B] w-full py-3 mb-10 font-bold rounded-md hover:bg-[#20df12] cursor-pointer'>INITIALIZE LOGIN</button>
            <section className='flex justify-center gap-5 text-sm w-full'>
                <p className='text-[#94A3B8] '>New to the Plinko Game?</p>
                <Link to={"/signup"} className='text-[#AFFF9A] font-bold hover:underline'>Establish Account</Link>
            </section>
        </form>
    </div>
    </>
  )
}

export default FormLogin