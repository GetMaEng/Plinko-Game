import { IconDeviceWatchStats2 } from '@tabler/icons-react'
import * as userApi from "./api/user";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';


function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, []);

  return (
    <>
      <h1 className='text-xl text-amber-800'>Hi</h1>
      <IconDeviceWatchStats2></IconDeviceWatchStats2>
    </>
  )
}

export default App
