import { useEffect, useState } from 'react'
import { IconBell, IconWallet, IconUserCircle } from "@tabler/icons-react";
import * as walletApi from "../api/wallet";
import type { Wallet } from "../types/Wallet"

const TopBar = () => {

    const [walletId, setWalletId] = useState<number>();
    const [wallet, setWallet] = useState<Wallet>();
    const [userId, setUserId] = useState<number>(Number(localStorage.getItem("userId")));

    // =============================================================
    //                        APIs Call Wallet
    // =============================================================

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
            balance: response.data.balance,
            hightestProfit: response.data.hightestProfit,
            totalDeposit: response.data.totalDeposit,
            totalEarning: response.data.totalEarning,
            })
        }
    }

    useEffect(() => {
        getWalletId(userId) 
    }, [userId]);

    useEffect(() => {
        if (!userId || !walletId) return;
        
        getUserWallet(walletId, userId);
    }, [userId, walletId]);

    
    // When balance of user has changing
    useEffect(() => {
        if (!userId || !walletId) return;

        getUserWallet(walletId, userId);
    }, [wallet]);

    // =============================================================
    // =============================================================

  return (
    <>
        <header className='space-grotesk w-full h-[65px] flex justify-end items-center text-2xl border-1 border-[#3f495415] bg-[#020617]'>
            {/* <h1 className='text-[#AFFF9A] text-[24px] font-bold ml-5'>PLINKO GAME</h1> */}
            <div className='flex w-100 justify-evenly items-center'>
                <div className='text-white text-center'>
                    <p className='text-[16px] font-medium text-[#64748B]'>BALANCE</p>
                    <p className='font-bold text-[16px] text-[#AFFF9A]'>${wallet?.balance}</p>
                </div>
                <div>
                    <button className='px-5 py-2 bg-[#39FE2B] text-lg font-bold rounded-md'>Deposit</button>
                </div>
                <IconBell size={28} className='text-[#94A3B8] '></IconBell>
                <IconWallet size={28} className='text-[#94A3B8]'></IconWallet>
                <IconUserCircle size={28} className='text-[#94A3B8]'></IconUserCircle>
            </div>
        </header>
    </>
  )
}

export default TopBar