import { Sidebar } from './layout/Sidebar';
import { Header } from './layout/Header';
import { BottomNav } from './layout/BottomNav';
import { useState, useEffect } from 'react';

const MOCK_TRADERS = [
  { id: 1, name: 'CryptoWhale_99', avatar: '🐋', roi: '+145.2%', winRate: '82%', aum: '$1.2M', followers: 1240, risk: 'High' },
  { id: 2, name: 'SafeTrades_Algo', avatar: '🤖', roi: '+32.4%', winRate: '95%', aum: '$4.5M', followers: 8530, risk: 'Low' },
  { id: 3, name: 'Ethereum_Maxi', avatar: '💎', roi: '+88.1%', winRate: '64%', aum: '$850K', followers: 430, risk: 'Medium' },
  { id: 4, name: 'AlphaSeeker', avatar: '🐺', roi: '+210.5%', winRate: '55%', aum: '$2.1M', followers: 3200, risk: 'High' }
];

export const CopyTradingDashboard = () => {
  const [copyingId, setCopyingId] = useState<number | null>(null);
  
  const [activeModalId, setActiveModalId] = useState<number | null>(null);
  const [copyAmount, setCopyAmount] = useState('');
  const [copyAsset, setCopyAsset] = useState('USDT');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [activeCopies, setActiveCopies] = useState<any[]>([]);

  const fetchActiveCopies = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/user/transactions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.data) {
        const copies = data.data.filter((t: any) => t.type === 'COPY_TRADE');
        setActiveCopies(copies);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchActiveCopies();
  }, []);

  const handleCopy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalId || !copyAmount || !copyAsset) return;
    
    setIsLoading(true);
    setError('');
    setSuccessMsg('');
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/trade/copy', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({
          traderId: activeModalId,
          amount: parseFloat(copyAmount),
          asset: copyAsset
        })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);
      
      setCopyingId(activeModalId);
      setActiveModalId(null);
      setCopyAmount('');
      
      const trader = MOCK_TRADERS.find(t => t.id === activeModalId);
      setSuccessMsg(`Successfully copied ${trader?.name || 'trader'}!`);
      setTimeout(() => setSuccessMsg(''), 5000);
      
      fetchActiveCopies();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const totalCopiedAUM = activeCopies.reduce((acc, curr) => acc + (Number(curr.usdValue) || 0), 0);
  const hasActiveCopies = activeCopies.length > 0;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-inter overflow-x-hidden">
      <Sidebar />
      <div className="w-full md:ml-[260px] flex flex-col min-h-screen">
        <Header />
        
        <main className="p-4 md:p-8 max-w-6xl mx-auto w-full pb-32 md:pb-8">
          <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                Copy Trading <span className="text-xs bg-[#ff6a00]/20 text-[#ff6a00] px-2 py-1 rounded border border-[#ff6a00]/30 tracking-wider">BETA</span>
              </h1>
              <p className="text-gray-400 text-sm mt-2">Automatically copy the trades of top performing traders using your available balance.</p>
            </div>
            
            <div className="bg-[#141414] border border-[#1a1a1a] rounded-xl p-4 text-sm flex gap-8 shadow-sm w-full md:w-auto">
              <div className="flex-1">
                <p className="text-gray-500 mb-1 font-medium">Your Copied AUM</p>
                <p className="font-bold text-2xl text-[#26A17B]">${totalCopiedAUM > 0 ? totalCopiedAUM.toLocaleString(undefined, {minimumFractionDigits: 2}) : '0.00'}</p>
              </div>
              <div className="flex-1">
                <p className="text-gray-500 mb-1 font-medium">Active Copies</p>
                <p className="font-bold text-2xl">{activeCopies.length}</p>
              </div>
            </div>
          </div>

          {successMsg && (
            <div className="mb-8 bg-[#26A17B]/10 border border-[#26A17B]/20 text-[#26A17B] text-center p-4 rounded-xl flex items-center justify-center gap-2 max-w-2xl mx-auto">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {successMsg}
            </div>
          )}

          {hasActiveCopies && (
            <div className="mb-12">
              <h2 className="text-xl font-bold mb-4">My Active Copies</h2>
              <div className="bg-[#141414] rounded-2xl border border-[#1a1a1a] overflow-x-auto custom-scrollbar pb-2">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#1a1a1a] text-gray-400 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Asset</th>
                      <th className="px-6 py-4">Amount Allocated</th>
                      <th className="px-6 py-4">Value (USD)</th>
                      <th className="px-6 py-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1a1a1a]">
                    {activeCopies.map(copy => (
                      <tr key={copy.id} className="hover:bg-[#1a1a1a]/50">
                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                          {new Date(copy.createdAt).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-bold">
                          {copy.asset}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-mono text-gray-300">
                          {Number(copy.amount).toFixed(6)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-bold text-white">
                          ${Number(copy.usdValue || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className="bg-[#26A17B]/10 text-[#26A17B] border border-[#26A17B]/20 px-3 py-1 rounded-full text-xs font-bold">Active</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <h2 className="text-xl font-bold mb-4">Top Traders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {MOCK_TRADERS.map(trader => (
              <div key={trader.id} className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6 hover:border-[#ff6a00]/50 transition-colors group">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#1a1a1a] flex items-center justify-center text-3xl border border-[#333] shadow-inner">
                      {trader.avatar}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{trader.name}</h3>
                      <p className="text-sm text-gray-400">{trader.followers.toLocaleString()} Followers</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    trader.risk === 'High' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                    trader.risk === 'Medium' ? 'bg-[#ff6a00]/10 text-[#ff6a00] border-[#ff6a00]/20' : 
                    'bg-[#26A17B]/10 text-[#26A17B] border-[#26A17B]/20'
                  }`}>
                    {trader.risk} Risk
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8 bg-[#0A0A0A] rounded-xl p-4 border border-[#1a1a1a]">
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">30D ROI</p>
                    <p className="font-bold text-[#26A17B] text-lg">{trader.roi}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">Win Rate</p>
                    <p className="font-bold text-white text-lg">{trader.winRate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">AUM</p>
                    <p className="font-bold text-white text-lg">{trader.aum}</p>
                  </div>
                </div>

                <button 
                  onClick={() => copyingId === trader.id ? setCopyingId(null) : setActiveModalId(trader.id)}
                  className={`w-full py-3.5 rounded-lg font-bold transition-all border ${
                    copyingId === trader.id 
                      ? 'bg-transparent text-gray-400 border-[#333] hover:border-gray-500' 
                      : 'bg-[#1a1a1a] border-transparent hover:bg-[#ff6a00] text-white hover:text-black'
                  }`}
                >
                  {copyingId === trader.id ? 'Cancel Copy' : 'Copy Trader'}
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Copy Trade Modal */}
      {activeModalId !== null && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Copy Trader</h2>
              <button onClick={() => setActiveModalId(null)} className="text-gray-400 hover:text-white bg-[#1a1a1a] p-1.5 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <form onSubmit={handleCopy} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Asset to use</label>
                <select value={copyAsset} onChange={e => setCopyAsset(e.target.value)} className="w-full bg-[#0A0A0A] border border-[#333] rounded-lg px-4 py-3 text-white font-bold focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00] outline-none transition-all appearance-none cursor-pointer">
                  <option value="USDT">USDT (Tether)</option>
                  <option value="BTC">BTC (Bitcoin)</option>
                  <option value="ETH">ETH (Ethereum)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Amount to Allocate (USD)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    step="0.01" 
                    min="10"
                    placeholder="Enter USD amount..."
                    value={copyAmount} 
                    onChange={e => setCopyAmount(e.target.value)} 
                    required 
                    className="w-full bg-[#0A0A0A] border border-[#333] rounded-lg pl-4 pr-16 py-3 text-white font-bold focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00] outline-none transition-all" 
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-gray-500">
                    USD
                  </div>
                </div>
              </div>
              {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg flex items-center gap-2"><svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>{error}</div>}
              <button type="submit" disabled={isLoading} className="w-full bg-[#ff6a00] hover:bg-[#ff7b1a] text-black font-bold rounded-lg py-3 mt-4 disabled:opacity-50 transition-all text-sm uppercase tracking-wide">
                {isLoading ? 'Processing...' : 'Confirm Copy'}
              </button>
            </form>
          </div>
        </div>
      )}
      <BottomNav />
    </div>
  );
};
