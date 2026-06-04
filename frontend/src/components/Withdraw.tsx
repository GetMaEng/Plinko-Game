import { useState, useEffect } from "react";
import { IconExclamationCircle, IconCurrencyDollar, IconCreditCardRefund, IconCreditCardFilled, IconCurrencyBitcoin, IconBuildingBank } from "@tabler/icons-react";
import * as walletApi from "../api/wallet";
import * as transactionApi from "../api/transaction";
import type { Wallet } from "../types/Wallet"
import { withdrawSchema, type WithdrawErrors, type WithdrawSchema } from "../schemas/withdrawSchema";

interface WithdrawFormProps {
    onSuccess: () => void;
    // ...your other props
}

function Withdraw({ onSuccess }: WithdrawFormProps) {

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

  // API call update balance wallet of user
  const updateBalance = async (walletId: number, userId: number, amount: number) => {
      await walletApi.updateBalance(walletId, userId, amount)
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

  // =============================================================
  //                        APIs Call Transaction
  // =============================================================
  type TransactionType = 'deposit' | 'withdraw';
  type TransactionMethod = 'bank_transfer' | 'credit_card'| 'bitcoin';

  const createTransaction = async (transactionId: string, method: TransactionMethod, type: TransactionType, amount: number, walletId: number) => {
      const response = await transactionApi.createTransaction(transactionId, method, type, amount, walletId)
      if (response.success) {
        await onSuccess();
      }
  }

  // =============================================================
  // =============================================================

  // =============================================================
  //                      Withdraw Form
  // =============================================================

  const FEE = 2.50;

  const [amount, setAmount] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("bitcoin");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<WithdrawErrors>({});

  const finalAmount = Math.max(0, Number(amount) - FEE);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Guard null here instead of inside Zod
    if (!selectedMethod) {
      setErrors({ paymentMethod: 'Please select a withdrawal method' });
      return;
    }

    const payload = {
      amount: String(amount),
      paymentMethod: selectedMethod, // now correctly typed
      address: selectedMethod === 'bitcoin' ? address : undefined,
      iban: selectedMethod === 'bank' ? address : undefined,
      cardNumber: selectedMethod === 'card' ? address : undefined,
    };

    const result = withdrawSchema.safeParse(payload);
    if (!result.success) {
      const fieldErrors: WithdrawErrors = {};
      result.error.issues.forEach(err => {
        const field = err.path[0] as keyof WithdrawSchema;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    if (Number(amount) < FEE) {
      setErrors({ amount: `Amount must be greater than the fee ($${FEE})` });
      return;
    }
    if (wallet && Number(amount) > wallet.balance) {
      setErrors({ amount: `Insufficient balance. Your balance is $${wallet.balance}` });
      return;
    }
    // All valid - send to API
    if (!walletId) return;

    await updateBalance(walletId, userId, Number(wallet?.balance) - finalAmount)
    await createTransaction(
        generateTransactionId(selectedMethod), 
        transactionMethod(selectedMethod),
        "withdraw",
        Number(finalAmount),
        walletId
    )

    setShowModal(true);
  };

  type PaymentMethod = 'bitcoin' | 'bank' | 'card';

  const prefix = {
      bitcoin: 'BTC',
      bank:    'BNK',
      card:    'CRD',
  };

  const generateTransactionId = (method: PaymentMethod): string => {
      const timestamp = Date.now().toString(36).toUpperCase();       // e.g. "LK3M2X"
      const random = Math.random().toString(36).slice(2, 8).toUpperCase(); // e.g. "A4XZ91"
      return `${prefix[method]}-${timestamp}-${random}`;
  };

  const transactionMethod = (method: PaymentMethod): TransactionMethod => {
      let transaction: TransactionMethod = "bank_transfer";
      if (method === "bitcoin") transaction = "bitcoin";
      if (method === "bank") transaction = "bank_transfer";
      if (method === "card") transaction = "credit_card";
      return transaction;
  }

  const handleAmount = (amount: number) => {
      setAmount(String(amount));
  }

  const handleSelectMethod = (method: PaymentMethod) => {
      setSelectedMethod(method);
  };

  // =============================================================
  // =============================================================

  // =============================================================
  //                   Show Modal Successfully
  // =============================================================

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      
    }, [showModal])

  // =============================================================
  // =============================================================

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
      <form onSubmit={handleSubmit} className="flex justify-between px-10 gap-15 pb-10">
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
         {selectedMethod && 
         <section>
            <header className="space-grotesk text-[#AFFF9A] font-bold text-xl mb-5">
              <h2>Destination Wallet</h2>
            </header>
            <div className='bg-[#192735] flex items-center px-2 py-4 rounded-lg'>
                <input type="text"
                placeholder={selectedMethod === "bitcoin" ? 'Enter BTC wallet address' :
                          selectedMethod === "bank" ? 'Enter Bank address' :
                          'Enter Credit Card address'
                }
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className='text-white w-full text-lg px-3 placeholder:font-lignt
                border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                focus:outline-none focus:ring-0 focus:border-transparent'/>
            </div>
            <div className="text-[#A2ACB9] flex items-center gap-1 mt-2">
              <IconExclamationCircle size={16}></IconExclamationCircle>
              <p className=" text-xs">Ensure the address is correct.</p>
            </div>
          </section>}
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
                <button type="button" onClick={() => handleAmount(50)} className={`w-25 py-4 bg-[#1E2D3D] text-white font-bold rounded-md cursor-pointer border-1 hover:bg-[#263544] ${Number(amount) === 50 ? " border-[#AFFF9A]" : "border-[#1E2D3D]"}`}>$50</button>
                <button type="button" onClick={() => handleAmount(100)} className={`w-25 py-4 bg-[#1E2D3D] text-white font-bold rounded-md cursor-pointer border-1 hover:bg-[#263544] ${Number(amount) === 100 ? "border-[#AFFF9A]" : "border-[#1E2D3D]"}`}>$100</button>
                <button type="button" onClick={() => handleAmount(500)} className={`w-25 py-4 bg-[#1E2D3D] text-white font-bold rounded-md cursor-pointer border-1 hover:bg-[#263544] ${Number(amount) === 500 ? "border-[#AFFF9A]" : "border-[#1E2D3D]"}`}>$500</button>
                <button type="button" onClick={() => wallet && handleAmount(wallet.balance)} className={`w-25 py-4 bg-[#1E2D3D] text-white font-bold rounded-md cursor-pointer border-1 hover:bg-[#263544] ${wallet && Number(amount) === wallet.balance ? "border-[#AFFF9A]" : "border-[#1E2D3D]"}`}>MAX</button>
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
         {finalAmount > 0 &&
         <>
          <section className="">
            <div className="inter flex justify-between font-medium text-sm mb-10">
              <p className="text-[#A2ACB9]">Withdrawal Fee</p>
              <p className="text-white">$2.50</p>
            </div>
            <div className="inter flex justify-between items-center font-bold">
              <p className="text-white">FINAL AMOUNT</p>
              <p className="text-[#AFFF9A] text-2xl">${finalAmount.toFixed(2)}</p>
            </div>
          </section>
          </>
          }
          <section>
            <p className="text-[#A2ACB9] text-xs my-4 text-center">
              BY CONFIRMING, YOU AGREE TO THE PROCESSING OF THIS <br /> 
              TRANSACTION ON THE BLOCKCHAIN. FINAL SETTLEMENT TIME <br /> DEPENDS ON NETWORK CONGESTION.
            </p>
          </section>
          {/* Errors */}
          {errors.amount && <p className="text-red-500 text-center text-sm">{errors.amount}</p>}
          {errors.paymentMethod && <p className="text-red-500 text-center  text-sm">{errors.paymentMethod}</p>}
          {selectedMethod === 'bitcoin' && errors.address && <p className="text-red-500 text-center text-sm">{errors.address}</p>}
          {selectedMethod === 'bank' && errors.iban && <p className="text-red-500 text-center text-sm">{errors.iban}</p>}
          {selectedMethod === 'card' && errors.cardNumber && <p className="text-red-500 text-center text-sm">{errors.cardNumber}</p>}

          {/* Withdraw */}
          <button type="submit" className='bg-[#39FE2B] w-full py-4 mt-4 text-xl font-bold rounded-md hover:bg-[#20df12] cursor-pointer'>CONFIRM WITHDRAW</button>
        </div>
      </form>
      {/* Success Modal */}
      {showModal && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#192735] rounded-xl p-8 w-90 flex flex-col items-center gap-4 shadow-xl">
              <div className="bg-[#1E2D3D] rounded-full p-4">
                  <IconCreditCardRefund className="text-[#AFFF9A] w-10 h-10" />
              </div>
              <h2 className="text-white text-xl font-bold space-grotesk">Withdrawal Successful</h2>
              <p className="text-[#A2ACB9] inter text-sm text-center">
                  <span className="text-[#AFFF9A] font-semibold">${finalAmount.toFixed(2)}</span> has been sent to your {selectedMethod} address.
              </p>
              <div className="bg-[#1E2D3D] rounded-lg px-4 py-3 w-full">
                  <p className="text-[#A2ACB9] inter text-xs mb-1">Destination</p>
                  <p className="text-white inter text-sm break-all">{address}</p>
              </div>
              <button onClick={() => { setShowModal(false); setAmount(""); setAddress(""); setSelectedMethod("bitcoin"); }}
                  className="bg-[#39FE2B] w-full py-3 font-bold rounded-md hover:bg-[#20df12] cursor-pointer mt-2">
                  DONE
              </button>
          </div>
      </div>
      )}
    </>
  );
}

export default Withdraw;
