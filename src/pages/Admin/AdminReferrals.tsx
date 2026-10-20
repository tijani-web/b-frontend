import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';

const STATUS_STYLES: Record<string, string> = {
  PENDING: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  APPROVED: 'bg-green-500/10 text-green-400 border-green-500/20',
  REJECTED: 'bg-red-500/10 text-red-400 border-red-500/20',
};

interface ReferralBonus {
  id: string;
  referrerId: string;
  referredUserId: string;
  amount: number | string;
  coin: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  approvedAt?: string;
  rejectionReason?: string;
  referrer: {
    id: string;
    email: string;
    fullName?: string;
    referralCode?: string;
  };
  referredUser: {
    id: string;
    email: string;
    fullName?: string;
  };
  deposit?: {
    id: string;
    amount: number | string;
    coin: string;
    txHash?: string;
    createdAt: string;
  };
}

export const AdminReferrals = () => {
  const navigate = useNavigate();
  const [bonuses, setBonuses] = useState<ReferralBonus[]>([]);
  const [filterStatus, setFilterStatus] = useState<'PENDING' | 'APPROVED' | 'REJECTED' | 'ALL'>('PENDING');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [rejectModal, setRejectModal] = useState<{ id: string } | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const load = async (status: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const url = status === 'ALL' ? '/api/referrals/admin' : `/api/referrals/admin?status=${status}`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch referral bonuses');
      setBonuses(data.data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load referral bonuses.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(filterStatus);
  }, [filterStatus]);

  const handleApprove = async (id: string, referrerEmail: string, amount: string | number, coin: string) => {
    if (!confirm(`Approve this 5% referral bonus (${amount} ${coin}) and credit ${referrerEmail}'s account?`)) {
      return;
    }
    const token = localStorage.getItem('token');
    if (!token) return;

    setActionLoading(id);
    try {
      const res = await fetch(`/api/referrals/admin/${id}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to approve referral bonus');
      load(filterStatus);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async () => {
    if (!rejectModal) return;
    const token = localStorage.getItem('token');
    if (!token) return;

    setActionLoading(rejectModal.id);
    try {
      const res = await fetch(`/api/referrals/admin/${rejectModal.id}/reject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason: rejectReason }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to reject referral bonus');
      setRejectModal(null);
      setRejectReason('');
      load(filterStatus);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Referral Bonuses (5%)</h1>
            <p className="text-gray-400 text-sm mt-1">
              Review and approve 5% referral bonuses for referrers whose invited users made their first deposit.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {(['PENDING', 'APPROVED', 'REJECTED', 'ALL'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  filterStatus === s
                    ? 'bg-[#ff6a00] border-[#ff6a00] text-white'
                    : 'bg-neutral-900 border-neutral-800 text-gray-400 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm mb-6 flex items-center justify-between">
            <span>{error}</span>
            <button onClick={() => setError('')} className="text-xs hover:underline">Dismiss</button>
          </div>
        )}

        {/* Table */}
        <div className="bg-[#111] border border-neutral-800 rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading referral bonuses...</div>
          ) : bonuses.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No referral bonuses found for status "{filterStatus}".
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-neutral-900/50 text-gray-400 border-b border-neutral-800 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Referrer (Receiver)</th>
                    <th className="px-6 py-4">Referred User</th>
                    <th className="px-6 py-4">First Deposit</th>
                    <th className="px-6 py-4">5% Bonus</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {bonuses.map((b) => (
                    <tr key={b.id} className="hover:bg-neutral-900/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">{b.referrer.fullName || b.referrer.email}</div>
                        <div className="text-gray-500 text-xs">{b.referrer.email}</div>
                        {b.referrer.referralCode && (
                          <div className="text-[#ff6a00] text-[11px] font-mono mt-0.5">
                            Code: {b.referrer.referralCode}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-white">{b.referredUser.fullName || b.referredUser.email}</div>
                        <div className="text-gray-500 text-xs">{b.referredUser.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        {b.deposit ? (
                          <div>
                            <span className="font-mono text-white font-semibold">
                              {Number(b.deposit.amount).toFixed(4)} {b.deposit.coin}
                            </span>
                            {b.deposit.txHash && (
                              <div className="text-gray-500 text-[10px] font-mono truncate max-w-[120px]">
                                {b.deposit.txHash}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-500 text-xs">First Deposit</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono font-bold text-green-400">
                          +{Number(b.amount).toFixed(2)} {b.coin}
                        </span>
                        <div className="text-gray-500 text-[10px]">5% of deposit</div>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-xs">
                        {new Date(b.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            STATUS_STYLES[b.status] || 'text-gray-400'
                          }`}
                        >
                          {b.status}
                        </span>
                        {b.rejectionReason && (
                          <div className="text-red-400 text-[10px] mt-1 max-w-[150px] truncate" title={b.rejectionReason}>
                            Reason: {b.rejectionReason}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {b.status === 'PENDING' ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              disabled={actionLoading === b.id}
                              onClick={() => handleApprove(b.id, b.referrer.email, b.amount, b.coin)}
                              className="px-3 py-1 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white rounded text-xs font-semibold transition-colors"
                            >
                              {actionLoading === b.id ? 'Approving...' : 'Approve'}
                            </button>
                            <button
                              disabled={actionLoading === b.id}
                              onClick={() => setRejectModal({ id: b.id })}
                              className="px-3 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded text-xs font-semibold border border-red-500/20 transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-600 text-xs italic">Completed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Reject Modal */}
        {rejectModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-[#1c1c1c] border border-neutral-800 rounded-xl p-6 max-w-md w-full">
              <h3 className="text-lg font-bold mb-2">Reject Referral Bonus</h3>
              <p className="text-sm text-gray-400 mb-4">
                Are you sure you want to reject this referral bonus? Provide an optional reason for platform records.
              </p>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Reason for rejection (optional)..."
                className="w-full bg-[#111] border border-neutral-800 rounded-lg p-3 text-sm text-white placeholder-gray-600 mb-4 h-24 resize-none outline-none focus:border-[#ff6a00]"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setRejectModal(null)}
                  className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReject}
                  disabled={actionLoading === rejectModal.id}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white rounded-lg text-sm font-semibold transition-colors"
                >
                  {actionLoading === rejectModal.id ? 'Rejecting...' : 'Confirm Rejection'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
export default AdminReferrals;
