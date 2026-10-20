import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './Dashboard/layout/Sidebar';
import { BottomNav } from './Dashboard/layout/BottomNav';

interface ReferralItem {
  id: string;
  name: string;
  maskedEmail: string;
  joinedAt: string;
  bonusStatus: string;
  bonusAmount: number;
}

interface ReferralData {
  referralCode: string;
  totalFriends: number;
  totalEarned: number;
  pendingBonus: number;
  referrals: ReferralItem[];
}

export const Referrals = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ReferralData | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setLoading(true);
    fetch('/api/referrals/my', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((res) => {
        if (!res.error) setData(res);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [navigate]);

  const referralCode = data?.referralCode || '';
  const referralLink = referralCode ? `${window.location.origin}/register?ref=${referralCode}` : '';

  const copyToClipboard = (text: string, isLink: boolean) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    if (isLink) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const filteredReferrals = (data?.referrals || []).filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.maskedEmail.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0e0e11] text-white flex font-inter">
      <Sidebar />

      <main className="flex-1 md:ml-64 pb-24 md:pb-12">
        {/* Top Header */}
        <header className="h-16 border-b border-[#1c1c24] bg-[#141418] flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#202028] transition-colors"
              title="Back"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-[#ff6a00]">🎁</span> Referral Program
            </h1>
          </div>
        </header>

        <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-6">
          {/* How it works banner */}
          <div className="bg-gradient-to-r from-[#18181f] to-[#1e1713] border border-[#ff6a00]/30 rounded-2xl p-5 sm:p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff6a00] animate-pulse" />
              <span className="text-xs font-bold text-[#ff6a00] uppercase tracking-wider">How it works</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-[#121216]/60 rounded-xl p-4 border border-[#2a2a36]">
                <div className="text-xs text-gray-400 mb-1">🎁 Your Friend Gets:</div>
                <div className="text-sm font-semibold text-white">
                  An automatic <span className="text-[#ff6a00] font-bold">$50.00 USDT</span> signup bonus directly credited to their wallet upon account creation!
                </div>
              </div>
              <div className="bg-[#121216]/60 rounded-xl p-4 border border-[#2a2a36]">
                <div className="text-xs text-gray-400 mb-1">💰 You Earn:</div>
                <div className="text-sm font-semibold text-white">
                  A <span className="text-green-400 font-bold">5% cash referral bonus</span> on the very first deposit your friend makes once approved!
                </div>
              </div>
            </div>
          </div>

          {/* Referral Code & Link Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Code */}
            <div className="bg-[#141418] border border-[#23232b] rounded-2xl p-5 shadow-sm">
              <label className="text-xs font-semibold text-gray-400 mb-2 block uppercase tracking-wider">
                Your Referral Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={referralCode || (loading ? 'Loading...' : 'None')}
                  className="flex-1 bg-[#0e0e11] border border-[#2c2c38] rounded-xl px-4 py-2.5 text-white font-mono text-sm tracking-widest outline-none font-bold select-all"
                />
                <button
                  onClick={() => copyToClipboard(referralCode, false)}
                  className="bg-[#ff6a00] hover:bg-[#ff7b1a] text-black font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95"
                >
                  {copiedCode ? 'COPIED!' : 'COPY'}
                </button>
              </div>
            </div>

            {/* Link */}
            <div className="bg-[#141418] border border-[#23232b] rounded-2xl p-5 shadow-sm">
              <label className="text-xs font-semibold text-gray-400 mb-2 block uppercase tracking-wider">
                Your Referral Link
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={referralLink || (loading ? 'Loading...' : 'None')}
                  className="flex-1 bg-[#0e0e11] border border-[#2c2c38] rounded-xl px-4 py-2.5 text-white text-xs outline-none truncate font-mono select-all"
                />
                <button
                  onClick={() => copyToClipboard(referralLink, true)}
                  className="bg-[#ff6a00] hover:bg-[#ff7b1a] text-black font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95"
                >
                  {copiedLink ? 'COPIED!' : 'COPY'}
                </button>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-[#141418] border border-[#23232b] rounded-2xl p-4 sm:p-5">
              <div className="text-gray-400 text-xs mb-1">Total Invited</div>
              <div className="text-2xl font-bold text-white">{data?.totalFriends ?? 0}</div>
            </div>
            <div className="bg-[#141418] border border-[#23232b] rounded-2xl p-4 sm:p-5">
              <div className="text-gray-400 text-xs mb-1">Total Earned</div>
              <div className="text-2xl font-bold text-green-400">
                ${(data?.totalEarned ?? 0).toFixed(2)}
              </div>
            </div>
            <div className="bg-[#141418] border border-[#23232b] rounded-2xl p-4 sm:p-5">
              <div className="text-gray-400 text-xs mb-1">Pending Approval</div>
              <div className="text-2xl font-bold text-[#ff6a00]">
                ${(data?.pendingBonus ?? 0).toFixed(2)}
              </div>
            </div>
          </div>

          {/* Invited Friends List */}
          <div className="bg-[#141418] border border-[#23232b] rounded-2xl p-5 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-base font-bold text-white">Referred Friends</h2>
                <p className="text-xs text-gray-400">Users who registered using your referral link or code</p>
              </div>
              <div className="relative w-full sm:w-64">
                <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search friends..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#0e0e11] border border-[#2c2c38] rounded-xl pl-9 pr-4 py-2 text-xs text-white outline-none placeholder-gray-500 focus:border-[#ff6a00]"
                />
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-2 border-[#ff6a00] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filteredReferrals.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-[#23232b] rounded-xl p-8">
                <div className="text-3xl mb-2">👥</div>
                <div className="text-white font-medium text-sm mb-1">No referrals yet</div>
                <p className="text-gray-500 text-xs max-w-sm mx-auto">
                  Share your referral link with friends. When they register and make their first deposit, you'll earn a 5% bonus!
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[#23232b]">
                {filteredReferrals.map((r) => (
                  <div key={r.id} className="py-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#202028] text-[#ff6a00] font-bold text-sm flex items-center justify-center border border-[#2d2d38]">
                        {r.maskedEmail.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-white text-sm font-semibold">{r.maskedEmail}</div>
                        <div className="text-gray-500 text-xs">
                          Joined {new Date(r.joinedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div>
                      {r.bonusStatus === 'APPROVED' ? (
                        <span className="inline-block text-xs font-semibold text-green-400 bg-green-500/10 border border-green-500/30 px-3 py-1 rounded-full">
                          +${r.bonusAmount.toFixed(2)} Earned
                        </span>
                      ) : r.bonusStatus === 'PENDING' ? (
                        <span className="inline-block text-xs font-semibold text-[#ff6a00] bg-[#ff6a00]/10 border border-[#ff6a00]/30 px-3 py-1 rounded-full">
                          ${r.bonusAmount.toFixed(2)} Pending
                        </span>
                      ) : (
                        <span className="inline-block text-xs font-semibold text-gray-400 bg-gray-500/10 border border-gray-500/30 px-3 py-1 rounded-full">
                          Registered
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Referrals;
