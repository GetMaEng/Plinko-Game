import { useState } from 'react'
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'
import { IconCreditCardPay, IconCurrencyDollar, IconCurrencyBitcoin, IconBuildingBank, IconCreditCardFilled } from "@tabler/icons-react";
import Deposit from "../components/Deposit";
import Withdraw from '../components/Withdraw';

function WalletPage() {
  const [amount, setAmount] = useState<string>("");
  const [selectedPayment, setSelectedPayment] = useState<string>("");

  const handleAmount = (amount: number) => {
    setAmount(String(amount));
  }

  const handleSelectPayment = (payment: string) => {
    setSelectedPayment(payment);
  };

  return (
    <>
      <div className="flex">
        <SideBar></SideBar>
        <div className="w-full">
          <TopBar></TopBar>
          <Deposit></Deposit>
          <Withdraw></Withdraw>
        </div>
      </div>
    </>
  )
}

export default WalletPage