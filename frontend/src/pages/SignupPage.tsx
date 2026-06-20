import FormRegister from "../components/FormRegister";

function SignupPage() {
  return (
    <div className='flex flex-col justify-center items-center px-4 py-6 sm:p-10'>
      <header className='text-center'>
        <h1 className='space-grotesk text-2xl sm:text-3xl text-[#AFFF9A] font-bold'>PLINKGO GAME</h1>
        <p className='inter text-xs sm:text-sm text-[#A2ACB9] font-light'>ESTABLISH ACCOUNT</p>
      </header>
      <FormRegister />
    </div>
  )
}

export default SignupPage