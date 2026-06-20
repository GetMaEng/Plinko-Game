import { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import TopBar from '../components/TopBar';
import { IconTrendingUp, IconStairs, IconChevronLeft, IconChevronRight, IconTrendingDown } from "@tabler/icons-react";
import * as walletApi from "../api/wallet"
import * as historyApi from "../api/history"
import type { History } from '../types/History';
import { BIN_COLORS } from '../utils/bin';
import { Navigate } from 'react-router-dom';

function HistoryPage() {

    const token = localStorage.getItem('token') // or however you store auth

    if (!token) {
      return <Navigate to="/login" replace />
    }

    const userId = (Number(localStorage.getItem("userId")));

    // =============================================================
    //                        APIs Call Wallet
    // =============================================================

    const [walletId, setWalletId] = useState<number>();

    // API call wallet ID of user
    const getWalletId = async (userId: number) => {
        const response = await walletApi.getWalletId(userId);
        if (response.success) {    
            setWalletId(response.data);
        }
    }

    useEffect(() => {
        getWalletId(userId)    
    }, [userId]);

    // =============================================================
    //                        APIs Call Wallet
    // =============================================================

    const [histories, setHistories] = useState<History[]>([])

    // API call history of this wallet ID
    const getAllUserHistory = async(walletId: number) => {
      const response = await historyApi.getAllUserHistory(walletId);
      if (response.success) {
        setHistories(response.data);
      }
    }

    useEffect(() => {
      if (!walletId) return;
      getAllUserHistory(walletId);
    }, [walletId])

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
    //                Maps a multipler to correct color
    // =============================================================
    
    // Helper to parse "x0.3" → 0.3
    const parseMult = (m: string) => parseFloat(m.replace('x', ''));

    // Maps a multiplier value to the closest BIN_COLOR
    function getMultiplierColor(mult: number, allMultipliers: number[]): string {
      const unique = [...new Set(allMultipliers)].sort((a, b) => a - b);
      const closest = unique.reduce((a, b) =>
        Math.abs(b - mult) < Math.abs(a - mult) ? b : a
      );
      const idx = unique.indexOf(closest);
      
      // Lowest mult → center of BIN_COLORS (yellow), highest → edges (red)
      // Mirror: map sorted index to distance from center of BIN_COLORS
      const mid = Math.floor(BIN_COLORS.length / 2); // 5
      const normalized = idx / (unique.length - 1);   // 0 (lowest) → 1 (highest)
      const colorIdx = Math.round(mid - normalized * mid); // 5 → 0
      
      return BIN_COLORS[colorIdx];
    }

    // Collect all unique multiplier values from history for color mapping
    const allMultipliers = histories.map(h => parseMult(h.multiple));

    // =============================================================
    //                        Pagination
    // =============================================================
    const PAGE_SIZE = 5;
    const [page, setPage] = useState(0);

    const totalPages = Math.ceil(histories.length / PAGE_SIZE);
    const sortedHistories = [...histories].sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
    );
    const paginated = sortedHistories.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

    function getPaginationItems(page: number, totalPages: number): (number | '...')[] {
      if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i);

      const items: (number | '...')[] = [];
      const showAround = new Set([0, 1, page - 1, page, page + 1, totalPages - 2, totalPages - 1]
        .filter(n => n >= 0 && n < totalPages));

      let prev = -1;
      for (const n of [...showAround].sort((a, b) => a - b)) {
        if (prev !== -1 && n - prev > 1) items.push('...');
        items.push(n);
        prev = n;
      }

      return items;
    }

    // =============================================================
    //                    Stats Calculations
    // =============================================================

    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);

    // Total volume = sum of all bets
    const totalVolume = histories.reduce((sum, h) => sum + parseFloat(String(h.bet)), 0);

    // This week's volume vs last week's volume
    const thisWeekVolume = histories
      .filter(h => new Date(h.time) >= oneWeekAgo)
      .reduce((sum, h) => sum + parseFloat(String(h.bet)), 0);

    const lastWeekVolume = histories
      .filter(h => new Date(h.time) >= twoWeeksAgo && new Date(h.time) < oneWeekAgo)
      .reduce((sum, h) => sum + parseFloat(String(h.bet)), 0);

    const volumeChangePercent = lastWeekVolume === 0
      ? null
      : ((thisWeekVolume - lastWeekVolume) / lastWeekVolume) * 100;

    // Net result = sum of profit amounts (positive for profit, negative for loss)
    const netResult = histories.reduce((sum, h) => {
      if (h.status === "profit") return sum + parseFloat(String(h.amount));
      if (h.status === "loss") return sum - parseFloat(String(h.amount));
      return sum;
    }, 0);

    // Total rounds
    const totalRounds = histories.length;

  return (
    <div className="flex">
        <SideBar />
        <div className="w-full min-w-0">
            <TopBar />
            <header className='mx-4 md:ml-10 my-6 md:my-10'>
                <h1 className='space-grotesk text-white text-2xl md:text-4xl font-medium'>Game History</h1>
                <p className='inter text-[#A2ACB9] font-light text-sm md:text-base'>
                    Review your history precision across all precision-gaming protocols.
                </p>
            </header>

            {/* Table — horizontally scrollable on small screens */}
            <div className='px-4 md:px-6 overflow-x-auto'>
                <table className='w-full min-w-[560px] border-collapse bg-[#09141F] rounded-lg'>
                    <thead className='space-grotesk text-[#A2ACB9] font-light bg-[#13212E]'>
                        <tr className='text-center'>
                            <th className="text-left px-3 md:px-4 py-4 md:py-5 text-xs md:text-sm">GAME NAME</th>
                            <th className="px-3 md:px-4 py-4 md:py-5 text-xs md:text-sm">TIME</th>
                            <th className="px-3 md:px-4 py-4 md:py-5 text-xs md:text-sm">BET</th>
                            <th className="px-3 md:px-4 py-4 md:py-5 text-xs md:text-sm">MULT</th>
                            <th className="px-3 md:px-4 py-4 md:py-5 text-xs md:text-sm">PROFIT/LOSS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.map((h, i) => {
                            const color = getMultiplierColor(parseMult(h.multiple), allMultipliers);
                            const profit = h.amount;
                            const isProfit = h.status === "profit";
                            const isLoss = h.status === "loss";
                            return (
                                <tr key={i} className='inter text-center font-light border-b border-[#13212E]'>
                                    <td className='text-left text-white px-3 md:px-4 py-4 md:py-5 text-xs md:text-sm'>Plinko Game</td>
                                    <td className='text-[#A2ACB9] px-3 md:px-4 py-4 md:py-5 text-xs md:text-sm'>{timeAgo(h.time)}</td>
                                    <td className='text-white px-3 md:px-4 py-4 md:py-5 text-xs md:text-sm'>${parseFloat(String(h.bet)).toFixed(2)}</td>
                                    <td className='px-3 md:px-4 py-4 md:py-5'>
                                        <div className='flex justify-center'>
                                            <div
                                                className='text-black text-center text-xs font-bold px-2 py-1 rounded-xl w-12'
                                                style={{
                                                    backgroundColor: color,
                                                    boxShadow: `0 0 8px ${color}, 0 0 16px ${color}`,
                                                    border: `1px solid ${color}`,
                                                }}
                                            >
                                                x{h.multiple}
                                            </div>
                                        </div>
                                    </td>
                                    <td className={`space-grotesk px-3 md:px-4 py-4 md:py-5 font-medium text-xs md:text-sm ${isProfit ? 'text-[#39FE2B]' : isLoss ? 'text-[#FF4444]' : 'text-[#A2ACB9]'}`}>
                                        {isProfit ? `+$${parseFloat(String(profit)).toFixed(2)}` : isLoss ? `-$${Math.abs(profit).toFixed(2)}` : `$0.00`}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className='flex items-center justify-center gap-2 mt-4 px-4'>
                    <button
                        onClick={() => setPage(p => p - 1)}
                        disabled={page === 0}
                        className='bg-[#13212E] text-[#A2ACB9] px-3 py-1 rounded-md disabled:opacity-30 hover:bg-[#1c2f40] hover:text-white transition-colors'
                    >
                        <IconChevronLeft size={16} />
                    </button>
                    {getPaginationItems(page, totalPages).map((item, i) =>
                        item === '...'
                            ? <span key={`dots-${i}`} className='text-[#A2ACB9] px-1'>...</span>
                            : <button
                                key={item}
                                onClick={() => setPage(item)}
                                className={`px-3 py-1 rounded-md text-sm transition-colors ${item === page ? 'bg-[#1c2f40] text-white' : 'bg-[#13212E] text-[#A2ACB9] hover:bg-[#1c2f40] hover:text-white'}`}
                              >
                                {item + 1}
                              </button>
                    )}
                    <button
                        onClick={() => setPage(p => p + 1)}
                        disabled={page === totalPages - 1}
                        className='bg-[#13212E] text-[#A2ACB9] px-3 py-1 rounded-md disabled:opacity-30 hover:bg-[#1c2f40] hover:text-white transition-colors'
                    >
                        <IconChevronRight size={16} />
                    </button>
                </div>
            )}

            {/* Stats Cards */}
            <section className='mt-8 md:mt-10 pb-10 px-4 md:px-10'>
                <div className='space-grotesk flex flex-col sm:flex-row gap-4 md:gap-6 lg:gap-10'>
                    <div className='flex justify-start items-center bg-[#13212E] w-full h-24 md:h-30 rounded-lg'>
                        <div className='ml-5 md:ml-10'>
                            <p className='inter text-[#A2ACB9] text-xs'>TOTAL VOLUME</p>
                            <h2 className='text-white text-xl md:text-3xl font-medium leading-8 md:leading-10'>
                                ${totalVolume.toFixed(2)}
                            </h2>
                            <div className='flex items-center font-bold text-xs'>
                                {volumeChangePercent === null ? (
                                    <p className='text-[#A2ACB9]'>No data from last week</p>
                                ) : volumeChangePercent >= 0 ? (
                                    <>
                                        <IconTrendingUp className='text-[#AFFF9A]' size={16} />
                                        <p className='text-[#AFFF9A]'>+{volumeChangePercent.toFixed(1)}% vs last week</p>
                                    </>
                                ) : (
                                    <>
                                        <IconTrendingDown className='text-[#FF4444]' size={16} />
                                        <p className='text-[#FF4444]'>{volumeChangePercent.toFixed(1)}% vs last week</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-start items-center bg-[#13212E] w-full h-24 md:h-30 rounded-lg'>
                        <div className='ml-5 md:ml-10'>
                            <p className='inter text-[#A2ACB9] text-xs'>NET RESULT</p>
                            <h2 className={`text-xl md:text-3xl font-medium ${netResult >= 0 ? 'text-[#AFFF9A]' : 'text-[#FF4444]'}`}>
                                {netResult >= 0 ? `+$${netResult.toFixed(2)}` : `-$${Math.abs(netResult).toFixed(2)}`}
                            </h2>
                            <div className='flex items-center text-[#A2ACB9] font-bold text-xs'>
                                <IconStairs size={16} />
                                <p>{totalRounds} Total Rounds</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-start items-center bg-[#13212E] w-full h-24 md:h-30 rounded-lg'>
                        <div className='ml-5 md:ml-10'>
                            <p className='inter text-[#A2ACB9] text-xs'>FAVORITE PROTOCOL</p>
                            <h2 className='text-white text-xl md:text-3xl font-medium'>Plinko Game</h2>
                            <p className='inter text-[#A2ACB9] text-xs'>100% of total activity</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default HistoryPage;