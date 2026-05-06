import React from 'react'
import SideBar from '../components/SideBar';
import TopBar from '../components/TopBar';

function HistoryPage() {
  return (
    <>
      <div className="flex">
        <SideBar></SideBar>
        <div className="w-full">
          <TopBar></TopBar>
          
        </div>
      </div>
    </>
  )
}

export default HistoryPage;