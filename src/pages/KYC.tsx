import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './Dashboard/layout/Sidebar';
import { BottomNav } from './Dashboard/layout/BottomNav';
import { Header } from './Dashboard/layout/Header';
import { kycApi } from '../lib/api';

const DOC_TYPES = [
  { id: 'PASSPORT', label: 'Passport' },
  { id: 'DRIVERS_LICENSE', label: "Driver's Licence" },
  { id: 'NATIONAL_ID', label: 'National ID' },
  { id: 'PROOF_OF_ADDRESS', label: 'Proof of Address' },
  { id: 'SELFIE', label: 'Selfie with ID' },
];

export const KYCUpload = () => {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const [docs, setDocs] = useState<any[]>([]);
  const [docType, setDocType] = useState('PASSPORT');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }
    load();
  }, [navigate]);

  const load = async () => {
    try {
      const res = await kycApi.getMyDocs();
      setDocs(res.data || []);
    } catch {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError('');
    setSuccess(false);

    const fd = new FormData();
    fd.append('docType', docType);
    fd.append('document', file);

    try {
      await kycApi.upload(fd);
      setSuccess(true);
      setFile(null);
      if (fileRef.current) fileRef.current.value = '';
      load();
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-inter overflow-x-hidden">
      <Sidebar />
      <div className="md:pl-64">
        <Header />
        <main className="p-8 max-w-4xl">
          <button onClick={() => navigate('/settings')} className="text-gray-400 hover:text-white text-sm mb-6 flex items-center gap-1">
            ← Back to Settings
          </button>

          <div className="mb-8">
            <h1 className="text-2xl font-bold">Identity Verification (KYC)</h1>
            <p className="text-gray-400 text-sm mt-1">Upload your documents to verify your identity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                <h2 className="font-semibold mb-4">Upload Document</h2>
                {success && (
                  <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm">
                    ✅ Document submitted successfully for review.
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 block mb-1">Document Type</label>
                    <select
                      value={docType}
                      onChange={(e) => setDocType(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#ff6a00] transition-colors"
                    >
                      {DOC_TYPES.map((dt) => (
                        <option key={dt.id} value={dt.id}>{dt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-1">File (Image or PDF)</label>
                    <input
                      ref={fileRef}
                      type="file"
                      required
                      accept="image/jpeg,image/png,image/webp,application/pdf"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-gray-400 text-sm file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-neutral-700 file:text-white focus:outline-none"
                    />
                  </div>

                  {error && <p className="text-red-400 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading || !file}
                    className="w-full py-3 bg-[#ff6a00] hover:bg-[#ff6a00] disabled:opacity-50 text-black font-bold rounded-xl transition-colors"
                  >
                    {loading ? 'Uploading...' : 'Submit Document'}
                  </button>
                </form>
              </div>
            </div>

            <div>
              <h2 className="font-semibold mb-4">Your Documents</h2>
              <div className="space-y-3">
                {docs.length === 0 ? (
                  <p className="text-gray-500 text-sm">No documents submitted yet.</p>
                ) : (
                  docs.map((d) => (
                    <div key={d.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{DOC_TYPES.find(dt => dt.id === d.docType)?.label || d.docType}</p>
                        <p className="text-xs text-gray-500">{new Date(d.createdAt).toLocaleDateString()}</p>
                        {d.status === 'REJECTED' && d.rejectionReason && (
                          <p className="text-xs text-red-400 mt-1">Reason: {d.rejectionReason}</p>
                        )}
                      </div>
                      <span className={`text-[10px] px-2 py-1 rounded-full border font-medium ${
                        d.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                        d.status === 'APPROVED' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                        'bg-red-500/10 text-red-400 border-red-500/20'
                      }`}>
                        {d.status}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
};
