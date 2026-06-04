import { useEffect, useState } from 'react'
import { IconCreditCardPay, IconCurrencyDollar, IconCurrencyBitcoin, IconBuildingBank, IconCreditCardFilled, IconCircleCheckFilled, IconX } from "@tabler/icons-react";
import { depositSchema, type DepositSchema, type DepositErrors } from '../schemas/depositSchema';

import * as walletApi from "../api/wallet";
import * as transactionApi from "../api/transaction";
import type { Wallet } from "../types/Wallet"
import type { Transaction } from '../types/Transaction';

interface TransactionTableProps {
    transactions: Transaction[];
    onSuccess: () => void;
}

function Deposit({ transactions, onSuccess }: TransactionTableProps) {

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

    // API call update total deposit of user's wallet
    const updateTotalDeposit = async (walletId: number, userId: number, amount: number) => {
        await walletApi.updateTotalDeposit(walletId, userId, amount)
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
    //                        Convert Time
    // =============================================================

    const timeAgo = (timestamp: string) => {
        const now = new Date();
        const past = new Date(timestamp);
        const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

        if (seconds < 60) return `${seconds} seconds ago`;
        
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
        
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        
        const days = Math.floor(hours / 24);
        if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
        
        const months = Math.floor(days / 30);
        if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
        
        const years = Math.floor(months / 12);
        return `${years} year${years > 1 ? "s" : ""} ago`;
    };

    // =============================================================
    // =============================================================

    // =============================================================
    //                        Pagination
    // =============================================================

    const ROWS_PER_PAGE = 5;

    const [currentPage, setCurrentPage] = useState(1);

    const sorted = [...transactions].sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    );

    const totalPages = Math.ceil(sorted.length / ROWS_PER_PAGE);
    const paginated = sorted.slice(
        (currentPage - 1) * ROWS_PER_PAGE,
        currentPage * ROWS_PER_PAGE
    );

    // =============================================================
    // =============================================================

    // =============================================================
    //                        Deposit Form
    // =============================================================

    const [amount, setAmount] = useState('');
    const [selectedPayment, setSelectedPayment] = useState<'bitcoin' | 'bank' | 'card'>('bitcoin');
    const [formData, setFormData] = useState({
        address: '',
        iban: '',
        cardNumber: '',
    });

    const [errors, setErrors] = useState<DepositErrors>({});

    const handleAmount = (val: number) => {
        setAmount(String(val));
        setErrors(prev => ({ ...prev, amount: undefined }));
    };

    const handleSelectPayment = (method: 'bitcoin' | 'bank' | 'card') => {
        setSelectedPayment(method);
        // clear payment errors when switching
        setErrors(prev => ({ ...prev, address: undefined, iban: undefined, cardNumber: undefined }));
    };

    const handleFieldChange = (field: keyof typeof formData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setErrors(prev => ({ ...prev, [field]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload: DepositSchema = {
            amount,
            paymentMethod: selectedPayment,
            address: formData.address,
            iban: formData.iban,
            cardNumber: formData.cardNumber,
        };

        const result = depositSchema.safeParse(payload);

        if (!result.success) {
            const fieldErrors: DepositErrors = {};
            result.error.issues.forEach(err => {
                const field = err.path[0] as keyof DepositSchema;
                if (!fieldErrors[field]) fieldErrors[field] = err.message;
            });
            setErrors(fieldErrors);
            return;
        }

        if (!walletId) return;

        const depositAmount = Number(amount);

        // All valid — send to API
        console.log('Submit:', result.data);
        await updateBalance(walletId, userId, Number(wallet?.balance) + depositAmount);
        await createTransaction(
            generateTransactionId(selectedPayment), 
            transactionMethod(selectedPayment),
            "deposit",
            Number(amount),
            walletId
        )
        await updateTotalDeposit(walletId, userId, Number(wallet?.totalDeposit) + depositAmount);
        console.log(generateTransactionId(selectedPayment));
        

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

    // =============================================================
    // =============================================================

    // =============================================================
    //                   Show Modal Successfully
    // =============================================================

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!showModal) {
            setFormData({
                address: '',
                iban: '',
                cardNumber: '',
            });
            setAmount("");
            setSelectedPayment('bitcoin');
        }
    }, [showModal])

    // =============================================================
    // =============================================================

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
                    <h2 className='text-white text-3xl font-medium'>${wallet?.balance}</h2>
                </div>
                </div>
                <div className='flex justify-center items-center bg-[#13212E] w-full h-25 px-3 border-l-4 border-[#FFC965] rounded-lg'>
                <div>
                    <p className='inter text-[#A2ACB9] text-xs'>TOTAL EARNINGS</p>
                    <h2 className='text-white text-3xl font-medium'>${wallet?.totalEarning}</h2>
                </div>
                </div>
                <div className='flex justify-center items-center bg-[#13212E] w-full h-25 px-3 border-l-4 border-[#FF7351] rounded-lg'>
                <div>
                    <p className='inter text-[#A2ACB9] text-xs'>TOTAL DEPOSITS</p>
                    <h2 className='text-white text-3xl font-medium'>${wallet?.totalDeposit}</h2>
                </div>
                </div>
            </div>
            </section>
            {/* History: recent transaction */}
            <section className='w-175 mt-10 rounded-lg'>
            <header className='space-grotesk py-5 bg-[#09141F]'>
                <p className='ml-4 text-white font-medium'>RECENT EARNING</p>
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
                <tbody>
                    {transactions.length !== 0 && 
                    (
                        paginated.map((transaction) => (
                            <>
                            <tr className='inter font-light border-b border-[#13212E]'>
                                <td className='text-white px-4 py-5'>{transaction.transactionId}</td>
                                <td className='text-white px-4 py-5'>{transaction.method}</td>
                                <td className='text-[#A2ACB9] px-4 py-5'>{timeAgo(transaction.time)}</td>
                                <td className={`space-grotesk ${transaction.type === "deposit" ? "text-[#39FE2B]" : "text-red-500"} px-4 py-5 font-medium`}>{transaction.type === "deposit" ? `+$${transaction.amount}` : `-$${transaction.amount}`}</td>
                            </tr>
                            </>
                        ))
                    )
                    }
                </tbody>
            </table>
            {transactions.length === 0 && <p className='text-white text-lg text-center mt-5'>No transactions found.</p>}
            {/* Pagination */}
            <div className='flex items-center justify-between w-175 mt-3 px-1'>
                <p className='text-[#A2ACB9] text-sm inter font-light'>
                    Showing {Math.min((currentPage - 1) * ROWS_PER_PAGE + 1, transactions.length)}–{Math.min(currentPage * ROWS_PER_PAGE, transactions.length)} of {transactions.length}
                </p>

                <div className='flex items-center gap-1'>
                    {/* Prev */}
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className='px-3 py-1.5 text-sm inter text-[#A2ACB9] bg-[#13212E] hover:bg-[#1a2f42] disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded'
                    >
                        ‹
                    </button>

                    {/* Page numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1.5 text-sm inter rounded transition-colors ${
                                page === currentPage
                                    ? 'bg-[#39FE2B] text-[#09141F] font-semibold'
                                    : 'text-[#A2ACB9] bg-[#13212E] hover:bg-[#1a2f42]'
                            }`}
                        >
                            {page}
                        </button>
                    ))}

                    {/* Next */}
                    <button
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className='px-3 py-1.5 text-sm inter text-[#A2ACB9] bg-[#13212E] hover:bg-[#1a2f42] disabled:opacity-30 disabled:cursor-not-allowed transition-colors rounded'
                    >
                        ›
                    </button>
                </div>
            </div>
            </section>
        </div>
        {/* Instant top-up */}
        <form onSubmit={handleSubmit} className='space-grotesk w-95 bg-[#192735] p-5 rounded-xl'>
            <header className='flex items-center gap-2 my-5'>
            <IconCreditCardPay className='text-[#AFFF9A]'></IconCreditCardPay>
            <h1 className='text-white text-xl font-bold'>INSTANT TOP-UP</h1>
            </header>
            {/* Selecting Amount */}
            <section className='mb-4'>
                <p className='text-[#A2ACB9] text-sm font-medium mb-3'>SELECT AMOUNT</p>
                <div className='flex gap-5 mb-3'>
                    <button type='button' onClick={() => handleAmount(50)} className={`w-25 py-4 bg-[#1E2D3D] text-white font-bold rounded-md cursor-pointer border-1 hover:bg-[#263544] ${Number(amount) === 50 ? " border-[#AFFF9A]" : "border-[#1E2D3D]"}`}>$50</button>
                    <button type='button' onClick={() => handleAmount(100)} className={`w-25 py-4 bg-[#1E2D3D] text-white font-bold rounded-md cursor-pointer border-1 hover:bg-[#263544] ${Number(amount) === 100 ? "border-[#AFFF9A]" : "border-[#1E2D3D]"}`}>$100</button>
                    <button type='button' onClick={() => handleAmount(500)} className={`w-25 py-4 bg-[#1E2D3D] text-white font-bold rounded-md cursor-pointer border-1 hover:bg-[#263544] ${Number(amount) === 500 ? "border-[#AFFF9A]" : "border-[#1E2D3D]"}`}>$500</button>
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
                {selectedPayment === "bitcoin" && 
                <>
                <div className='bg-black flex items-center px-2 py-4 rounded-lg'>
                    <input type="text" name='address' value={formData.address} onChange={e => handleFieldChange('address', e.target.value)}
                    placeholder='Enter BTC wallet address' 
                    className='text-white w-full text-lg px-3 placeholder:font-lignt
                    border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                    focus:outline-none focus:ring-0 focus:border-transparent'/>
                </div>
                </>
                }
                {selectedPayment === "bitcoin" && errors.address && <p className="text-red-500">{errors.address}</p>}
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
                {selectedPayment === "bank" && 
                <>
                <div className='bg-black flex items-center px-2 py-4 rounded-lg'>
                    <input type="text" value={formData.iban} onChange={e => handleFieldChange('iban', e.target.value)}
                    placeholder='Enter Bank address' 
                    className='text-white w-full text-lg px-3 placeholder:font-lignt
                    border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                    focus:outline-none focus:ring-0 focus:border-transparent'/>
                </div>
                </>
                }
                {selectedPayment === "bank" && errors.iban && <p className="text-red-500">{errors.iban}</p>}
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
                {selectedPayment === "card" && 
                <>
                <div className='bg-black flex items-center px-2 py-4 rounded-lg'>
                    <input type="text" value={formData.cardNumber} onChange={e => handleFieldChange('cardNumber', e.target.value)}
                    placeholder='Enter Credit Card address' 
                    className='text-white w-full text-lg px-3 placeholder:font-lignt
                    border-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
                    focus:outline-none focus:ring-0 focus:border-transparent'/>
                </div>
                </>
                }
                {selectedPayment === "card" && errors.cardNumber && <p className="text-red-500">{errors.cardNumber}</p>}
                {/* Deposit */}
                <button type='submit' className='bg-[#39FE2B] w-full py-4 mt-4 text-xl font-bold rounded-md hover:bg-[#20df12] cursor-pointer'>CONFIRM DEPOSIT</button>
            </section>
            <section>
            <p className='text-[#A2ACB9] text-xs mt-4 text-center'>TRANSACTION ARE ENCRYPTED AND <br /> PROCESSED VIA KINETIC-GRADE SECURE <br /> LAYERS. NO FEES ON INITIAL DAILY TOP-UP</p>
            </section>
        </form>
    </div>
    {showModal &&
    <>
    {/* Backdrop */}
      <div
        onClick={() => setShowModal(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div className="space-grotesk bg-[#0b1824] rounded-2xl p-8 w-full max-w-sm shadow-2xl">

          {/* Close button */}
          <div className="flex justify-end mb-2">
            <button onClick={() => setShowModal(false)} className="text-[#94A3B8] hover:text-white cursor-pointer">
              <IconX size={20} />
            </button>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-5">
            <IconCircleCheckFilled size={64} className="text-[#39FE2B]" />
          </div>

          {/* Text */}
          <h2 className="text-white text-2xl font-bold text-center mb-2">
            Deposit Successful!
          </h2>
          <p className="text-[#94A3B8] text-sm text-center mb-6">
            Your funds are being processed and will reflect in your balance shortly.
          </p>

          {/* Summary */}
          <div className="bg-[#192735] rounded-xl p-4 mb-6 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#94A3B8]">Amount</span>
              <span className="text-white font-bold">${amount}</span>
            </div>
            <div className="border-t border-[#1E2D3D]" />
            <div className="flex justify-between text-sm">
              <span className="text-[#94A3B8]">Method</span>
              <span className="text-white font-bold">{selectedPayment}</span>
            </div>
            <div className="border-t border-[#1E2D3D]" />
            <div className="flex justify-between text-sm">
              <span className="text-[#94A3B8]">Status</span>
              <span className="text-[#39FE2B] font-bold">Confirmed</span>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={() => setShowModal(false)}
            className="bg-[#39FE2B] w-full py-3 font-bold rounded-md hover:bg-[#20df12] cursor-pointer"
          >
            BACK TO GAME
          </button>
        </div>
      </div>
    </>
    }
    </>
  )
}

export default Deposit