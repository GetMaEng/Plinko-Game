import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Import react-router-dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Import pages to route for each page
import { MainPage, HistoryPage, LeaderboardPage, LoginPage, SettingPage, SignupPage, WalletPage } from "./pages/index.ts";

const router = createBrowserRouter([
  {
    path: "/", // Home route
    element: <App />, // Render the App component
  },
  {
    path: "/main-plinko-game",
    element: <MainPage/>,
  },
  {
    path: "/history-plinko",
    element: <HistoryPage/>
  },
  {
    path: "/leaderboard",
    element: <LeaderboardPage/>
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/signup",
    element: <SignupPage/>
  },
  {
    path: "/setting",
    element: <SettingPage/>
  },
  {
    path: "/wallet",
    element: <WalletPage/>
  }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
