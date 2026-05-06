import { useRef, useState } from "react";
import type { Ball } from "../types/Ball";
import type { RiskLevel, RowCount } from "../types/GameConfig";

import PlinkoGamePlay from "../components/PlinkoGamePlay";
import ConfigGamePlay from "../components/ConfigGamePlay";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";

const WIDTH = 750;

function MainPage() {
  const ballsRef = useRef<Ball[]>([]);

  const [risk, setRisk] = useState<RiskLevel>("medium");
  const [rows, setRows] = useState<RowCount>(12);

  return (
    <>
      <div className="flex">
        <SideBar></SideBar>
        <div className="w-full">
          <TopBar></TopBar>
          <div className="flex justify-center items-center gap-5 w-full my-5">
            <ConfigGamePlay 
            ballsRef={ballsRef} 
            width={WIDTH} 
            risk={risk}
            setRisk={setRisk}
            rows={rows}
            setRows={setRows}/>
            <PlinkoGamePlay ballsRef={ballsRef} 
            risk={risk} 
            rows={rows} />
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
