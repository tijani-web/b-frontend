import { useEffect, useState } from "react";
import { ViewMoreButton } from "@/sections/TrendingCryptocurrencies/components/ViewMoreButton";
import { Link } from "react-router-dom";

// CoinGecko IDs for each section
const POPULAR_IDS = ['bitcoin', 'ethereum', 'ripple', 'solana', 'zcash'];
const NEW_IDS = ['bonk', 'dogwifcoin', 'pepe', 'worldcoin-wld', 'pyth-network'];
const GAINERS_IDS = ['injective-protocol', 'render-token', 'fetch-ai', 'aptos', 'sui'];

const ALL_IDS = [...new Set([...POPULAR_IDS, ...NEW_IDS, ...GAINERS_IDS])].join(',');

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

const formatPrice = (p: number) => {
  if (!p) return '$0.00';
  if (p >= 1000) return '$' + p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (p >= 1) return '$' + p.toFixed(2);
  if (p >= 0.001) return '$' + p.toFixed(4);
  return '$' + p.toFixed(6);
};

// Fallback static data so the UI is never empty
const FALLBACK: Record<string, CoinData> = {
  bitcoin: { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', image: 'https://c.animaapp.com/ms9b4yl7eEtjhI/assets/BTC-y1Z7we69.png', current_price: 85367, price_change_percentage_24h: 1.23 },
  ethereum: { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', image: 'https://c.animaapp.com/ms9b4yl7eEtjhI/assets/ETH-m5h6bj18.png', current_price: 3241, price_change_percentage_24h: 0.87 },
  ripple: { id: 'ripple', symbol: 'XRP', name: 'Ripple', image: 'https://c.animaapp.com/ms9b4yl7eEtjhI/assets/xrp.png', current_price: 0.52, price_change_percentage_24h: -1.02 },
  solana: { id: 'solana', symbol: 'SOL', name: 'Solana', image: 'https://c.animaapp.com/ms9b4yl7eEtjhI/assets/sol.png', current_price: 148, price_change_percentage_24h: 2.14 },
  'zcash': { id: 'zcash', symbol: 'ZEC', name: 'Zcash', image: '', current_price: 42, price_change_percentage_24h: -0.5 },
  'bonk': { id: 'bonk', symbol: 'BONK', name: 'Bonk', image: '', current_price: 0.0000182, price_change_percentage_24h: 8.33 },
  'dogwifcoin': { id: 'dogwifcoin', symbol: 'WIF', name: 'dogwifhat', image: '', current_price: 2.4, price_change_percentage_24h: 5.11 },
  'pepe': { id: 'pepe', symbol: 'PEPE', name: 'Pepe', image: '', current_price: 0.0000122, price_change_percentage_24h: 12.4 },
  'worldcoin-wld': { id: 'worldcoin-wld', symbol: 'WLD', name: 'Worldcoin', image: '', current_price: 1.8, price_change_percentage_24h: 3.7 },
  'pyth-network': { id: 'pyth-network', symbol: 'PYTH', name: 'Pyth Network', image: '', current_price: 0.38, price_change_percentage_24h: 2.9 },
  'injective-protocol': { id: 'injective-protocol', symbol: 'INJ', name: 'Injective', image: '', current_price: 22, price_change_percentage_24h: 18.5 },
  'render-token': { id: 'render-token', symbol: 'RNDR', name: 'Render', image: '', current_price: 7.8, price_change_percentage_24h: 15.2 },
  'fetch-ai': { id: 'fetch-ai', symbol: 'FET', name: 'Fetch.ai', image: '', current_price: 1.65, price_change_percentage_24h: 11.3 },
  'aptos': { id: 'aptos', symbol: 'APT', name: 'Aptos', image: '', current_price: 9.2, price_change_percentage_24h: 8.7 },
  'sui': { id: 'sui', symbol: 'SUI', name: 'SUI', image: '', current_price: 1.1, price_change_percentage_24h: 6.4 },
};

const CoinRow = ({ coin }: { coin: CoinData }) => {
  const pos = coin.price_change_percentage_24h >= 0;
  return (
    <Link to="/markets" className="flex items-center justify-between py-3 border-b border-white/5 hover:bg-white/5 px-3 rounded-lg transition-colors group">
      <div className="flex items-center gap-3">
        {coin.image ? (
          <img src={coin.image} alt={coin.symbol} className="w-8 h-8 rounded-full" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        ) : (
          <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center text-white text-xs font-bold">
            {coin.symbol?.[0]}
          </div>
        )}
        <div>
          <div className="text-white font-bold text-sm">{coin.symbol?.toUpperCase()}USDT</div>
          <div className="text-gray-400 text-xs">{coin.name}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-white text-sm font-bold">{formatPrice(coin.current_price)}</div>
        <div className={`text-xs font-medium ${pos ? 'text-emerald-500' : 'text-rose-500'}`}>
          {pos ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
        </div>
      </div>
    </Link>
  );
};

const CategoryCard = ({ title, ids, prices }: { title: string; ids: string[]; prices: Record<string, CoinData> }) => (
  <div className="bg-[#111] border border-white/5 rounded-2xl p-4 flex flex-col gap-1">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-white font-bold text-base">{title}</h3>
      <Link to="/markets" className="text-xs text-gray-400 hover:text-white transition-colors">View all →</Link>
    </div>
    {ids.map(id => prices[id] ? <CoinRow key={id} coin={prices[id]} /> : null)}
  </div>
);

export const TrendingCryptocurrencies = () => {
  const [prices, setPrices] = useState<Record<string, CoinData>>(FALLBACK);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ALL_IDS}&order=market_cap_desc&per_page=50&page=1&price_change_percentage=24h`,
          { cache: 'no-store' }
        );
        if (!res.ok) return;
        const data: CoinData[] = await res.json();
        const map: Record<string, CoinData> = { ...FALLBACK };
        data.forEach(coin => { map[coin.id] = coin; });
        setPrices(map);
        setLastUpdated(new Date());
      } catch {} finally {
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-black relative w-full">
      <div className="max-w-[1200px] mx-auto pt-12 pb-20 px-4 md:pt-20 md:px-0">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-white text-[28px] font-bold tracking-[-0.7px] leading-[34px] md:text-7xl md:tracking-[-1.8px] md:leading-[90px]">
            Trending Cryptocurrencies
          </h2>
          <p className="text-violet-100/80 text-lg leading-[26px] max-w-[900px] mx-auto mt-4 md:text-2xl md:leading-[34px] md:mt-6">
            Explore news, popular assets, and top gainers in real time
          </p>
          {lastUpdated && (
            <p className="text-gray-500 text-xs mt-2">
              Live · Last updated {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>

        {/* Desktop 3-col grid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          <CategoryCard title="Popular" ids={POPULAR_IDS} prices={prices} />
          <CategoryCard title="New Coins" ids={NEW_IDS} prices={prices} />
          <CategoryCard title="Top Gainers" ids={GAINERS_IDS} prices={prices} />
        </div>

        {/* Mobile: single column (Popular only, scrollable) */}
        <div className="md:hidden">
          <CategoryCard title="Popular" ids={POPULAR_IDS} prices={prices} />
          <div className="mt-4">
            <CategoryCard title="Top Gainers" ids={GAINERS_IDS} prices={prices} />
          </div>
        </div>

        <ViewMoreButton />
      </div>
    </section>
  );
};
