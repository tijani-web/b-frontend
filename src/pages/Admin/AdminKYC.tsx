import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { kycApi } from '../../lib/api';

const DOC_LABELS: Record<string, string> = {
  PASSPORT: 'Passport',
  DRIVERS_LICENSE: "Driver's Licence",
  NATIONAL_ID: 'National ID',
  PROOF_OF_ADDRESS: 'Proof of Address',
  SELFIE: 'Selfie',
};

const STATUS_STYLES: Record<string, string> = {
  PENDING: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  APPROVED: 'bg-green-500/10 text-green-400 border-green-500/20',
  REJECTED: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export const AdminKYC = () => {
  const navigate = useNavigate();
  const [docs, setDocs] = useState<any[]>([]);
  const [filterStatus, setFilterStatus] = useState('PENDING');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [viewDoc, setViewDoc] = useState<any | null>(null);
  const [rejectModal, setRejectModal] = useState<{ id: string } | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const load = async (status: string) => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await kycApi.adminGetAll(status ? { status } : undefined);
      setDocs(res.data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load KYC documents.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(filterStatus);
  }, [filterStatus]);

  const handleApprove = async (id: string) => {
    if (!confirm('Approve this KYC document and verify the user?')) return;
    setActionLoading(id);
    try {
      await kycApi.approve(id);
      load(filterStatus);
    } catch (err: any) { setError(err.message); }
    finally { setActionLoading(null); }
  };

  const handleReject = async () => {
    if (!rejectModal) return;
    setActionLoading(rejectModal.id);
    try {
      await kycApi.reject(rejectModal.id, rejectReason || undefined);
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
            <h1 className="text-2xl font-bold">KYC Verification</h1>
            <p className="text-gray-400 text-sm mt-0.5">Review uploaded identity documents.</p>
          </div>
          <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2 w-full md:w-auto">
            {['PENDING', 'APPROVED', 'REJECTED', ''].map((s) => (
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
                  <th className="text-left px-5 py-3 font-medium">Document Type</th>
                  <th className="text-left px-5 py-3 font-medium">File</th>
                  <th className="text-left px-5 py-3 font-medium">User KYC Status</th>
                  <th className="text-left px-5 py-3 font-medium">Status</th>
                  <th className="text-left px-5 py-3 font-medium">Submitted</th>
                  <th className="text-right px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {docs.length === 0 && (
                  <tr><td colSpan={7} className="text-center text-gray-500 py-10">No documents found.</td></tr>
                )}
                {docs.map((d) => (
                  <tr key={d.id} className="hover:bg-neutral-800/30 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-medium text-xs">{d.user?.email}</p>
                      <p className="text-gray-500 text-xs">{d.user?.fullName || '—'}</p>
                    </td>
                    <td className="px-5 py-4 font-medium">{DOC_LABELS[d.docType] || d.docType}</td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => setViewDoc(d)}
                        className="text-xs text-[#ff6a00] hover:text-amber-300 transition-colors"
                      >
                        View Document
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        d.user?.kycStatus === 'VERIFIED' ? 'text-green-400 bg-green-500/10' :
                        d.user?.kycStatus === 'REJECTED' ? 'text-red-400 bg-red-500/10' :
                        'text-yellow-400 bg-yellow-500/10'
                      }`}>{d.user?.kycStatus}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full border font-medium ${STATUS_STYLES[d.status]}`}>
                        {d.status}
                      </span>
                      {d.rejectionReason && <p className="text-xs text-red-400 mt-1">{d.rejectionReason}</p>}
                    </td>
                    <td className="px-5 py-4 text-gray-400 text-xs">{new Date(d.createdAt).toLocaleString()}</td>
                    <td className="px-5 py-4 text-right">
                      {d.status === 'PENDING' && (
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleApprove(d.id)}
                            disabled={actionLoading === d.id}
                            className="px-3 py-1.5 bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/20 rounded-lg text-xs font-medium transition-all disabled:opacity-50"
                          >
                            {actionLoading === d.id ? '...' : 'Approve'}
                          </button>
                          <button
                            onClick={() => { setRejectModal({ id: d.id }); setRejectReason(''); }}
                            disabled={actionLoading === d.id}
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

      {/* Document Viewer Modal */}
      {viewDoc && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold">{DOC_LABELS[viewDoc.docType] || viewDoc.docType}</h3>
                <p className="text-gray-400 text-xs mt-0.5">{viewDoc.user?.email} — {viewDoc.fileName}</p>
              </div>
              <button onClick={() => setViewDoc(null)} className="text-gray-400 hover:text-white text-lg">✕</button>
            </div>
            <div className="bg-neutral-950 rounded-xl overflow-hidden">
              {viewDoc.fileUrl?.endsWith('.pdf') ? (
                <iframe
                  src={kycApi.fileUrl(viewDoc.id)}
                  className="w-full h-[500px]"
                  title="KYC Document"
                />
              ) : (
                <img
                  src={kycApi.fileUrl(viewDoc.id)}
                  alt="KYC Document"
                  className="w-full object-contain max-h-[500px]"
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="font-semibold mb-2 text-red-400">Reject KYC Document</h3>
            <p className="text-gray-400 text-sm mb-4">The user will be notified and can re-submit.</p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Rejection reason (e.g. 'Document is blurry' or 'ID does not match name')"
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
                {actionLoading ? 'Rejecting...' : 'Confirm Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
