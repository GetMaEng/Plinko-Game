import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'
import Deposit from "../components/Deposit";
import Withdraw from '../components/Withdraw';
import { useEffect, useState } from 'react';
import * as transactionApi from "../api/transaction";
import * as walletApi from "../api/wallet";
import type { Wallet } from "../types/Wallet"
import type { Transaction } from '../types/Transaction';
import { Navigate } from 'react-router-dom';

function WalletPage() {

  const token = localStorage.getItem('token') // or however you store auth

  if (!token) {
    return <Navigate to="/login" replace />
  }

  const userId = (Number(localStorage.getItem("userId")));

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
        <SideBar />
        <div className="w-full min-w-0">
          <TopBar />
          <Deposit transactions={transactions} onSuccess={getAllUserTransaction} />
          <Withdraw onSuccess={getAllUserTransaction} />
        </div>
      </div>
    </>
  )
}

export default WalletPage