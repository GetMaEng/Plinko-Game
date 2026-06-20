import { useRef, useState, useEffect } from "react";
import type { Ball } from "../types/Ball";
import type { RiskLevel, RowCount } from "../types/GameConfig";

import PlinkoGamePlay from "../components/PlinkoGamePlay";
import ConfigGamePlay from "../components/ConfigGamePlay";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";

import * as walletApi from "../api/wallet";
import type { Wallet } from "../types/Wallet";
import { Navigate } from 'react-router-dom'


const WIDTH = 750;

function MainPage() {

  const userId = (Number(localStorage.getItem("userId")));
  
  const token = localStorage.getItem('token') // or however you store auth

  if (!token) {
    return <Navigate to="/login" replace />
  }

  // =============================================================
  //                        APIs Call Wallet
  // =============================================================

  const [walletId, setWalletId] = useState<number>();
  const [wallet, setWallet] = useState<Wallet>();

  // API call wallet ID of user
  const getWalletId = async (userId: number) => {
      const response = await walletApi.getWalletId(userId);
      if (response.success) {    
          setWalletId(response.data);
      }
      
  }

  // API call wallet of user
  const getUserWallet = async (wallet: number, userId: number) => {
      const response = await walletApi.getUserWallet(wallet, userId);
      if (response.success) {
          setWallet({
              balance: Number(response.data.balance),
              hightestProfit: Number(response.data.hightestProfit),
              totalDeposit: Number(response.data.totalDeposit),
              totalEarning: Number(response.data.totalEarning),
          })
      }
  }

  const handleBallLanded = () => {
    if (!walletId || !userId) return;
    void getUserWallet(walletId, userId);
  }

  useEffect(() => {
    getWalletId(userId)    
  }, [userId]);

  useEffect(() => {
    if (!userId || !walletId) return;
      
    getUserWallet(walletId, userId);
  }, [userId, walletId]);

  // =============================================================
  //                        Plinko Game
  // =============================================================
  const ballsRef = useRef<Ball[]>([]);

  const [risk, setRisk] = useState<RiskLevel>("medium");
  const [rows, setRows] = useState<RowCount>(12);

  const [betAmount, setBetAmount] = useState<string>("");
  const [isBetting, setIsBetting] = useState(false);
  const activeBallCountRef = useRef(0);

  const handleBetPlaced = () => {
    activeBallCountRef.current += 1;
    setIsBetting(true);
  };
  return (
    <div className="flex">
      <SideBar />
      <div className="w-full min-w-0">
        <TopBar />
        {/* Stack vertically on mobile/tablet, side-by-side on lg+ */}
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-4 w-full p-4 lg:p-5">
          <div className="w-full lg:w-auto order-2 lg:order-1">
            <ConfigGamePlay
              ballsRef={ballsRef}
              width={WIDTH}
              risk={risk} setRisk={setRisk}
              rows={rows} setRows={setRows}
              walletId={walletId!}
              userId={userId}
              balance={wallet?.balance ?? 0}
              betAmount={betAmount} setBetAmount={setBetAmount}
              isBetting={isBetting}
              onBetPlaced={handleBetPlaced}
              onBallLanded={handleBallLanded}
            />
          </div>
          <div className="w-full lg:w-auto order-1 lg:order-2 overflow-x-auto">
            <PlinkoGamePlay
              ballsRef={ballsRef}
              risk={risk}
              rows={rows}
              betAmount={Number(betAmount)}
              walletId={walletId!}
              userId={userId}
              onBallLanded={handleBallLanded}
              activeBallCountRef={activeBallCountRef}
              setIsBetting={setIsBetting}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
