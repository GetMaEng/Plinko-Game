import { useState } from "react";
import { IconExclamationCircle, IconCurrencyDollar, IconCreditCardRefund, IconCreditCardFilled, IconCurrencyBitcoin, IconBuildingBank } from "@tabler/icons-react";

function Withdraw() {

  const [amount, setAmount] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  const handleAmount = (amount: number) => {
      setAmount(String(amount));
  }

  const handleSelectMethod = (method: string) => {
      setSelectedMethod(method);
  };

  return (
    <>
      <header className="ml-10 my-10">
        <h1 className="space-grotesk text-white text-4xl font-medium">
          Withdraw Assets
        </h1>
        <p className="inter text-[#A2ACB9] font-light">
          Securely transfer your winnings to your preferred crypto wallet.
        </p>
      </header>
      <div className="flex justify-between px-10 gap-15 pb-10">
        <div className="w-full">
          {/* Select method */}
          <section className="mb-10">
            <header className="space-grotesk text-[#AFFF9A] font-bold text-xl mb-5">
              <h2>Withdrawal Method</h2>
            </header>
            <div className="inter flex gap-5">
              <button onClick={() => handleSelectMethod("bitcoin")} className={`bg-[#192735] w-full flex flex-col items-center p-10 rounded-lg cursor-pointer border-1
                ${selectedMethod === "bitcoin" ? "border-[#AFFF9A]" : "border-[#192735]"}`
              }>
                <IconCurrencyBitcoin size={36} className="text-[#F7931A]"></IconCurrencyBitcoin>
                <p className={`${selectedMethod === "bitcoin" ? "text-white" : "text-[#A2ACB9]"} font-medium`}>Bitcoin (BTC)</p>
              </button>
              <button onClick={() => handleSelectMethod("bank")} className={`bg-[#192735] w-full flex flex-col items-center p-10 rounded-lg cursor-pointer border-1
                ${selectedMethod === "bank" ? " border-[#AFFF9A]" : "border-[#192735]"}`
              }>
                <IconBuildingBank size={36} className="text-[#60A5FA]"></IconBuildingBank>
                <p className={`${selectedMethod === "bank" ? "text-white" : "text-[#A2ACB9]"} font-medium`}>Bank Transfer</p>
              </button>
              <button onClick={() => handleSelectMethod("card")} className={`bg-[#192735] w-full flex flex-col items-center p-10 rounded-lg cursor-pointer border-1
                ${selectedMethod === "card" ? " border-[#AFFF9A]" : "border-[#192735]"}`
              }>
                <IconCreditCardFilled size={36} className="text-white"></IconCreditCardFilled>
                <p className={`${selectedMethod === "card" ? "text-white" : "text-[#A2ACB9]"} font-medium`}>Credit Card</p>
              </button>
            </div>
          </section>
          <section>
            <header className="space-grotesk text-[#AFFF9A] font-bold text-xl mb-5">
              <h2>Destination Wallet</h2>
            </header>
            <div className='bg-[#192735] flex items-center px-2 py-4 rounded-lg'>
                <input type="text"
                placeholder='Enter BTC wallet address' 
                className='text-white w-full text-lg px-3 placeholder:font-lignt
                border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                focus:outline-none focus:ring-0 focus:border-transparent'/>
            </div>
            <div className="text-[#A2ACB9] flex items-center gap-1 mt-2">
              <IconExclamationCircle size={16}></IconExclamationCircle>
              <p className=" text-xs">Ensure the address is correct. Cryto transfer are irreversible.</p>
            </div>
          </section>
        </div>
        {/* Withdraw Amount */}
        <div className="space-grotesk w-95 bg-[#192735] p-5 rounded-xl">
          <header className='flex items-center gap-2 my-5'>
            <IconCreditCardRefund className='text-[#AFFF9A]'></IconCreditCardRefund>
            <h1 className='text-white text-xl font-bold'>Withdraw Amount</h1>
            </header>
          {/* Amount */}
          <section className="mb-10">
            <div className='flex gap-5 mb-3'>
                <button onClick={() => handleAmount(50)} className={`w-25 py-4 bg-[#1E2D3D] text-white font-bold rounded-md cursor-pointer border-1 hover:bg-[#263544] ${Number(amount) === 50 ? " border-[#AFFF9A]" : "border-[#1E2D3D]"}`}>$50</button>
                <button onClick={() => handleAmount(100)} className={`w-25 py-4 bg-[#1E2D3D] text-white font-bold rounded-md cursor-pointer border-1 hover:bg-[#263544] ${Number(amount) === 100 ? "border-[#AFFF9A]" : "border-[#1E2D3D]"}`}>$100</button>
                <button onClick={() => handleAmount(500)} className={`w-25 py-4 bg-[#1E2D3D] text-white font-bold rounded-md cursor-pointer border-1 hover:bg-[#263544] ${Number(amount) === 500 ? "border-[#AFFF9A]" : "border-[#1E2D3D]"}`}>$500</button>
                <button onClick={() => handleAmount(1250)} className={`w-25 py-4 bg-[#1E2D3D] text-white font-bold rounded-md cursor-pointer border-1 hover:bg-[#263544] ${Number(amount) === 1250 ? "border-[#AFFF9A]" : "border-[#1E2D3D]"}`}>MAX</button>
            </div>
            <div className='bg-black flex items-center px-2 py-3 rounded-lg'>
                <IconCurrencyDollar className='text-[#A2ACB9]'></IconCurrencyDollar>
                <input type="text" value={amount} onChange={(e) => {
                const value = e.target.value;

                // only numbers allowed
                if (/^\d*$/.test(value)) {
                    setAmount(value);
                }
                }} 
                placeholder='Custom Amount' 
                className='text-white text-lg placeholder:font-bold
                border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                focus:outline-none focus:ring-0 focus:border-transparent'/>
            </div>
          </section>
          {/* Details */}
          <section className="">
            <div className="inter flex justify-between font-medium text-sm mb-10">
              <p className="text-[#A2ACB9]">Withdrawal Fee</p>
              <p className="text-white">$2.50</p>
            </div>
            <div className="inter flex justify-between items-center font-bold">
              <p className="text-white">FINAL AMOUNT</p>
              <p className="text-[#AFFF9A] text-2xl">$497.50</p>
            </div>
          </section>
          <section>
            <p className="text-[#A2ACB9] text-xs mt-4 text-center">
              BY CONFIRMING, YOU AGREE TO THE PROCESSING OF THIS <br /> 
              TRANSACTION ON THE BLOCKCHAIN. FINAL SETTLEMENT TIME <br /> DEPENDS ON NETWORK CONGESTION.
            </p>
          </section>
          {/* Withdraw */}
          <button className='bg-[#39FE2B] w-full py-4 mt-4 text-xl font-bold rounded-md hover:bg-[#20df12] cursor-pointer'>CONFIRM WITHDRAW</button>
        </div>
      </div>
    </>
  );
}

export default Withdraw;
