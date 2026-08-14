import { Sidebar } from './Dashboard/layout/Sidebar';
import { BottomNav } from './Dashboard/layout/BottomNav';
import { Header } from './Dashboard/layout/Header';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ASSET_META: Record<string, { name: string; color: string; icon: string; category: string }> = {
  BTC:  { name: 'Bitcoin',  color: '#F7931A', icon: '₿', category: 'Layer 1' },
  ETH:  { name: 'Ethereum', color: '#627EEA', icon: 'Ξ', category: 'Layer 1' },
  USDT: { name: 'Tether',   color: '#26A17B', icon: '₮', category: 'Stablecoin' },
  USDC: { name: 'USD Coin', color: '#2775CA', icon: '$', category: 'Stablecoin' },
  SOL:  { name: 'Solana',   color: '#9945FF', icon: '◎', category: 'Layer 1' },
  BNB:  { name: 'BNB',      color: '#F3BA2F', icon: 'B', category: 'Exchange' },
  AAPL: { name: 'Apple',    color: '#ffffff', icon: '', category: 'Stock' },
};

export const Markets = () => {
  const navigate = useNavigate();
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch live prices from CoinGecko via backend
    fetch('/api/market/prices?symbols=BTC,ETH,USDT,USDC,SOL,BNB,AAPL')
      .then(r => r.json())
      .then(data => {
        setPrices(data.data || {});
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const marketData = Object.keys(ASSET_META).map(symbol => {
    const meta = ASSET_META[symbol];
    const price = prices[symbol] || 0;
    
    // Simulate some realistic market changes based on the symbol (for UI demonstration)
    let change24h = 0;
    let volume24h = 0;
    let marketCap = 0;
    
    if (symbol === 'BTC') { change24h = 2.45; volume24h = 32.5; marketCap = 1250; }
    if (symbol === 'ETH') { change24h = -1.20; volume24h = 18.2; marketCap = 380; }
    if (symbol === 'SOL') { change24h = 5.60; volume24h = 5.1; marketCap = 65; }
    if (symbol === 'BNB') { change24h = 0.50; volume24h = 1.2; marketCap = 88; }
    if (symbol === 'USDT' || symbol === 'USDC') { change24h = 0.01; volume24h = 45.0; marketCap = 110; }
    if (symbol === 'AAPL') { change24h = 1.15; volume24h = 10.5; marketCap = 2800; }

    return {
      symbol,
      ...meta,
      price,
      change24h,
      volume24h,
      marketCap,
    };
  }).sort((a, b) => b.marketCap - a.marketCap);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-inter overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 md:ml-[260px] flex flex-col h-screen overflow-y-auto custom-scrollbar">
        <Header />
        
        <main className="p-8 max-w-7xl mx-auto w-full">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2 tracking-tight">Markets Overview</h1>
            <p className="text-gray-400 text-sm">Real-time prices, volumes, and market cap for top assets.</p>
          </div>

          {/* Highlight Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6 hover:border-[#333] transition-colors cursor-pointer group">
              <div className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-4">
                <span className="text-[#ff6a00]">🔥</span> Top Gainer
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg" style={{ backgroundColor: '#9945FF' }}>◎</div>
                  <div>
                    <h3 className="font-bold text-lg">SOL</h3>
                    <p className="text-xs text-gray-500">Solana</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">${(prices['SOL'] || 145.20).toLocaleString()}</p>
                  <p className="text-sm font-medium text-[#26A17B]">+5.60%</p>
                </div>
              </div>
            </div>

            <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6 hover:border-[#333] transition-colors cursor-pointer group">
              <div className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-4">
                <span className="text-blue-500">📊</span> Highest Volume
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg bg-[#26A17B] text-black">₮</div>
                  <div>
                    <h3 className="font-bold text-lg">USDT</h3>
                    <p className="text-xs text-gray-500">Tether</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">${(prices['USDT'] || 1.00).toLocaleString()}</p>
                  <p className="text-sm font-medium text-gray-400">45.0B Vol</p>
                </div>
              </div>
            </div>

            <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6 hover:border-[#333] transition-colors cursor-pointer group">
              <div className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-4">
                <span className="text-yellow-500">⭐</span> Most Popular
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg bg-[#F7931A] text-black">₿</div>
                  <div>
                    <h3 className="font-bold text-lg">BTC</h3>
                    <p className="text-xs text-gray-500">Bitcoin</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">${(prices['BTC'] || 64000).toLocaleString()}</p>
                  <p className="text-sm font-medium text-[#26A17B]">+2.45%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Markets Table */}
          <div className="bg-[#141414] rounded-2xl border border-[#1a1a1a] overflow-x-auto custom-scrollbar pb-2">
            <div className="p-4 border-b border-[#1a1a1a] flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
              <button className="bg-[#1a1a1a] text-white px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap">All Assets</button>
              <button className="text-gray-400 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">Layer 1</button>
              <button className="text-gray-400 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">DeFi</button>
              <button className="text-gray-400 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">Stocks</button>
            </div>
            
            <table className="w-full text-left">
              <thead className="bg-[#0A0A0A] text-gray-500 text-xs uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-6 py-4">Asset</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">24h Change</th>
                  <th className="px-6 py-4 hidden md:table-cell">24h Volume</th>
                  <th className="px-6 py-4 hidden md:table-cell">Market Cap</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1a1a]">
                {loading && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">Loading market data...</td>
                  </tr>
                )}
                {!loading && marketData.map(asset => (
                  <tr key={asset.symbol} className="hover:bg-[#1a1a1a] transition-colors group cursor-pointer" onClick={() => navigate('/dashboard')}>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-sm"
                          style={{ backgroundColor: asset.color, color: asset.symbol === 'BTC' || asset.symbol === 'BNB' || asset.symbol === 'USDT' ? 'black' : 'white' }}
                        >
                          {asset.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-base">{asset.symbol}</p>
                            <span className="text-[10px] bg-[#222] text-gray-400 px-2 py-0.5 rounded-full">{asset.category}</span>
                          </div>
                          <p className="text-xs text-gray-500 font-medium mt-0.5">{asset.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 font-bold text-base">
                      ${asset.price > 0 ? asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: asset.price < 10 ? 4 : 2 }) : '—'}
                    </td>
                    <td className="px-6 py-5">
                      <span className={`font-bold ${asset.change24h >= 0 ? 'text-[#26A17B]' : 'text-red-500'} flex items-center gap-1`}>
                        {asset.change24h >= 0 ? '↗' : '↘'} {Math.abs(asset.change24h).toFixed(2)}%
                      </span>
                    </td>
                    <td className="px-6 py-5 font-medium text-gray-300 hidden md:table-cell">
                      ${asset.volume24h}B
                    </td>
                    <td className="px-6 py-5 font-medium text-gray-300 hidden md:table-cell">
                      ${asset.marketCap > 1000 ? (asset.marketCap / 1000).toFixed(2) + 'T' : asset.marketCap + 'B'}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button 
                        onClick={(e) => { e.stopPropagation(); navigate('/dashboard'); }}
                        className="bg-transparent hover:bg-[#ff6a00] border border-[#ff6a00] text-[#ff6a00] hover:text-white px-5 py-2 rounded-lg text-sm font-bold transition-all"
                      >
                        Trade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
};
