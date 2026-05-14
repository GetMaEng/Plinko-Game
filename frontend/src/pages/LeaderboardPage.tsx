import React from 'react'
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'

function LeaderboardPage() {
  return (
    <>
      <div className="flex">
        <SideBar></SideBar>
        <div className="w-full">
          <TopBar></TopBar>
          <header className='ml-10 my-10'>
            <h1 className='space-grotesk text-white text-4xl font-bold'>HALL OF LEGENDS</h1>
            <div className='w-20 h-1 mt-2 bg-[#39FE2B]'></div>
          </header>
          <div className='flex justify-center gap-15 px-10'>
            {/* Leaderboard */}
            <section className='w-175 h-full overflow-x-auto avatar-grid'>
              <table className='w-200 border-collapse border-spacing-y-0 bg-[#09141F] rounded-lg'>
                  <thead className='space-grotesk text-[#A2ACB9] font-light bg-[#13212E]'>
                    <tr className='text-center'>
                      <th className="px-4 py-5">RANK</th>
                      <th className="text-left px-4 py-5">PLAYER</th>
                      <th className="px-4 py-5">TOTAL WAGERED</th>
                      <th className="px-4 py-5">TOTAL DEPOSIT</th>
                      <th className="px-4 py-5">HIGHEST PROFIT</th>
                    </tr>
                  </thead>
                  <tr className='space-grotesk text-center font-light border-b border-[#13212E]'>
                    <td className='py-5'>
                      <div className='flex justify-center items-center'>
                        <div className='bg-[#39FE2B] w-10 h-10 flex justify-center items-center font-bold rounded-sm'>
                          01
                        </div>
                      </div>
                    </td>
                    <td className='text-[#AFFF9A] text-left text-xl font-bold px-4 py-5'>Xenon_Pulse</td>
                    <td className='text-[#A2ACB9] text-xl px-4 py-5'>$1,450,290.00</td>
                    <td className='text-[#A2ACB9] text-xl px-4 py-5'>$10,000.00</td>
                    <td className='space-grotesk text-[#39FE2B] px-4 py-5 font-medium'>+$150.00</td>
                  </tr>
                  <tr className='inter text-center font-light border-b border-[#13212E]'>
                    <td className='py-5'>
                      <div className='flex justify-center items-center'>
                        <div className='bg-[#FEB700] w-10 h-10 flex justify-center items-center font-bold rounded-sm'>
                          02
                        </div>
                      </div>
                    </td>
                    <td className='text-[#DCE6F5] text-left  text-xl font-bold px-4 py-5'>Xenon_Pulse</td>
                    <td className='text-[#A2ACB9] text-xl px-4 py-5'>$1,450,290.00</td>
                    <td className='text-[#A2ACB9] text-xl px-4 py-5'>$10,000.00</td>
                    <td className='space-grotesk text-[#39FE2B] px-4 py-5 font-medium'>+$150.00</td>
                  </tr>
                  <tr className='inter text-center font-light border-b border-[#13212E]'>
                    <td className='py-5'>
                      <div className='flex justify-center items-center'>
                        <div className='bg-[#334958] text-[#A2ACB9] w-10 h-10 flex justify-center items-center font-bold rounded-sm'>
                          03
                        </div>
                      </div>
                    </td>
                    <td className='text-[#DCE6F5] text-left text-xl font-bold px-4 py-5'>Xenon_Pulse</td>
                    <td className='text-[#A2ACB9] text-xl px-4 py-5'>$1,450,290.00</td>
                    <td className='text-[#A2ACB9] text-xl px-4 py-5'>$10,000.00</td>
                    <td className='space-grotesk text-[#39FE2B] px-4 py-5 font-medium'>+$150.00</td>
                  </tr>
                  <tr className='inter text-center font-light border-b border-[#13212E]'>
                    <td className='py-5'>
                      <div className='flex justify-center items-center'>
                        <div className='bg-[#192735] text-[#A2ACB9] w-10 h-10 flex justify-center items-center font-bold rounded-sm'>
                          04
                        </div>
                      </div>
                    </td>
                    <td className='text-[#DCE6F5] text-left text-xl font-bold px-4 py-5'>Xenon_Pulse</td>
                    <td className='text-[#A2ACB9] text-xl px-4 py-5'>$1,450,290.00</td>
                    <td className='text-[#A2ACB9] text-xl px-4 py-5'>$10,000.00</td>
                    <td className='space-grotesk text-[#39FE2B] px-4 py-5 font-medium'>+$150.00</td>
                  </tr>
                  <tr className='inter text-center font-light border-b border-[#13212E]'>
                    <td className='py-5'>
                      <div className='flex justify-center items-center'>
                        <div className='bg-[#192735] text-[#A2ACB9] w-10 h-10 flex justify-center items-center font-bold rounded-sm'>
                          05
                        </div>
                      </div>
                    </td>
                    <td className='text-[#DCE6F5] text-left text-xl font-bold px-4 py-5'>Xenon_Pulse</td>
                    <td className='text-[#A2ACB9] text-xl px-4 py-5'>$1,450,290.00</td>
                    <td className='text-[#A2ACB9] text-xl px-4 py-5'>$10,000.00</td>
                    <td className='space-grotesk text-[#39FE2B] px-4 py-5 font-medium'>+$150.00</td>
                  </tr>
                </table>
            </section>
            {/* Recent big wins */}
            <section>
              <header className='flex items-center gap-3 mb-5'>
                <div className='w-3 h-3 rounded-full bg-[#39FE2B] shadow-[0_0_100px_#AFFF9A] blur-[1px]'></div>
                <h1 className='space-grotesk text-[#A2ACB9] font-bold'>RECENT BIG WINS</h1>
              </header>
              <div className='space-grotesk w-90 h-40 p-4 mb-5 bg-[#192735] border-l-4 border-l-[#39FE2B]'>
                <div className='flex flex-col h-full justify-between'>
                  <div className='flex justify-between'>
                    <div>
                      <p className='text-[#64748B] text-sm font-bold'>PLAYER</p>
                      <h2 className='text-[#AFFF9A] text-xl font-bold'>EtherGlow</h2>
                    </div>
                    <div className='flex flex-col items-end'>
                      <p className='text-[#64748B] text-sm font-bold'>GAME</p>
                      <p className='text-[#DCE6F5] text-sm font-bold'>PLINKO</p>
                    </div>
                  </div>
                  <div className='flex justify-between'>
                    <div>
                      <p className='text-[#64748B] text-sm font-bold'>MULTIPLIER</p>
                      <h2 className='text-[#39FE2B] text-xl font-bold'>42.5x</h2>
                    </div>
                    <div className='flex flex-col items-end'>
                      <p className='text-[#64748B] text-sm font-bold'>PROFIT</p>
                      <h2 className='text-[#39FE2B] text-xl font-bold'>+$4,250.00</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className='space-grotesk w-90 h-40 p-4 mb-5 bg-[#192735] border-l-4 border-l-[#FEB700]'>
                <div className='flex flex-col h-full justify-between'>
                  <div className='flex justify-between'>
                    <div>
                      <p className='text-[#64748B] text-sm font-bold'>PLAYER</p>
                      <h2 className='text-[#AFFF9A] text-xl font-bold'>EtherGlow</h2>
                    </div>
                    <div className='flex flex-col items-end'>
                      <p className='text-[#64748B] text-sm font-bold'>GAME</p>
                      <p className='text-[#DCE6F5] text-sm font-bold'>PLINKO</p>
                    </div>
                  </div>
                  <div className='flex justify-between'>
                    <div>
                      <p className='text-[#64748B] text-sm font-bold'>MULTIPLIER</p>
                      <h2 className='text-[#FEB700] text-xl font-bold'>42.5x</h2>
                    </div>
                    <div className='flex flex-col items-end'>
                      <p className='text-[#64748B] text-sm font-bold'>PROFIT</p>
                      <h2 className='text-[#39FE2B] text-xl font-bold'>+$4,250.00</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className='space-grotesk w-90 h-40 p-4 mb-5 bg-[#192735] border-l-4 border-l-[#FF7351]'>
                <div className='flex flex-col h-full justify-between'>
                  <div className='flex justify-between'>
                    <div>
                      <p className='text-[#64748B] text-sm font-bold'>PLAYER</p>
                      <h2 className='text-[#AFFF9A] text-xl font-bold'>EtherGlow</h2>
                    </div>
                    <div className='flex flex-col items-end'>
                      <p className='text-[#64748B] text-sm font-bold'>GAME</p>
                      <p className='text-[#DCE6F5] text-sm font-bold'>PLINKO</p>
                    </div>
                  </div>
                  <div className='flex justify-between'>
                    <div>
                      <p className='text-[#64748B] text-sm font-bold'>MULTIPLIER</p>
                      <h2 className='text-[#FF7351] text-xl font-bold'>42.5x</h2>
                    </div>
                    <div className='flex flex-col items-end'>
                      <p className='text-[#64748B] text-sm font-bold'>PROFIT</p>
                      <h2 className='text-[#39FE2B] text-xl font-bold'>+$4,250.00</h2>
                    </div>
                  </div>
                </div>
              </div>
              <button className='text-[#64748B] border-1 border-[#64748B] text-center w-full py-4 mt-3 mb-10 font-bold cursor-pointer'>VIEW ALL RECENT HITS</button>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default LeaderboardPage