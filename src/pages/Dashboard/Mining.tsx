import { useState, useEffect } from 'react';
import { Sidebar } from './layout/Sidebar';
import { Header } from './layout/Header';
import { BottomNav } from './layout/BottomNav';

export const Mining = () => {
  const [activeTab, setActiveTab] = useState<'cloud' | 'hardware'>('cloud');
  
  const [activeModalPkg, setActiveModalPkg] = useState<any>(null);
  const [payAsset, setPayAsset] = useState('USDT');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const [activeContracts, setActiveContracts] = useState<any[]>([]);

  const fetchActiveContracts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/user/transactions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.data) {
        const mining = data.data.filter((t: any) => t.type === 'MINING');
        setActiveContracts(mining);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchActiveContracts();
  }, []);

  const packages = [
    { id: 1, name: 'Basic Starter', hashRate: '10 TH/s', dailyReturn: '0.0001 BTC', price: 500, priceStr: '$500', icon: '⚡' },
    { id: 2, name: 'Pro Miner', hashRate: '50 TH/s', dailyReturn: '0.0005 BTC', price: 2000, priceStr: '$2,000', icon: '🚀' },
    { id: 3, name: 'Enterprise Cluster', hashRate: '200 TH/s', dailyReturn: '0.002 BTC', price: 7500, priceStr: '$7,500', icon: '🏢' },
  ];

  const handleBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalPkg) return;
    
    setIsLoading(true);
    setError('');
    setSuccessMsg('');
    
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/trade/mine', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({
          packageId: activeModalPkg.id,
          price: activeModalPkg.price,
          asset: payAsset
        })
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error);
      
      setActiveModalPkg(null);
      fetchActiveContracts();
      
      // Briefly show success before fading out
      setSuccessMsg(`Successfully purchased ${activeModalPkg.name}!`);
      setTimeout(() => setSuccessMsg(''), 5000);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-inter overflow-x-hidden">
      <Sidebar />
      <div className="w-full md:ml-[260px] flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full pb-32 md:pb-8">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold mb-4">Crypto Mining</h1>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              Start mining top cryptocurrencies instantly with our cloud mining packages. 
              No hardware setup, no maintenance fees, just daily payouts directly to your wallet.
            </p>
          </div>

          {successMsg && (
            <div className="mb-8 bg-[#26A17B]/10 border border-[#26A17B]/20 text-[#26A17B] text-center p-4 rounded-xl flex items-center justify-center gap-2 max-w-2xl mx-auto">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {successMsg}
            </div>
          )}

          <div className="flex justify-center mb-12">
            <div className="bg-[#141414] p-1 rounded-xl flex gap-1 border border-[#1a1a1a]">
              <button 
                onClick={() => setActiveTab('cloud')}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-colors ${activeTab === 'cloud' ? 'bg-[#ff6a00] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Cloud Mining
              </button>
              <button 
                onClick={() => setActiveTab('hardware')}
                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-colors ${activeTab === 'hardware' ? 'bg-[#ff6a00] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Hardware Hosting
              </button>
            </div>
          </div>

          {activeContracts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-bold mb-4">My Active Contracts</h2>
              <div className="bg-[#141414] rounded-2xl border border-[#1a1a1a] overflow-x-auto custom-scrollbar pb-2">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#1a1a1a] text-gray-400 text-xs uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Purchase Date</th>
                      <th className="px-6 py-4">Contract Value (USD)</th>
                      <th className="px-6 py-4">Paid With</th>
                      <th className="px-6 py-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1a1a1a]">
                    {activeContracts.map(contract => (
                      <tr key={contract.id} className="hover:bg-[#1a1a1a]/50">
                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                          {new Date(contract.createdAt).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-bold text-white">
                          ${Number(contract.usdValue || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-bold">
                          {contract.asset}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className="bg-[#26A17B]/10 text-[#26A17B] border border-[#26A17B]/20 px-3 py-1 rounded-full text-xs font-bold">Mining Active</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'cloud' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map(pkg => (
                <div key={pkg.id} className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-8 hover:border-[#ff6a00]/50 transition-colors group flex flex-col">
                  <div className="text-4xl mb-4">{pkg.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                  <div className="mb-6 flex-1">
                    <div className="flex justify-between py-2 border-b border-[#222]">
                      <span className="text-gray-400 text-sm">Hash Rate</span>
                      <span className="font-bold text-sm">{pkg.hashRate}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-[#222]">
                      <span className="text-gray-400 text-sm">Daily Est.</span>
                      <span className="font-bold text-sm text-[#26A17B]">{pkg.dailyReturn}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-gray-400 text-sm">Contract</span>
                      <span className="font-bold text-sm">365 Days</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-bold mb-4">{pkg.priceStr}</p>
                    <button 
                      onClick={() => setActiveModalPkg(pkg)}
                      className="w-full bg-[#1a1a1a] group-hover:bg-[#ff6a00] text-white group-hover:text-black font-bold py-3 rounded-lg transition-colors border border-[#333] group-hover:border-transparent"
                    >
                      Buy Contract
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-12 text-center">
              <span className="text-5xl mb-4 block">🛠️</span>
              <h2 className="text-2xl font-bold mb-2">Hardware Hosting Coming Soon</h2>
              <p className="text-gray-400 max-w-md mx-auto">
                We are currently expanding our facility to accommodate user-provided ASIC miners. Check back soon for updates!
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Buy Mining Modal */}
      {activeModalPkg && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Purchase Contract</h2>
              <button onClick={() => setActiveModalPkg(null)} className="text-gray-400 hover:text-white bg-[#1a1a1a] p-1.5 rounded-lg transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="mb-6 bg-[#0A0A0A] p-4 rounded-xl border border-[#333]">
              <p className="text-sm text-gray-400 mb-1">Package</p>
              <p className="font-bold text-lg">{activeModalPkg.name}</p>
              <div className="flex justify-between mt-3 pt-3 border-t border-[#222]">
                <span className="text-gray-400 text-sm">Price</span>
                <span className="font-bold text-[#26A17B]">{activeModalPkg.priceStr}</span>
              </div>
            </div>
            
            <form onSubmit={handleBuy} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Pay With Asset</label>
                <select value={payAsset} onChange={e => setPayAsset(e.target.value)} className="w-full bg-[#0A0A0A] border border-[#333] rounded-lg px-4 py-3 text-white font-bold focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00] outline-none transition-all appearance-none cursor-pointer">
                  <option value="USDT">USDT (Tether)</option>
                  <option value="BTC">BTC (Bitcoin)</option>
                  <option value="ETH">ETH (Ethereum)</option>
                </select>
              </div>
              {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg flex items-center gap-2"><svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>{error}</div>}
              <button type="submit" disabled={isLoading} className="w-full bg-[#ff6a00] hover:bg-[#ff7b1a] text-black font-bold rounded-lg py-3 mt-4 disabled:opacity-50 transition-all text-sm uppercase tracking-wide">
                {isLoading ? 'Processing...' : 'Confirm Purchase'}
              </button>
            </form>
          </div>
        </div>
      )}
      <BottomNav />
    </div>
  );
};
