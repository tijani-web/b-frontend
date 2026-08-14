import { Sidebar } from './Dashboard/layout/Sidebar';
import { BottomNav } from './Dashboard/layout/BottomNav';
import { Header } from './Dashboard/layout/Header';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ASSET_META: Record<string, { name: string; color: string; icon: string }> = {
  BTC:  { name: 'Bitcoin',  color: '#F7931A', icon: '₿' },
  ETH:  { name: 'Ethereum', color: '#627EEA', icon: 'Ξ' },
  USDT: { name: 'Tether',   color: '#26A17B', icon: '₮' },
  USDC: { name: 'USD Coin', color: '#2775CA', icon: '$' },
  SOL:  { name: 'Solana',   color: '#9945FF', icon: '◎' },
  BNB:  { name: 'BNB',      color: '#F3BA2F', icon: 'B' },
};

interface Wallet {
  id: string;
  coin: string;   // backend field is 'coin', NOT 'asset'
  balance: string | number;
}

export const Assets = () => {
  const navigate = useNavigate();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }

    // Fetch real wallets — backend returns { id, coin, balance }
    fetch('/api/user/wallets', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => {
        setWallets(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Fetch live prices from CoinGecko via backend
    fetch('/api/market/prices?symbols=BTC,ETH,USDT,USDC,SOL,BNB')
      .then(r => r.json())
      .then(data => setPrices(data.data || {}))
      .catch(() => {});
  }, [navigate]);

  // Use w.coin (the actual backend field name)
  const totalUSD = wallets.reduce((sum, w) => sum + Number(w.balance) * (prices[w.coin] ?? 0), 0);

  // Only rows with a balance > 0
  const activeWallets = wallets.filter(w => Number(w.balance) > 0);

  return (
    <div className="min-h-screen bg-black text-white font-inter overflow-x-hidden">
      <Sidebar />
      <div className="md:pl-64">
        <Header />
        <main className="p-4 md:p-8 pb-32 md:pb-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">My Assets</h1>
            <p className="text-gray-400 text-sm mt-1">Overview of all your crypto holdings</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
              <p className="text-sm text-gray-400 mb-1">Total Portfolio Value</p>
              <p className="text-2xl font-bold">
                {loading ? '...' : `$${totalUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              </p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
              <p className="text-sm text-gray-400 mb-1">Assets Held</p>
              <p className="text-2xl font-bold">{activeWallets.length}</p>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
              <p className="text-sm text-gray-400 mb-1">Quick Actions</p>
              <div className="flex gap-2 mt-1">
                <button onClick={() => navigate('/deposit')} className="text-xs bg-[#ff6a00] text-white font-semibold px-3 py-1 rounded-lg">Deposit</button>
                <button onClick={() => navigate('/withdraw')} className="text-xs bg-neutral-700 text-white font-semibold px-3 py-1 rounded-lg">Withdraw</button>
              </div>
            </div>
          </div>

          {/* Assets Table */}
          <div className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-x-auto custom-scrollbar pb-2">
            <table className="w-full text-left">
              <thead className="bg-neutral-950 border-b border-neutral-800 text-gray-400 text-sm">
                <tr>
                  <th className="px-6 py-4 font-medium">Asset</th>
                  <th className="px-6 py-4 font-medium">Balance</th>
                  <th className="px-6 py-4 font-medium">Price</th>
                  <th className="px-6 py-4 font-medium">Value (USD)</th>
                  <th className="px-6 py-4 font-medium">Allocation</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {loading && (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500">Loading assets…</td>
                  </tr>
                )}
                {!loading && activeWallets.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center">
                      <p className="text-gray-500 mb-2">No assets yet.</p>
                      <button
                        onClick={() => navigate('/deposit')}
                        className="text-[#ff6a00] text-sm hover:underline"
                      >
                        Make your first deposit →
                      </button>
                    </td>
                  </tr>
                )}
                {!loading && activeWallets.map(wallet => {
                  const coin = wallet.coin;
                  const meta = ASSET_META[coin] ?? { name: coin, color: '#888888', icon: coin[0] };
                  const balance = Number(wallet.balance);
                  const price = prices[coin] ?? 0;
                  const value = balance * price;
                  const allocation = totalUSD > 0 ? (value / totalUSD) * 100 : 0;

                  return (
                    <tr key={wallet.id} className="hover:bg-neutral-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
                            style={{ backgroundColor: meta.color + '33', color: meta.color }}
                          >
                            {meta.icon}
                          </div>
                          <div>
                            <p className="font-semibold">{coin}</p>
                            <p className="text-xs text-gray-400">{meta.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm">{balance.toFixed(8)}</td>
                      <td className="px-6 py-4 text-gray-300">
                        {price > 0 ? `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '—'}
                      </td>
                      <td className="px-6 py-4 font-medium">
                        ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${allocation}%`, backgroundColor: meta.color }}
                            />
                          </div>
                          <span className="text-xs text-gray-400 w-10">{allocation.toFixed(1)}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex gap-3 justify-end">
                          <button
                            onClick={() => navigate('/deposit')}
                            className="text-xs text-[#ff6a00] hover:underline font-medium"
                          >
                            Deposit
                          </button>
                          <button
                            onClick={() => navigate('/withdraw')}
                            className="text-xs text-gray-400 hover:text-white font-medium"
                          >
                            Withdraw
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
};
