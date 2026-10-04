import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { withdrawalsApi } from '../../lib/api';

const STATUS_STYLES: Record<string, string> = {
  PENDING: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  APPROVED: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  COMPLETED: 'bg-green-500/10 text-green-400 border-green-500/20',
  REJECTED: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export const AdminWithdrawals = () => {
  const navigate = useNavigate();
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState('PENDING');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [rejectModal, setRejectModal] = useState<{ id: string } | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const load = async (status: string) => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await withdrawalsApi.adminGetAll(status ? { status } : undefined);
      setWithdrawals(res.data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load withdrawals.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(filterStatus);
  }, [filterStatus]);

  const handleApprove = async (id: string) => {
    if (!confirm('Approve this withdrawal? Make sure you have already sent the crypto to the user\'s address.')) return;
    setActionLoading(id);
    try {
      await withdrawalsApi.approve(id);
      load(filterStatus);
    } catch (err: any) { setError(err.message); }
    finally { setActionLoading(null); }
  };

  const handleReject = async () => {
    if (!rejectModal) return;
    setActionLoading(rejectModal.id);
    try {
      await withdrawalsApi.reject(rejectModal.id, rejectReason || undefined);
      setRejectModal(null);
      setRejectReason('');
      load(filterStatus);
    } catch (err: any) { setError(err.message); }
    finally { setActionLoading(null); }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Withdrawals</h1>
            <p className="text-gray-400 text-sm mt-0.5">Review and approve or reject withdrawal requests.</p>
          </div>
          <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2 w-full md:w-auto">
            {['PENDING', 'COMPLETED', 'REJECTED', ''].map((s) => (
              <button
                key={s || 'ALL'}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${filterStatus === s ? 'bg-[#ff6a00] text-black' : 'bg-neutral-800 text-gray-400 hover:text-white'}`}
              >
                {s || 'ALL'}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4 text-red-400 text-sm">⚠ {error}</div>
        )}
        {loading ? (
          <p className="text-gray-500 text-sm">Loading...</p>
        ) : (
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-x-auto custom-scrollbar pb-2">
            <table className="w-full text-sm min-w-[1000px]">
              <thead className="border-b border-neutral-800 text-gray-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="text-left px-5 py-3 font-medium">User</th>
                  <th className="text-left px-5 py-3 font-medium">Coin / Network</th>
                  <th className="text-left px-5 py-3 font-medium">Amount</th>
                  <th className="text-left px-5 py-3 font-medium">Destination Address</th>
                  <th className="text-left px-5 py-3 font-medium">Status</th>
                  <th className="text-left px-5 py-3 font-medium">Requested</th>
                  <th className="text-right px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {withdrawals.length === 0 && (
                  <tr><td colSpan={7} className="text-center text-gray-500 py-10">No withdrawals found.</td></tr>
                )}
                {withdrawals.map((w) => (
                  <tr key={w.id} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-medium text-xs">{w.user?.email}</p>
                      <p className="text-gray-500 text-xs">{w.user?.fullName || '—'}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-semibold">{w.coin}</span>
                      <span className="text-gray-500 ml-1 text-xs">{w.network}</span>
                    </td>
                    <td className="px-5 py-4 font-mono font-semibold">{Number(w.amount).toFixed(8)}</td>
                    <td className="px-5 py-4 font-mono text-xs text-gray-300 max-w-[180px]">
                      <span className="block truncate" title={w.toAddress}>{w.toAddress}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full border font-medium ${STATUS_STYLES[w.status]}`}>
                        {w.status}
                      </span>
                      {w.rejectionReason && <p className="text-xs text-red-400 mt-1">{w.rejectionReason}</p>}
                    </td>
                    <td className="px-5 py-4 text-gray-400 text-xs">{new Date(w.createdAt).toLocaleString()}</td>
                    <td className="px-5 py-4 text-right">
                      {w.status === 'PENDING' && (
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleApprove(w.id)}
                            disabled={actionLoading === w.id}
                            className="px-3 py-1.5 bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/20 rounded-lg text-xs font-medium transition-all disabled:opacity-50"
                          >
                            {actionLoading === w.id ? '...' : 'Approve'}
                          </button>
                          <button
                            onClick={() => { setRejectModal({ id: w.id }); setRejectReason(''); }}
                            disabled={actionLoading === w.id}
                            className="px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-xs font-medium transition-all disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {rejectModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="font-semibold mb-2 text-red-400">Reject Withdrawal</h3>
            <p className="text-gray-400 text-sm mb-4">The reserved balance will be <strong>refunded</strong> to the user's wallet. Provide an optional reason.</p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Rejection reason (optional)"
              rows={3}
              className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-red-500 resize-none mb-4 transition-colors"
            />
            <div className="flex gap-3">
              <button onClick={() => setRejectModal(null)} className="flex-1 py-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-sm transition-colors">Cancel</button>
              <button
                onClick={handleReject}
                disabled={!!actionLoading}
                className="flex-1 py-2.5 bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
              >
                {actionLoading ? 'Rejecting...' : 'Reject & Refund'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
