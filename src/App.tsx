import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Navbar } from "@/sections/Navbar";
import { MainContent } from "@/sections/MainContent";
import { FloatingWidget } from "@/components/FloatingWidget";
import { CookieBanner } from "@/components/CookieBanner";
import { LoadingScreen } from "@/components/LoadingScreen";
import HelpCenterPage from "./generated-pages/help-center";
import StakingPage from "./generated-pages/staking";
import { Markets } from "./pages/Markets";
import RealEstatePage from "./generated-pages/real-estate";
import AboutPage from "./generated-pages/about";
import ContactPage from "./generated-pages/contact";
import CryptoPage from "./generated-pages/crypto";
import StocksPage from "./generated-pages/stocks";
import CopyTradingPage from "./generated-pages/copy-trading";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Mining } from "./pages/Dashboard/Mining";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { TransactionHistory } from "./pages/TransactionHistory";
import { Earn } from "./pages/Earn";
import { Settings } from "./pages/Settings";
import { KYCUpload } from "./pages/KYC";
import { Assets } from "./pages/Assets";
import { CopyTradingDashboard } from "./pages/Dashboard/CopyTrading";
import { Deposit } from "./pages/Deposit";
import { Withdraw } from "./pages/Withdraw";
import { AdminOverview } from "./pages/Admin/AdminOverview";
import { AdminDeposits } from "./pages/Admin/AdminDeposits";
import { AdminWithdrawals } from "./pages/Admin/AdminWithdrawals";
import { AdminKYC } from "./pages/Admin/AdminKYC";
import { AdminUsers } from "./pages/Admin/AdminUsers";
import { AdminUserDetail } from "./pages/Admin/AdminUserDetail";
import { AdminWalletSettings } from "./pages/Admin/AdminWalletSettings";

const EntryPage = () => {
  return (
    <body className="accent-auto bg-black caret-transparent text-black block text-base not-italic normal-nums font-normal tracking-[normal] leading-4 list-outside list-disc outline-[3px] pointer-events-auto text-start no-underline indent-[0px] normal-case visible border-separate top-0 font-inter">
      <div className="caret-transparent hidden outline-[3px] no-underline"></div>
      <LanguageSelector />
      <Navbar />
      <div className="caret-transparent block outline-[3px] no-underline md:hidden"></div>
      <MainContent />
      <div className="caret-transparent block outline-[3px] absolute no-underline"></div>
      <FloatingWidget />
      <CookieBanner />
    </body>
  );
};

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loading screen briefly then fade out
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <LoadingScreen />}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="/help-center" element={<HelpCenterPage />} />
        <Route path="/staking" element={<StakingPage />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/real-estate" element={<RealEstatePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/crypto" element={<CryptoPage />} />
        <Route path="/stocks" element={<StocksPage />} />
        <Route path="/copy-trading" element={<CopyTradingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mining" element={<Mining />} />
        <Route path="/transactions" element={<TransactionHistory />} />
        <Route path="/earn" element={<Earn />} />
        <Route path="/dashboard/copy-trading" element={<CopyTradingDashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/kyc" element={<KYCUpload />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/deposit" element={<Deposit />} />
        <Route path="/withdraw" element={<Withdraw />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminOverview />} />
        <Route path="/admin/deposits" element={<AdminDeposits />} />
        <Route path="/admin/withdrawals" element={<AdminWithdrawals />} />
        <Route path="/admin/kyc" element={<AdminKYC />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/users/:id" element={<AdminUserDetail />} />
        <Route path="/admin/wallet-settings" element={<AdminWalletSettings />} />

        <Route path="*" element={<EntryPage />} />
      </Routes>
    </BrowserRouter>
    </>
  );
};
