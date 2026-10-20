import { useState, useEffect, useMemo } from 'react';
import { Sidebar } from './layout/Sidebar';
import { Header } from './layout/Header';
import { BottomNav } from './layout/BottomNav';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { MobileMenu } from './layout/MobileMenu';

const STABLECOINS = new Set(['USDT', 'USDC', 'DAI', 'BUSD', 'TUSD']);

interface Wallet {
  id: string;
  coin: string;
  balance: string | number;
}

interface TradeRecord {
  id: string;
  type: string;
  asset: string;
  amount: number;
  usdValue: number;
  status: string;
  createdAt: string;
}

const ASSET_META: Record<string, { name: string; color: string; icon: string }> = {
  BTC:  { name: 'Bitcoin',  color: '#F7931A', icon: '₿' },
  ETH:  { name: 'Ethereum', color: '#627EEA', icon: 'Ξ' },
  USDT: { name: 'Tether',   color: '#26A17B', icon: '₮' },
  USDC: { name: 'USD Coin', color: '#2775CA', icon: '$' },
  SOL:  { name: 'Solana',   color: '#9945FF', icon: '◎' },
  BNB:  { name: 'BNB',      color: '#F3BA2F', icon: 'B' },
  AAPL: { name: 'Apple',    color: '#ffffff', icon: '' },
};

const MOBILE_TABS = ['Crypto', 'DeFi', 'Mining', 'History'];

const INITIAL_PRICES: Record<string, number> = {
  BTC: 82180,
  ETH: 3240,
  SOL: 154,
  BNB: 585,
  USDT: 1.0,
  USDC: 1.0,
  AAPL: 182.4,
};

export const Dashboard = () => {
  const location = useLocation();
  const locationState = location.state as { selectedAsset?: string } | null;

  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [prices, setPrices] = useState<Record<string, number>>(INITIAL_PRICES);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [trades, setTrades] = useState<TradeRecord[]>([]);
  const [mobileTab, setMobileTab] = useState('Crypto');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [timeframe, setTimeframe] = useState<'1' | '30' | '60' | 'D'>('D');
  const [chartExpanded, setChartExpanded] = useState(false);

  // Trade Panel State
  const [tradeTab, setTradeTab] = useState<'buy' | 'sell' | 'convert'>('buy');
  const [tradeAmount, setTradeAmount] = useState('100');
  const [selectedAsset, setSelectedAsset] = useState(locationState?.selectedAsset || 'BTC');
  const [isExecuting, setIsExecuting] = useState(false);
  const [leverage, setLeverage] = useState(5);
  
  const [tradeError, setTradeError] = useState('');
  const [tradeSuccess, setTradeSuccess] = useState('');

  // Convert state (mirrors Trade.tsx)
  const [convertFrom, setConvertFrom] = useState('BTC');
  const [convertTo, setConvertTo] = useState('USDT');
  const [convertAmount, setConvertAmount] = useState('0.01');

  const navigate = useNavigate();

  const fetchWallets = async (token: string) => {
    try {
      const r = await fetch('/api/user/wallets', { headers: { Authorization: `Bearer ${token}` } });
      if (r.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }
      const data = await r.json();
      setWallets(data.data || []);
    } catch (e) {}
  };

  const fetchHistory = async (token: string) => {
    try {
      const r = await fetch('/api/user/history', { headers: { Authorization: `Bearer ${token}` } });
      const data = await r.json();
      if (data.data) {
        // Filter for TRADE and COPY_TRADE
        const filtered = data.data.filter((t: any) => t.type === 'TRADE' || t.type === 'COPY_TRADE');
        setTrades(filtered);
      }
    } catch (e) {}
  };

  const fetchPrices = async () => {
    try {
      const r = await fetch('/api/market/all', { cache: 'no-store' });
      if (!r.ok) return;
      const data = await r.json();
      const raw = data.data;
      if (raw) {
        const priceMap: Record<string, number> = {};
        if (Array.isArray(raw)) {
          for (const asset of raw) {
            if (asset?.symbol) {
              priceMap[asset.symbol] = STABLECOINS.has(asset.symbol) ? 1.0 : (Number(asset.price) || 0);
            }
          }
        } else if (typeof raw === 'object') {
          for (const [sym, asset] of Object.entries(raw)) {
            const val = (asset as any)?.price;
            priceMap[sym] = STABLECOINS.has(sym) ? 1.0 : (Number(val) || 0);
          }
        }
        // Guarantee 1.00 for all stablecoins
        STABLECOINS.forEach((s) => { priceMap[s] = 1.0; });
        setPrices((prev) => ({ ...prev, ...priceMap }));
      }
    } catch (e) {}
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setLoading(true);
    Promise.all([
      fetchWallets(token),
      fetchHistory(token),
      fetchPrices()
    ]).finally(() => setLoading(false));

    // Poll live prices every 8 seconds
    const priceInterval = setInterval(fetchPrices, 8000);
    return () => clearInterval(priceInterval);
  }, [navigate]);

  const totalBalanceUSD = useMemo(() => {
    if (!wallets || wallets.length === 0) return 0;
    return wallets.reduce((sum, w) => {
      const bal = Number(w.balance);
      if (isNaN(bal) || bal <= 0) return sum;
      const price = STABLECOINS.has(w.coin) ? 1.0 : (prices[w.coin] ?? 0);
      return sum + bal * price;
    }, 0);
  }, [wallets, prices]);

  const displayWallets = wallets.length > 0 ? wallets : [
    { id: '1', coin: 'BTC', balance: '0' },
    { id: '2', coin: 'ETH', balance: '0' },
    { id: '3', coin: 'SOL', balance: '0' },
    { id: '4', coin: 'AAPL', balance: '0' },
  ];

  const handleExecuteTrade = async () => {
    const token = localStorage.getItem('token');
    if (!token || !tradeAmount || Number(tradeAmount) <= 0) return;

    let fromAsset = 'USDT';
    let toAsset = selectedAsset;

    if (tradeTab === 'sell') {
      fromAsset = selectedAsset;
      toAsset = 'USDT';
    } else if (tradeTab === 'convert') {
      fromAsset = convertFrom;
      toAsset = convertTo;
    }

    const amount = tradeTab === 'convert' ? Number(convertAmount) : Number(tradeAmount);
    if (!amount || amount <= 0 || isNaN(amount)) {
      setTradeError('Please enter a valid amount');
      return;
    }

    setIsExecuting(true);
    setTradeError('');
    setTradeSuccess('');
    try {
      const res = await fetch('/api/trade/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ fromAsset, toAsset, amount })
      });
      const data = await res.json();
      if (!res.ok) {
        setTradeError(data.error || 'Trade failed');
      } else {
        setTradeSuccess(`Trade executed! Received ${Number(data.receivedAmount).toFixed(6)} ${toAsset}`);
        fetchWallets(token);
        fetchHistory(token);
      }
    } catch (e) {
      setTradeError('An error occurred during trade execution.');
    } finally {
      setIsExecuting(false);
    }
  };

  const getActiveTabClass = (tab: string) => {
    if (tradeTab !== tab) return 'text-gray-400 hover:text-white bg-transparent';
    if (tab === 'buy') return 'bg-[#26A17B] text-black';
    if (tab === 'sell') return 'bg-red-500 text-white';
    return 'bg-blue-500 text-white';
  };

  const usdtBalance = wallets.find(w => w.coin === 'USDT')?.balance || 0;
  const assetPrice = prices[selectedAsset] || 0;

  const totalBalanceUSDMemo = totalBalanceUSD;

  const MyTradesSection = () => (
    <div className="mt-6 bg-[#0A0A0A]">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-white font-bold text-sm">My trades</h2>
        <div className="flex bg-[#1a1a1a] rounded p-0.5">
          <button className="bg-[#ff6a00] text-black text-[10px] font-bold px-3 py-1 rounded">All</button>
          <button className="text-gray-400 text-[10px] font-bold px-3 py-1 rounded hover:text-white">Swaps</button>
          <button className="text-gray-400 text-[10px] font-bold px-3 py-1 rounded hover:text-white">Auto</button>
        </div>
      </div>
      <div className="space-y-2">
        <div className="bg-[#141414] border border-[#222] rounded-lg px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-[#1a1a1a] transition-colors">
          <div className="flex items-center gap-2 text-gray-300 text-sm font-medium">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Open (0)
          </div>
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
        </div>
        <div className="bg-[#141414] border border-[#222] rounded-lg px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-[#1a1a1a] transition-colors">
          <div className="flex items-center gap-2 text-gray-300 text-sm font-medium">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            Closed (0)
          </div>
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-inter overflow-x-hidden">
      <Sidebar />

      {/* ══════════ MOBILE LAYOUT (hidden on md+) ══════════ */}
      <div className="flex md:hidden flex-col w-full h-screen bg-[#0A0A0A] overflow-y-auto pb-24">
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-5 pt-10 pb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileMenuOpen(true)} className="text-white hover:text-gray-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#26A17B] rounded-full flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
              </div>
              <div className="flex items-center gap-1 text-white font-semibold text-sm">
                Account 1
                <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { localStorage.removeItem('token'); navigate('/login'); }} className="text-gray-500 hover:text-red-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>
            <button onClick={() => navigate('/settings')} className="text-gray-500 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </button>
            <div className="w-8 h-8 bg-[#1a1a1a] rounded-full flex items-center justify-center border border-[#2a2a2a] hidden">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </div>
            <button onClick={() => navigate('/settings')} className="w-8 h-8 bg-[#ff6a00] rounded-full flex items-center justify-center text-black font-bold text-xs">U</button>
          </div>
        </div>

        {/* Balance */}
        <div className="px-5 mb-8">
          <p className="text-gray-500 text-xs font-medium mb-1">Total Balance</p>
          <div className="flex items-end gap-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {loading ? '...' : balanceVisible
                ? `$${totalBalanceUSDMemo.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                : '••••••'}
            </h2>
            <button onClick={() => setBalanceVisible(!balanceVisible)} className="mb-1.5 text-gray-500">
              {balanceVisible
                ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              }
            </button>
          </div>
          <p className="text-gray-500 text-xs mt-1">$0.00 (0.00%) 1D</p>
          <div className="mt-3 flex gap-0.5">
            {[...Array(20)].map((_, i) => <div key={i} className={`h-1 flex-1 rounded-full ${i < 15 ? 'bg-[#26A17B]' : 'bg-[#1a1a1a]'}`} />)}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-around px-5 mb-8">
          {[
            { label: 'Send', to: '/withdraw', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg> },
            { label: 'Receive', to: '/deposit', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg> },
            { label: 'History', to: '/transactions', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
            { label: 'More', to: '/assets', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" /></svg> },
          ].map(({ label, to, icon }) => (
            <button key={label} onClick={() => navigate(to)} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-[#1a1a1a] rounded-full flex items-center justify-center border border-[#2a2a2a] text-gray-300 active:scale-95 transition-transform">
                {icon}
              </div>
              <span className="text-xs text-gray-400 font-medium">{label}</span>
            </button>
          ))}
        </div>

        {/* Add Funds Banner */}
        <div className="mx-5 mb-6 bg-[#141414] border border-[#222] rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-[#ff6a00] text-xs font-semibold mb-0.5">Get started</p>
            <p className="text-white font-bold text-sm">Fund your wallet</p>
            <p className="text-gray-500 text-xs mt-0.5">Get your wallet ready to trade</p>
          </div>
          <button onClick={() => navigate('/deposit')} className="bg-[#ff6a00] text-black font-bold text-sm px-5 py-2.5 rounded-xl ml-4 shrink-0 active:opacity-80 transition-opacity">
            Add funds
          </button>
        </div>

        {/* Tabs */}
        <div className="px-5 mb-4">
          <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
            {MOBILE_TABS.map(tab => (
              <button key={tab} onClick={() => setMobileTab(tab)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  mobileTab === tab ? 'bg-white text-black' : 'bg-[#1a1a1a] text-gray-400 border border-[#2a2a2a]'
                }`}>
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="px-5">
          {mobileTab === 'Crypto' && (
            <div>
              {loading ? <p className="text-gray-500 text-sm text-center py-8">Loading...</p>
                : displayWallets.map(wallet => {
                    const meta = ASSET_META[wallet.coin] ?? { name: wallet.coin, color: '#888', icon: wallet.coin[0] };
                    const bal = Number(wallet.balance);
                    const price = prices[wallet.coin] ?? 0;
                    const val = bal * price;
                    return (
                      <div 
                        key={wallet.id} 
                        onClick={() => setSelectedAsset(wallet.coin)}
                        className={`flex items-center justify-between p-3.5 rounded-lg border-b border-[#1a1a1a] cursor-pointer transition-colors ${selectedAsset === wallet.coin ? 'bg-[#1a1a1a]' : 'hover:bg-[#111]'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0" style={{ backgroundColor: meta.color }}>
                            {meta.icon}
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm">{meta.name}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{balanceVisible ? `${bal.toFixed(4)} ${wallet.coin}` : '••••'}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-white text-sm">{balanceVisible ? `$${val.toFixed(2)}` : '••••'}</p>
                        </div>
                      </div>
                    );
                  })}
            </div>
          )}
          {mobileTab === 'Crypto' && selectedAsset && (
            <div className="mt-6 w-full bg-[#0A0A0A] rounded-xl overflow-hidden border border-[#1a1a1a]">
              {/* Timeframe + Expand controls */}
              <div className="flex items-center justify-between px-3 py-2 bg-[#141414] border-b border-[#222]">
                <span className="text-white text-xs font-bold">{selectedAsset}/USDT</span>
                <div className="flex items-center gap-1.5">
                  {[
                    { label: '1m', val: '1' },
                    { label: '30m', val: '30' },
                    { label: '1H', val: '60' },
                    { label: 'D', val: 'D' },
                  ].map(tf => (
                    <button
                      key={tf.val}
                      onClick={() => setTimeframe(tf.val as any)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                        timeframe === tf.val ? 'bg-[#ff6a00] text-black' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {tf.label}
                    </button>
                  ))}
                  <button
                    onClick={() => setChartExpanded(!chartExpanded)}
                    className="ml-1 p-1 rounded text-gray-400 hover:text-white bg-[#1a1a1a] transition-colors"
                    title={chartExpanded ? 'Exit Fullscreen' : 'Expand Chart'}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {chartExpanded ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
              <div className={chartExpanded ? 'fixed inset-0 z-50 bg-[#0A0A0A]' : 'h-[350px]'}>
                <AdvancedRealTimeChart 
                  theme="dark"
                  symbol={`BINANCE:${selectedAsset}USDT`}
                  interval={timeframe}
                  allow_symbol_change={true}
                  save_image={false}
                  hide_side_toolbar={true}
                  autosize
                />
                {chartExpanded && (
                  <button
                    onClick={() => setChartExpanded(false)}
                    className="absolute top-4 right-4 z-10 bg-[#141414] border border-[#333] text-white text-xs px-3 py-1.5 rounded-lg"
                  >
                    ✕ Close
                  </button>
                )}
              </div>
            </div>
          )}
          {/* Trade Panel - shown below chart on mobile in Crypto tab */}
          {mobileTab === 'Crypto' && (
            <div className="mt-4 bg-[#141414] border border-[#222] rounded-2xl p-4">
              <div className="flex bg-[#0A0A0A] rounded-lg p-1 mb-4">
                <button onClick={() => setTradeTab('buy')} className={`flex-1 text-xs font-bold py-2 rounded-md transition-colors ${tradeTab === 'buy' ? 'bg-[#26A17B] text-black' : 'text-gray-400'}`}>Buy</button>
                <button onClick={() => setTradeTab('sell')} className={`flex-1 text-xs font-bold py-2 rounded-md transition-colors ${tradeTab === 'sell' ? 'bg-red-500 text-white' : 'text-gray-400'}`}>Sell</button>
                <button onClick={() => setTradeTab('convert')} className={`flex-1 text-xs font-bold py-2 rounded-md transition-colors ${tradeTab === 'convert' ? 'bg-[#ff6a00] text-black' : 'text-gray-400'}`}>Convert</button>
              </div>

              {tradeTab === 'convert' ? (
                /* ── Inline Convert UI ── */
                <div className="space-y-3">
                  {/* From */}
                  <div className="bg-[#0A0A0A] border border-[#222] rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-500 text-[10px] font-medium">From</span>
                      <div className="flex gap-1.5 text-[10px]">
                        {['25%','50%','75%','MAX'].map(p => (
                          <button key={p} onClick={() => {
                            const bal = Number(wallets.find(w => w.coin === convertFrom)?.balance ?? 0);
                            if (p === '25%') setConvertAmount((bal * 0.25).toFixed(6));
                            else if (p === '50%') setConvertAmount((bal * 0.5).toFixed(6));
                            else if (p === '75%') setConvertAmount((bal * 0.75).toFixed(6));
                            else setConvertAmount(bal.toString());
                          }} className="px-1.5 py-0.5 bg-[#1a1a1a] hover:bg-[#ff6a00]/20 hover:text-[#ff6a00] rounded font-medium transition-colors">{p}</button>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="number" value={convertAmount} onChange={e => setConvertAmount(e.target.value)}
                        className="bg-transparent text-white text-xl font-bold flex-1 outline-none placeholder-gray-600" placeholder="0.00" />
                      <select
                        value={convertFrom}
                        onChange={e => setConvertFrom(e.target.value)}
                        className="bg-[#1a1a1a] border border-[#333] text-white text-xs font-bold rounded-lg px-2 py-1.5 outline-none"
                      >
                        {wallets.map(w => <option key={w.coin} value={w.coin}>{w.coin}</option>)}
                      </select>
                    </div>
                    <div className="text-gray-500 text-[10px] mt-1">
                      Bal: {Number(wallets.find(w => w.coin === convertFrom)?.balance ?? 0).toFixed(6)} {convertFrom}
                    </div>
                  </div>

                  {/* Swap arrow */}
                  <div className="flex justify-center">
                    <button onClick={() => { const t = convertFrom; setConvertFrom(convertTo); setConvertTo(t); }}
                      className="w-8 h-8 bg-[#141414] border border-[#333] rounded-full flex items-center justify-center text-[#ff6a00] hover:bg-[#ff6a00] hover:text-white transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                    </button>
                  </div>

                  {/* To */}
                  <div className="bg-[#0A0A0A] border border-[#222] rounded-xl p-3">
                    <span className="text-gray-500 text-[10px] font-medium">To (Estimated)</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-white text-xl font-bold flex-1">
                        {prices[convertTo] && prices[convertFrom] && Number(convertAmount) > 0
                          ? (((prices[convertFrom] || 0) * Number(convertAmount)) / prices[convertTo]).toFixed(6)
                          : '0.00'}
                      </span>
                      <select
                        value={convertTo}
                        onChange={e => setConvertTo(e.target.value)}
                        className="bg-[#1a1a1a] border border-[#333] text-white text-xs font-bold rounded-lg px-2 py-1.5 outline-none"
                      >
                        {['USDT','BTC','ETH','SOL','BNB','USDC'].map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="text-gray-500 text-[10px] mt-1">
                      1 {convertFrom} ≈ {((prices[convertFrom] || 1) / (prices[convertTo] || 1)).toFixed(6)} {convertTo}
                    </div>
                  </div>

                  {tradeError && <div className="text-red-400 text-xs font-medium text-center bg-red-400/10 py-2 rounded-lg">{tradeError}</div>}
                  {tradeSuccess && <div className="text-[#26A17B] text-xs font-medium text-center bg-[#26A17B]/10 py-2 rounded-lg">{tradeSuccess}</div>}
                  <button onClick={handleExecuteTrade} disabled={isExecuting}
                    className="w-full py-3 rounded-xl font-bold text-sm bg-[#ff6a00] text-black transition-opacity disabled:opacity-50">
                    {isExecuting ? 'Converting...' : `Convert ${convertFrom} → ${convertTo}`}
                  </button>
                </div>
              ) : (
                /* ── Buy / Sell UI ── */
                <div className="space-y-3">
                  <div className="bg-[#0A0A0A] border border-[#222] rounded-lg flex items-center px-3 py-2.5 focus-within:border-[#ff6a00] transition-colors">
                    <input
                      type="number"
                      value={tradeAmount}
                      onChange={(e) => setTradeAmount(e.target.value)}
                      className="bg-transparent text-sm font-bold w-full focus:outline-none"
                      placeholder="0.00"
                    />
                    <span className="text-xs text-gray-400 font-bold">{tradeTab === 'buy' ? 'USDT' : selectedAsset}</span>
                  </div>
                  <div className="flex justify-between text-[10px] mt-1">
                    <span className="text-gray-500">Current {selectedAsset} price</span>
                    <span className="text-green-500 font-bold">${(prices[selectedAsset] || 0).toLocaleString()}</span>
                  </div>

                  <div className="pt-2">
                    <label className="block text-[10px] text-gray-500 font-medium mb-2">Leverage</label>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 relative flex items-center h-4">
                        <div className="absolute w-full h-[1px] bg-gray-600"></div>
                        <input 
                          type="range" 
                          min="1" 
                          max="100" 
                          value={leverage} 
                          onChange={(e) => setLeverage(Number(e.target.value))}
                          className="absolute w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#ff6a00] [&::-webkit-slider-thumb]:rounded-[1px] cursor-pointer z-10" 
                        />
                      </div>
                      <div className="bg-[#1a1a1a] border border-[#222] rounded px-2 py-1 text-xs font-bold w-12 text-center">{leverage}x</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-3.5 h-3.5 rounded bg-transparent border-gray-600 appearance-none border checked:bg-[#ff6a00] checked:border-transparent" />
                      <span className="text-xs font-bold">Use TP/SL</span>
                    </label>
                    <button className="bg-[#1a1a1a] border border-[#222] rounded-full px-3 py-1 text-[10px] font-bold text-gray-400 hover:text-white transition-colors">
                      Set with AI
                    </button>
                  </div>

                  <div className="pb-2">
                    <label className="block text-[10px] text-gray-500 font-medium mb-1.5">Duration</label>
                    <div className="bg-[#1a1a1a] border border-[#222] rounded-lg px-3 py-2.5 text-xs font-bold flex justify-between items-center cursor-pointer">
                      2 minutes
                      <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>

                  {tradeError && <div className="text-red-400 text-xs font-medium text-center bg-red-400/10 py-2 rounded-lg">{tradeError}</div>}
                  {tradeSuccess && <div className="text-[#26A17B] text-xs font-medium text-center bg-[#26A17B]/10 py-2 rounded-lg">{tradeSuccess}</div>}
                  <button
                    onClick={handleExecuteTrade}
                    disabled={isExecuting}
                    className={`w-full py-3 rounded-xl font-bold text-sm transition-opacity ${isExecuting ? 'opacity-50' : 'active:opacity-80'} ${tradeTab === 'buy' ? 'bg-[#26A17B] text-black' : 'bg-red-500 text-white'}`}
                  >
                    {isExecuting ? 'Executing...' : `${tradeTab === 'buy' ? 'Buy' : 'Sell'} ${selectedAsset}`}
                  </button>
                </div>
              )}
              <MyTradesSection />
            </div>
          )}
          {mobileTab === 'DeFi' && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-[#1a1a1a] rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#ff6a00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <p className="text-white font-bold mb-1">Copy Trading</p>
              <p className="text-gray-500 text-sm mb-4">Auto-copy top traders</p>
              <button onClick={() => navigate('/dashboard/copy-trading')} className="bg-[#ff6a00] text-black font-bold px-6 py-2.5 rounded-xl text-sm">Explore Traders</button>
            </div>
          )}
          {mobileTab === 'Mining' && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-[#1a1a1a] rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#ff6a00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <p className="text-white font-bold mb-1">Cloud Mining</p>
              <p className="text-gray-500 text-sm mb-4">Earn passive income</p>
              <button onClick={() => navigate('/mining')} className="bg-[#ff6a00] text-black font-bold px-6 py-2.5 rounded-xl text-sm">Start Mining</button>
            </div>
          )}
          {mobileTab === 'History' && (
            <div>
              {loading ? (
                <p className="text-gray-500 text-sm text-center py-8">Loading...</p>
              ) : trades.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-gray-500 text-sm">No recent trades yet.</p>
                  <button onClick={() => navigate('/transactions')} className="mt-3 text-xs text-[#ff6a00] hover:underline font-semibold">
                    View Complete Transaction History →
                  </button>
                </div>
              ) : (
                <>
                  {trades.slice(0, 10).map(trade => (
                    <div key={trade.id} className="flex items-center justify-between py-3.5 border-b border-[#1a1a1a]">
                      <div>
                        <p className="text-white font-semibold text-sm">{trade.asset.replace('_TO_', '/')}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{new Date(trade.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white text-sm">${Number(trade.usdValue || 0).toFixed(2)}</p>
                        <span className="text-xs text-[#26A17B]">{trade.status}</span>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 text-center">
                    <button onClick={() => navigate('/transactions')} className="w-full py-2.5 bg-[#141414] hover:bg-[#1f1f1f] border border-[#262626] rounded-xl text-xs font-semibold text-[#ff6a00] transition-colors">
                      View Complete Transaction History →
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      {/* End Mobile */}
      <BottomNav />

      {/* ══════════ DESKTOP LAYOUT (hidden on mobile) ══════════ */}
      <div className="hidden md:flex flex-1 ml-[260px] flex-col h-screen overflow-y-auto custom-scrollbar">
        <Header />
        {/* Trading Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] min-h-[calc(100vh-64px)]">
          {/* Main Left Column */}
          <div className="flex flex-col border-r border-[#1a1a1a]">
            
            {/* Top Left: Balance & Assets */}
            <div className="p-6 border-b border-[#1a1a1a] bg-[#0A0A0A]">
              
              {/* Balance Header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-gray-400 text-xs font-medium">Total Balance</span>
                    <button onClick={() => setBalanceVisible(!balanceVisible)} className="text-gray-500 hover:text-gray-300">
                      {balanceVisible ? (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      ) : (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      )}
                    </button>
                  </div>
                  <div className="text-[28px] font-bold tracking-tight">
                    {loading
                      ? <span className="text-gray-500 text-xl">...</span>
                      : balanceVisible
                        ? `$${totalBalanceUSD.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
                        : '******'
                    }
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => navigate('/deposit')} className="flex items-center gap-2 bg-[#141414] hover:bg-[#1a1a1a] border border-[#222] px-3 py-1.5 rounded-lg text-xs font-medium transition-colors text-[#ff6a00]">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    Move money
                    <svg className="w-3 h-3 text-gray-500 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <button onClick={() => navigate('/deposit')} className="bg-[#141414] hover:bg-[#1a1a1a] border border-[#222] p-2 rounded-lg text-gray-400 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                  </button>
                  <button onClick={() => navigate('/transactions')} className="bg-[#141414] hover:bg-[#1a1a1a] border border-[#222] p-2 rounded-lg text-gray-400 transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  </button>
                </div>
              </div>

              {/* Top Assets */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-gray-400 text-xs font-semibold">Top Assets</h2>
                <Link to="/assets" className="text-[#ff6a00] text-xs hover:underline flex items-center gap-1 font-medium">
                  View all assets
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                </Link>
              </div>

              <div className="space-y-1 pb-4">
                {loading && <p className="text-gray-500 text-xs py-4">Loading assets...</p>}
                {!loading && displayWallets.slice(0, 4).map(wallet => {
                  const meta = ASSET_META[wallet.coin] ?? { name: wallet.coin, color: '#888', icon: wallet.coin[0] };
                  const balance = Number(wallet.balance);
                  const price = prices[wallet.coin] ?? 0;
                  const value = balance * price;

                  return (
                    <div 
                      key={wallet.id} 
                      onClick={() => setSelectedAsset(wallet.coin)}
                      className={`flex items-center justify-between p-2 rounded-lg transition-colors cursor-pointer group ${selectedAsset === wallet.coin ? 'bg-[#1a1a1a] border border-[#333]' : 'hover:bg-[#111] border border-transparent'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm"
                          style={{ backgroundColor: meta.color }}
                        >
                          {meta.icon}
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">{meta.name}</p>
                          <p className="text-[10px] text-gray-500 font-medium">{wallet.coin}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white text-sm">
                          {balanceVisible
                            ? `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                            : '••••'}
                        </p>
                        <p className="text-[10px] text-gray-500 font-medium font-mono mt-0.5">
                          {balanceVisible ? `${balance.toFixed(4)} ${wallet.coin}` : '••••'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Left: TradingView Chart Area */}
            <div className={`flex flex-col bg-[#0A0A0A] transition-all duration-300 ${chartExpanded ? 'fixed inset-0 z-50 p-6 bg-[#0A0A0A]' : 'flex-1 p-0 min-h-[520px]'}`}>
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#1a1a1a]">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-white text-black font-bold flex items-center justify-center text-xs">
                      {ASSET_META[selectedAsset]?.icon || '$'}
                    </span>
                    <span className="font-bold text-sm">{selectedAsset}/USDT</span>
                  </div>
                  {/* Timeframes: 1m, 30m, 1H, D */}
                  <div className="text-gray-500 text-xs flex gap-1.5 bg-[#141414] p-1 rounded-lg border border-[#222]">
                    {[
                      { label: '1m', val: '1' },
                      { label: '30m', val: '30' },
                      { label: '1H', val: '60' },
                      { label: 'D', val: 'D' },
                    ].map((tf) => (
                      <button
                        key={tf.val}
                        onClick={() => setTimeframe(tf.val as any)}
                        className={`px-2.5 py-1 rounded text-xs transition-colors ${
                          timeframe === tf.val ? 'bg-[#ff6a00] text-black font-bold' : 'hover:text-white'
                        }`}
                      >
                        {tf.label}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setChartExpanded(!chartExpanded)}
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white bg-[#141414] border border-[#222] px-3 py-1.5 rounded-lg transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {chartExpanded ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    )}
                  </svg>
                  {chartExpanded ? 'Exit Fullscreen' : 'Expand Chart'}
                </button>
              </div>
              <div className="flex-1 relative w-full h-full min-h-[460px]">
                <AdvancedRealTimeChart 
                  theme="dark"
                  symbol={`BINANCE:${selectedAsset}USDT`}
                  interval={timeframe}
                  allow_symbol_change={true}
                  save_image={false}
                  hide_side_toolbar={false}
                  autosize
                  backgroundColor="#0A0A0A"
                  gridLineColor="#1a1a1a"
                />
              </div>
            </div>
            
            {/* My Trades directly below chart on desktop */}
            <div className="p-6">
              <MyTradesSection />
            </div>
            
          </div>

          {/* Main Right Column */}
          <div className="flex flex-col bg-[#0A0A0A]">
            
            {/* Top Right: Categories / Progress / Signal */}
            <div className="p-6 border-b border-[#1a1a1a]">
              {/* Categories */}
              <div className="mb-10">
                <h3 className="text-gray-400 text-xs font-semibold mb-3">Categories</h3>
                <p className="text-[11px] text-white font-medium">
                  No categories yet. <span className="text-[#ff6a00] cursor-pointer hover:underline" onClick={() => navigate('/deposit')}>Deposit now</span> to see your portfolio breakdown.
                </p>
              </div>

              {/* Trading progress */}
              <div className="mb-8">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-400 font-medium">Trading progress</span>
                  <span className="font-bold">24%</span>
                </div>
                <div className="h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                  <div className="h-full bg-[#26A17B] w-[24%] rounded-full shadow-[0_0_10px_#26A17B]"></div>
                </div>
              </div>

              {/* Signal strength */}
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-400 font-medium">Signal strength</span>
                  <span className="font-bold text-green-500">Strong Buy</span>
                </div>
                <div className="flex gap-1 h-2">
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className="flex-1 bg-[#1a1a1a] rounded-sm">
                      <div className={`h-full w-full rounded-sm ${i < 12 ? 'bg-green-500' : 'opacity-20 bg-green-500'}`}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Right: Trade Controls */}
            <div className="p-6 flex-1 bg-[#0A0A0A]">
              <div className="flex bg-[#141414] rounded-lg p-1 mb-6">
                <button 
                  onClick={() => setTradeTab('buy')}
                  className={`flex-1 text-xs font-bold py-2 rounded-md transition-colors ${getActiveTabClass('buy')}`}
                >
                  Buy
                </button>
                <button 
                  onClick={() => setTradeTab('sell')}
                  className={`flex-1 text-xs font-bold py-2 rounded-md transition-colors ${getActiveTabClass('sell')}`}
                >
                  Sell
                </button>
                <button 
                  onClick={() => setTradeTab('convert')}
                  className={`flex-1 text-xs font-bold py-2 rounded-md transition-colors ${getActiveTabClass('convert')}`}
                >
                  Convert
                </button>
              </div>

                {tradeTab === 'convert' ? (
                  /* ── Desktop Convert: redirect to Trade page for full experience ── */
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-14 h-14 bg-[#1a1a1a] rounded-2xl flex items-center justify-center mb-4">
                      <svg className="w-7 h-7 text-[#ff6a00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                    </div>
                    <p className="text-white font-bold mb-1 text-sm">Full Convert Suite</p>
                    <p className="text-gray-500 text-xs mb-4">Use the Trade page for multi-asset convert with live quotes and percentage presets</p>
                    <button onClick={() => navigate('/trade', { state: { tradeTab: 'convert', selectedAsset } })}
                      className="bg-[#ff6a00] text-black font-bold px-6 py-2.5 rounded-xl text-sm">
                      Open Convert in Trade
                    </button>
                  </div>
                ) : (
                  /* ── Buy / Sell UI ── */
                  <div className="space-y-5">
                    <div>
                      <label className="block text-[10px] text-gray-500 font-medium mb-1.5">Trade pair</label>
                      <div className="bg-[#141414] border border-[#222] rounded-lg px-3 py-2.5 text-xs font-medium flex justify-between items-center cursor-pointer">
                        {selectedAsset} / USDT
                        <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-gray-500 font-medium mb-1.5">Amount {tradeTab === 'buy' ? '(USDT)' : `(${selectedAsset})`}</label>
                      <div className="bg-[#141414] border border-[#222] rounded-lg flex items-center px-3 py-2 focus-within:border-[#ff6a00] transition-colors">
                        <input 
                          type="number" 
                          value={tradeAmount} 
                          onChange={(e) => setTradeAmount(e.target.value)}
                          className="bg-transparent text-sm font-bold w-full focus:outline-none" 
                          placeholder="0.00"
                        />
                        <div className="flex items-center gap-1 bg-[#1a1a1a] px-2 py-1 rounded text-xs font-bold cursor-pointer">
                          <span className="w-3 h-3 rounded-full flex items-center justify-center text-black" style={{ backgroundColor: tradeTab === 'buy' ? '#26A17B' : ASSET_META[selectedAsset]?.color || '#F7931A' }}>
                            {tradeTab === 'buy' ? '₮' : (ASSET_META[selectedAsset]?.icon || '$')}
                          </span>
                          {tradeTab === 'buy' ? 'USDT' : selectedAsset}
                        </div>
                      </div>
                      <div className="flex justify-between text-[10px] mt-2">
                        <span className="text-gray-500">Available Balance</span>
                        <span className="font-bold">{tradeTab === 'buy' ? `${Number(usdtBalance).toFixed(2)} USDT` : `${Number(wallets.find(w => w.coin === selectedAsset)?.balance || 0).toFixed(6)} ${selectedAsset}`}</span>
                      </div>
                      <div className="flex justify-between text-[10px] mt-1">
                        <span className="text-gray-500">Current {selectedAsset} price</span>
                        <span className="text-green-500 font-bold">${assetPrice.toLocaleString()}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] text-gray-500 font-medium mb-2">Leverage</label>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 relative flex items-center h-4">
                          <div className="absolute w-full h-[1px] bg-gray-600"></div>
                          <input 
                            type="range" 
                            min="1" 
                            max="100" 
                            value={leverage} 
                            onChange={(e) => setLeverage(Number(e.target.value))}
                            className="absolute w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#ff6a00] [&::-webkit-slider-thumb]:rounded-[1px] cursor-pointer z-10" 
                          />
                        </div>
                        <div className="bg-[#141414] border border-[#222] rounded px-2 py-1 text-xs font-bold w-12 text-center">{leverage}x</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="w-3.5 h-3.5 rounded bg-transparent border-gray-600 appearance-none border checked:bg-[#ff6a00] checked:border-transparent" />
                        <span className="text-xs font-bold">Use TP/SL</span>
                      </label>
                      <button className="bg-[#141414] border border-[#222] rounded-full px-3 py-1 text-[10px] font-bold text-gray-400 hover:text-white transition-colors">
                        Set with AI
                      </button>
                    </div>

                    <div>
                      <label className="block text-[10px] text-gray-500 font-medium mb-1.5">Duration</label>
                      <div className="bg-[#141414] border border-[#222] rounded-lg px-3 py-2.5 text-xs font-bold flex justify-between items-center cursor-pointer">
                        Day Trade
                        <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>

                    {tradeError && <div className="text-red-400 text-xs font-medium text-center bg-red-400/10 border border-red-400/20 py-2 px-3 rounded-lg">{tradeError}</div>}
                    {tradeSuccess && <div className="text-[#26A17B] text-xs font-medium text-center bg-[#26A17B]/10 border border-[#26A17B]/20 py-2 px-3 rounded-lg">{tradeSuccess}</div>}

                    <button 
                      onClick={handleExecuteTrade}
                      disabled={isExecuting}
                      className={`w-full py-3 rounded-lg font-bold text-sm transition-opacity ${isExecuting ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'} ${tradeTab === 'buy' ? 'bg-[#26A17B] text-black' : 'bg-red-500 text-white'}`}
                    >
                      {isExecuting ? 'Executing...' : `${tradeTab === 'buy' ? 'Buy' : 'Sell'} ${selectedAsset}`}
                    </button>
                  </div>
                )}
            </div>
            
          </div>
        </div>

        {/* Bottom Section: Order History */}
        <div className="p-6 bg-[#0A0A0A] border-t border-[#1a1a1a]">
          <h2 className="text-lg font-bold mb-4">Order History</h2>
          
          <div className="bg-[#141414] rounded-xl border border-[#1a1a1a] overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#1a1a1a] text-gray-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Pair / Type</th>
                  <th className="px-6 py-4 font-medium">Direction</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">Value (USD)</th>
                  <th className="px-6 py-4 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1a1a]">
                {loading && (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500">Loading history...</td>
                  </tr>
                )}
                {!loading && trades.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                      No trading history found.
                    </td>
                  </tr>
                )}
                {!loading && trades.map(trade => (
                  <tr key={trade.id} className="hover:bg-[#1a1a1a]/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                      {new Date(trade.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {trade.asset.replace('_TO_', '/')}
                      {trade.type === 'COPY_TRADE' && <span className="ml-2 text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">Copy</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {trade.asset.startsWith('USDT') || trade.type === 'COPY_TRADE' ? (
                         <span className="text-[#26A17B] font-medium bg-[#26A17B]/10 px-2 py-1 rounded">Buy</span>
                      ) : (
                         <span className="text-red-500 font-medium bg-red-500/10 px-2 py-1 rounded">Sell</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-gray-300">
                      {trade.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      ${Number(trade.usdValue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="text-xs font-medium text-[#26A17B]">{trade.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      {/* End Desktop */}

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} userInitial="U" />
    </div>
  );
};
