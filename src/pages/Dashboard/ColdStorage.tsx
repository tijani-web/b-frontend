import { useState, useEffect } from 'react';
import { Sidebar } from './layout/Sidebar';
import { Header } from './layout/Header';
import { BottomNav } from './layout/BottomNav';

interface Wallet {
  coin: string;
  balance: number | string;
}

interface ColdAsset {
  coin: string;
  amount: number;
}

const HOW_IT_WORKS = [
  {
    q: 'What is Cold Storage?',
    a: 'Cold storage is a secure way to store your cryptocurrency assets offline, providing enhanced security and protection against online threats.',
  },
  {
    q: 'How Cold Storage Works',
    a: '1. Deposit: Transfer assets from your trading account to cold storage.\n2. Secure Storage: Assets are stored offline in multi-signature hardware custody.\n3. Withdraw: Access your assets anytime by withdrawing back to your trading account.',
  },
  {
    q: 'Benefits of Cold Storage',
    a: 'Enhanced security through offline storage, protection from online threats, instant access when needed, and perfect for long-term asset holding.',
  },
  {
    q: 'Important Notes',
    a: 'Cold storage provides bank-grade security. You can only deposit assets currently available in your trading account. Withdrawals are processed instantly to your trading account balance.',
  },
];

export const ColdStorage = () => {
  const [activeTab, setActiveTab] = useState<'assets' | 'howItWorks'>('assets');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showBalance, setShowBalance] = useState(true);

  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [coldAssets, setColdAssets] = useState<ColdAsset[]>([]);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState('USDT');
  const [addAmount, setAddAmount] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load user data & saved cold assets
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/user/wallets', { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json())
        .then(d => { if (d.data) setWallets(d.data); })
        .catch(() => {});

      fetch('/api/market/all')
        .then(r => r.json())
        .then(d => {
          if (d.data) {
            const pMap: Record<string, number> = {};
            for (const [sym, item] of Object.entries(d.data)) {
              pMap[sym] = Number((item as any)?.price) || 0;
            }
            pMap['USDT'] = 1.0;
            pMap['USDC'] = 1.0;
            setPrices(pMap);
          }
        })
        .catch(() => {});
    }

    try {
      const saved = localStorage.getItem('blofin_cold_storage');
      if (saved) setColdAssets(JSON.parse(saved));
    } catch {}
  }, []);

  const saveColdAssets = (updated: ColdAsset[]) => {
    setColdAssets(updated);
    try {
      localStorage.setItem('blofin_cold_storage', JSON.stringify(updated));
    } catch {}
  };

  const getAvailableBalance = (coin: string) => {
    const w = wallets.find(w => w.coin === coin);
    return w ? Number(w.balance) : 0;
  };

  const totalColdValue = coldAssets.reduce((sum, a) => {
    const p = prices[a.coin] || (a.coin === 'USDT' || a.coin === 'USDC' ? 1 : 0);
    return sum + a.amount * p;
  }, 0);

  const handleDepositToCold = () => {
    setErrorMsg('');
    const amt = parseFloat(addAmount);
    if (isNaN(amt) || amt <= 0) {
      setErrorMsg('Please enter a valid amount.');
      return;
    }
    const avail = getAvailableBalance(selectedCoin);
    if (amt > avail) {
      setErrorMsg(`Insufficient ${selectedCoin} balance. Available: ${avail}`);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      // Update cold assets
      const existingIdx = coldAssets.findIndex(a => a.coin === selectedCoin);
      let updated: ColdAsset[];
      if (existingIdx >= 0) {
        updated = [...coldAssets];
        updated[existingIdx].amount += amt;
      } else {
        updated = [...coldAssets, { coin: selectedCoin, amount: amt }];
      }
      saveColdAssets(updated);

      // Decrement local wallet display
      setWallets(prev => prev.map(w => w.coin === selectedCoin ? { ...w, balance: Math.max(0, Number(w.balance) - amt) } : w));

      setSuccessMsg(`Successfully transferred ${amt} ${selectedCoin} to Cold Storage!`);
      setIsSubmitting(false);
      setAddAmount('');
      setTimeout(() => {
        setShowAddModal(false);
        setSuccessMsg('');
      }, 1500);
    }, 400);
  };

  const handleWithdrawFromCold = (coin: string, amt: number) => {
    if (!window.confirm(`Withdraw ${amt} ${coin} back to trading wallet?`)) return;
    const updated = coldAssets.map(a => a.coin === coin ? { ...a, amount: Math.max(0, a.amount - amt) } : a).filter(a => a.amount > 0);
    saveColdAssets(updated);
    setWallets(prev => prev.map(w => w.coin === coin ? { ...w, balance: Number(w.balance) + amt } : w));
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-inter overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 md:ml-[260px] flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full pb-32 md:pb-8">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">Cold Storage</h1>
            <p className="text-xs text-gray-400">Store and isolate high-value digital assets in offline institutional-grade custody</p>
          </div>

          <div className="flex gap-6 border-b border-[#222] mb-8">
            <button
              onClick={() => setActiveTab('assets')}
              className={`pb-3 text-sm font-bold transition-colors border-b-2 -mb-px ${
                activeTab === 'assets' ? 'text-white border-[#ff6a00]' : 'text-gray-500 border-transparent hover:text-gray-300'
              }`}
            >
              Assets
            </button>
            <button
              onClick={() => setActiveTab('howItWorks')}
              className={`pb-3 text-sm font-bold transition-colors border-b-2 -mb-px ${
                activeTab === 'howItWorks' ? 'text-white border-[#ff6a00]' : 'text-gray-500 border-transparent hover:text-gray-300'
              }`}
            >
              How it works
            </button>
          </div>

          {activeTab === 'assets' ? (
            <div className="animate-in fade-in duration-300">
              <div className="mb-10 bg-[#121214] border border-[#222] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-gray-400">
                    <span className="text-sm font-medium">Cold Storage Portfolio Value</span>
                    <button onClick={() => setShowBalance(!showBalance)} className="hover:text-white transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showBalance ? "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" : "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"} /></svg>
                    </button>
                  </div>
                  <div className="text-[34px] font-bold tracking-tight text-white">
                    {showBalance ? `$${totalColdValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '••••••••'}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-[#ff6a00] hover:bg-[#ff7b1a] text-black font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
                    Add asset
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-white">Protected Assets ({coldAssets.length})</h2>
              </div>

              <div className="bg-[#141414] border border-[#222] rounded-xl overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-[#222]">
                      <th className="p-4 text-xs font-medium text-gray-500 w-1/4">Asset</th>
                      <th className="p-4 text-xs font-medium text-gray-500 w-1/4">Current Price</th>
                      <th className="p-4 text-xs font-medium text-gray-500 w-1/4">Cold Balance</th>
                      <th className="p-4 text-xs font-medium text-gray-500 w-1/4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coldAssets.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-12 text-center text-gray-500 text-sm">
                          <svg className="w-10 h-10 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                          No cold storage assets found. Click "Add asset" to deposit funds.
                        </td>
                      </tr>
                    ) : (
                      coldAssets.map(item => {
                        const p = prices[item.coin] || (item.coin === 'USDT' || item.coin === 'USDC' ? 1 : 0);
                        const val = item.amount * p;
                        return (
                          <tr key={item.coin} className="border-b border-[#1c1c1c] hover:bg-[#1a1a1a] transition-colors">
                            <td className="p-4 font-bold text-white flex items-center gap-2">
                              <span className="w-7 h-7 rounded-full bg-[#242424] text-[#ff6a00] font-bold text-xs flex items-center justify-center">
                                {item.coin.slice(0, 3)}
                              </span>
                              {item.coin}
                            </td>
                            <td className="p-4 text-sm text-gray-300">
                              ${p ? p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 }) : '—'}
                            </td>
                            <td className="p-4 text-sm">
                              <div className="font-bold text-white">{item.amount.toLocaleString()} {item.coin}</div>
                              <div className="text-xs text-gray-500">${val.toFixed(2)}</div>
                            </td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => handleWithdrawFromCold(item.coin, item.amount)}
                                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-gray-300 hover:text-white transition-colors"
                              >
                                Withdraw
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in duration-300 max-w-3xl">
              <h2 className="text-xl font-bold text-white mb-6">How it works</h2>
              <div className="space-y-4">
                {HOW_IT_WORKS.map((item, index) => (
                  <div key={index} className="bg-[#141414] border border-[#222] rounded-xl overflow-hidden transition-all duration-300">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full p-4 flex items-center justify-between hover:bg-[#1a1a1a] transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-[#2a2a2a] rounded flex items-center justify-center text-xs font-bold text-white shrink-0">
                          {index + 1}
                        </div>
                        <span className="font-bold text-sm text-white">{item.q}</span>
                      </div>
                      <svg className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    <div className={`transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                      <div className="p-4 pt-0 text-sm text-gray-400 leading-relaxed whitespace-pre-line ml-9 border-t border-[#222] mt-2">
                        {item.a}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
      <BottomNav />

      {/* Add Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#141418] border border-[#282830] rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔒</span>
                <h3 className="text-white font-bold text-base">Transfer to Cold Storage</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-white p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {errorMsg && (
              <div className="mb-4 text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="mb-4 text-xs text-green-400 bg-green-500/10 border border-green-500/20 p-3 rounded-lg">
                {successMsg}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 font-medium mb-1.5">Select Asset</label>
                <select
                  value={selectedCoin}
                  onChange={e => setSelectedCoin(e.target.value)}
                  className="w-full bg-[#1e1e24] border border-[#333] rounded-xl px-3 py-2.5 text-white text-sm focus:border-[#ff6a00] outline-none"
                >
                  {wallets.length > 0 ? (
                    wallets.map(w => (
                      <option key={w.coin} value={w.coin}>
                        {w.coin} (Available: {Number(w.balance).toFixed(4)})
                      </option>
                    ))
                  ) : (
                    ['USDT', 'BTC', 'ETH', 'SOL', 'USDC'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5 text-xs">
                  <span className="text-gray-400">Amount</span>
                  <span className="text-gray-500">Available: <span className="text-white font-semibold">{getAvailableBalance(selectedCoin).toFixed(4)} {selectedCoin}</span></span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    value={addAmount}
                    onChange={e => setAddAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-[#1e1e24] border border-[#333] rounded-xl px-3 py-2.5 text-white text-sm font-bold focus:border-[#ff6a00] outline-none pr-16"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-400">
                    {selectedCoin}
                  </span>
                </div>
                <div className="flex gap-2 mt-2">
                  {[0.25, 0.5, 0.75, 1].map(fraction => (
                    <button
                      key={fraction}
                      type="button"
                      onClick={() => setAddAmount((getAvailableBalance(selectedCoin) * fraction).toFixed(4))}
                      className="flex-1 py-1 text-[11px] font-semibold bg-[#222] hover:bg-[#2c2c2c] text-gray-300 rounded-lg transition-colors border border-[#333]"
                    >
                      {fraction === 1 ? 'MAX' : `${fraction * 100}%`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#121215] border border-[#252528] rounded-xl p-3 text-[11px] text-gray-400 space-y-1">
                <div className="flex justify-between">
                  <span>Transfer Fee:</span>
                  <span className="text-green-400 font-semibold">FREE (0.00%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Security Type:</span>
                  <span className="text-white">Multi-Sig Offline Vault</span>
                </div>
              </div>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleDepositToCold}
                className="w-full py-3 bg-[#ff6a00] hover:bg-[#ff7b1a] text-black font-bold rounded-xl transition-all disabled:opacity-50 text-sm shadow-md"
              >
                {isSubmitting ? 'Securing Assets...' : 'Deposit to Cold Storage'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
