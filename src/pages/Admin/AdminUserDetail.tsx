import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { adminApi } from '../../lib/api';

const KYC_STYLES: Record<string, string> = {
  UNVERIFIED: 'bg-neutral-800 text-gray-400 border-neutral-700',
  PENDING: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  VERIFIED: 'bg-green-500/10 text-green-400 border-green-500/20',
  REJECTED: 'bg-red-500/10 text-red-400 border-red-500/20',
};

const PROFIT_CATEGORIES = ['TRADE', 'COPY_TRADE', 'MINING', 'REAL_ESTATE', 'STAKE', 'BONUS', 'REFERRAL'];
const COINS = ['USDT', 'BTC', 'ETH', 'BNB', 'SOL', 'XRP', 'DOGE', 'ADA', 'TRX', 'USDC'];

export const AdminUserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Credit profit modal state
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [creditCategory, setCreditCategory] = useState('TRADE');
  const [creditCoin, setCreditCoin] = useState('USDT');
  const [creditAmount, setCreditAmount] = useState('');
  const [creditNote, setCreditNote] = useState('');
  const [isCrediting, setIsCrediting] = useState(false);
  const [creditSuccess, setCreditSuccess] = useState('');
  const [creditError, setCreditError] = useState('');

  // Welcome bonus state
  const [isApprovingBonus, setIsApprovingBonus] = useState(false);
  const [bonusMsg, setBonusMsg] = useState('');

  const hasPendingWelcomeBonus = user?.transactions?.some(
    (t: any) => (t.type === 'WELCOME_BONUS' || t.type === 'SIGNUP_BONUS') && t.status === 'PENDING'
  );

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone and will delete all related data.')) {
      return;
    }
    setIsDeleting(true);
    try {
      await adminApi.deleteUser(id!);
      navigate('/admin/users');
    } catch (err: any) {
      setError(err.message || 'Failed to delete user.');
      setIsDeleting(false);
    }
  };

  const handleCreditProfit = async () => {
    setCreditError('');
    setCreditSuccess('');
    if (!creditAmount || isNaN(Number(creditAmount)) || Number(creditAmount) <= 0) {
      setCreditError('Enter a valid positive amount.');
      return;
    }
    setIsCrediting(true);
    try {
      await adminApi.creditProfit(id!, {
        category: creditCategory,
        coin: creditCoin,
        amount: Number(creditAmount),
        note: creditNote.trim() || undefined,
      });
      setCreditSuccess(`✅ ${creditAmount} ${creditCoin} credited successfully!`);
      setCreditAmount('');
      setCreditNote('');
      // Refresh user data
      const res = await adminApi.getUser(id!);
      setUser(res.data);
    } catch (err: any) {
      setCreditError(err.message || 'Failed to credit profit.');
    } finally {
      setIsCrediting(false);
    }
  };

  const handleApproveBonus = async () => {
    setIsApprovingBonus(true);
    setBonusMsg('');
    try {
      const res = await adminApi.approveWelcomeBonus(id!);
      setBonusMsg('✅ ' + (res.message || 'Welcome bonus approved!'));
      const refreshed = await adminApi.getUser(id!);
      setUser(refreshed.data);
    } catch (err: any) {
      setBonusMsg('❌ ' + (err.message || 'Failed to approve bonus.'));
    } finally {
      setIsApprovingBonus(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }

    adminApi.getUser(id!)
      .then((res) => setUser(res.data))
      .catch((err: any) => setError(err.message || 'Failed to load user profile.'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) return <AdminLayout><div className="p-8 text-gray-500">Loading user profile...</div></AdminLayout>;
  if (error) return <AdminLayout><div className="p-8"><div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400">⚠ {error}</div><button onClick={() => navigate('/admin/users')} className="mt-4 text-sm text-gray-400 hover:text-white">← Back to Users</button></div></AdminLayout>;
  if (!user) return <AdminLayout><div className="p-8 text-red-500">User not found.</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="p-8 max-w-5xl">
        <button onClick={() => navigate('/admin/users')} className="text-gray-400 hover:text-white text-sm mb-6 flex items-center gap-1">
          ← Back to Users
        </button>

        {/* Header Profile */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-6 flex flex-col md:flex-row items-start justify-between gap-6">
          <div>
            <h1 className="text-2xl font-bold mb-1">{user.fullName || 'No Name Provided'}</h1>
            <p className="text-gray-400">{user.email}</p>
            {user.phone && <p className="text-gray-500 text-sm mt-1">{user.phone}</p>}

            <div className="flex flex-wrap gap-2 mt-4">
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${user.role === 'ADMIN' ? 'bg-[#ff6a00]/10 text-[#ff6a00]' : 'bg-neutral-800 text-gray-400'}`}>
                Role: {user.role}
              </span>
              <span className={`text-xs px-3 py-1 rounded-full font-medium border ${KYC_STYLES[user.kycStatus]}`}>
                KYC: {user.kycStatus}
              </span>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${user.twoFactorEnabled ? 'bg-blue-500/10 text-blue-400' : 'bg-neutral-800 text-gray-500'}`}>
                2FA: {user.twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
          <div className="text-left md:text-right w-full md:w-auto border-t md:border-t-0 border-neutral-800 pt-4 md:pt-0 space-y-3">
            <div>
              <p className="text-gray-500 text-xs mb-1">Joined</p>
              <p className="text-gray-300 text-sm">{new Date(user.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-1">User ID</p>
              <p className="font-mono text-gray-400 text-xs bg-neutral-950 px-2 py-1 rounded">{user.id}</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-start md:justify-end pt-2">
              {hasPendingWelcomeBonus && (
                <button
                  onClick={handleApproveBonus}
                  disabled={isApprovingBonus}
                  className="px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-lg text-sm font-medium transition-colors border border-green-500/20 disabled:opacity-50"
                >
                  {isApprovingBonus ? 'Approving...' : '🎁 Approve $15 Welcome Bonus'}
                </button>
              )}
              <button
                onClick={() => { setShowCreditModal(true); setCreditSuccess(''); setCreditError(''); }}
                className="px-4 py-2 bg-[#ff6a00]/10 hover:bg-[#ff6a00]/20 text-[#ff6a00] rounded-lg text-sm font-medium transition-colors border border-[#ff6a00]/20"
              >
                💰 Add Profit / Credit
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-sm font-medium transition-colors border border-red-500/20 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Delete User'}
              </button>
            </div>
            {bonusMsg && <p className="text-xs text-right">{bonusMsg}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Wallets */}
          <div>
            <h2 className="font-semibold mb-4">Wallets & Balances</h2>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-x-auto custom-scrollbar pb-2">
              {(!user.wallets || user.wallets.length === 0) ? (
                <p className="text-gray-500 text-sm text-center py-6">No wallets created.</p>
              ) : (
                <table className="w-full text-sm min-w-[500px]">
                  <thead className="border-b border-neutral-800 text-gray-400 text-xs uppercase bg-neutral-950/50">
                    <tr>
                      <th className="text-left px-5 py-3 font-medium">Coin</th>
                      <th className="text-right px-5 py-3 font-medium">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {user.wallets.map((w: any) => (
                      <tr key={w.id} className="hover:bg-neutral-800/30">
                        <td className="px-5 py-3 font-medium">{w.coin}</td>
                        <td className="px-5 py-3 text-right font-mono text-[#ff6a00]">{Number(w.balance).toFixed(8)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* KYC Documents */}
          <div>
            <h2 className="font-semibold mb-4">KYC History</h2>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-x-auto custom-scrollbar pb-2">
              {(!user.kycDocuments || user.kycDocuments.length === 0) ? (
                <p className="text-gray-500 text-sm text-center py-6">No KYC documents submitted.</p>
              ) : (
                <table className="w-full text-sm min-w-[500px]">
                  <thead className="border-b border-neutral-800 text-gray-400 text-xs uppercase bg-neutral-950/50">
                    <tr>
                      <th className="text-left px-5 py-3 font-medium">Document</th>
                      <th className="text-left px-5 py-3 font-medium">Status</th>
                      <th className="text-left px-5 py-3 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {user.kycDocuments.map((doc: any) => (
                      <tr key={doc.id} className="hover:bg-neutral-800/30">
                        <td className="px-5 py-3">
                          <p className="font-medium text-xs">{doc.docType}</p>
                          <p className="text-gray-500 text-[10px]">{doc.fileName}</p>
                        </td>
                        <td className="px-5 py-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${KYC_STYLES[doc.status]}`}>{doc.status}</span>
                        </td>
                        <td className="px-5 py-3 text-gray-400 text-xs">{new Date(doc.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Recent Deposits */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Recent Deposits</h2>
              <button onClick={() => navigate('/admin/deposits')} className="text-xs text-[#ff6a00]">View All →</button>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-x-auto custom-scrollbar pb-2">
              {(!user.deposits || user.deposits.length === 0) ? (
                <p className="text-gray-500 text-sm text-center py-6">No deposits.</p>
              ) : (
                <table className="w-full text-sm min-w-[500px]">
                  <thead className="border-b border-neutral-800 text-gray-400 text-xs uppercase bg-neutral-950/50">
                    <tr>
                      <th className="text-left px-5 py-3 font-medium">Amount</th>
                      <th className="text-left px-5 py-3 font-medium">Status</th>
                      <th className="text-left px-5 py-3 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {user.deposits.slice(0, 5).map((d: any) => (
                      <tr key={d.id} className="hover:bg-neutral-800/30">
                        <td className="px-5 py-3">
                          <span className="font-mono text-xs">{Number(d.amount).toFixed(4)}</span> <span className="text-xs text-gray-400">{d.coin}</span>
                        </td>
                        <td className="px-5 py-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                            d.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                            d.status === 'APPROVED' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                            'bg-red-500/10 text-red-400 border-red-500/20'
                          }`}>{d.status}</span>
                        </td>
                        <td className="px-5 py-3 text-gray-400 text-xs">{new Date(d.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Recent Withdrawals */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Recent Withdrawals</h2>
              <button onClick={() => navigate('/admin/withdrawals')} className="text-xs text-[#ff6a00]">View All →</button>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-x-auto custom-scrollbar pb-2">
              {(!user.withdrawals || user.withdrawals.length === 0) ? (
                <p className="text-gray-500 text-sm text-center py-6">No withdrawals.</p>
              ) : (
                <table className="w-full text-sm min-w-[500px]">
                  <thead className="border-b border-neutral-800 text-gray-400 text-xs uppercase bg-neutral-950/50">
                    <tr>
                      <th className="text-left px-5 py-3 font-medium">Amount</th>
                      <th className="text-left px-5 py-3 font-medium">Status</th>
                      <th className="text-left px-5 py-3 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {user.withdrawals.slice(0, 5).map((w: any) => (
                      <tr key={w.id} className="hover:bg-neutral-800/30">
                        <td className="px-5 py-3">
                          <span className="font-mono text-xs">{Number(w.amount).toFixed(4)}</span> <span className="text-xs text-gray-400">{w.coin}</span>
                        </td>
                        <td className="px-5 py-3">
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                            w.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                            w.status === 'COMPLETED' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                            'bg-red-500/10 text-red-400 border-red-500/20'
                          }`}>{w.status}</span>
                        </td>
                        <td className="px-5 py-3 text-gray-400 text-xs">{new Date(w.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Credit Profit Modal ─────────────────────────────────────────────── */}
      {showCreditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold">💰 Add Profit / Credit</h2>
              <button
                onClick={() => setShowCreditModal(false)}
                className="text-gray-500 hover:text-white text-xl leading-none"
              >
                ×
              </button>
            </div>

            <p className="text-gray-400 text-xs mb-4">
              Crediting: <span className="text-white font-medium">{user.fullName || user.email}</span>
            </p>

            <div className="space-y-4">
              {/* Category */}
              <div>
                <label className="text-xs text-gray-400 block mb-1">Category</label>
                <select
                  value={creditCategory}
                  onChange={(e) => setCreditCategory(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ff6a00]"
                >
                  {PROFIT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c.replace('_', ' ')}</option>
                  ))}
                </select>
              </div>

              {/* Coin */}
              <div>
                <label className="text-xs text-gray-400 block mb-1">Coin</label>
                <select
                  value={creditCoin}
                  onChange={(e) => setCreditCoin(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ff6a00]"
                >
                  {COINS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="text-xs text-gray-400 block mb-1">Amount</label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  placeholder="e.g. 250.00"
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ff6a00] placeholder-gray-600"
                />
              </div>

              {/* Note */}
              <div>
                <label className="text-xs text-gray-400 block mb-1">Admin Note (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Trade profit for BTC/USDT position"
                  value={creditNote}
                  onChange={(e) => setCreditNote(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#ff6a00] placeholder-gray-600"
                />
              </div>

              {creditError && <p className="text-red-400 text-xs">{creditError}</p>}
              {creditSuccess && <p className="text-green-400 text-xs">{creditSuccess}</p>}

              <button
                onClick={handleCreditProfit}
                disabled={isCrediting}
                className="w-full py-3 bg-gradient-to-r from-[#ff6a00] to-[#ee0979] text-white font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 transition-opacity text-sm"
              >
                {isCrediting ? 'Crediting...' : `Credit ${creditAmount || '0'} ${creditCoin}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
