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
        </div>
      </div>
    </>
  )
}

export default LeaderboardPage