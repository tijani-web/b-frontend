import { Sidebar } from './Dashboard/layout/Sidebar';
import { BottomNav } from './Dashboard/layout/BottomNav';
import { Header } from './Dashboard/layout/Header';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EARN_PRODUCTS = [
  {
    id: 'btc-flexible',
    asset: 'BTC',
    name: 'Bitcoin Flexible Earn',
    apy: '3.5',
    type: 'Flexible',
    color: '#F7931A',
    icon: '₿',
    minDeposit: '0.001',
    description: 'Earn daily BTC rewards with no lock-up period. Withdraw anytime.',
  },
  {
    id: 'eth-flexible',
    asset: 'ETH',
    name: 'Ethereum Flexible Earn',
    apy: '4.2',
    type: 'Flexible',
    color: '#627EEA',
    icon: 'Ξ',
    minDeposit: '0.01',
    description: 'Earn daily ETH rewards. Perfect for long-term holders.',
  },
  {
    id: 'btc-locked-30',
    asset: 'BTC',
    name: 'BTC 30-Day Fixed',
    apy: '7.8',
    type: 'Fixed 30D',
    color: '#F7931A',
    icon: '₿',
    minDeposit: '0.005',
    description: 'Lock BTC for 30 days for a higher fixed APY. Automatically renewed.',
  },
  {
    id: 'eth-locked-60',
    asset: 'ETH',
    name: 'ETH 60-Day Fixed',
    apy: '9.5',
    type: 'Fixed 60D',
    color: '#627EEA',
    icon: 'Ξ',
    minDeposit: '0.05',
    description: 'Lock ETH for 60 days for maximum yield. Best rate available.',
  },
];

const MiningCard = ({ onPurchase }: { onPurchase: () => void }) => (
  <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-8">
    <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-4">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[#ff6a00] text-xl">⛏</span>
          <h2 className="text-lg font-bold">Cloud Mining</h2>
          <span className="text-xs bg-[#ff6a00]/20 text-[#ff6a00] px-2 py-0.5 rounded-full border border-[#ff6a00]/30">
            Coming Soon
          </span>
        </div>
        <p className="text-gray-400 text-sm">
          Mine BTC & ETH directly from your account with our cloud mining infrastructure. No hardware needed.
        </p>
      </div>
      <div className="text-left md:text-right bg-neutral-800/50 p-3 rounded-xl md:bg-transparent md:p-0">
        <p className="text-xs text-gray-500">Est. Daily Yield</p>
        <p className="text-2xl font-bold text-[#ff6a00]">~0.00035 BTC</p>
        <p className="text-xs text-gray-500">per 1 TH/s</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
      {[
        { label: 'Total Hashrate', value: '—', unit: 'TH/s' },
        { label: 'Mined Today', value: '—', unit: 'BTC' },
        { label: 'Total Mined', value: '—', unit: 'BTC' },
      ].map(stat => (
        <div key={stat.label} className="bg-black border border-neutral-800 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
          <p className="text-xl font-bold">{stat.value}</p>
          <p className="text-xs text-gray-500">{stat.unit}</p>
        </div>
      ))}
    </div>

    <button
      onClick={onPurchase}
      className="w-full bg-[#ff6a00] hover:bg-[#ff7b1a] text-black font-semibold rounded-lg py-3 transition-colors"
    >
      Purchase Hashrate
    </button>
  </div>
);

export const Earn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-black text-white font-inter overflow-x-hidden">
      <Sidebar />
      <div className="md:pl-64">
        <Header />
        <main className="p-4 md:p-8 pb-32 md:pb-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Earn</h1>
            <p className="text-gray-400 text-sm mt-1">Grow your crypto with flexible and fixed-term earning products</p>
          </div>

          {/* Mining section */}
          <MiningCard onPurchase={() => navigate('/dashboard')} />

          {/* Earn Products */}
          <h2 className="text-xl font-bold mb-5">Flexible & Fixed Earn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {EARN_PRODUCTS.map(product => (
              <div
                key={product.id}
                className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-600 transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                      style={{ backgroundColor: product.color + '22', color: product.color }}
                    >
                      {product.icon}
                    </div>
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <span className="text-xs text-gray-500 bg-neutral-800 px-2 py-0.5 rounded-full">
                        {product.type}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Est. APY</p>
                    <p className="text-2xl font-bold text-green-400">{product.apy}%</p>
                  </div>
                </div>

                <p className="text-sm text-gray-400 mb-4">{product.description}</p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>Min. Deposit: {product.minDeposit} {product.asset}</span>
                  <span>Rewards: Daily</span>
                </div>

                <button 
                  onClick={() => navigate('/dashboard')}
                  className="w-full bg-[#ff6a00] hover:bg-[#ff7b1a] text-black font-semibold rounded-lg py-2.5 transition-colors text-sm group-hover:shadow-lg group-hover:shadow-[#ff6a00]/20"
                >
                  Deposit {product.asset} to Earn
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
};
