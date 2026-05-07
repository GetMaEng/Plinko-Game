import React from 'react'
import SideBar from '../components/SideBar';
import TopBar from '../components/TopBar';
import { IconTrendingUp, IconStairs } from "@tabler/icons-react";

function HistoryPage() {
  return (
    <>
      <div className="flex">
        <SideBar></SideBar>
        <div className="w-full">
          <TopBar></TopBar>
          <header className='ml-10 my-10'>
            <h1 className='space-grotesk text-white text-4xl font-medium'>Game History</h1>
            <p className='inter text-[#A2ACB9] font-light'>Review your history precision across all precision-gaming <br /> protocols.</p>
          </header>
          <div className='flex justify-center'>
            {/* History Bet Amount */}
            <section className='overflow-hidden rounded-lg'>
              <table className='w-280 border-collapse border-spacing-y-0 bg-[#09141F] rounded-lg'>
                  <thead className='space-grotesk text-[#A2ACB9] font-light bg-[#13212E]'>
                    <tr className='text-center'>
                      <th className="text-left px-4 py-5">GANME NAME</th>
                      <th className="px-4 py-5">TIME</th>
                      <th className="px-4 py-5">BET AMOUNT</th>
                      <th className="px-4 py-5">MULTIPLE</th>
                      <th className="px-4 py-5">PROFIT/LOSS</th>
                    </tr>
                  </thead>
                  <tr className='inter text-center font-light border-b border-[#13212E]'>
                    <td className='text-left text-white px-4 py-5'>Plinko Game</td>
                    <td className='text-[#A2ACB9] px-4 py-5'>2 mins ago</td>
                    <td className='text-white px-4 py-5'>$10.00</td>
                    <td className='text-white px-4 py-5 flex justify-center'>
                      <div className='border-1 border-[#F5D900] bg-[#F5D900] shadow-[0_0_10px_#F5D900,0_0_20px_#F5D900] text-black text-center text-xs font-bold w-13 px-2 py-1 rounded-xl'>x0.3</div>
                    </td>
                    <td className='space-grotesk text-[#39FE2B] px-4 py-5 font-medium'>+$150.00</td>
                  </tr>
                  <tr className='inter text-center font-light border-b border-[#13212E]'>
                    <td className='text-left text-white px-4 py-5'>Plinko Game</td>
                    <td className='text-[#A2ACB9] px-4 py-5'>2 mins ago</td>
                    <td className='text-white px-4 py-5'>$10.00</td>
                    <td className='text-white px-4 py-5 flex justify-center'>
                      <div className='border-1 border-[#F5D900] bg-[#F5D900] shadow-[0_0_10px_#F5D900,0_0_20px_#F5D900] text-black text-center text-xs font-bold w-13 px-2 py-1 rounded-xl'>x0.3</div>
                    </td>
                    <td className='space-grotesk text-[#39FE2B] px-4 py-5 font-medium'>+$150.00</td>
                  </tr>
                  <tr className='inter text-center font-light border-b border-[#13212E]'>
                    <td className='text-left text-white px-4 py-5'>Plinko Game</td>
                    <td className='text-[#A2ACB9] px-4 py-5'>2 mins ago</td>
                    <td className='text-white px-4 py-5'>$10.00</td>
                    <td className='text-white px-4 py-5 flex justify-center'>
                      <div className='border-1 border-[#F5D900] bg-[#F5D900] shadow-[0_0_10px_#F5D900,0_0_20px_#F5D900] text-black text-center text-xs font-bold w-13 px-2 py-1 rounded-xl'>x0.3</div>
                    </td>
                    <td className='space-grotesk text-[#39FE2B] px-4 py-5 font-medium'>+$150.00</td>
                  </tr>
                  <tr className='inter text-center font-light border-b border-[#13212E]'>
                    <td className='text-left text-white px-4 py-5'>Plinko Game</td>
                    <td className='text-[#A2ACB9] px-4 py-5'>2 mins ago</td>
                    <td className='text-white px-4 py-5'>$10.00</td>
                    <td className='text-white px-4 py-5 flex justify-center'>
                      <div className='border-1 border-[#F5D900] bg-[#F5D900] shadow-[0_0_10px_#F5D900,0_0_20px_#F5D900] text-black text-center text-xs font-bold w-13 px-2 py-1 rounded-xl'>x0.3</div>
                    </td>
                    <td className='space-grotesk text-[#39FE2B] px-4 py-5 font-medium'>+$150.00</td>
                  </tr>
                  <tr className='inter text-center font-light border-b border-[#13212E]'>
                    <td className='text-left text-white px-4 py-5'>Plinko Game</td>
                    <td className='text-[#A2ACB9] px-4 py-5'>2 mins ago</td>
                    <td className='text-white px-4 py-5'>$10.00</td>
                    <td className='text-white px-4 py-5 flex justify-center'>
                      <div className='border-1 border-[#F5D900] bg-[#F5D900] shadow-[0_0_10px_#F5D900,0_0_20px_#F5D900] text-black text-center text-xs font-bold w-13 px-2 py-1 rounded-xl'>x0.3</div>
                    </td>
                    <td className='space-grotesk text-[#39FE2B] px-4 py-5 font-medium'>+$150.00</td>
                  </tr>
                </table>
            </section>
          </div>
          <section className='flex justify-center mt-10 pb-10'>
              <div className='space-grotesk w-full flex gap-10 px-15'>
                <div className='flex justify-start items-center bg-[#13212E] w-full h-30 rounded-lg'>
                  <div className='ml-10'>
                      <p className='inter text-[#A2ACB9] text-xs'>TOTAL VOLUME</p>
                      <h2 className='text-white text-3xl font-medium leading-10'>$12,450.00</h2>
                      <div className='flex items-center text-[#AFFF9A] font-bold text-xs'>
                        <IconTrendingUp></IconTrendingUp>
                        <p>+12.5% this week</p>
                      </div>
                  </div>
                </div>
                <div className='flex justify-start items-center bg-[#13212E] w-full h-30 rounded-lg'>
                  <div className='ml-10'>
                    <p className='inter text-[#A2ACB9] text-xs'>NET RESULT</p>
                    <h2 className='text-[#AFFF9A] text-3xl font-medium'>$1,280.45</h2>
                    <div className='flex items-center text-[#A2ACB9] font-bold text-xs'>
                        <IconStairs></IconStairs>
                        <p>142 Total Rounds</p>
                      </div>
                  </div>
                </div>
                <div className='flex justify-start items-center bg-[#13212E] w-full h-30 rounded-lg'>
                  <div className='ml-10'>
                    <p className='inter text-[#A2ACB9] text-xs'>FAVORITE PROTOCOL</p>
                    <h2 className='text-white text-3xl font-medium'>Plinko Game</h2>
                    <p className='inter text-[#A2ACB9] text-xs'>100% of total activity</p>
                  </div>
                </div>
              </div>
            </section>
        </div>
      </div>
    </>
  )
}

export default HistoryPage;