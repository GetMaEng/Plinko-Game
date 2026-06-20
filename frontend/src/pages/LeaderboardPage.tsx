import { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import TopBar from '../components/TopBar'
import * as  userApi from '../api/user'
import * as  walletApi from '../api/wallet'
import * as  historyApi from '../api/history'
import { Navigate } from 'react-router-dom'

// ----------------------------------------------------------------
// Types
// ----------------------------------------------------------------
interface User {
  userId: number
  username: string
}

interface Wallet {
  balance: number
  highestProfit: number
  totalDeposit: number
  totalEarning: number
}

interface LeaderboardEntry {
  userId: number
  username: string
  balance: number
  totalDeposit: number
  highestProfit: number
}

interface RecentWin {
  username: string
  game: string        // e.g. "PLINKO"
  multiplier: string  // e.g. "42.5x"
  profit: number      // net gain e.g. 4250
}

// ----------------------------------------------------------------
// Helpers
// ----------------------------------------------------------------
const RANK_STYLES: Record<number, { bg: string; text: string; nameColor: string }> = {
  0: { bg: 'bg-[#39FE2B]', text: 'text-black',      nameColor: 'text-[#AFFF9A]'  },
  1: { bg: 'bg-[#FEB700]', text: 'text-black',      nameColor: 'text-[#DCE6F5]'  },
  2: { bg: 'bg-[#334958]', text: 'text-[#A2ACB9]',  nameColor: 'text-[#DCE6F5]'  },
}
const DEFAULT_RANK = { bg: 'bg-[#192735]', text: 'text-[#A2ACB9]', nameColor: 'text-[#DCE6F5]' }

const formatUSD = (value: number) =>
  `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

function SkeletonRow() {
  return (
    <tr className="border-b border-[#13212E] animate-pulse">
      {[...Array(5)].map((_, i) => (
        <td key={i} className="px-4 py-5">
          <div
            className="h-5 bg-[#1e3245] rounded mx-auto"
            style={{ width: i === 1 ? '120px' : '80px' }}
          />
        </td>
      ))}
    </tr>
  )
}

// ----------------------------------------------------------------
// Page
// ----------------------------------------------------------------
function LeaderboardPage() {

  const token = localStorage.getItem('token') // or however you store auth

  if (!token) {
    return <Navigate to="/login" replace />
  }

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState<string | null>(null)

  useEffect(() => {
    const buildLeaderboard = async () => {
      setLoading(true)
      setError(null)

      // 1️⃣  Fetch all users
      const usersRes = await userApi.getAllUserInfo()
      if (!usersRes.success) {
        setError('Failed to load users.')
        setLoading(false)
        return
      }
      const users: User[] = usersRes.data

      // 2️⃣  For every user, fetch walletId → then wallet details (in parallel)
      const entries = await Promise.all(
        users.map(async (user) => {
          // get wallet ID
          const walletIdRes = await walletApi.getWalletId(user.userId)
          if (!walletIdRes.success) return null

          const walletId: number = walletIdRes.data

          // get wallet details
          const walletRes = await walletApi.getUserWallet(walletId, user.userId)
          if (!walletRes.success) return null

          const wallet: Wallet = {
            balance:        Number(walletRes.data.balance),
            highestProfit: Number(walletRes.data.highestProfit),
            totalDeposit:   Number(walletRes.data.totalDeposit),
            totalEarning:   Number(walletRes.data.totalEarning),
          }

          return {
            userId:         user.userId,
            username:       user.username,
            balance:        wallet.balance,
            totalDeposit:   wallet.totalDeposit,
            highestProfit: wallet.highestProfit,
          } satisfies LeaderboardEntry
        })
      )

      // 3️⃣  Filter out failed entries, sort by totalDeposit descending
      const sorted = (entries.filter(Boolean) as LeaderboardEntry[]).sort(
        (a, b) => b.totalDeposit - a.totalDeposit
      )

      setLeaderboard(sorted)
      setLoading(false)
    }

    buildLeaderboard()
  }, [])

  // At the top of LeaderboardPage, alongside your other state:
  const [recentWins, setRecentWins] = useState<RecentWin[]>([])
  const [winsLoading, setWinsLoading] = useState(true)

  useEffect(() => {
    const fetchRecentWins = async () => {
      const res = await historyApi.getRecentBigWins(3)
      if (res.success) setRecentWins(res.data)
      setWinsLoading(false)
    }
    fetchRecentWins()
  }, [])

  return (
    <div className="flex">
      <SideBar />
      <div className="w-full min-w-0">
        <TopBar />
        <header className="mx-4 md:ml-10 my-6 md:my-10">
          <h1 className="space-grotesk text-white text-2xl md:text-4xl font-bold">HALL OF LEGENDS</h1>
          <div className="w-20 h-1 mt-2 bg-[#39FE2B]" />
        </header>

        <div className="flex flex-col xl:flex-row justify-center gap-8 xl:gap-15 px-4 md:px-6 xl:px-10 pb-10">

          {/* Leaderboard Table */}
          <section className="w-full xl:w-175 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse bg-[#09141F] rounded-lg">
              <thead className="space-grotesk text-[#A2ACB9] font-light bg-[#13212E]">
                <tr className="text-center">
                  <th className="px-3 md:px-4 py-4 md:py-5 text-xs md:text-sm">RANK</th>
                  <th className="text-left px-3 md:px-4 py-4 md:py-5 text-xs md:text-sm">PLAYER</th>
                  <th className="px-3 md:px-4 py-4 md:py-5 text-xs md:text-sm">BALANCE</th>
                  <th className="px-3 md:px-4 py-4 md:py-5 text-xs md:text-sm hidden sm:table-cell">TOTAL DEPOSIT</th>
                  <th className="px-3 md:px-4 py-4 md:py-5 text-xs md:text-sm">HIGHEST PROFIT</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
                ) : error ? (
                  <tr>
                    <td colSpan={5} className="text-center text-[#A2ACB9] py-10">{error}</td>
                  </tr>
                ) : (
                  leaderboard.map((entry, index) => {
                    const style     = RANK_STYLES[index] ?? DEFAULT_RANK
                    const rankLabel = String(index + 1).padStart(2, '0')

                    return (
                      <tr key={entry.userId} className="inter text-center font-light border-b border-[#13212E]">
                        <td className="py-4 md:py-5">
                          <div className="flex justify-center items-center">
                            <div className={`${style.bg} ${style.text} w-8 h-8 md:w-10 md:h-10 flex justify-center items-center font-bold rounded-sm text-sm md:text-base`}>
                              {rankLabel}
                            </div>
                          </div>
                        </td>
                        <td className={`${style.nameColor} text-left text-base md:text-xl font-bold px-3 md:px-4 py-4 md:py-5`}>
                          {entry.username}
                        </td>
                        <td className="text-[#A2ACB9] text-sm md:text-xl px-3 md:px-4 py-4 md:py-5">
                          {formatUSD(entry.balance)}
                        </td>
                        <td className="text-[#A2ACB9] text-sm md:text-xl px-3 md:px-4 py-4 md:py-5 hidden sm:table-cell">
                          {formatUSD(entry.totalDeposit)}
                        </td>
                        <td className="space-grotesk text-[#39FE2B] text-sm md:text-base px-3 md:px-4 py-4 md:py-5 font-medium">
                          +{formatUSD(entry.highestProfit)}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </section>

          {/* Recent Big Wins */}
          <section className="w-full xl:w-90">
            <header className="flex items-center gap-3 mb-5">
              <div className="w-3 h-3 rounded-full bg-[#39FE2B] shadow-[0_0_100px_#AFFF9A] blur-[1px]" />
              <h1 className="space-grotesk text-[#A2ACB9] font-bold">RECENT BIG WINS</h1>
            </header>
            {/* Win cards — single column on mobile, row wrap on sm+ */}
            <div className="flex flex-col sm:flex-row xl:flex-col gap-4 xl:gap-0">
              {winsLoading ? (
                [...Array(3)].map((_, i) => (
                  <div key={i} className="flex-1 xl:w-90 h-36 md:h-40 p-4 xl:mb-5 bg-[#192735] border-l-4 border-l-[#1e3245] animate-pulse rounded-sm" />
                ))
              ) : (
                recentWins.map((win, i) => {
                  const ACCENT_COLORS = ['#39FE2B', '#FEB700', '#FF7351']
                  const accent = ACCENT_COLORS[i % ACCENT_COLORS.length]

                  return (
                    <div
                      key={i}
                      className="space-grotesk flex-1 xl:w-90 h-36 md:h-40 p-4 xl:mb-5 bg-[#192735]"
                      style={{ borderLeft: `4px solid ${accent}` }}
                    >
                      <div className="flex flex-col h-full justify-between">
                        <div className="flex justify-between">
                          <div>
                            <p className="text-[#64748B] text-xs md:text-sm font-bold">PLAYER</p>
                            <h2 className="text-[#AFFF9A] text-base md:text-xl font-bold">{win.username}</h2>
                          </div>
                          <div className="flex flex-col items-end">
                            <p className="text-[#64748B] text-xs md:text-sm font-bold">GAME</p>
                            <p className="text-[#DCE6F5] text-xs md:text-sm font-bold">{win.game}</p>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div>
                            <p className="text-[#64748B] text-xs md:text-sm font-bold">MULTIPLIER</p>
                            <h2 className="text-base md:text-xl font-bold" style={{ color: accent }}>{win.multiplier}</h2>
                          </div>
                          <div className="flex flex-col items-end">
                            <p className="text-[#64748B] text-xs md:text-sm font-bold">PROFIT</p>
                            <h2 className="text-[#39FE2B] text-base md:text-xl font-bold">+{formatUSD(win.profit)}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}

export default LeaderboardPage
