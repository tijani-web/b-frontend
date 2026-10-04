import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { adminApi } from '../../lib/api';

const KYC_STYLES: Record<string, string> = {
  UNVERIFIED: 'bg-neutral-800 text-gray-400 border-neutral-700',
  PENDING: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  VERIFIED: 'bg-green-500/10 text-green-400 border-green-500/20',
  REJECTED: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export const AdminUsers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 });

  const load = useCallback(async (searchVal: string) => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await adminApi.getUsers({ search: searchVal || undefined });
      setUsers(res.data || []);
      if (res.pagination) setPagination(res.pagination);
    } catch (err: any) {
      setError(err.message || 'Failed to load users.');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Initial load on mount
  useEffect(() => {
    load('');
  }, [load]);

  // Debounced search — only fires when search changes after mount
  useEffect(() => {
    if (search === '' && loading) return; // skip on initial mount (handled above)
    const timer = setTimeout(() => load(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Users</h1>
            <p className="text-gray-400 text-sm mt-0.5">
              {pagination.total > 0 ? `${pagination.total} total user${pagination.total !== 1 ? 's' : ''}` : 'Manage users, view balances and activity.'}
            </p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search email or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#ff6a00] transition-colors w-full sm:w-64"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4 text-red-400 text-sm">
            ⚠ {error}
          </div>
        )}

        {loading ? (
          <div className="flex items-center gap-2 text-gray-500 text-sm py-10">
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Loading users...
          </div>
        ) : (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-x-auto custom-scrollbar pb-2">
            <table className="w-full text-sm min-w-[1000px]">
              <thead className="border-b border-neutral-800 text-gray-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="text-left px-5 py-3 font-medium">User</th>
                  <th className="text-left px-5 py-3 font-medium">Role</th>
                  <th className="text-left px-5 py-3 font-medium">KYC Status</th>
                  <th className="text-left px-5 py-3 font-medium">2FA</th>
                  <th className="text-left px-5 py-3 font-medium">Balances</th>
                  <th className="text-left px-5 py-3 font-medium">Joined</th>
                  <th className="text-right px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {users.length === 0 && (
                  <tr><td colSpan={7} className="text-center text-gray-500 py-10">No users found.</td></tr>
                )}
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-medium text-white">{u.email}</p>
                      <p className="text-gray-500 text-xs">{u.fullName || '—'}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${u.role === 'ADMIN' ? 'bg-[#ff6a00]/10 text-[#ff6a00]' : 'bg-neutral-800 text-gray-400'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full border font-medium ${KYC_STYLES[u.kycStatus] || KYC_STYLES['PENDING']}`}>
                        {u.kycStatus}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-400 text-xs">
                      {u.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-1 max-w-[200px]">
                        {u.wallets?.filter((w: any) => Number(w.balance) > 0).map((w: any) => (
                          <div key={w.coin} className="flex justify-between text-xs">
                            <span className="text-gray-500">{w.coin}</span>
                            <span className="font-mono text-gray-300">{Number(w.balance).toFixed(4)}</span>
                          </div>
                        ))}
                        {(!u.wallets || u.wallets.filter((w: any) => Number(w.balance) > 0).length === 0) && (
                          <span className="text-gray-600 text-xs">No balance</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-400 text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={() => navigate(`/admin/users/${u.id}`)}
                        className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-gray-300 hover:text-white rounded-lg text-xs font-medium transition-all"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
