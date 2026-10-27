# PLINKGO GAME
 
A full-stack Plinko arcade game built with React, TypeScript, and a REST API backend. Players drop balls through a peg-filled board, land on multiplier bins, and win or lose based on where the ball settles — all tracked with virtual wallet balances, transaction history, and a leaderboard.
 
---
 
## Pages Overview
 
| Page | Description |
|------|-------------|
| **Login / Signup** | Authentication with Zod validation, avatar selection modal |
| **Main Game** | Interactive Plinko canvas with configurable risk, rows, and bet amount |
| **History** | Paginated game history with profit/loss stats and weekly volume tracking |
| **Wallet** | Deposit & withdraw with Bitcoin, Bank Transfer, or Credit Card |
| **Leaderboard** | Hall of Legends — ranked players and recent big wins |
| **Settings** | Edit username, avatar, and security options |
 
---
 
## Tech Stack
 
### Frontend
- **React 18** with **TypeScript**
- **Tailwind CSS v4** — utility-first styling with responsive breakpoints
- **React Router v6** — client-side routing with protected routes
- **Zod** — schema-based form validation
- **Tabler Icons** — consistent icon set throughout the UI
- **HTML5 Canvas API** — real-time Plinko physics simulation
### Backend
- REST API with endpoints for users, wallets, history, and transactions
- JWT-based authentication (`token` stored in `localStorage`)
---
 
## Getting Started
 
### Prerequisites
- Node.js 18+
- npm or yarn
### Installation
 
```bash
# Clone the repository
git clone https://github.com/your-username/plinkgo-game.git
cd plinkgo-game
 
# Install dependencies
npm install
 
# Start the development server
npm run dev
```
 
### Environment Variables
 
Create a `.env` file in the project root:
 
```env
VITE_API_BASE_URL=http://localhost:3000
```
 
---
 
## Project Structure

```
src/
├── api/                        # API call functions
│   ├── history.ts
│   ├── transaction.ts
│   ├── user.ts
│   └── wallet.ts
├── assets/                     # Static assets
├── components/                 # Reusable UI components
│   ├── ConfigGamePlay.tsx      # Bet amount, risk level, rows config
│   ├── Deposit.tsx             # Deposit form with payment methods
│   ├── FormLogin.tsx           # Login form with validation
│   ├── FormRegister.tsx        # Signup form with validation
│   ├── ModalImage.tsx          # Avatar picker modal
│   ├── PlinkoGamePlay.tsx      # Canvas-based physics game
│   ├── SideBar.tsx             # Collapsible navigation sidebar
│   ├── ToggleSwitch.tsx        # Toggle for 2FA setting
│   ├── TopBar.tsx              # Header with wallet balance + deposit
│   └── Withdraw.tsx            # Withdraw form with payment methods
├── images/                     # Avatar images (avatar-1 to avatar-7)
├── lib/                        # Library utilities
├── pages/                      # Route-level page components
│   ├── HistoryPage.tsx
│   ├── index.ts
│   ├── LeaderboardPage.tsx
│   ├── LoginPage.tsx
│   ├── MainPage.tsx
│   ├── SettingPage.tsx
│   ├── SignupPage.tsx
│   └── WalletPage.tsx
├── schemas/                    # Zod validation schemas
│   ├── depositSchema.ts
│   └── withdrawSchema.ts
├── types/                      # TypeScript interfaces
│   ├── Ball.ts
│   ├── GameConfig.ts
│   ├── History.ts
│   ├── Transaction.ts
│   ├── User.ts
│   └── Wallet.ts
└── utils/                      # Helper functions
    ├── bin.ts                  # BIN_COLORS constant
    ├── dropBall.ts             # Ball spawning logic
    ├── generateMultipliers.ts
    ├── paymentValidation.ts
    └── riskConfig.ts
```
 
---
 
## Game Mechanics
 
The Plinko board is rendered on an HTML5 Canvas at 750×650px. When a player places a bet:
 
1. A ball is spawned at the top center of the board
2. It falls under gravity, bouncing off pegs using reflection physics
3. It lands in one of 11 multiplier bins at the bottom
4. The payout (`bet × multiplier`) is calculated and the wallet is updated
5. A history record is created for the round
### Configuration Options
 
| Setting | Options |
|---------|---------|
| **Risk Level** | Easy / Medium / Hard |
| **Rows** | 8 / 12 / 16 |
| **Bet Amount** | $0.10 – $1,000 (or up to wallet balance) |
 
Risk level and row count affect the multiplier distribution — higher risk means more extreme multipliers at the edges.
 
---
 
## Wallet System
 
- Each user has a wallet created automatically on signup
- Supports **Deposit** and **Withdraw** via Bitcoin, Bank Transfer, or Credit Card
- Withdrawal includes a **$2.50 processing fee**
- All transactions are recorded with a unique ID (e.g. `BTC-LK3M2X-A4XZ91`)
- Stats tracked: `balance`, `totalEarning`, `totalDeposit`, `highestProfit`
---
 
## Leaderboard
 
Players are ranked by **total deposit** descending. The leaderboard also shows:
- Current balance
- Highest single profit
- Recent big wins (top 3 from game history)
---
 
## Authentication
 
- JWT token stored in `localStorage` under the key `token`
- `userId` also stored in `localStorage` after login
- All protected pages redirect to `/login` if no token is found
- Logout clears both `token` and `userId` from storage
---
 
## Responsive Design
 
All pages are fully responsive across three breakpoints:
 
| Breakpoint | Target |
|------------|--------|
| Default | Mobile (< 640px) |
| `sm:` 640px+ | Tablet |
| `lg:` / `xl:` 1024–1280px+ | Laptop / Desktop |
 
The sidebar collapses into a slide-in drawer on mobile with a hamburger toggle. The Plinko canvas scrolls horizontally on narrow screens since its physics depend on a fixed coordinate space.
 
---
 
## Avatars
 
7 poker-themed avatar images are available for profile customization. Players can change their avatar from the Signup page or the Settings page via a modal picker.
 
