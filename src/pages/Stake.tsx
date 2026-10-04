import { useState, useEffect } from 'react';
import { Sidebar } from './Dashboard/layout/Sidebar';
import { Header } from './Dashboard/layout/Header';
import { BottomNav } from './Dashboard/layout/BottomNav';

const POOLS = [
  { name: 'Avalanche', symbol: 'AVAX', min: '9 AVAX', max: '1000 AVAX', cycle: 'Daily', color: 'bg-red-500' },
  { name: 'Ethereum', symbol: 'ETH', min: '1 ETH', max: '10 ETH', cycle: 'Daily', color: 'bg-purple-500' },
  { name: 'Polygon', symbol: 'MATIC', min: '40 MATIC', max: '87 MATIC', cycle: 'Daily', color: 'bg-purple-600' },
  { name: 'Solana', symbol: 'SOL', min: '6 SOL', max: '18 SOL', cycle: 'Daily', color: 'bg-purple-400' },
  { name: 'Tether', symbol: 'USDT', min: '5000 USDT', max: '50000 USDT', cycle: 'Daily', color: 'bg-teal-500' },
];

export const Stake = () => {
  const [activeTab, setActiveTab] = useState<'pools' | 'history' | 'howItWorks'>('pools');
  const [stakeModal, setStakeModal] = useState<typeof POOLS[0] | null>(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<{title: string, type: 'success' | 'error'} | null>(null);
  const [stats, setStats] = useState({ total: 0, active: 0, closed: 0 });

  const fetchStakes = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/stake/my', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok) {
        setStats({ total: data.totalStaked, active: data.activeStakes, closed: data.closedStakes });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStakes();
  }, []);

  const handleStake = async () => {
    if (!stakeAmount || Number(stakeAmount) <= 0) {
      setToastMessage({ title: 'Please enter a valid amount to stake.', type: 'error' });
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
      setToastMessage({ title: 'An error occurred', type: 'error' });
    } finally {
      setLoading(false);
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-inter overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 md:ml-[260px] flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full pb-32 md:pb-8">
          <div className="flex items-center gap-2 mb-8">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            <h1 className="text-xl font-bold text-white tracking-tight">Stake</h1>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
            <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-6">
              <div className="text-2xl font-bold text-white mb-1">${stats.total.toLocaleString()}</div>
              <div className="text-sm font-bold text-gray-300">Total stakings</div>
              <div className="text-xs text-gray-500 mt-1">{stats.active + stats.closed} Stakings</div>
            </div>
            <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-6">
              <div className="text-2xl font-bold text-white mb-1">${stats.active > 0 ? '...' : '0'}</div>
              <div className="text-sm font-bold text-gray-300">Active stakings</div>
              <div className="text-xs text-gray-500 mt-1">{stats.active} Stakings</div>
            </div>
            <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-6">
              <div className="text-2xl font-bold text-white mb-1">${stats.closed > 0 ? '...' : '0'}</div>
              <div className="text-sm font-bold text-gray-300">Closed stakings</div>
              <div className="text-xs text-gray-500 mt-1">{stats.closed} Stakings</div>
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
                {tab === 'howItWorks' ? 'How it works' : tab === 'history' ? 'Your history' : 'Pools'}
              </button>
            ))}
          </div>

          {activeTab === 'pools' && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-base font-bold text-white mb-4">Pools</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {POOLS.map(pool => (
                  <div key={pool.name} className="bg-[#141414] border border-[#222] rounded-xl p-5 flex flex-col hover:border-[#333] transition-colors">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-8 h-8 rounded-full ${pool.color} flex items-center justify-center shrink-0`}>
                        <span className="text-white text-xs font-bold">{pool.symbol[0]}</span>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white leading-tight">{pool.name}</div>
                        <div className="text-xs text-gray-500 uppercase">{pool.symbol}</div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6 flex-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">Minimum</span>
                        <span className="text-white font-bold">{pool.min}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">Maximum</span>
                        <span className="text-white font-bold">{pool.max}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500">Cycle</span>
                        <span className="text-white font-bold">{pool.cycle}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setStakeModal(pool)}
                      className="w-full py-2.5 rounded-lg text-sm font-bold bg-[#ff6a00] hover:bg-[#ff7b1a] text-white transition-colors mt-auto"
                    >
                      Stake
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="animate-in fade-in duration-300">
              <div className="bg-[#141414] border border-[#222] rounded-xl p-12 flex flex-col items-center justify-center">
                <svg className="w-12 h-12 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4v16m8-8H4" /></svg>
                <p className="text-gray-400 text-sm">No staking history yet.</p>
              </div>
            </div>
          )}

          {activeTab === 'howItWorks' && (
            <div className="animate-in fade-in duration-300 max-w-3xl">
              <div className="bg-[#141414] border border-[#222] rounded-xl p-6">
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Staking allows you to earn rewards by locking up your crypto assets for a specified cycle. 
                  During this time, your assets are used to support network operations like validating transactions.
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  To get started, select a pool, enter your amount within the minimum and maximum limits, and confirm your stake.
                  Your rewards will be calculated daily and added to your total balance.
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
          <div className="fixed inset-0 bg-black/70 z-[100]" onClick={() => { setStakeModal(null); setStakeAmount(''); }} />
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl w-full max-w-md shadow-2xl pointer-events-auto">
              <div className="p-6 border-b border-[#222] flex items-center justify-between">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  Stake {stakeModal.name}
                </h2>
                <button onClick={() => setStakeModal(null)} className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-3 bg-[#0d0d0d] rounded-xl p-4 text-center border border-[#222]">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Minimum</div>
                    <div className="text-white text-sm font-bold">{stakeModal.min}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Maximum</div>
                    <div className="text-white text-sm font-bold">{stakeModal.max}</div>
                  </div>
                </div>
                
                <div>
                  <label className="text-xs text-gray-500 block mb-1.5">Amount to Stake</label>
                  <div className="flex items-center bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg overflow-hidden">
                    <input
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      placeholder={`0.00`}
                      className="flex-1 bg-transparent px-4 py-3 text-white text-sm outline-none"
                    />
                    <span className="px-4 text-gray-500 text-xs font-bold border-l border-[#2a2a2a]">{stakeModal.symbol}</span>
                  </div>
                  <div className="flex justify-between text-xs mt-1.5 text-gray-500">
                    <span>Available balance: 0.00 {stakeModal.symbol}</span>
                  </div>
                </div>

                <button
                  onClick={handleStake}
                  disabled={loading}
                  className="w-full py-3 rounded-xl text-sm font-bold bg-[#ff6a00] hover:bg-[#ff7b1a] text-white transition-colors disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Confirm Stake'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-[120] animate-in slide-in-from-bottom-2 fade-in duration-300">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-xl ${toastMessage.type === 'success' ? 'bg-[#141414] border-green-500/30' : 'bg-[#141414] border-red-500/30'}`}>
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
