import { useRef } from "react";
import type { Ball } from "../types/Ball";
import PlinkoGamePlay from "../components/PlinkoGamePlay";
import ConfigGamePlay from "../components/ConfigGamePlay";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";

const WIDTH = 750;

function MainPage() {
  const ballsRef = useRef<Ball[]>([]);

  return (
    <>
      <TopBar></TopBar>
      <div className="flex gap-8">
        <SideBar></SideBar>
        <div className="flex gap-5 mt-5">
          <ConfigGamePlay ballsRef={ballsRef} width={WIDTH} />
          <PlinkoGamePlay ballsRef={ballsRef} />
        </div>
      </div>
    </>
  );
}

export default MainPage;
