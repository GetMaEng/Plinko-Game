import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'
import Deposit from "../components/Deposit";
import Withdraw from '../components/Withdraw';
import { useEffect, useState } from 'react';
import * as transactionApi from "../api/transaction";
import * as walletApi from "../api/wallet";
import type { Wallet } from "../types/Wallet"
import type { Transaction } from '../types/Transaction';

function WalletPage() {

  const [userId, setUserId] = useState<number>(Number(localStorage.getItem("userId")));

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

  useEffect(() => {
    getWalletId(userId)    
  }, [userId]);

  useEffect(() => {
    if (!userId || !walletId) return;
      
    getUserWallet(walletId, userId);
  }, [userId, walletId]);

  // =============================================================
  // =============================================================

  // =============================================================
  //                        APIs Call Transaction
  // =============================================================

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const getAllUserTransaction = async () => {
    if (!walletId) return;
    const response = await transactionApi.getAllUserTransaction(walletId);
    if (response.success) {
        setTransactions(response.data);
    }
  };

  useEffect(() => {
      if (!walletId) return;
      getAllUserTransaction();
  }, [walletId]);

  return (
    <>
      <div className="flex">
        <SideBar></SideBar>
        <div className="w-full">
          <TopBar></TopBar>
          <Deposit transactions={transactions} onSuccess={getAllUserTransaction}></Deposit>
          <Withdraw onSuccess={getAllUserTransaction}></Withdraw>
        </div>
      </div>
    </>
  )
}

export default WalletPage