import { useState } from 'react'
import { IconCreditCardPay, IconCurrencyDollar, IconCurrencyBitcoin, IconBuildingBank, IconCreditCardFilled } from "@tabler/icons-react";

function Deposit() {

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
    <header className='ml-10 my-10'>
        <h1 className='space-grotesk text-white text-4xl font-medium'>Wallet Summary</h1>
        <p className='inter text-[#A2ACB9] font-light'>Manage your kinetic assets and transaction history</p>
    </header>
    <div className='flex justify-center gap-15 pb-10'>
        <div>
            {/* Dashboard of User => Balance, Top Earning, Active Stakes */}
            <section>
            <div className='space-grotesk flex gap-5'>
                <div className='flex justify-center items-center bg-[#13212E] w-full h-25 px-3 border-l-4 border-[#AFFF9A] rounded-lg'>
                <div>
                    <p className='inter text-[#A2ACB9] text-xs'>AVAILABLE BALANCE</p>
                    <h2 className='text-white text-3xl font-medium'>$1,250.00</h2>
                </div>
                </div>
                <div className='flex justify-center items-center bg-[#13212E] w-full h-25 px-3 border-l-4 border-[#FFC965] rounded-lg'>
                <div>
                    <p className='inter text-[#A2ACB9] text-xs'>TOTAL EARNINGS</p>
                    <h2 className='text-white text-3xl font-medium'>$111,250.00</h2>
                </div>
                </div>
                <div className='flex justify-center items-center bg-[#13212E] w-full h-25 px-3 border-l-4 border-[#FF7351] rounded-lg'>
                <div>
                    <p className='inter text-[#A2ACB9] text-xs'>TOTAL DEPOSITS</p>
                    <h2 className='text-white text-3xl font-medium'>$1,110,400.00</h2>
                </div>
                </div>
            </div>
            </section>
            {/* History: recent transaction */}
            <section className='w-175 mt-10 rounded-lg'>
            <header className='space-grotesk py-5 flex justify-between items-center bg-[#09141F]'>
                <p className='ml-4 text-white font-medium'>RECENT EARNING</p>
                <p className='mr-4 text-[#AFFF9A] text-xs font-light cursor-pointer hover:underline'>VIEW ALL</p>
            </header>
            <table className='w-175 border-collapse border-spacing-y-0 bg-[#09141F]'>
                <thead className='space-grotesk text-[#A2ACB9] font-light bg-[#13212E]'>
                <tr>
                    <th className="text-left px-4 py-5">TRANSACTION ID</th>
                    <th className="text-left px-4 py-5">METHOD</th>
                    <th className="text-left px-4 py-5">TIME</th>
                    <th className="text-left px-4 py-5">MONEY</th>
                </tr>
                </thead>
                <tr className='inter font-light border-b border-[#13212E]'>
                <td className='text-white px-4 py-5'>BN-100-112</td>
                <td className='text-white px-4 py-5'>Bank Transfer</td>
                <td className='text-[#A2ACB9] px-4 py-5'>2 mins ago</td>
                <td className='space-grotesk text-[#39FE2B] px-4 py-5 font-medium'>+$150.00</td>
                </tr>
                <tr className='inter font-light border-b border-[#13212E]'>
                <td className='text-white px-4 py-5'>BN-100-112</td>
                <td className='text-white px-4 py-5'>Bank Transfer</td>
                <td className='text-[#A2ACB9] px-4 py-5'>2 mins ago</td>
                <td className='space-grotesk text-[#39FE2B] px-4 py-5 font-medium'>+$150.00</td>
                </tr>
                <tr className='inter font-light border-b border-[#13212E]'>
                <td className='text-white px-4 py-5'>BN-100-112</td>
                <td className='text-white px-4 py-5'>Bank Transfer</td>
                <td className='text-[#A2ACB9] px-4 py-5'>2 mins ago</td>
                <td className='space-grotesk text-[#39FE2B] px-4 py-5 font-medium'>+$150.00</td>
                </tr>
            </table>
            </section>
        </div>
        {/* Instant top-up */}
        <div className='space-grotesk w-95 bg-[#192735] p-5 rounded-xl'>
            <header className='flex items-center gap-2 my-5'>
            <IconCreditCardPay className='text-[#AFFF9A]'></IconCreditCardPay>
            <h1 className='text-white text-xl font-bold'>INSTANT TOP-UP</h1>
            </header>
            {/* Selecting Amount */}
            <section className='mb-4'>
            <p className='text-[#A2ACB9] text-sm font-medium mb-3'>SELECT AMOUNT</p>
            <div className='flex gap-5 mb-3'>
                <button onClick={() => handleAmount(50)} className={`w-25 py-4 bg-[#1E2D3D] text-white font-bold rounded-md cursor-pointer border-1 hover:bg-[#263544] ${Number(amount) === 50 ? " border-[#AFFF9A]" : "border-[#1E2D3D]"}`}>$50</button>
                <button onClick={() => handleAmount(100)} className={`w-25 py-4 bg-[#1E2D3D] text-white font-bold rounded-md cursor-pointer border-1 hover:bg-[#263544] ${Number(amount) === 100 ? "border-[#AFFF9A]" : "border-[#1E2D3D]"}`}>$100</button>
                <button onClick={() => handleAmount(500)} className={`w-25 py-4 bg-[#1E2D3D] text-white font-bold rounded-md cursor-pointer border-1 hover:bg-[#263544] ${Number(amount) === 500 ? "border-[#AFFF9A]" : "border-[#1E2D3D]"}`}>$500</button>
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
            {/* Payment Method */}
            <section>
            <p className='text-[#A2ACB9] text-sm font-medium mb-3'>PAYMENT METHOD</p>
            <button onClick={() => handleSelectPayment("bitcoin")} className='inter flex justify-between items-center bg-[#09141F] px-3 py-4 my-3 w-full rounded-lg cursor-pointer'>
                <div className='flex justify-center items-center gap-2'>
                <IconCurrencyBitcoin className='text-[#F7931A]'></IconCurrencyBitcoin>
                <label htmlFor="" className='text-white font-medium'>Bitcoin (BTC)</label>
                </div>
                <input type="radio" name='paymentMethod' checked={selectedPayment === "bitcoin"} className='appearance-none
                w-5 h-5
                rounded-full
                border-3 border-[#A2ACB9]
                bg-transparent
                checked:border-[#AFFF9A]
                checked:bg-[#AFFF9A]
                relative
                cursor-pointer'/>
            </button>
            <button onClick={() => handleSelectPayment("bank")} className='inter flex justify-between items-center bg-[#09141F] px-3 py-4 my-3 w-full rounded-lg cursor-pointer'>
                <div className='flex justify-center items-center gap-2'>
                <IconBuildingBank className='text-[#60A5FA]'></IconBuildingBank>
                <label htmlFor="" className='text-white font-medium'>Bank Transfer</label>
                </div>
                <input type="radio" name='paymentMethod' checked={selectedPayment === "bank"} className='appearance-none
                w-5 h-5
                rounded-full
                border-3 border-[#A2ACB9]
                bg-transparent
                checked:border-[#AFFF9A]
                checked:bg-[#AFFF9A]
                relative
                cursor-pointer'/>
            </button>
            <button  onClick={() => handleSelectPayment("card")} className='inter flex justify-between items-center bg-[#09141F] px-3 py-4 my-3 w-full rounded-lg cursor-pointer'>
                <div className='flex justify-center items-center gap-2'>
                <IconCreditCardFilled className='text-white'></IconCreditCardFilled>
                <label htmlFor="" className='text-white font-medium'>Credit Card</label>
                </div>
                <input type="radio" name='paymentMethod' checked={selectedPayment === "card"} className='appearance-none
                w-5 h-5
                rounded-full
                border-3 border-[#A2ACB9]
                bg-transparent
                checked:border-[#AFFF9A]
                checked:bg-[#AFFF9A]
                relative
                cursor-pointer'/>
            </button>
            {/* Deposit */}
            <button className='bg-[#39FE2B] w-full py-4 mt-4 text-xl font-bold rounded-md hover:bg-[#20df12] cursor-pointer'>CONFIRM DEPOSIT</button>
            </section>
            <section>
            <p className='text-[#A2ACB9] text-xs mt-4 text-center'>TRANSACTION ARE ENCRYPTED AND <br /> PROCESSED VIA KINETIC-GRADE SECURE <br /> LAYERS. NO FEES ON INITIAL DAILY TOP-UP</p>
            </section>
        </div>
    </div>
    </>
  )
}

export default Deposit