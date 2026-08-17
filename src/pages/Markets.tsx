import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/sections/Navbar';
import { FloatingWidget } from '@/components/FloatingWidget';
import { CookieBanner } from '@/components/CookieBanner';

const ASSET_META: Record<string, { name: string; color: string; icon: string; category: string }> = {
  BTC:  { name: 'Bitcoin',   color: '#F7931A', icon: '₿', category: 'Layer 1' },
  ETH:  { name: 'Ethereum',  color: '#627EEA', icon: 'Ξ', category: 'Layer 1' },
  USDT: { name: 'Tether',    color: '#26A17B', icon: '₮', category: 'Stablecoin' },
  USDC: { name: 'USD Coin',  color: '#2775CA', icon: '$', category: 'Stablecoin' },
  SOL:  { name: 'Solana',    color: '#9945FF', icon: '◎', category: 'Layer 1' },
  BNB:  { name: 'BNB',       color: '#F3BA2F', icon: 'B', category: 'Exchange' },
  AAPL: { name: 'Apple',     color: '#ffffff', icon: '', category: 'Stock' },
};

const STATS = [
  { value: '$2.4T+', label: 'Total Volume Traded' },
  { value: '500K+',  label: 'Active Traders' },
  { value: '99.9%',  label: 'Uptime' },
];

export const Markets = () => {
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    fetch('/api/market/prices?symbols=BTC,ETH,USDT,USDC,SOL,BNB,AAPL')
      .then(r => r.json())
      .then(data => { setPrices(data.data || {}); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const mockChanges: Record<string, { change: number; volume: string; cap: string }> = {
    BTC:  { change: 2.45,  volume: '32.5B', cap: '1.25T' },
    ETH:  { change: -1.20, volume: '18.2B', cap: '380B'  },
    SOL:  { change: 5.60,  volume: '5.1B',  cap: '65B'   },
    BNB:  { change: 0.50,  volume: '1.2B',  cap: '88B'   },
    USDT: { change: 0.01,  volume: '45.0B', cap: '110B'  },
    USDC: { change: 0.00,  volume: '8.5B',  cap: '44B'   },
    AAPL: { change: 1.15,  volume: '10.5B', cap: '2.8T'  },
  };

  const categories = ['All', 'Layer 1', 'Stablecoin', 'Exchange', 'Stock'];

  const marketData = Object.keys(ASSET_META)
    .filter(s => activeCategory === 'All' || ASSET_META[s].category === activeCategory)
    .map(symbol => ({
      symbol,
      ...ASSET_META[symbol],
      price: prices[symbol] || 0,
      ...mockChanges[symbol],
    }));

  return (
    <div className="min-h-screen bg-black text-white font-inter">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,106,0,0.12),transparent_60%)] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-[#ff6a00]/10 border border-[#ff6a00]/20 text-[#ff6a00] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-[#ff6a00] rounded-full animate-pulse" />
            Live Market Data
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
            Markets Overview
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto mb-10">
            Track real-time prices, volumes, and market cap for top crypto and stock assets.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 bg-[#ff6a00] hover:bg-[#e55c00] text-white font-bold px-8 py-3.5 rounded-xl transition-all"
          >
            Start Trading Free →
          </Link>
        </div>

        {/* Stats bar */}
        <div className="relative max-w-2xl mx-auto mt-16 grid grid-cols-3 gap-4">
          {STATS.map(s => (
            <div key={s.label} className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-5">
              <p className="text-2xl font-extrabold text-white">{s.value}</p>
              <p className="text-gray-500 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Table */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        {/* Category Tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[#ff6a00] text-white'
                  : 'bg-[#111] text-gray-400 hover:text-white border border-[#1a1a1a]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-2xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="text-xs text-gray-500 uppercase tracking-wider border-b border-[#1a1a1a]">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Asset</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">24h Change</th>
                <th className="px-6 py-4 hidden md:table-cell">Volume</th>
                <th className="px-6 py-4 hidden md:table-cell">Market Cap</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1a1a]">
              {loading && (
                <tr><td colSpan={7} className="px-6 py-14 text-center text-gray-500">Loading live data...</td></tr>
              )}
              {!loading && marketData.map((asset, i) => (
                <tr key={asset.symbol} className="hover:bg-[#111] transition-colors">
                  <td className="px-6 py-5 text-gray-600 text-sm">{i + 1}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-sm shrink-0"
                        style={{ backgroundColor: asset.color, color: ['BTC','BNB','USDT'].includes(asset.symbol) ? '#000' : '#fff' }}
                      >
                        {asset.icon}
                      </div>
                      <div>
                        <p className="font-bold">{asset.symbol}</p>
                        <p className="text-xs text-gray-500">{asset.name}</p>
                      </div>
                      <span className="ml-1 text-[10px] bg-[#1a1a1a] text-gray-400 px-2 py-0.5 rounded-full hidden md:inline">
                        {asset.category}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-bold">
                    {asset.price > 0
                      ? '$' + asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: asset.price < 10 ? 4 : 2 })
                      : '—'}
                  </td>
                  <td className="px-6 py-5">
                    <span className={`font-bold text-sm flex items-center gap-1 ${asset.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {asset.change >= 0 ? '↗' : '↘'} {Math.abs(asset.change).toFixed(2)}%
                    </span>
                  </td>
                  <td className="px-6 py-5 text-gray-400 text-sm hidden md:table-cell">{asset.volume}</td>
                  <td className="px-6 py-5 text-gray-400 text-sm hidden md:table-cell">{asset.cap}</td>
                  <td className="px-6 py-5 text-right">
                    <Link
                      to="/register"
                      className="bg-transparent hover:bg-[#ff6a00] border border-[#ff6a00] text-[#ff6a00] hover:text-white px-5 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap"
                    >
                      Trade
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-gray-600 text-sm mt-8">
          Prices are indicative. <Link to="/register" className="text-[#ff6a00] hover:underline">Create a free account</Link> to trade live.
        </p>
      </section>

      <FloatingWidget />
      <CookieBanner />
    </div>
  );
};
