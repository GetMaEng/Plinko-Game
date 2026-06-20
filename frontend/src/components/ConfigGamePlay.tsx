import { IconCurrencyDollar } from '@tabler/icons-react'

import { dropBall } from "../utils/dropBall";
import type { Ball } from '../types/Ball';
import type { RiskLevel, RowCount } from "../types/GameConfig";

import * as walletApi from "../api/wallet";


type Props = {
  ballsRef: React.MutableRefObject<Ball[]>;
  width: number;
  risk: RiskLevel; setRisk: (r: RiskLevel) => void;
  rows: RowCount; setRows: (r: RowCount) => void;
walletId: number;
  userId: number;
  balance: number;
  betAmount: string; setBetAmount: (v: string) => void;
  isBetting: boolean;
  onBetPlaced: () => void;
  onBallLanded: () => void;
};

function ConfigGamePlay({ ballsRef, width, risk, setRisk, rows, setRows, walletId, userId, balance, betAmount, setBetAmount, isBetting, onBetPlaced, onBallLanded }: Props) {
  
    const handleBet = () => {
        const amount = Number(Number(betAmount).toFixed(2));
        if (!betAmount || amount < 0.10 || amount > 1000 || amount > balance) return;
        walletApi.updateBalance(walletId, userId, -amount).then(() => {
            onBallLanded(); // re-fetch balance so UI updates instantly
        });
        onBetPlaced();   
        dropBall(ballsRef, width);
    };
  
  return (
    <div className='inter w-full lg:w-100 lg:h-175 p-4 lg:p-5 flex flex-col gap-6 lg:gap-10 bg-[#09141F] text-[#A2ACB9] rounded-lg lg:rounded-none'>

      {/* Bet Amount */}
      <section className='w-full'>
        <div className='flex justify-between mb-3 font-medium text-sm'>
          <label>BET AMOUNT</label>
          <label className='text-xs'>Min: 0.10 | Max: 1,000</label>
        </div>
        <div className='bg-black flex items-center p-2 rounded-lg'>
          <IconCurrencyDollar />
          <input
            type="number"
            value={betAmount}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d{0,2}$/.test(value)) setBetAmount(value);
            }}
            onBlur={(e) => {
              if (e.target.value) setBetAmount(Number(e.target.value).toFixed(2));
            }}
            placeholder='0.10'
            disabled={isBetting}
            className='text-white w-[40%] text-lg lg:text-xl border-none
            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
            focus:outline-none focus:ring-0 focus:border-transparent disabled:opacity-50'
          />
          <div className='flex gap-1 ml-auto'>
            <button disabled={isBetting}
              onClick={() => setBetAmount(String(Math.max(0.10, Number(betAmount) / 2)))}
              className='bg-[#1E2D3D] py-3 lg:py-4 px-2 lg:px-3 text-sm rounded-lg text-[#DCE6F5] font-medium cursor-pointer hover:bg-[#334958] disabled:opacity-40 disabled:cursor-not-allowed'>
              1/2
            </button>
            <button disabled={isBetting}
              onClick={() => setBetAmount(String(Math.min(1000, Number(betAmount) * 2)))}
              className='bg-[#1E2D3D] py-3 lg:py-4 px-2 lg:px-3 text-sm rounded-lg text-[#DCE6F5] font-medium cursor-pointer hover:bg-[#334958] disabled:opacity-40 disabled:cursor-not-allowed'>
              2x
            </button>
            <button disabled={isBetting}
              onClick={() => setBetAmount(String(Math.min(balance, 1000)))}
              className='bg-[#1E2D3D] py-3 lg:py-4 px-2 lg:px-3 text-sm rounded-lg text-[#DCE6F5] font-medium cursor-pointer hover:bg-[#334958] disabled:opacity-40 disabled:cursor-not-allowed'>
              MAX
            </button>
          </div>
        </div>
        <p className="text-xs mt-2 text-right">
          Balance: <span className="text-white font-semibold">${balance.toFixed(2)}</span>
        </p>
        {Number(betAmount) > balance && (
          <p className="text-red-500 text-sm mt-1">Insufficient balance.</p>
        )}
      </section>

      {/* Risk Level */}
      <section className='w-full'>
        <div className='mb-3 font-medium text-sm'>RISK LEVEL</div>
        <div className='bg-[#1E2D3D] flex justify-around p-1 rounded-lg'>
          {(['easy', 'medium', 'hard'] as RiskLevel[]).map((level) => (
            <button
              key={level}
              disabled={isBetting}
              onClick={() => setRisk(level)}
              className={`${risk === level ? "bg-[#334958] text-[#DCE6F5]" : ""} py-2 lg:py-3 px-4 lg:px-8 text-base lg:text-lg rounded-lg font-medium cursor-pointer hover:bg-[#334958] hover:text-[#DCE6F5] disabled:opacity-40 disabled:cursor-not-allowed capitalize`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* Rows */}
      <section className='w-full'>
        <div className='flex justify-between items-end mb-3 font-medium'>
          <label className='text-sm'>ROWS</label>
          <label className='text-[16px] text-white'>{rows}</label>
        </div>
        <input
          type="range" min={8} max={16} step={4} value={rows}
          onChange={(e) => setRows(Number(e.target.value) as RowCount)}
          disabled={isBetting}
          className='w-full accent-white h-2 bg-[#1E2D3D] rounded-lg appearance-none cursor-pointer disabled:opacity-40'
        />
      </section>

      {/* Bet Button */}
      <button
        onClick={handleBet}
        disabled={!betAmount || Number(betAmount) < 0.10 || Number(betAmount) > balance}
        className='space-grotesk text-black text-xl lg:text-2xl py-3 lg:py-4 rounded-lg font-bold bg-[#39FE2B] hover:bg-[#20df12] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed'>
        BET
      </button>
    </div>
  );
}

export default ConfigGamePlay