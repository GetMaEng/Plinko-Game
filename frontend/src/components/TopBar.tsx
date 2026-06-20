import { useEffect, useState } from 'react'
import { IconBell, IconWallet, IconUserCircle } from "@tabler/icons-react";
import * as walletApi from "../api/wallet";
import type { Wallet } from "../types/Wallet"

const TopBar = () => {

    const [walletId, setWalletId] = useState<number>();
    const [wallet, setWallet] = useState<Wallet>();
    const userId = (Number(localStorage.getItem("userId")));

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

  return (
    <header className='space-grotesk w-full h-[55px] lg:h-[65px] flex justify-between lg:justify-end items-center text-2xl border-b border-[#3f495415] bg-[#020617] px-4 lg:px-0'>
        {/* Spacer for hamburger button on mobile */}
        <div className='w-10 lg:hidden' />

        <div className='flex items-center gap-3 lg:gap-0 lg:w-100 lg:justify-evenly'>
            <div className='text-white text-center'>
                <p className='text-[11px] lg:text-[16px] font-medium text-[#64748B]'>BALANCE</p>
                <p className='font-bold text-[13px] lg:text-[16px] text-[#AFFF9A]'>${parseFloat(String(wallet?.balance || 0)).toFixed(2)}</p>
            </div>
            <button className='px-3 py-1.5 lg:px-5 lg:py-2 bg-[#39FE2B] text-sm lg:text-lg font-bold rounded-md'>
                Deposit
            </button>
            <IconBell size={22} className='text-[#94A3B8]' />
            <IconWallet size={22} className='text-[#94A3B8] hidden sm:block' />
            <IconUserCircle size={22} className='text-[#94A3B8]' />
        </div>
    </header>
  )
}

export default TopBar