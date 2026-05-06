import { IconCurrencyDollar } from '@tabler/icons-react'

import { dropBall } from "../utils/dropBall";
import type { Ball } from '../types/Ball';
import type { RiskLevel, RowCount } from "../types/GameConfig";


type Props = {
  ballsRef: React.MutableRefObject<Ball[]>;
  width: number;

  risk: RiskLevel;
  setRisk: (r: RiskLevel) => void;

  rows: RowCount;
  setRows: (r: RowCount) => void;
};

function ConfigGamePlay({ ballsRef, width, risk, setRisk, rows, setRows }: Props) {
  return (
    <>
    <div className='inter w-100 h-175 p-5 flex flex-col gap-10 bg-[#09141F] text-[#A2ACB9]'>
        <section className='w-full'>
            <div className='flex justify-between mb-3 font-medium text-sm'>
                <label htmlFor="">BET AMOUNT</label>
                <label htmlFor="">Min: 0.10 | Max: 1,000</label>
            </div>
            <div className='bg-black flex items-center p-2 rounded-lg'>
                <IconCurrencyDollar></IconCurrencyDollar>
                <input type="number" className='text-white w-[50%] text-xl font-bold border-none
                [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                focus:outline-none focus:ring-0 focus:border-transparent'/>
                <div className='flex gap-1'>
                    <button className='bg-[#1E2D3D] py-4 px-3 text-sm rounded-lg text-[#DCE6F5] font-medium cursor-pointer hover:bg-[#334958]'>1/2</button>
                    <button className='bg-[#1E2D3D] py-4 px-3 text-sm rounded-lg text-[#DCE6F5] font-medium cursor-pointer hover:bg-[#334958]'>2x</button>
                    <button className='bg-[#1E2D3D] py-4 px-3 text-sm rounded-lg text-[#DCE6F5] font-medium cursor-pointer hover:bg-[#334958]'>MAX</button>
                </div>
            </div>
        </section>
        <section className='w-full'>
            <div className='mb-3 font-medium text-sm'>RISK LEVEL</div>
            <div className='bg-[#1E2D3D] flex justify-around p-1 rounded-lg'>
                <button onClick={() => setRisk("easy")} className={`${risk === "easy" ? "bg-[#334958] text-[#DCE6F5]" : "bg-[#1E2D3D] text-[#A2ACB9]"} py-3 px-8 text-lg rounded-lg font-medium cursor-pointer hover:bg-[#334958] hover:text-[#DCE6F5]`}>Easy</button>
                <button onClick={() => setRisk("medium")} className={`${risk === "medium" ? "bg-[#334958] text-[#DCE6F5]" : "bg-[#1E2D3D] text-[#A2ACB9]"} py-3 px-8 text-lg rounded-lg font-medium cursor-pointer hover:bg-[#334958] hover:text-[#DCE6F5]`}>Medium</button>
                <button  onClick={() => setRisk("hard")} className={`${risk === "hard" ? "bg-[#334958] text-[#DCE6F5]" : "bg-[#1E2D3D] text-[#A2ACB9]"} py-3 px-8 text-lg rounded-lg font-medium cursor-pointer hover:bg-[#334958] hover:text-[#DCE6F5]`}>Hard</button>
            </div>
        </section>
        <section className='w-full'>
            <div className='flex justify-between items-end mb-3 font-medium'>
                <label className='text-sm'>ROWS</label>
                <label className='text-[16px] text-white'>{rows}</label>
            </div>
            <input 
            type="range" 
            min={8}
            max={16}
            step={4}
            value={rows}
            onChange={(e) => setRows(Number(e.target.value) as RowCount)}
            className='w-full accent-white h-2 bg-[#1E2D3D] rounded-lg appearance-none cursor-pointer'/>
        </section>
        <button onClick={() => dropBall(ballsRef, width)} className='space-grotesk text-black text-2xl py-4 rounded-lg font-bold bg-[#39FE2B] hover:bg-[#20df12] cursor-pointer'>BET</button>
    </div>
    </>
  )
}

export default ConfigGamePlay