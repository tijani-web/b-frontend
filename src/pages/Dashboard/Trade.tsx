import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './layout/Sidebar';
import { Header } from './layout/Header';
import { BottomNav } from './layout/BottomNav';
import { useNavigate } from 'react-router-dom';
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { MobileMenu } from './layout/MobileMenu';

interface MemoChartProps {
  symbol: string;
  interval: string;
  containerId: string;
  height: number;
  hideSideToolbar?: boolean;
  hideTopToolbar?: boolean;
}

const MemoTradingChart = React.memo(
  ({
    symbol,
    interval,
    containerId,
    height,
    hideSideToolbar = false,
    hideTopToolbar = false,
  }: MemoChartProps) => {
    return (
      <div
        className="tv-chart-container w-full relative"
        style={{ height: `${height}px`, minHeight: `${height}px` }}
      >
        <AdvancedRealTimeChart
          key={containerId}
          container_id={containerId}
          theme="dark"
          symbol={symbol}
          interval={interval as any}
          allow_symbol_change={true}
          save_image={false}
          hide_side_toolbar={hideSideToolbar}
          hide_top_toolbar={hideTopToolbar}
          autosize={false}
          width="100%"
          height={height}
          backgroundColor="#0A0A0A"
          copyrightStyles={{ parent: { display: 'none' } }}
        />
      </div>
    );
  },
  (prev, next) => {
    return (
      prev.symbol === next.symbol &&
      prev.interval === next.interval &&
      prev.containerId === next.containerId &&
      prev.height === next.height
    );
  }
);

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
  category?: string;
  adminNote?: string;
  createdAt: string;
}

export const getTradingViewSymbol = (asset: string) => {
  const stockSymbols = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'NVDA', 'META', 'NFLX', 'AMD', 'INTC', 'CRM', 'ORCL', 'IBM', 'CSCO', 'ADBE', 'PYPL', 'SQ', 'COIN', 'HOOD', 'JPM', 'GS', 'BAC', 'V', 'MA', 'DIS', 'SPOT', 'SNAP', 'UBER', 'LYFT', 'ABNB', 'SHOP', 'ZM', 'PLTR', 'NKE', 'SBUX', 'MCD', 'KO', 'PEP', 'WMT', 'TGT', 'AMGN', 'JNJ', 'PFE', 'MRNA', 'BABA', 'TSM', 'F', 'GM', 'BA', 'XOM', 'CVX'];
  if (stockSymbols.includes(asset)) {
    return `NASDAQ:${asset}`;
  }
  const commodityMap: Record<string, string> = {
    GOLD: 'TVC:GOLD',
    SILVER: 'TVC:SILVER',
    OIL: 'TVC:USOIL',
    BRENT: 'TVC:UKOIL',
    GAS: 'TVC:NATGAS',
    PLAT: 'TVC:PLATINUM',
    PALL: 'TVC:PALLADIUM',
    COPP: 'TVC:COPPER',
  };
  if (commodityMap[asset]) return commodityMap[asset];
  const fiatSymbols = ['EUR', 'GBP', 'JPY', 'CNY', 'CAD', 'AUD', 'CHF', 'SGD', 'HKD', 'NZD'];
  if (fiatSymbols.includes(asset)) {
    return `FX:${asset}USD`;
  }
  return `BINANCE:${asset}USDT`;
};

const ALL_ASSETS = [
  { symbol: 'AAVE',   name: 'AAVE',                              color: '#B6509E', icon: 'A' },
  { symbol: 'ALGO',   name: 'Algorand',                          color: '#000000', icon: 'A' },
  { symbol: 'ANC',    name: 'Anchor Protocol',                   color: '#1B9E85', icon: 'A' },
  { symbol: 'APE',    name: 'ApeCoin',                           color: '#0033AD', icon: 'A' },
  { symbol: 'FET',    name: 'Artificial Superintelligence Alliance', color: '#1C2E4A', icon: 'F' },
  { symbol: 'AURORA', name: 'Aurora',                            color: '#78D64B', icon: 'A' },
  { symbol: 'AVAX',   name: 'Avalanche',                         color: '#E84142', icon: 'A' },
  { symbol: 'AXS',    name: 'Axie Infinity',                     color: '#0055D4', icon: 'A' },
  { symbol: 'BTC',    name: 'Bitcoin',                           color: '#F7931A', icon: '₿' },
  { symbol: 'BCH',    name: 'Bitcoin Cash',                      color: '#8DC351', icon: 'B' },
  { symbol: 'BTG',    name: 'Bitcoin Gold',                      color: '#EBA809', icon: 'B' },
  { symbol: 'BSV',    name: 'Bitcoin SV',                        color: '#EAB300', icon: 'B' },
  { symbol: 'BNB',    name: 'BNB',                               color: '#F3BA2F', icon: 'B' },
  { symbol: 'BORING', name: 'Boring DAO',                        color: '#5E5CE6', icon: 'B' },
  { symbol: 'ADA',    name: 'Cardano',                           color: '#0033AD', icon: 'A' },
  { symbol: 'LINK',   name: 'ChainLink',                         color: '#375BD2', icon: 'L' },
  { symbol: 'CRO',    name: 'Cronos',                            color: '#002D74', icon: 'C' },
  { symbol: 'DAI',    name: 'Dai',                               color: '#F5AC37', icon: 'D' },
  { symbol: 'DASH',   name: 'Dash',                              color: '#008CE7', icon: 'D' },
  { symbol: 'MANA',   name: 'Decentraland',                      color: '#FF2D55', icon: 'M' },
  { symbol: 'DOGE',   name: 'Dogecoin',                          color: '#C2A633', icon: 'D' },
  { symbol: 'ETH',    name: 'Ethereum',                          color: '#627EEA', icon: 'Ξ' },
  { symbol: 'ETC',    name: 'Ethereum Classic',                  color: '#328332', icon: 'E' },
  { symbol: 'EVMOS',  name: 'Evmos',                             color: '#ED4E33', icon: 'E' },
  { symbol: 'GT',     name: 'Gate Token',                        color: '#2354E6', icon: 'G' },
  { symbol: 'HBAR',   name: 'Hedera',                            color: '#00B388', icon: 'H' },
  { symbol: 'HEX',    name: 'Hex',                               color: '#FF005E', icon: 'H' },
  { symbol: 'ICP',    name: 'Internet Computer',                 color: '#29ABE2', icon: 'I' },
  { symbol: 'KAS',    name: 'Kaspa',                             color: '#70C7BA', icon: 'K' },
  { symbol: 'LN',     name: 'Link',                              color: '#F7931A', icon: 'L' },
  { symbol: 'LTC',    name: 'Litecoin',                          color: '#345D9D', icon: 'L' },
  { symbol: 'XMR',    name: 'Monero',                            color: '#FF6600', icon: 'X' },
  { symbol: 'NEXO',   name: 'Nexo',                              color: '#1A4490', icon: 'N' },
  { symbol: 'OKB',    name: 'OKB',                               color: '#2354E6', icon: 'O' },
  { symbol: 'XCN',    name: 'Onyxcoin',                          color: '#7B2FBE', icon: 'X' },
  { symbol: 'OP',     name: 'Optimism',                          color: '#FF0420', icon: 'O' },
  { symbol: 'OGN',    name: 'Origin Protocol',                   color: '#1A82FF', icon: 'O' },
  { symbol: 'ORN',    name: 'Orion Protocol',                    color: '#4D91FF', icon: 'O' },
  { symbol: 'PNG',    name: 'Pangolin',                          color: '#FF6B00', icon: 'P' },
  { symbol: 'PEPE',   name: 'Pepe',                              color: '#479F45', icon: 'P' },
  { symbol: 'DOT',    name: 'Polkadot',                          color: '#E6007A', icon: 'D' },
  { symbol: 'MATIC',  name: 'Polygon',                           color: '#8247E5', icon: 'M' },
  { symbol: 'XPR',    name: 'Proton',                            color: '#7B2FBE', icon: 'X' },
  { symbol: 'QNT',    name: 'Quant',                             color: '#1A1A2E', icon: 'Q' },
  { symbol: 'RARI',   name: 'Rarible',                           color: '#FEDA03', icon: 'R' },
  { symbol: 'RNDR',   name: 'Render',                            color: '#DD4337', icon: 'R' },
  { symbol: 'XRP',    name: 'Ripple',                            color: '#00AAE4', icon: 'X' },
  { symbol: 'SFP',    name: 'Safepal',                           color: '#1C81E5', icon: 'S' },
  { symbol: 'SHIB',   name: 'Shiba Inu',                         color: '#FF9900', icon: 'S' },
  { symbol: 'SOL',    name: 'Solana',                            color: '#9945FF', icon: '◎' },
  { symbol: 'SOLO',   name: 'Sologenic',                         color: '#0B3D91', icon: 'S' },
  { symbol: 'XLM',    name: 'Stellar',                           color: '#00B4D8', icon: 'X' },
  { symbol: 'GMT',    name: 'Stepn',                             color: '#00C27C', icon: 'G' },
  { symbol: 'SUI',    name: 'SUI',                               color: '#6FBCF0', icon: 'S' },
  { symbol: 'SUSHI',  name: 'Sushi',                             color: '#FA52A0', icon: 'S' },
  { symbol: 'TLOS',   name: 'Telos',                             color: '#570AE7', icon: 'T' },
  { symbol: 'USDT',   name: 'Tether',                            color: '#26A17B', icon: '₮' },
  { symbol: 'XTZ',    name: 'Tezos',                             color: '#2C7DF7', icon: 'X' },
  { symbol: 'GRT',    name: 'The Graph',                         color: '#6F4CFF', icon: 'G' },
  { symbol: 'TON',    name: 'Toncoin',                           color: '#0098EA', icon: 'T' },
  { symbol: 'TRX',    name: 'Tron',                              color: '#FF0013', icon: 'T' },
  { symbol: 'UNI',    name: 'Uniswap',                           color: '#FF007A', icon: 'U' },
  { symbol: 'USDC',   name: 'USD Coin',                          color: '#2775CA', icon: '$' },
  { symbol: 'VET',    name: 'Vechain',                           color: '#15BDFF', icon: 'V' },
  { symbol: 'VELO',   name: 'Velo',                              color: '#1D2671', icon: 'V' },
  { symbol: 'WING',   name: 'Wing Finance',                      color: '#44B8EB', icon: 'W' },
  { symbol: 'XDC',    name: 'XDC Network',                       color: '#F49800', icon: 'X' },
  { symbol: 'XRPH',   name: 'XRP Healthcare',                    color: '#00AAE4', icon: 'X' },
  { symbol: 'ZEC',    name: 'Zcash',                             color: '#ECB244', icon: 'Z' },
];

const LEVERAGE_MARKS = [0, 25, 50, 75, 100];
const DURATION_OPTIONS = ['2 minutes', '5 minutes', '15 minutes', '30 minutes', '1 hour', '4 hours', 'Day Trade', 'Week'];

// Asset picker modal
const AssetPicker = ({ onSelect, onClose, wallets, prices }: {
  onSelect: (symbol: string) => void;
  onClose: () => void;
  wallets: Wallet[];
  prices: Record<string, number>;
}) => {
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const filtered = ALL_ASSETS.filter(a =>
    a.symbol.toLowerCase().includes(search.toLowerCase()) ||
    a.name.toLowerCase().includes(search.toLowerCase())
  );

  const getBalance = (symbol: string) => {
    const w = wallets.find(w => w.coin === symbol);
    return w ? Number(w.balance) : 0;
  };

  const getUsdValue = (symbol: string) => {
    const bal = getBalance(symbol);
    const price = prices[symbol] ?? 0;
    return (bal * price).toFixed(2);
  };

  return (
    <div className="absolute inset-0 z-50 bg-[#1a1a1a] rounded-xl flex flex-col" style={{ top: 0 }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <h3 className="text-white font-bold text-sm">Select asset</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      {/* Search */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 bg-[#222] border border-[#333] rounded-lg px-3 py-2.5">
          <svg className="w-4 h-4 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <input
            ref={inputRef}
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search for assets"
            className="bg-transparent text-white text-sm placeholder-gray-500 flex-1 outline-none"
          />
        </div>
      </div>
      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 space-y-0.5">
        {filtered.map(asset => (
          <button
            key={asset.symbol}
            onClick={() => { onSelect(asset.symbol); onClose(); }}
            className="w-full flex items-center justify-between py-3 px-2 hover:bg-[#222] rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ backgroundColor: asset.color }}>
                {asset.icon}
              </div>
              <div className="text-left">
                <div className="text-white text-sm font-semibold leading-tight">{asset.name}</div>
                <div className="text-gray-500 text-xs">{asset.symbol}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white text-sm font-semibold">${getUsdValue(asset.symbol)}</div>
              <div className="text-gray-500 text-xs">{getBalance(asset.symbol)} {asset.symbol}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export const Trade = () => {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [trades, setTrades] = useState<TradeRecord[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Trade Panel State
  const [tradeTab, setTradeTab] = useState<'buy' | 'sell' | 'convert'>('buy');
  const [tradeAmount, setTradeAmount] = useState('100');
  const [selectedAsset, setSelectedAsset] = useState('BTC');
  const [isExecuting, setIsExecuting] = useState(false);
  const [leverage, setLeverage] = useState(5);
  const [duration, setDuration] = useState('2 minutes');
  const [showDurationMenu, setShowDurationMenu] = useState(false);
  const [tradeType, setTradeType] = useState('Crypto');
  const [showTradeTypeMenu, setShowTradeTypeMenu] = useState(false);
  const [useTPSL, setUseTPSL] = useState(false);

  // Convert state
  const [convertFrom, setConvertFrom] = useState('BTC');
  const [convertTo, setConvertTo] = useState('USDT');
  const [convertAmount, setConvertAmount] = useState('0.01');

  // Asset picker
  const [showAssetPicker, setShowAssetPicker] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<'main' | 'convertFrom' | 'convertTo'>('main');

  const [tradeError, setTradeError] = useState('');
  const [tradeSuccess, setTradeSuccess] = useState('');
  const [timeframe, setTimeframe] = useState<'1' | '30' | '60' | 'D'>('D');
  const [chartExpanded, setChartExpanded] = useState(false);
  // Stable chart key — only changes when asset OR timeframe actually changes, never on re-render
  const chartKey = useRef(`trade-${selectedAsset}-${timeframe}`);
  useEffect(() => { chartKey.current = `trade-${selectedAsset}-${timeframe}`; }, [selectedAsset, timeframe]);

  const navigate = useNavigate();

  const fetchWallets = async (token: string) => {
    try {
      const r = await fetch('/api/user/wallets', { headers: { Authorization: `Bearer ${token}` } });
      if (r.status === 401) { localStorage.removeItem('token'); navigate('/login'); return; }
      const data = await r.json();
      setWallets(data.data || []);
    } catch (e) {}
  };

  const fetchHistory = async (token: string) => {
    try {
      const r = await fetch('/api/user/history', { headers: { Authorization: `Bearer ${token}` } });
      const data = await r.json();
      if (data.data) {
        setTrades(data.data.filter((t: any) => t.type === 'TRADE' || t.type === 'COPY_TRADE'));
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
          for (const item of raw) {
            if (item?.symbol) priceMap[item.symbol] = Number(item.price) || 0;
          }
        } else if (typeof raw === 'object') {
          for (const [sym, item] of Object.entries(raw)) {
            priceMap[sym] = Number((item as any)?.price) || 0;
          }
        }
        priceMap['USDT'] = 1.0;
        priceMap['USDC'] = 1.0;
        setPrices(prev => ({ ...prev, ...priceMap }));
      }
    } catch {}
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }
    setLoading(true);
    Promise.all([
      fetchWallets(token),
      fetchHistory(token),
      fetchPrices()
    ]).finally(() => setLoading(false));

    const interval = setInterval(fetchPrices, 8000);
    return () => clearInterval(interval);
  }, [navigate]);

  const [expandedTradeTab, setExpandedTradeTab] = useState<'open' | 'closed'>('open');

  const handleClosePosition = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await fetch(`/api/trade/position/${id}/close`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to close position');
      setTradeSuccess(data.message || 'Position closed');
      fetchWallets(token);
      fetchHistory(token);
    } catch (e: any) {
      setTradeError(e.message);
    }
  };

  const handleCancelPosition = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await fetch(`/api/trade/position/${id}/cancel`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to cancel position');
      setTradeSuccess('Position cancelled and margin refunded.');
      fetchWallets(token);
      fetchHistory(token);
    } catch (e: any) {
      setTradeError(e.message);
    }
  };

  const handleExecuteTrade = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    if (tradeTab === 'convert') {
      const amount = Number(convertAmount);
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
          body: JSON.stringify({ fromAsset: convertFrom, toAsset: convertTo, amount })
        });
        const data = await res.json();
        if (!res.ok) {
          setTradeError(data.error || 'Convert failed');
        } else {
          setTradeSuccess(`Convert executed! Received ${data.receivedAmount?.toFixed(4)} ${convertTo}`);
          fetchWallets(token);
          fetchHistory(token);
        }
      } catch (e) {
        setTradeError('An error occurred during trade execution.');
      } finally {
        setIsExecuting(false);
      }
      return;
    }

    // BUY / SELL order creation
    const amount = Number(tradeAmount);
    if (!amount || amount <= 0 || isNaN(amount)) {
      setTradeError('Please enter a valid amount');
      return;
    }

    setIsExecuting(true);
    setTradeError('');
    setTradeSuccess('');
    try {
      const res = await fetch('/api/trade/position', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          asset: selectedAsset,
          side: tradeTab,
          amount,
          leverage,
          duration,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setTradeError(data.error || 'Trade failed');
      } else {
        setTradeSuccess(`✅ ${tradeTab.toUpperCase()} position opened for ${selectedAsset}/USDT!`);
        fetchWallets(token);
        fetchHistory(token);
      }
    } catch (e) {
      setTradeError('An error occurred during trade execution.');
    } finally {
      setIsExecuting(false);
    }
  };

  const getTabClass = (tab: string) => {
    if (tradeTab !== tab) return 'text-gray-400 hover:text-white';
    if (tab === 'buy') return 'bg-[#26A17B] text-black font-bold';
    if (tab === 'sell') return 'bg-red-500 text-white font-bold';
    return 'bg-[#ff6a00] text-white font-bold';
  };

  const currentPrice = prices[selectedAsset] ?? 0;
  const usdtBalance = wallets.find(w => w.coin === 'USDT')?.balance ?? 0;

  const openPicker = (target: 'main' | 'convertFrom' | 'convertTo') => {
    setPickerTarget(target);
    setShowAssetPicker(true);
  };

  const handlePickerSelect = (symbol: string) => {
    if (pickerTarget === 'main') setSelectedAsset(symbol);
    else if (pickerTarget === 'convertFrom') setConvertFrom(symbol);
    else setConvertTo(symbol);
  };

  const getAssetMeta = (symbol: string) => ALL_ASSETS.find(a => a.symbol === symbol) ?? { symbol, name: symbol, color: '#888', icon: symbol[0] };

  const renderMyTradesSection = () => {
    const openPositions = trades.filter(t => t.status === 'OPEN');
    const closedPositions = trades.filter(t => t.status === 'COMPLETED' || t.status === 'CLOSED' || t.status === 'CANCELLED');

    return (
      <div className="mt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3">
          <h2 className="text-white font-bold text-sm tracking-tight">Positions & Orders</h2>
          <div className="flex bg-[#141414] border border-[#222] rounded-lg p-0.5 text-xs w-full sm:w-auto">
            <button
              onClick={() => setExpandedTradeTab('open')}
              className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-md font-bold text-center transition-colors ${expandedTradeTab === 'open' ? 'bg-[#ff6a00] text-black shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              Open ({openPositions.length})
            </button>
            <button
              onClick={() => setExpandedTradeTab('closed')}
              className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-md font-bold text-center transition-colors ${expandedTradeTab === 'closed' ? 'bg-[#ff6a00] text-black shadow-sm' : 'text-gray-400 hover:text-white'}`}
            >
              Closed ({closedPositions.length})
            </button>
          </div>
        </div>

        {expandedTradeTab === 'open' ? (
          openPositions.length === 0 ? (
            <div className="bg-[#141414] border border-[#222] rounded-xl p-5 text-center text-gray-400 text-xs font-medium">
              No open positions. Use the Buy/Sell panel to place an order.
            </div>
          ) : (
            <div className="space-y-2.5">
              {openPositions.map((t) => {
                const isBuy = (t.category || '').toUpperCase().includes('BUY');
                return (
                  <div key={t.id} className="bg-[#141414] border border-[#222] rounded-xl p-3.5 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${isBuy ? 'bg-[#26A17B]/10 text-[#26A17B] border border-[#26A17B]/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                          {isBuy ? 'LONG / BUY' : 'SHORT / SELL'}
                        </span>
                        <span className="text-white font-bold text-sm">{t.asset}</span>
                      </div>
                      <span className="text-[10px] text-gray-500">{new Date(t.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                      <div className="bg-[#101010] p-2 rounded-lg border border-[#1c1c1c]">
                        <span className="text-gray-500 text-[10px] block">Margin</span>
                        <span className="text-white font-medium">${Number(t.amount).toFixed(2)}</span>
                      </div>
                      <div className="bg-[#101010] p-2 rounded-lg border border-[#1c1c1c]">
                        <span className="text-gray-500 text-[10px] block">Entry Price</span>
                        <span className="text-white font-medium">${Number(t.usdValue || 0).toLocaleString()}</span>
                      </div>
                      <div className="col-span-2 sm:col-span-1 bg-[#101010] p-2 rounded-lg border border-[#1c1c1c]">
                        <span className="text-gray-500 text-[10px] block">Details</span>
                        <span className="text-gray-300 font-mono text-[10px] truncate block">{t.adminNote || 'Active'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1 border-t border-[#1f1f1f]">
                      <button
                        onClick={() => handleClosePosition(t.id)}
                        className="flex-1 py-1.5 rounded-lg text-xs font-bold bg-[#26A17B] hover:bg-[#208b6a] text-black transition-colors"
                      >
                        Close Position
                      </button>
                      <button
                        onClick={() => handleCancelPosition(t.id)}
                        className="flex-1 py-1.5 rounded-lg text-xs font-bold bg-neutral-800 hover:bg-neutral-700 text-gray-300 hover:text-white transition-colors border border-neutral-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          closedPositions.length === 0 ? (
            <div className="bg-[#141414] border border-[#222] rounded-xl p-6 text-center text-gray-500 text-xs">
              No closed positions yet.
            </div>
          ) : (
            <div className="space-y-2">
              {closedPositions.slice(0, 10).map((t) => (
                <div key={t.id} className="bg-[#141414] border border-[#222] rounded-xl p-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold">{t.asset}</span>
                      <span className="text-[10px] text-gray-500">{new Date(t.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-0.5 truncate max-w-[200px]">{t.adminNote || `$${Number(t.amount).toFixed(2)}`}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${t.status === 'CANCELLED' ? 'text-gray-400 bg-neutral-800' : 'text-green-400 bg-green-500/10'}`}>
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    );
  };

  // ─── Right Panel (shared between mobile & desktop) ────────────────────────
  const renderTradePanel = () => (
    <div className="relative flex flex-col h-full bg-[#0A0A0A]">
      {/* Asset Picker Overlay */}
      {showAssetPicker && (
        <AssetPicker
          onSelect={handlePickerSelect}
          onClose={() => setShowAssetPicker(false)}
          wallets={wallets}
          prices={prices}
        />
      )}

      <div className="p-5 flex flex-col gap-4 overflow-y-auto">
        {/* Buy / Sell / Convert tabs */}
        <div className="flex bg-[#141414] rounded-xl p-1">
          {(['buy', 'sell', 'convert'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setTradeTab(tab)}
              className={`flex-1 py-2.5 rounded-lg text-sm capitalize transition-all ${getTabClass(tab)}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {tradeTab === 'convert' ? (
          /* ── CONVERT UI ── */
          <div className="space-y-3">
            {/* From */}
            <div className="bg-[#141414] border border-[#222] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 text-xs font-medium">From</span>
                <div className="flex gap-2 text-xs text-gray-400">
                  {['25%', '50%', '75%', 'MAX'].map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        const bal = Number(wallets.find(w => w.coin === convertFrom)?.balance ?? 0);
                        if (p === '25%') setConvertAmount((bal * 0.25).toFixed(4));
                        if (p === '50%') setConvertAmount((bal * 0.5).toFixed(4));
                        if (p === '75%') setConvertAmount((bal * 0.75).toFixed(4));
                        if (p === 'MAX') setConvertAmount(bal.toString());
                      }}
                      className="px-2 py-0.5 bg-[#1a1a1a] hover:bg-[#222] hover:text-[#ff6a00] rounded text-[11px] transition-colors font-medium"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between mt-1">
                <input
                  type="number"
                  value={convertAmount}
                  onChange={e => setConvertAmount(e.target.value)}
                  className="bg-transparent text-white text-2xl font-bold w-32 outline-none placeholder-gray-600"
                  placeholder="0.00"
                />
                <button
                  type="button"
                  onClick={() => openPicker('convertFrom')}
                  className="flex items-center gap-2 bg-[#1a1a1a] border border-[#333] rounded-xl px-3 py-2 hover:bg-[#222] transition-colors"
                >
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: getAssetMeta(convertFrom).color }}>
                    {getAssetMeta(convertFrom).icon}
                  </div>
                  <span className="text-white font-bold text-sm">{convertFrom}</span>
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-500 text-xs">
                  ~${((prices[convertFrom] || 1) * (Number(convertAmount) || 0)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-gray-400 text-xs">
                  Bal: {Number(wallets.find(w => w.coin === convertFrom)?.balance ?? 0).toFixed(4)} {convertFrom}
                </span>
              </div>
            </div>

            {/* Swap icon */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => { const tmp = convertFrom; setConvertFrom(convertTo); setConvertTo(tmp); }}
                className="w-9 h-9 bg-[#141414] border border-[#222] rounded-full flex items-center justify-center text-[#ff6a00] hover:bg-[#ff6a00] hover:text-white transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
              </button>
            </div>

            {/* To */}
            <div className="bg-[#141414] border border-[#222] rounded-xl p-4">
              <span className="text-gray-500 text-xs font-medium">To (Estimated)</span>
              <div className="flex items-center justify-between mt-2">
                <span className="text-white text-2xl font-bold">
                  {prices[convertTo] && prices[convertFrom] && Number(convertAmount) > 0
                    ? (((prices[convertFrom] || 0) * Number(convertAmount)) / prices[convertTo]).toFixed(4)
                    : '0.00'}
                </span>
                <button
                  type="button"
                  onClick={() => openPicker('convertTo')}
                  className="flex items-center gap-2 bg-[#1a1a1a] border border-[#333] rounded-xl px-3 py-2 hover:bg-[#222] transition-colors"
                >
                  {convertTo ? (
                    <>
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: getAssetMeta(convertTo).color }}>
                        {getAssetMeta(convertTo).icon}
                      </div>
                      <span className="text-white font-bold text-sm">{convertTo}</span>
                    </>
                  ) : (
                    <span className="text-gray-400 text-sm">Select asset</span>
                  )}
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-gray-500 text-xs">
                  1 {convertFrom} ≈ {((prices[convertFrom] || 1) / (prices[convertTo] || 1)).toFixed(4)} {convertTo}
                </span>
                <span className="text-gray-400 text-xs">
                  Bal: {Number(wallets.find(w => w.coin === convertTo)?.balance ?? 0).toFixed(4)} {convertTo}
                </span>
              </div>
            </div>

            <button
              onClick={handleExecuteTrade}
              disabled={isExecuting}
              className="w-full py-3.5 bg-[#ff6a00] hover:bg-[#ff7b1a] text-black font-bold rounded-xl text-sm transition-colors disabled:opacity-50"
            >
              {isExecuting ? 'Converting...' : `Convert ${convertFrom} to ${convertTo}`}
            </button>
          </div>
        ) : (
          /* ── BUY / SELL UI ── */
          <div className="space-y-4">
            {/* Trade Type Dropdown */}
            <div className="relative">
              <label className="block text-gray-500 text-xs font-medium mb-1.5">Trade type:</label>
              <div 
                onClick={() => setShowTradeTypeMenu(!showTradeTypeMenu)}
                className="bg-[#141414] border border-[#222] hover:border-[#333] rounded-xl px-3 py-2.5 flex justify-between items-center cursor-pointer transition-colors"
              >
                <span className="text-white text-sm font-medium">{tradeType}</span>
                <svg className={`w-4 h-4 text-gray-500 transition-transform ${showTradeTypeMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </div>

              {showTradeTypeMenu && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-[#1a1a1a] border border-[#333] rounded-xl shadow-2xl py-1.5 z-30">
                  {['Crypto', 'Forex', 'Commodities', 'Stocks'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setTradeType(type);
                        setShowTradeTypeMenu(false);
                        if (type === 'Crypto') setSelectedAsset('BTC');
                        else if (type === 'Forex') setSelectedAsset('EUR');
                        else if (type === 'Commodities') setSelectedAsset('GOLD');
                        else if (type === 'Stocks') setSelectedAsset('AAPL');
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold hover:bg-[#252525] transition-colors flex items-center justify-between ${
                        tradeType === type ? 'text-[#ff6a00] bg-[#ff6a00]/10' : 'text-gray-300'
                      }`}
                    >
                      <span>{type}</span>
                      {tradeType === type && <span className="text-xs font-bold text-[#ff6a00]">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Amount + Asset picker trigger */}
            <div>
              <label className="block text-gray-500 text-xs font-medium mb-1.5">Amount:</label>
              <div className="relative">
                <input
                  type="number"
                  value={tradeAmount}
                  onChange={e => setTradeAmount(e.target.value)}
                  className="w-full bg-[#141414] border border-[#222] rounded-xl px-3 py-3 text-white font-bold text-sm focus:outline-none focus:border-[#ff6a00] pr-28"
                />
                <button
                  onClick={() => openPicker('main')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-[#222] hover:bg-[#2a2a2a] rounded-lg px-2.5 py-1.5 transition-colors"
                >
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ backgroundColor: getAssetMeta(selectedAsset).color }}>
                    {getAssetMeta(selectedAsset).icon}
                  </div>
                  <span className="text-white font-bold text-sm">{selectedAsset}</span>
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
              </div>
            </div>

            {/* Info row */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-gray-500">
                <span>Current USD balance:</span>
                <span className="text-white font-medium">{Number(usdtBalance).toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Current {selectedAsset} price</span>
                <span className="text-white font-medium">${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>

            {/* Leverage */}
            <div>
              <label className="block text-gray-500 text-xs font-medium mb-2">Leverage:</label>
              <div className="flex justify-between text-[10px] text-gray-500 mb-1 px-0.5">
                {LEVERAGE_MARKS.map(m => <span key={m}>{m}x</span>)}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 relative h-5 flex items-center">
                  <div className="absolute w-full h-1 bg-[#222] rounded-full" />
                  <div className="absolute h-1 bg-[#ff6a00] rounded-full" style={{ width: `${leverage}%` }} />
                  <input
                    type="range" min="1" max="100" value={leverage}
                    onChange={e => setLeverage(Number(e.target.value))}
                    className="absolute w-full opacity-0 h-5 cursor-pointer z-10"
                  />
                  <div
                    className="absolute w-4 h-4 bg-[#ff6a00] rounded-full shadow-md pointer-events-none"
                    style={{ left: `calc(${leverage}% - 8px)` }}
                  />
                </div>
                <div className="bg-[#141414] border border-[#222] rounded-lg px-3 py-1.5 text-xs font-bold w-14 text-center text-white">{leverage}x</div>
              </div>
            </div>

            {/* TP/SL */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => setUseTPSL(!useTPSL)}
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${useTPSL ? 'bg-[#ff6a00] border-[#ff6a00]' : 'border-gray-600 bg-transparent'}`}
                >
                  {useTPSL && <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className="text-xs font-bold text-white">Use TP/SL</span>
              </label>
              <button className="bg-[#141414] border border-[#222] rounded-full px-3 py-1 text-[10px] font-bold text-gray-400 hover:text-white transition-colors">
                Set with AI
              </button>
            </div>

            {/* Duration */}
            <div className="relative">
              <label className="block text-gray-500 text-xs font-medium mb-1.5">Duration:</label>
              <button
                onClick={() => setShowDurationMenu(!showDurationMenu)}
                className="w-full bg-[#141414] border border-[#222] rounded-xl px-3 py-3 flex justify-between items-center text-sm font-bold text-white"
              >
                {duration}
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {showDurationMenu && (
                <div className="absolute top-full left-0 right-0 z-20 bg-[#1a1a1a] border border-[#333] rounded-xl mt-1 overflow-hidden shadow-xl">
                  {DURATION_OPTIONS.map(opt => (
                    <button
                      key={opt}
                      onClick={() => { setDuration(opt); setShowDurationMenu(false); }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${duration === opt ? 'text-[#ff6a00] bg-[#ff6a00]/10' : 'text-gray-300 hover:bg-[#222]'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {tradeError && <div className="text-red-400 text-xs font-medium text-center bg-red-400/10 py-2 rounded-lg">{tradeError}</div>}
            {tradeSuccess && <div className="text-[#26A17B] text-xs font-medium text-center bg-[#26A17B]/10 py-2 rounded-lg">{tradeSuccess}</div>}

            <button
              onClick={handleExecuteTrade}
              disabled={isExecuting}
              className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all active:scale-[0.98] disabled:opacity-50 ${tradeTab === 'buy' ? 'bg-[#26A17B] text-black shadow-[0_4px_20px_rgba(38,161,123,0.3)]' : 'bg-red-500 text-white shadow-[0_4px_20px_rgba(239,68,68,0.3)]'}`}
            >
              {isExecuting ? 'Executing...' : `${tradeTab === 'buy' ? 'Buy' : 'Sell'} ${selectedAsset}`}
            </button>
          </div>
        )}

        {/* Global Trade Alerts for Buy, Sell, and Convert */}
        {tradeError && <div className="mt-4 text-red-400 text-xs font-medium text-center bg-red-400/10 border border-red-400/20 py-2.5 px-3 rounded-lg">{tradeError}</div>}
        {tradeSuccess && <div className="mt-4 text-[#26A17B] text-xs font-medium text-center bg-[#26A17B]/10 border border-[#26A17B]/20 py-2.5 px-3 rounded-lg">{tradeSuccess}</div>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-inter overflow-x-hidden">
      <Sidebar />

      {/* ══════════ MOBILE LAYOUT ══════════ */}
      <div className="flex md:hidden flex-col w-full h-screen bg-[#0A0A0A] overflow-y-auto pb-24">
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-5 pt-10 pb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileMenuOpen(true)} className="text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <span className="text-white font-bold text-lg">Trade</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/settings')} className="w-8 h-8 bg-[#ff6a00] rounded-full flex items-center justify-center text-black font-bold text-xs">U</button>
          </div>
        </div>

        {/* Chart */}
        <div className="mx-4 mb-4 rounded-xl overflow-hidden border border-[#222]">
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
                  type="button"
                  onClick={() => setTimeframe(tf.val as any)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${timeframe === tf.val ? 'bg-[#ff6a00] text-black' : 'text-gray-400 hover:text-white'}`}
                >
                  {tf.label}
                </button>
              ))}
              <button
                type="button"
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
          <div className={chartExpanded ? 'fixed inset-0 z-50 bg-[#0A0A0A]' : 'w-full'}>
            <MemoTradingChart
              symbol={getTradingViewSymbol(selectedAsset)}
              interval={timeframe}
              containerId="tradingview_trade_mobile_chart"
              height={chartExpanded ? window.innerHeight : 420}
              hideSideToolbar={true}
            />
            {chartExpanded && (
              <button
                type="button"
                onClick={() => setChartExpanded(false)}
                className="absolute top-4 right-4 z-[60] bg-black/80 hover:bg-black text-white px-3 py-1.5 rounded-lg text-xs font-bold border border-white/20"
              >
                Close Fullscreen
              </button>
            )}
          </div>
        </div>

        {/* Trade Panel */}
        <div className="mx-4 bg-[#141414] border border-[#222] rounded-2xl overflow-hidden relative">
          {renderTradePanel()}
        </div>

        {/* Mobile My Trades */}
        <div className="mx-4 mt-6 mb-24">
          {renderMyTradesSection()}
        </div>
      </div>
      <BottomNav />

      {/* ══════════ DESKTOP LAYOUT ══════════ */}
      <div className="hidden md:flex flex-1 ml-[260px] flex-col min-h-screen xl:h-screen xl:overflow-hidden">
        <Header />
        <div className="flex flex-col xl:flex-row flex-1 xl:overflow-hidden min-h-[calc(100vh-64px)]">
          {/* Left: Chart + My Trades — scrollable column */}
          <div className={`flex flex-col flex-1 overflow-y-auto custom-scrollbar border-r border-[#1a1a1a] ${chartExpanded ? 'fixed inset-0 z-50 bg-[#0A0A0A] p-6' : ''}`}>
            {/* Chart toolbar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#1a1a1a] shrink-0">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: getAssetMeta(selectedAsset).color }}>
                    {getAssetMeta(selectedAsset).icon}
                  </div>
                  <span className="font-bold text-sm">{selectedAsset}/USDT</span>
                </div>
                {/* Timeframes: 1m, 30m, 1H, D */}
                <div className="text-gray-500 text-xs flex gap-1.5 bg-[#141414] p-1 rounded-lg border border-[#222]">
                  {[
                    { label: '1m', val: '1' },
                    { label: '30m', val: '30' },
                    { label: '1H', val: '60' },
                    { label: 'D', val: 'D' },
                  ].map(tf => (
                    <button
                      key={tf.val}
                      type="button"
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
                type="button"
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

            {/* Chart — takes up majority of the left column */}
            <div className="shrink-0 w-full">
              <MemoTradingChart
                symbol={getTradingViewSymbol(selectedAsset)}
                interval={timeframe}
                containerId="tradingview_trade_desktop_chart"
                height={chartExpanded ? window.innerHeight - 120 : 600}
                hideSideToolbar={false}
              />
            </div>

            {/* My Trades / Positions section */}
            {!chartExpanded && (
              <div className="p-6 border-t border-[#1a1a1a]">
                {renderMyTradesSection()}
              </div>
            )}
          </div>

          {/* Right: Trade Panel — fixed-width on large desktop, full-width on smaller screens */}
          <div className="w-full xl:w-[380px] shrink-0 overflow-y-auto custom-scrollbar border-t xl:border-t-0 border-[#1a1a1a]">
            {renderTradePanel()}
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} userInitial="U" />
    </div>
  );
};
