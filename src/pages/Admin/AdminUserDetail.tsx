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

export const AdminUserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-start justify-between gap-6">
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
          <div className="text-left md:text-right w-full md:w-auto border-t md:border-t-0 border-neutral-800 pt-4 md:pt-0">
            <p className="text-gray-500 text-xs mb-1">Joined</p>
            <p className="text-gray-300 text-sm">{new Date(user.createdAt).toLocaleString()}</p>
            <p className="text-gray-500 text-xs mt-3 mb-1">User ID</p>
            <p className="font-mono text-gray-400 text-xs bg-neutral-950 px-2 py-1 rounded">{user.id}</p>
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
              <button onClick={() => navigate('/admin/deposits')} className="text-xs text-[#ff6a00] hover:text-[#ff6a00]">View All →</button>
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
              <button onClick={() => navigate('/admin/withdrawals')} className="text-xs text-[#ff6a00] hover:text-[#ff6a00]">View All →</button>
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
    </AdminLayout>
  );
};
