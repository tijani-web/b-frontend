import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { adminApi } from '../../lib/api';

interface Stats {
  pendingDeposits: number;
  pendingWithdrawals: number;
  pendingKyc: number;
  totalUsers: number;
  totalDeposits: number;
  totalWithdrawals: number;
  depositVolumeByCoin: Record<string, number>;
  withdrawalVolumeByCoin: Record<string, number>;
}

export const AdminOverview = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats | null>(null);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }

    adminApi.getStats()
      .then((d) => setStats(d.data))
      .catch((err: any) => setError(err.message || 'Failed to load stats'))
      .finally(() => setLoading(false));

    fetch('/api/market/prices?symbols=BTC,ETH,USDT,USDC,SOL,BNB')
      .then(r => r.json())
      .then(d => setPrices(d.data || {}))
      .catch(() => {});
  }, [navigate]);

  const calcUSD = (volumeByCoin: Record<string, number>) =>
    Object.entries(volumeByCoin).reduce((sum, [coin, amount]) => {
      return sum + amount * (prices[coin] ?? 0);
    }, 0);

  const fmtUSD = (n: number) =>
    `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const totalDepositUSD = stats ? calcUSD(stats.depositVolumeByCoin) : 0;
  const totalWithdrawalUSD = stats ? calcUSD(stats.withdrawalVolumeByCoin) : 0;

  return (
    <AdminLayout>
      <div className="p-8 max-w-6xl">
        <h1 className="text-2xl font-bold mb-1">Admin Overview</h1>
        <p className="text-gray-400 text-sm mb-8">Platform summary and items requiring your attention.</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6 text-red-400 text-sm">
            ⚠ {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Loading...
          </div>
        ) : stats ? (
          <>
            {/* ── ACTION REQUIRED ───────────────────────────────────── */}
            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-4">⚡ Action Required</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">

              {/* Pending Deposits */}
              <button
                onClick={() => navigate('/admin/deposits')}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-left hover:border-yellow-500/40 transition-all group relative overflow-hidden"
              >
                {stats.pendingDeposits > 0 && (
                  <span className="absolute top-4 right-4 bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                    {stats.pendingDeposits}
                  </span>
                )}
                <p className="text-gray-400 text-sm mb-2">Pending Deposits</p>
                <p className="text-3xl font-bold text-yellow-400">{stats.pendingDeposits}</p>
                <p className="text-xs text-gray-600 mt-2 group-hover:text-yellow-500/60 transition-colors">Click to review →</p>
              </button>

              {/* Pending Withdrawals */}
              <button
                onClick={() => navigate('/admin/withdrawals')}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-left hover:border-blue-500/40 transition-all group relative overflow-hidden"
              >
                {stats.pendingWithdrawals > 0 && (
                  <span className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {stats.pendingWithdrawals}
                  </span>
                )}
                <p className="text-gray-400 text-sm mb-2">Pending Withdrawals</p>
                <p className="text-3xl font-bold text-blue-400">{stats.pendingWithdrawals}</p>
                <p className="text-xs text-gray-600 mt-2 group-hover:text-blue-500/60 transition-colors">Click to process →</p>
              </button>

              {/* Pending KYC */}
              <button
                onClick={() => navigate('/admin/kyc')}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-left hover:border-purple-500/40 transition-all group relative overflow-hidden"
              >
                {stats.pendingKyc > 0 && (
                  <span className="absolute top-4 right-4 bg-purple-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {stats.pendingKyc}
                  </span>
                )}
                <p className="text-gray-400 text-sm mb-2">Pending KYC</p>
                <p className="text-3xl font-bold text-purple-400">{stats.pendingKyc}</p>
                <p className="text-xs text-gray-600 mt-2 group-hover:text-purple-500/60 transition-colors">Click to verify →</p>
              </button>
            </div>

            {/* ── ALL-TIME TOTALS (CLICKABLE) ─────────────────────── */}
            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-4">📊 Platform Statistics (All Time)</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">

              {/* Total Users — clickable */}
              <button
                onClick={() => navigate('/admin/users')}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-left hover:border-green-500/40 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-gray-400 text-sm">Total Users</p>
                  <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-2xl font-bold text-green-400">{stats.totalUsers}</p>
                <p className="text-xs text-gray-600 mt-2 group-hover:text-green-500/60 transition-colors">View all users →</p>
              </button>

              {/* Total Deposits — clickable */}
              <button
                onClick={() => navigate('/admin/deposits')}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-left hover:border-yellow-500/40 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-gray-400 text-sm">Total Deposits</p>
                  <div className="w-8 h-8 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                </div>
                <p className="text-2xl font-bold text-yellow-400">{stats.totalDeposits}</p>
                <p className="text-xs text-gray-500 mt-1">{fmtUSD(totalDepositUSD)} approved volume</p>
                <p className="text-xs text-gray-600 mt-1 group-hover:text-yellow-500/60 transition-colors">View all deposits →</p>
              </button>

              {/* Total Withdrawals — clickable */}
              <button
                onClick={() => navigate('/admin/withdrawals')}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-left hover:border-blue-500/40 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-gray-400 text-sm">Total Withdrawals</p>
                  <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </div>
                </div>
                <p className="text-2xl font-bold text-blue-400">{stats.totalWithdrawals}</p>
                <p className="text-xs text-gray-500 mt-1">{fmtUSD(totalWithdrawalUSD)} processed volume</p>
                <p className="text-xs text-gray-600 mt-1 group-hover:text-blue-500/60 transition-colors">View all withdrawals →</p>
              </button>
            </div>

            {/* ── VOLUME BREAKDOWN BY COIN ──────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
                <p className="text-gray-400 text-sm mb-3 font-medium">Approved Deposit Volume (by coin)</p>
                {Object.entries(stats.depositVolumeByCoin).length === 0 ? (
                  <p className="text-gray-600 text-xs">No approved deposits yet</p>
                ) : (
                  <div className="space-y-2">
                    {Object.entries(stats.depositVolumeByCoin).map(([coin, amount]) => (
                      <div key={coin} className="flex justify-between text-sm">
                        <span className="text-gray-400 font-medium">{coin}</span>
                        <div className="text-right">
                          <span className="font-mono text-white">{Number(amount).toFixed(6)}</span>
                          {prices[coin] && (
                            <span className="text-gray-500 text-xs ml-2">≈ {fmtUSD(Number(amount) * prices[coin])}</span>
                          )}
                        </div>
                      </div>
                    ))}
                    <div className="border-t border-neutral-800 pt-2 mt-2 flex justify-between">
                      <span className="text-gray-500 text-xs">Total USD</span>
                      <span className="text-yellow-400 font-bold text-sm">{fmtUSD(totalDepositUSD)}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
                <p className="text-gray-400 text-sm mb-3 font-medium">Processed Withdrawal Volume (by coin)</p>
                {Object.entries(stats.withdrawalVolumeByCoin).length === 0 ? (
                  <p className="text-gray-600 text-xs">No processed withdrawals yet</p>
                ) : (
                  <div className="space-y-2">
                    {Object.entries(stats.withdrawalVolumeByCoin).map(([coin, amount]) => (
                      <div key={coin} className="flex justify-between text-sm">
                        <span className="text-gray-400 font-medium">{coin}</span>
                        <div className="text-right">
                          <span className="font-mono text-white">{Number(amount).toFixed(6)}</span>
                          {prices[coin] && (
                            <span className="text-gray-500 text-xs ml-2">≈ {fmtUSD(Number(amount) * prices[coin])}</span>
                          )}
                        </div>
                      </div>
                    ))}
                    <div className="border-t border-neutral-800 pt-2 mt-2 flex justify-between">
                      <span className="text-gray-500 text-xs">Total USD</span>
                      <span className="text-blue-400 font-bold text-sm">{fmtUSD(totalWithdrawalUSD)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </AdminLayout>
  );
};
