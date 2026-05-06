import React from 'react'
import FormRegister from "../components/FormRegister";

function SignupPage() {
  return (
    <div className='flex flex-col justify-center items-center p-10'>
      <header className='text-center'>
        <h1 className='space-grotesk text-3xl text-[#AFFF9A] font-bold'>PLINKGO GAME</h1>
        <p className='inter text-sm text-[#A2ACB9] font-light'>ESTABLISH ACCOUNT</p>
      </header>
      <FormRegister></FormRegister>
    </div>
  )
}

export default SignupPage