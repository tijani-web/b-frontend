import { Sidebar } from './layout/Sidebar';
import { Header } from './layout/Header';
import { BottomNav } from './layout/BottomNav';
import { useState, useEffect } from 'react';

interface Trader {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  roi: string;
  winRate: string;
  profitShare: string;
  wins: number;
  losses: number;
  trades: number;
  minStartup: string;
  followers: number;
  risk: string;
  isActive: boolean;
  isCopying?: boolean;
}

const BLANK_TRADER = {
  name: '', handle: '', avatar: '🤖', roi: '', winRate: '', profitShare: '20%',
  wins: 0, losses: 0, trades: 0, minStartup: '$0', followers: 0, risk: 'Medium',
};

const HOW_IT_WORKS = [
  {
    q: 'What is Copy Trading?',
    a: 'Copy Trading allows you to automatically replicate the trades of experienced traders. When they open or close a trade, the same action happens proportionally in your account.',
  },
  {
    q: 'How do I copy an expert?',
    a: 'Browse the Top Experts list, click "Copy" on any trader you like, set your allocation amount, and confirm. Your account will then mirror their trades automatically.',
  },
  {
    q: 'How can I stop copying an expert?',
    a: 'Go to the Copying tab, find the expert you\'re copying, and click "Cancel". All mirrored positions will be closed at market price.',
  },
  {
    q: 'Why don\'t I receive any trades from copied experts?',
    a: 'This may happen if the expert hasn\'t placed any trades recently, if your allocated balance is insufficient, or if there\'s a mismatch in the trading pair settings.',
  },
  {
    q: 'What is the minimum amount I can copy an expert with?',
    a: 'The minimum amount or minimum startup is determined by the expert you choose. If the expert has a minimum startup amount, it is displayed as \'Min. startup\' on the expert\'s profile card.',
  },
];

export const CopyTradingDashboard = () => {
  const [traders, setTraders] = useState<Trader[]>([]);
  const [loadingTraders, setLoadingTraders] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<'experts' | 'copying' | 'howItWorks'>('experts');
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(4);

  const [copyingId, setCopyingId] = useState<string | null>(null);
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const [copyAmount, setCopyAmount] = useState('');
  const [copyAsset, setCopyAsset] = useState('USDT');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [activeCopies, setActiveCopies] = useState<any[]>([]);
  const [viewDrawerId, setViewDrawerId] = useState<string | null>(null);

  const [editModal, setEditModal] = useState<{ open: boolean; trader: typeof BLANK_TRADER; id?: string }>({
    open: false, trader: { ...BLANK_TRADER },
  });
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');

  const token = () => localStorage.getItem('token') ?? '';

  const fetchTraders = async () => {
    try {
      const res = await fetch('/api/copy-traders', { headers: { Authorization: `Bearer ${token()}` } });
      const data = await res.json();
      if (data.data) setTraders(data.data);
    } catch {}
    setLoadingTraders(false);
  };

  const fetchActiveCopies = async () => {
    try {
      const res = await fetch('/api/user/transactions', { headers: { Authorization: `Bearer ${token()}` } });
      const data = await res.json();
      if (data.data) setActiveCopies(data.data.filter((t: any) => t.type === 'COPY_TRADE'));
    } catch {}
  };

  useEffect(() => {
    fetchTraders();
    fetchActiveCopies();
    fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token()}` } })
      .then(r => r.json())
      .then(d => { if (d.user?.role === 'ADMIN') setIsAdmin(true); })
      .catch(() => {});
  }, []);

  const handleCopy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalId || !copyAmount || !copyAsset) return;
    setIsLoading(true); setError(''); setSuccessMsg('');
    try {
      const res = await fetch('/api/trade/copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
        body: JSON.stringify({ traderId: activeModalId, amount: parseFloat(copyAmount), asset: copyAsset }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCopyingId(activeModalId);
      setActiveModalId(null);
      setCopyAmount('');
      const trader = traders.find(t => t.id === activeModalId);
      setSuccessMsg(`Successfully copying ${trader?.name || 'trader'}!`);
      setTimeout(() => setSuccessMsg(''), 5000);
      fetchActiveCopies();
    } catch (e: any) { setError(e.message); }
    finally { setIsLoading(false); }
  };

  const handleSaveTrader = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditLoading(true); setEditError('');
    const isEdit = !!editModal.id;
    try {
      const res = await fetch(
        isEdit ? `/api/copy-traders/admin/${editModal.id}` : '/api/copy-traders/admin',
        {
          method: isEdit ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
          body: JSON.stringify({ ...editModal.trader, followers: Number(editModal.trader.followers) }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setEditModal({ open: false, trader: { ...BLANK_TRADER } });
      fetchTraders();
    } catch (e: any) { setEditError(e.message); }
    finally { setEditLoading(false); }
  };

  const handleDeleteTrader = async (id: string, name: string) => {
    if (!window.confirm(`Delete trader "${name}"? This cannot be undone.`)) return;
    try {
      await fetch(`/api/copy-traders/admin/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token()}` } });
      fetchTraders();
    } catch {}
  };

  const filteredTraders = traders.filter(t =>
    !search ||
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    (t.handle || '').toLowerCase().includes(search.toLowerCase())
  );

  const copyingTraders = traders.filter(t => activeCopies.some(c => c.traderId === t.id) || copyingId === t.id);

  const TABS = [
    { key: 'experts', label: 'Top experts' },
    { key: 'copying', label: 'Copying' },
    { key: 'howItWorks', label: 'How it works' },
  ] as const;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-inter overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 md:ml-[260px] flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 pb-32 md:pb-8">
          {/* Page heading */}
          <div className="px-6 pt-6 pb-0">
            <h1 className="text-white font-bold text-lg mb-4">Copy trading</h1>

            {/* Tabs */}
            <div className="flex items-center gap-6 border-b border-[#1a1a1a]">
              {TABS.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`pb-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                    activeTab === tab.key
                      ? 'text-white border-[#ff6a00]'
                      : 'text-gray-500 border-transparent hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Top Experts tab ── */}
          {activeTab === 'experts' && (
            <div className="px-6 pt-6">
              {successMsg && (
                <div className="mb-6 bg-[#26A17B]/10 border border-[#26A17B]/20 text-[#26A17B] text-sm p-3 rounded-lg flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {successMsg}
                </div>
              )}

              {/* Header row */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-base">Top experts</h2>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-[#141414] border border-[#222] rounded-xl px-3 py-2 w-48">
                    <svg className="w-4 h-4 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Search for experts"
                      className="bg-transparent text-white text-sm placeholder-gray-500 flex-1 outline-none"
                    />
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => setEditModal({ open: true, trader: { ...BLANK_TRADER } })}
                      className="flex items-center gap-2 bg-[#ff6a00] text-black font-bold px-4 py-2 rounded-xl text-sm hover:bg-[#ff7b1a] transition-all"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                      Add Expert
                    </button>
                  )}
                </div>
              </div>

              {/* Grid of expert cards */}
              {loadingTraders ? (
                <p className="text-gray-500 text-sm">Loading experts...</p>
              ) : filteredTraders.length === 0 ? (
                <p className="text-gray-500 text-sm">No experts found.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTraders.map(trader => {
                    const isCopying = copyingId === trader.id || activeCopies.some(c => c.traderId === trader.id);
                    return (
                      <div key={trader.id} className="bg-[#141414] border border-[#222] rounded-xl p-5 flex flex-col gap-4 hover:border-[#333] transition-colors">
                        {/* Trader header */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full bg-[#222] flex items-center justify-center text-xl border border-[#333] overflow-hidden shrink-0">
                              {trader.avatar}
                            </div>
                            <div>
                              <div className="flex items-center gap-1">
                                <span className="text-white font-bold text-sm">{trader.name}</span>
                                <svg className="w-3.5 h-3.5 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                              </div>
                              <p className="text-gray-500 text-xs">{trader.handle || `@${trader.name.toLowerCase().replace(/\s+/g, '')}`}</p>
                              <div className="flex items-center gap-1 text-gray-500 text-xs mt-0.5">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                {(trader.followers || 0).toLocaleString()} Followers
                              </div>
                            </div>
                          </div>
                          {isAdmin && (
                            <div className="flex gap-1">
                              <button onClick={() => setEditModal({ open: true, id: trader.id, trader: { name: trader.name, handle: trader.handle || '', avatar: trader.avatar, roi: trader.roi, winRate: trader.winRate, profitShare: trader.profitShare || '20%', wins: trader.wins || 0, losses: trader.losses || 0, trades: trader.trades || 0, minStartup: trader.minStartup || '$0', followers: trader.followers, risk: trader.risk } })} className="p-1.5 text-gray-500 hover:text-[#ff6a00] bg-[#1a1a1a] rounded-lg transition-colors">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                              </button>
                              <button onClick={() => handleDeleteTrader(trader.id, trader.name)} className="p-1.5 text-gray-500 hover:text-red-400 bg-[#1a1a1a] rounded-lg transition-colors">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Bio / tagline */}
                        {trader.roi && (
                          <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                            {trader.roi.includes('%') ? `${trader.roi} ROI in the last 30 days` : trader.roi}
                          </p>
                        )}

                        {/* Stats grid */}
                        <div className="grid grid-cols-3 gap-x-4 gap-y-3">
                          {[
                            { label: 'Win rate', value: trader.winRate || '—', green: true },
                            { label: 'Profit share', value: trader.profitShare || '20%', green: true },
                            { label: 'Wins', value: (trader.wins || 0).toLocaleString() },
                            { label: 'Losses', value: (trader.losses || 0).toLocaleString() },
                            { label: 'Trades', value: (trader.trades || 0).toLocaleString() },
                            { label: 'Min. startup', value: trader.minStartup || '$0' },
                          ].map(({ label, value, green }) => (
                            <div key={label}>
                              <p className="text-gray-500 text-[10px] font-medium mb-0.5">{label}</p>
                              <p className={`text-sm font-bold ${green ? 'text-[#26A17B]' : 'text-white'}`}>{value}</p>
                            </div>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 mt-1">
                          <button onClick={() => setViewDrawerId(trader.id)} className="flex-1 py-2.5 rounded-lg text-xs font-bold bg-[#1a1a1a] hover:bg-[#222] text-white transition-colors border border-[#2a2a2a]">
                            View
                          </button>
                          {isCopying ? (
                            <button
                              onClick={() => setCopyingId(null)}
                              className="flex-1 py-2.5 rounded-lg text-xs font-bold bg-red-500 hover:bg-red-600 text-white transition-colors"
                            >
                              CANCEL
                            </button>
                          ) : (
                            <button
                              onClick={() => setActiveModalId(trader.id)}
                              className="flex-1 py-2.5 rounded-lg text-xs font-bold bg-[#ff6a00] hover:bg-[#ff7b1a] text-white transition-colors"
                            >
                              Copy
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ── Copying tab ── */}
          {activeTab === 'copying' && (
            <div className="px-6 pt-6">
              <h2 className="text-white font-bold text-base mb-4">Currently Copying</h2>
              {copyingTraders.length === 0 ? (
                <div className="text-center py-16">
                  <svg className="w-12 h-12 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  <p className="text-gray-500 text-sm">You're not copying anyone yet.</p>
                  <button onClick={() => setActiveTab('experts')} className="mt-3 text-[#ff6a00] text-sm font-bold hover:underline">Browse experts →</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {copyingTraders.map(trader => (
                    <div key={trader.id} className="bg-[#141414] border border-[#26A17B]/30 rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-[#222] flex items-center justify-center text-lg">{trader.avatar}</div>
                        <div>
                          <p className="text-white font-bold text-sm">{trader.name}</p>
                          <p className="text-[#26A17B] text-xs font-medium">● Copying</p>
                        </div>
                      </div>
                      <button onClick={() => setCopyingId(null)} className="w-full py-2 rounded-lg text-xs font-bold bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white transition-colors border border-red-500/20">
                        Cancel Copy
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── How It Works tab ── */}
          {activeTab === 'howItWorks' && (
            <div className="px-6 pt-6 max-w-3xl">
              <h2 className="text-white font-bold text-base mb-6">How it works</h2>
              <div className="space-y-2">
                {HOW_IT_WORKS.map((item, idx) => (
                  <div key={idx} className="bg-[#141414] border border-[#1a1a1a] rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between px-4 py-4 text-left hover:bg-[#1a1a1a] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0 ${openFaq === idx ? 'bg-[#ff6a00] text-white' : 'bg-[#222] text-gray-400'}`}>
                          {idx + 1}
                        </span>
                        <span className="text-white text-sm font-medium">{item.q}</span>
                      </div>
                      <svg className={`w-4 h-4 text-gray-500 transition-transform shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {openFaq === idx && (
                      <div className="px-4 pb-4 pt-1 border-t border-[#1a1a1a]">
                        <p className="text-gray-400 text-sm leading-relaxed">{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Copy Trade Modal */}
      {activeModalId !== null && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Copy Expert</h2>
              <button onClick={() => setActiveModalId(null)} className="text-gray-400 hover:text-white bg-[#1a1a1a] p-1.5 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleCopy} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Asset to use</label>
                <select value={copyAsset} onChange={e => setCopyAsset(e.target.value)} className="w-full bg-[#0A0A0A] border border-[#333] rounded-lg px-4 py-3 text-white font-bold focus:border-[#ff6a00] outline-none appearance-none cursor-pointer">
                  <option value="USDT">USDT (Tether)</option>
                  <option value="BTC">BTC (Bitcoin)</option>
                  <option value="ETH">ETH (Ethereum)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wide">Amount to Allocate (USD)</label>
                <div className="relative">
                  <input type="number" step="0.01" min="10" placeholder="Enter USD amount..." value={copyAmount} onChange={e => setCopyAmount(e.target.value)} required className="w-full bg-[#0A0A0A] border border-[#333] rounded-lg pl-4 pr-16 py-3 text-white font-bold focus:border-[#ff6a00] outline-none" />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-gray-500">USD</div>
                </div>
              </div>
              {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg">{error}</div>}
              <button type="submit" disabled={isLoading} className="w-full bg-[#ff6a00] hover:bg-[#ff7b1a] text-black font-bold rounded-lg py-3 mt-2 disabled:opacity-50 transition-all text-sm">
                {isLoading ? 'Processing...' : 'Confirm Copy'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Admin: Edit / Add Trader Modal */}
      {editModal.open && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#141414] border border-[#1a1a1a] rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">{editModal.id ? 'Edit Expert' : 'Add New Expert'}</h2>
              <button onClick={() => setEditModal({ open: false, trader: { ...BLANK_TRADER } })} className="text-gray-400 hover:text-white bg-[#1a1a1a] p-1.5 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSaveTrader} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Name *', key: 'name', placeholder: 'Alexander Lorenzo' },
                  { label: 'Handle', key: 'handle', placeholder: '@AlexanderCrypto' },
                  { label: 'Avatar (emoji)', key: 'avatar', placeholder: '🐋' },
                  { label: 'Win Rate', key: 'winRate', placeholder: '96.09%' },
                  { label: 'Profit Share', key: 'profitShare', placeholder: '20%' },
                  { label: 'Min. Startup', key: 'minStartup', placeholder: '$0' },
                ].map(({ label, key, placeholder }) => (
                  <div key={key}>
                    <label className="block text-xs font-bold text-gray-400 mb-1.5">{label}</label>
                    <input
                      value={(editModal.trader as any)[key]}
                      onChange={e => setEditModal(m => ({ ...m, trader: { ...m.trader, [key]: e.target.value } }))}
                      placeholder={placeholder}
                      className="w-full bg-[#0A0A0A] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:border-[#ff6a00] outline-none"
                    />
                  </div>
                ))}
                {[
                  { label: 'Wins', key: 'wins', placeholder: '4271' },
                  { label: 'Losses', key: 'losses', placeholder: '40' },
                  { label: 'Trades', key: 'trades', placeholder: '3003' },
                  { label: 'Followers', key: 'followers', placeholder: '99600' },
                ].map(({ label, key, placeholder }) => (
                  <div key={key}>
                    <label className="block text-xs font-bold text-gray-400 mb-1.5">{label}</label>
                    <input
                      type="number"
                      value={(editModal.trader as any)[key]}
                      onChange={e => setEditModal(m => ({ ...m, trader: { ...m.trader, [key]: Number(e.target.value) } }))}
                      placeholder={placeholder}
                      className="w-full bg-[#0A0A0A] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:border-[#ff6a00] outline-none"
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1.5">Risk Level</label>
                <select value={editModal.trader.risk} onChange={e => setEditModal(m => ({ ...m, trader: { ...m.trader, risk: e.target.value } }))} className="w-full bg-[#0A0A0A] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:border-[#ff6a00] outline-none">
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              {editError && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg">{editError}</div>}
              <button type="submit" disabled={editLoading} className="w-full bg-[#ff6a00] hover:bg-[#ff7b1a] text-black font-bold rounded-lg py-3 disabled:opacity-50 transition-all text-sm">
                {editLoading ? 'Saving...' : (editModal.id ? 'Save Changes' : 'Create Expert')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* View Drawer (Slide-over) */}
      {viewDrawerId && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setViewDrawerId(null)}></div>
          
          {(() => {
            const t = traders.find(x => x.id === viewDrawerId);
            if (!t) return null;
            const isCopying = activeCopies.some(c => c.traderId === t.id) || copyingId === t.id;
            
            return (
              <div className="relative w-full max-w-md bg-[#181a20] h-full shadow-2xl flex flex-col border-l border-[#2a2a2a] animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between p-4 border-b border-[#2a2a2a]">
                  <button onClick={() => setViewDrawerId(null)} className="flex items-center gap-2 text-white font-bold hover:text-gray-300 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    Go back
                  </button>
                  <button onClick={() => setViewDrawerId(null)} className="text-gray-400 hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                
                <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-[#2a2a2a] flex items-center justify-center text-3xl border border-[#333] shrink-0">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-white font-bold text-lg">{t.name}</span>
                        <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                      </div>
                      <p className="text-gray-400 text-sm">{t.handle}</p>
                      <div className="flex items-center gap-1.5 text-gray-400 text-sm mt-0.5 font-medium">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        {(t.followers || 0).toLocaleString()} Followers
                      </div>
                    </div>
                  </div>
                  
                  {t.roi && (
                    <p className="text-gray-300 text-sm leading-relaxed mb-6 font-medium">
                      {t.roi.includes('%') ? `${t.roi} ROI in the last 30 days` : t.roi}
                    </p>
                  )}
                  
                  {isCopying ? (
                    <button onClick={() => { setCopyingId(null); setViewDrawerId(null); }} className="w-full bg-[#ff4d4f] hover:bg-[#ff7875] text-white font-bold rounded-lg py-3 mb-8 transition-all">
                      CANCEL
                    </button>
                  ) : (
                    <button onClick={() => { setActiveModalId(t.id); setViewDrawerId(null); }} className="w-full bg-[#ff6a00] hover:bg-[#ff7b1a] text-white font-bold rounded-lg py-3 mb-8 transition-all">
                      COPY
                    </button>
                  )}
                  
                  <div className="flex items-center gap-6 border-b border-[#2a2a2a] mb-6">
                    <button className="pb-3 text-sm font-bold text-white border-b-2 border-[#ff6a00] -mb-px">Stats</button>
                    <button className="pb-3 text-sm font-medium text-gray-500 hover:text-gray-300 border-b-2 border-transparent -mb-px transition-colors">Trades</button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-[#1f2128] rounded-xl p-4 border border-[#2a2a2a]">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-[#2a2a2a] flex items-center justify-center text-gray-400">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                        </div>
                        <span className="text-xs text-gray-400 font-medium">Win rate</span>
                      </div>
                      <p className="text-lg font-bold text-[#00c087]">{t.winRate}</p>
                    </div>
                    
                    <div className="bg-[#1f2128] rounded-xl p-4 border border-[#2a2a2a]">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-[#2a2a2a] flex items-center justify-center text-gray-400">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <span className="text-xs text-gray-400 font-medium">Profit share</span>
                      </div>
                      <p className="text-lg font-bold text-[#00c087]">{t.profitShare}</p>
                    </div>
                    
                    <div className="bg-[#1f2128] rounded-xl p-4 border border-[#2a2a2a]">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-[#2a2a2a] flex items-center justify-center text-gray-400">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <span className="text-xs text-gray-400 font-medium">Wins</span>
                      </div>
                      <p className="text-lg font-bold text-white">{t.wins}</p>
                    </div>
                    
                    <div className="bg-[#1f2128] rounded-xl p-4 border border-[#2a2a2a]">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-[#2a2a2a] flex items-center justify-center text-gray-400">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </div>
                        <span className="text-xs text-gray-400 font-medium">Losses</span>
                      </div>
                      <p className="text-lg font-bold text-white">{t.losses}</p>
                    </div>
                    
                    <div className="bg-[#1f2128] rounded-xl p-4 border border-[#2a2a2a]">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-[#2a2a2a] flex items-center justify-center text-gray-400">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                        </div>
                        <span className="text-xs text-gray-400 font-medium">Trades</span>
                      </div>
                      <p className="text-lg font-bold text-white">{t.trades}</p>
                    </div>
                    
                    <div className="bg-[#1f2128] rounded-xl p-4 border border-[#2a2a2a]">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-[#2a2a2a] flex items-center justify-center text-gray-400">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                        </div>
                        <span className="text-xs text-gray-400 font-medium">Min. startup</span>
                      </div>
                      <p className="text-lg font-bold text-white">{t.minStartup}</p>
                    </div>
                  </div>
                  
                </div>
              </div>
            );
          })()}
        </div>
      )}

      <BottomNav />
    </div>
  );
};
