import React from 'react'
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'

function WalletPage() {
  return (
    <>
      <div className="flex">
        <SideBar></SideBar>
        <div className="w-full">
          <TopBar></TopBar>
          <header>
            <h1 className='space-grotesk text-white text-4xl font-medium'>Wallet Summary</h1>
            <p className='inter text-[#A2ACB9] font-light'>Manage your kinetic assets and transaction history</p>
          </header>
          <section>
            <div className='space-grotesk flex gap-5'>
              <div className='flex justify-center items-center bg-[#13212E] w-55 h-25 border-l-4 border-[#AFFF9A] rounded-lg'>
                <div>
                    <p className='inter text-[#A2ACB9] text-xs'>AVAILABLE BALANCE</p>
                    <h2 className='text-white text-3xl font-medium'>$1,250.00</h2>
                </div>
              </div>
              <div className='flex justify-center items-center bg-[#13212E] w-55 h-25  border-l-4 border-[#FFC965] rounded-lg'>
                <div>
                  <p className='inter text-[#A2ACB9] text-xs'>TOTAL EARNINGS</p>
                  <h2 className='text-white text-3xl font-medium'>$1,250.00</h2>
                </div>
              </div>
              <div className='flex justify-center items-center bg-[#13212E] w-55 h-25  border-l-4 border-[#FF7351] rounded-lg'>
                <div>
                  <p className='inter text-[#A2ACB9] text-xs'>ACTIVE STAKES</p>
                  <h2 className='text-white text-3xl font-medium'>$1,250.00</h2>
                </div>
              </div>
            </div>
          </section>
          <section className='w-175 mt-10'>
            <header className='space-grotesk py-5 flex justify-between items-center bg-[#09141F]'>
              <p className='ml-4 text-white font-medium'>RECENT EARNING</p>
              <p className='mr-4 text-[#AFFF9A] text-xs font-light'>VIEW ALL</p>
            </header>
            <table className='w-175 border-separate border-spacing-y-0 bg-[#09141F]'>
              <thead className='space-grotesk text-[#A2ACB9] font-light bg-[#13212E]'>
                <tr>
                  <th className="text-left px-4 py-5">METHOD</th>
                  <th className="text-left px-4 py-5">TIME</th>
                  <th className="text-left px-4 py-5">MONEY</th>
                </tr>
              </thead>
              <tr className='inter font-light'>
                <td className='text-white px-4 py-5'>Bank Transfer</td>
                <td className='text-[#A2ACB9] px-4 py-5'>2 mins ago</td>
                <td className='space-grotesk text-[#39FE2B] px-4 py-5 font-medium'>+$150.00</td>
              </tr>
              <tr className='inter font-light'>
                <td className='text-white px-4 py-5'>Bank Transfer</td>
                <td className='text-[#A2ACB9] px-4 py-5'>2 mins ago</td>
                <td className='space-grotesk text-[#39FE2B] px-4 py-5 font-medium'>+$150.00</td>
              </tr>
              <tr className='inter font-light'>
                <td className='text-white px-4 py-5'>Bank Transfer</td>
                <td className='text-[#A2ACB9] px-4 py-5'>2 mins ago</td>
                <td className='space-grotesk text-[#39FE2B] px-4 py-5 font-medium'>+$150.00</td>
              </tr>
            </table>
          </section>
        </div>
      </div>
    </>
  )
}

export default WalletPage