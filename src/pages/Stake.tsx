import { useState, useEffect } from 'react';
import { Sidebar } from './Dashboard/layout/Sidebar';
import { Header } from './Dashboard/layout/Header';
import { BottomNav } from './Dashboard/layout/BottomNav';
import { useNavigate } from 'react-router-dom';

interface Pool {
  name: string;
  symbol: string;
  apy: string;
  apyNum: number;
  min: number;
  max: number;
  cycle: string;
  color: string;
}

const POOLS: Pool[] = [
  { name: 'Tether', symbol: 'USDT', apy: '14.5% APY', apyNum: 14.5, min: 100, max: 50000, cycle: 'Daily Payout', color: 'bg-emerald-500' },
  { name: 'Ethereum', symbol: 'ETH', apy: '6.2% APY', apyNum: 6.2, min: 0.1, max: 25, cycle: 'Daily Payout', color: 'bg-indigo-500' },
  { name: 'Solana', symbol: 'SOL', apy: '8.4% APY', apyNum: 8.4, min: 1, max: 300, cycle: 'Daily Payout', color: 'bg-purple-500' },
  { name: 'Bitcoin', symbol: 'BTC', apy: '4.8% APY', apyNum: 4.8, min: 0.005, max: 5, cycle: 'Daily Payout', color: 'bg-amber-500' },
  { name: 'Avalanche', symbol: 'AVAX', apy: '12.0% APY', apyNum: 12.0, min: 5, max: 1000, cycle: 'Daily Payout', color: 'bg-red-500' },
  { name: 'Polygon', symbol: 'MATIC', apy: '9.1% APY', apyNum: 9.1, min: 50, max: 10000, cycle: 'Daily Payout', color: 'bg-violet-600' },
];

export const Stake = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'pools' | 'history' | 'howItWorks'>('pools');
  const [stakeModal, setStakeModal] = useState<Pool | null>(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ title: string; type: 'success' | 'error' } | null>(null);
  const [stakes, setStakes] = useState<any[]>([]);
  const [balances, setBalances] = useState<Record<string, number>>({});
  const [stats, setStats] = useState({
    total: 0,
    activeAmount: 0,
    activeCount: 0,
    closedAmount: 0,
    closedCount: 0,
  });

  const fetchStakes = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/stake/my', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setStakes(data.stakes || []);
        setBalances(data.balances || {});
        setStats({
          total: data.totalStaked || 0,
          activeAmount: data.activeAmount || 0,
          activeCount: data.activeStakes || 0,
          closedAmount: data.closedAmount || 0,
          closedCount: data.closedStakes || 0,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStakes();
  }, []);

  const handleStake = async () => {
    const numAmount = parseFloat(stakeAmount);
    if (!stakeAmount || isNaN(numAmount) || numAmount <= 0) {
      setToastMessage({ title: 'Please enter a valid positive amount to stake.', type: 'error' });
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    if (stakeModal && numAmount < stakeModal.min) {
      setToastMessage({ title: `Minimum stake is ${stakeModal.min} ${stakeModal.symbol}`, type: 'error' });
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    if (stakeModal && numAmount > stakeModal.max) {
      setToastMessage({ title: `Maximum stake is ${stakeModal.max} ${stakeModal.symbol}`, type: 'error' });
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/stake/create', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ coin: stakeModal?.symbol, amount: stakeAmount })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setToastMessage({ title: `Successfully staked ${stakeAmount} ${stakeModal?.symbol}!`, type: 'success' });
        fetchStakes();
        setStakeModal(null);
        setStakeAmount('');
      } else {
        setToastMessage({ title: data.error || 'Staking failed', type: 'error' });
      }
    } catch (err) {
      setToastMessage({ title: 'An error occurred during staking', type: 'error' });
    } finally {
      setLoading(false);
      setTimeout(() => setToastMessage(null), 3500);
    }
  };

  const selectedCoinBalance = stakeModal ? (balances[stakeModal.symbol] || 0) : 0;
  const numInputAmount = parseFloat(stakeAmount) || 0;
  const dailyEstimate = stakeModal ? ((numInputAmount * (stakeModal.apyNum / 100)) / 365).toFixed(4) : '0.0000';
  const annualEstimate = stakeModal ? ((numInputAmount * (stakeModal.apyNum / 100))).toFixed(2) : '0.00';
  const hasSufficient = selectedCoinBalance >= numInputAmount && numInputAmount > 0;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-inter overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 md:ml-[260px] flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full pb-32 md:pb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#ff6a00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-white tracking-tight">Staking & Yield</h1>
            </div>
            <button
              onClick={() => navigate('/deposit')}
              className="px-4 py-2 bg-[#ff6a00] hover:bg-[#ff7b1a] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow"
            >
              Deposit Crypto
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
            <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-6">
              <div className="text-2xl font-bold text-white mb-1">
                ${stats.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-sm font-semibold text-gray-300">Total Staked Volume</div>
              <div className="text-xs text-gray-500 mt-1">{stats.activeCount + stats.closedCount} Total Stakings</div>
            </div>
            <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-6">
              <div className="text-2xl font-bold text-emerald-400 mb-1">
                ${stats.activeAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-sm font-semibold text-gray-300">Active Earning Stakes</div>
              <div className="text-xs text-gray-500 mt-1">{stats.activeCount} Active Pools</div>
            </div>
            <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-6">
              <div className="text-2xl font-bold text-gray-400 mb-1">
                ${stats.closedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-sm font-semibold text-gray-300">Completed Stakes</div>
              <div className="text-xs text-gray-500 mt-1">{stats.closedCount} Settled</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-[#222] mb-6 overflow-x-auto">
            {(['pools', 'history', 'howItWorks'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-bold transition-colors border-b-2 -mb-px whitespace-nowrap ${
                  activeTab === tab ? 'text-white border-[#ff6a00]' : 'text-gray-500 border-transparent hover:text-gray-300'
                }`}
              >
                {tab === 'howItWorks' ? 'How it works' : tab === 'history' ? `Your history (${stakes.length})` : 'Available Pools'}
              </button>
            ))}
          </div>

          {/* Pools Tab */}
          {activeTab === 'pools' && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-base font-bold text-white mb-4">Select a Staking Pool</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {POOLS.map(pool => {
                  const userBal = balances[pool.symbol] || 0;
                  return (
                    <div
                      key={pool.name}
                      className="bg-[#141414] border border-[#222] rounded-xl p-5 flex flex-col hover:border-[#333] transition-all relative group"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full ${pool.color} flex items-center justify-center shrink-0 shadow`}>
                            <span className="text-white text-xs font-extrabold">{pool.symbol[0]}</span>
                          </div>
                          <div>
                            <div className="text-sm font-bold text-white leading-tight">{pool.name}</div>
                            <div className="text-xs text-gray-400 font-medium">{pool.symbol}</div>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg">
                          {pool.apy}
                        </span>
                      </div>

                      <div className="space-y-3 mb-5 flex-1 bg-[#0c0c0c] p-3.5 rounded-lg border border-[#1c1c1c]">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-400">Min. Deposit</span>
                          <span className="text-white font-semibold">{pool.min} {pool.symbol}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-400">Max. Limit</span>
                          <span className="text-white font-semibold">{pool.max.toLocaleString()} {pool.symbol}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-gray-400">Payout Cycle</span>
                          <span className="text-white font-semibold">{pool.cycle}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs pt-1 border-t border-[#1a1a1a]">
                          <span className="text-gray-500">Your Wallet</span>
                          <span className="text-gray-300 font-medium">{userBal.toLocaleString()} {pool.symbol}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setStakeModal(pool);
                          setStakeAmount('');
                        }}
                        className="w-full py-2.5 rounded-lg text-sm font-bold bg-[#ff6a00] hover:bg-[#ff7b1a] text-white transition-all shadow mt-auto"
                      >
                        Stake {pool.symbol}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="animate-in fade-in duration-300">
              <div className="bg-[#141414] border border-[#222] rounded-xl overflow-x-auto">
                {stakes.length === 0 ? (
                  <div className="p-12 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-full bg-[#1e1e1e] flex items-center justify-center mb-3 text-gray-500">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <p className="text-gray-300 font-medium text-sm mb-1">No Active or Past Stakes</p>
                    <p className="text-gray-500 text-xs mb-4">Deposit and stake your crypto into high-yield pools to start earning daily rewards.</p>
                    <button
                      onClick={() => setActiveTab('pools')}
                      className="px-4 py-2 bg-[#ff6a00] text-white text-xs font-bold rounded-lg hover:bg-[#ff7b1a] transition-colors"
                    >
                      Explore Staking Pools
                    </button>
                  </div>
                ) : (
                  <table className="w-full text-left min-w-[600px]">
                    <thead>
                      <tr className="border-b border-[#222] bg-[#0f0f0f]">
                        <th className="p-4 text-xs font-semibold text-gray-400">Pool / Asset</th>
                        <th className="p-4 text-xs font-semibold text-gray-400">Amount Staked</th>
                        <th className="p-4 text-xs font-semibold text-gray-400">Status</th>
                        <th className="p-4 text-xs font-semibold text-gray-400">Start Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stakes.map((s: any) => (
                        <tr key={s.id} className="border-t border-[#1a1a1a] hover:bg-[#181818] transition-colors">
                          <td className="p-4 text-sm font-semibold text-white flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-orange-500/20 text-[#ff6a00] flex items-center justify-center text-xs font-bold">
                              {s.coin?.[0] || 'C'}
                            </span>
                            {s.coin} Staking Pool
                          </td>
                          <td className="p-4 text-sm font-bold text-white">
                            {Number(s.amount).toLocaleString()} {s.coin}
                          </td>
                          <td className="p-4 text-sm">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                              s.status === 'ACTIVE'
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                            }`}>
                              {s.status}
                            </span>
                          </td>
                          <td className="p-4 text-sm text-gray-400">
                            {new Date(s.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* How it works Tab */}
          {activeTab === 'howItWorks' && (
            <div className="animate-in fade-in duration-300 max-w-3xl space-y-4">
              <div className="bg-[#141414] border border-[#222] rounded-xl p-6">
                <h3 className="text-base font-bold text-white mb-2">1. How Staking Works</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Staking allows you to earn reliable yields by locking crypto assets in institutional validator nodes and liquidity networks.
                  Your returns are computed based on the pool APY and credited directly to your platform wallet.
                </p>
              </div>
              <div className="bg-[#141414] border border-[#222] rounded-xl p-6">
                <h3 className="text-base font-bold text-white mb-2">2. Payout Cycles & Flexibility</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Rewards accrue on a daily basis. You can view all earning stakes in the "Your history" tab, and withdraw or restake rewards as soon as payouts settle.
                </p>
              </div>
              <div className="bg-[#141414] border border-[#222] rounded-xl p-6">
                <h3 className="text-base font-bold text-white mb-2">3. Minimum & Maximum Limits</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Each staking pool has minimum and maximum limits to protect pool liquidity. Ensure your deposit meets the minimum threshold before submitting.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
      <BottomNav />

      {/* Stake Modal */}
      {stakeModal && (
        <>
          <div className="fixed inset-0 bg-black/75 z-[100] backdrop-blur-sm" onClick={() => { setStakeModal(null); setStakeAmount(''); }} />
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl w-full max-w-md shadow-2xl pointer-events-auto overflow-hidden">
              <div className="p-6 border-b border-[#222] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-full ${stakeModal.color} flex items-center justify-center text-xs font-bold text-white`}>
                    {stakeModal.symbol[0]}
                  </div>
                  <h2 className="text-base font-bold text-white">
                    Stake {stakeModal.name} ({stakeModal.symbol})
                  </h2>
                </div>
                <button onClick={() => setStakeModal(null)} className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="p-6 space-y-5">
                <div className="grid grid-cols-3 gap-2 bg-[#0d0d0d] rounded-xl p-3 text-center border border-[#222]">
                  <div>
                    <div className="text-[11px] text-gray-500 mb-0.5">Est. APY</div>
                    <div className="text-emerald-400 text-xs font-bold">{stakeModal.apy}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 mb-0.5">Min Stake</div>
                    <div className="text-white text-xs font-bold">{stakeModal.min} {stakeModal.symbol}</div>
                  </div>
                  <div>
                    <div className="text-[11px] text-gray-500 mb-0.5">Cycle</div>
                    <div className="text-white text-xs font-bold">{stakeModal.cycle}</div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs text-gray-400 font-medium">Amount to Stake</label>
                    <span className="text-xs text-gray-400">
                      Balance: <span className="text-white font-semibold">{selectedCoinBalance.toLocaleString()} {stakeModal.symbol}</span>
                    </span>
                  </div>
                  <div className="flex items-center bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg overflow-hidden focus-within:border-[#ff6a00] transition-colors">
                    <input
                      type="number"
                      step="any"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      placeholder={`Min. ${stakeModal.min}`}
                      className="flex-1 bg-transparent px-3 py-2.5 text-white text-sm outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setStakeAmount(String(Math.min(selectedCoinBalance, stakeModal.max)))}
                      className="px-2.5 py-1 text-xs font-bold text-[#ff6a00] hover:text-[#ff7b1a] transition-colors"
                    >
                      MAX
                    </button>
                    <span className="px-3 text-gray-400 text-xs font-bold border-l border-[#2a2a2a]">{stakeModal.symbol}</span>
                  </div>
                </div>

                {numInputAmount > 0 && (
                  <div className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-xl p-3 space-y-1.5 text-xs">
                    <div className="flex justify-between text-gray-400">
                      <span>Daily Reward:</span>
                      <span className="text-emerald-400 font-semibold">+{dailyEstimate} {stakeModal.symbol}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Estimated Annual:</span>
                      <span className="text-white font-semibold">+{annualEstimate} {stakeModal.symbol}</span>
                    </div>
                  </div>
                )}

                {numInputAmount > 0 && !hasSufficient && (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-300 text-xs flex items-center justify-between">
                    <span>Insufficient {stakeModal.symbol} balance.</span>
                    <button
                      onClick={() => navigate('/deposit')}
                      className="underline font-bold text-white hover:text-[#ff6a00]"
                    >
                      Deposit Now
                    </button>
                  </div>
                )}

                <button
                  onClick={handleStake}
                  disabled={loading || !hasSufficient}
                  className="w-full py-3 rounded-xl text-sm font-bold bg-[#ff6a00] hover:bg-[#ff7b1a] text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow"
                >
                  {loading ? 'Processing Stake...' : `Confirm Stake ${numInputAmount > 0 ? `${numInputAmount} ${stakeModal.symbol}` : ''}`}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-[120] animate-in slide-in-from-bottom-2 fade-in duration-300">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-xl ${
            toastMessage.type === 'success' ? 'bg-[#141414] border-green-500/30' : 'bg-[#141414] border-red-500/30'
          }`}>
            {toastMessage.type === 'success' ? (
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            ) : (
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            )}
            <span className="text-white text-sm font-medium">{toastMessage.title}</span>
          </div>
        </div>
      )}
    </div>
  );
};
