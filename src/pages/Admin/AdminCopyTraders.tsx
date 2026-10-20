import React, { useState, useEffect } from 'react';
import { AdminLayout } from './AdminLayout';

interface Trader {
  id: string;
  name: string;
  handle?: string;
  avatar: string;
  roi: string;
  winRate: string;
  profitShare?: string;
  wins?: number;
  losses?: number;
  trades?: number;
  minStartup?: string;
  aum: string;
  followers: number;
  risk: string;
  isActive: boolean;
  createdAt: string;
}

const BLANK = {
  name: '',
  handle: '',
  avatar: '🤖',
  roi: '',
  winRate: '',
  profitShare: '20%',
  wins: 0,
  losses: 0,
  trades: 0,
  minStartup: '$0',
  aum: '',
  followers: 0,
  risk: 'Medium',
  isActive: true,
};

const token = () => localStorage.getItem('token') ?? '';

export const AdminCopyTraders: React.FC = () => {
  const [traders, setTraders] = useState<Trader[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<{ open: boolean; form: typeof BLANK; id?: string }>({
    open: false,
    form: { ...BLANK },
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchTraders = async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/copy-traders/admin', {
        headers: { Authorization: `Bearer ${token()}` },
      });
      const d = await r.json();
      setTraders(d.data || []);
    } catch {
      // error handled silently
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTraders();
  }, []);

  const openAdd = () => setModal({ open: true, form: { ...BLANK } });
  const openEdit = (t: Trader) =>
    setModal({
      open: true,
      form: {
        name: t.name,
        handle: t.handle || `@${t.name.toLowerCase().replace(/\s+/g, '')}`,
        avatar: t.avatar,
        roi: t.roi,
        winRate: t.winRate,
        profitShare: t.profitShare || '20%',
        wins: t.wins ?? 0,
        losses: t.losses ?? 0,
        trades: t.trades ?? 0,
        minStartup: t.minStartup || '$0',
        aum: t.aum,
        followers: t.followers,
        risk: t.risk,
        isActive: t.isActive,
      },
      id: t.id,
    });
  const closeModal = () => {
    setModal({ open: false, form: { ...BLANK } });
    setError('');
  };
  const setField = (key: keyof typeof BLANK, val: any) =>
    setModal((m) => ({ ...m, form: { ...m.form, [key]: val } }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const isEdit = !!modal.id;
    try {
      const url = isEdit ? `/api/copy-traders/admin/${modal.id}` : '/api/copy-traders/admin';
      const r = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify({ ...modal.form, followers: Number(modal.form.followers) }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Failed to save trader');
      setSuccess(isEdit ? 'Trader updated successfully.' : 'Trader added successfully.');
      setTimeout(() => setSuccess(''), 3000);
      closeModal();
      fetchTraders();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      const r = await fetch(`/api/copy-traders/admin/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token()}` },
      });
      if (r.ok) {
        setSuccess('Trader deleted.');
        setTimeout(() => setSuccess(''), 3000);
        fetchTraders();
      }
    } catch {
      // error handled
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-white text-xl font-bold">Copy Traders</h1>
            <p className="text-gray-500 text-sm mt-0.5">Manage experts shown on the copy trading page</p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-[#ff6a00] text-black font-bold px-4 py-2 rounded-xl text-sm hover:bg-[#ff7b1a] transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Expert
          </button>
        </div>

        {success && (
          <div className="mb-4 bg-green-500/10 border border-green-500/20 text-green-400 text-sm px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        {loading ? (
          <p className="text-gray-500 py-12 text-center">Loading...</p>
        ) : traders.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-4xl mb-3">📋</p>
            <p className="font-medium">No copy traders yet</p>
          </div>
        ) : (
          <div className="bg-[#111] border border-[#222] rounded-xl overflow-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#1a1a1a] text-gray-400 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-4 font-medium">Expert</th>
                  <th className="px-5 py-4 font-medium">ROI</th>
                  <th className="px-5 py-4 font-medium">Win Rate</th>
                  <th className="px-5 py-4 font-medium">AUM</th>
                  <th className="px-5 py-4 font-medium">Followers</th>
                  <th className="px-5 py-4 font-medium">Risk</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a1a1a]">
                {traders.map((t) => (
                  <tr key={t.id} className="hover:bg-[#161616] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#222] flex items-center justify-center text-lg border border-[#333]">
                          {t.avatar}
                        </div>
                        <span className="text-white font-medium">{t.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-green-400 font-mono font-semibold">{t.roi}</td>
                    <td className="px-5 py-4 text-gray-300">{t.winRate}</td>
                    <td className="px-5 py-4 text-gray-300">{t.aum}</td>
                    <td className="px-5 py-4 text-gray-300">{t.followers.toLocaleString()}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          t.risk === 'Low'
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                            : t.risk === 'High'
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                        }`}
                      >
                        {t.risk}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          t.isActive
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                            : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                        }`}
                      >
                        {t.isActive ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(t)}
                          className="text-xs font-medium text-[#ff6a00] hover:text-[#ff7b1a] px-3 py-1.5 bg-[#ff6a00]/10 rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(t.id, t.name)}
                          className="text-xs font-medium text-red-400 hover:text-red-300 px-3 py-1.5 bg-red-500/10 rounded-lg transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal.open && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#111] border border-[#222] rounded-2xl w-full max-w-lg p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white font-bold text-base">{modal.id ? 'Edit Expert' : 'Add Expert'}</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {error && (
              <div className="mb-4 text-red-400 text-sm bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs text-gray-400 font-medium mb-1.5">Name *</label>
                  <input
                    required
                    value={modal.form.name}
                    onChange={(e) => setField('name', e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:border-[#ff6a00] outline-none"
                    placeholder="e.g. Alpha Trader"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 font-medium mb-1.5">Avatar (emoji)</label>
                  <input
                    value={modal.form.avatar}
                    onChange={(e) => setField('avatar', e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:border-[#ff6a00] outline-none"
                    placeholder="🤖"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 font-medium mb-1.5">ROI * (e.g. +142.3%)</label>
                  <input
                    required
                    value={modal.form.roi}
                    onChange={(e) => setField('roi', e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:border-[#ff6a00] outline-none"
                    placeholder="+142.3%"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 font-medium mb-1.5">Win Rate *</label>
                  <input
                    required
                    value={modal.form.winRate}
                    onChange={(e) => setField('winRate', e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:border-[#ff6a00] outline-none"
                    placeholder="87.4%"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 font-medium mb-1.5">AUM *</label>
                  <input
                    required
                    value={modal.form.aum}
                    onChange={(e) => setField('aum', e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:border-[#ff6a00] outline-none"
                    placeholder="$1.2M"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 font-medium mb-1.5">Followers</label>
                  <input
                    type="number"
                    min="0"
                    value={modal.form.followers}
                    onChange={(e) => setField('followers', Number(e.target.value))}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:border-[#ff6a00] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 font-medium mb-1.5">Risk Level</label>
                  <select
                    value={modal.form.risk}
                    onChange={(e) => setField('risk', e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:border-[#ff6a00] outline-none"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 font-medium mb-1.5">Handle (e.g. @alpha)</label>
                  <input
                    value={modal.form.handle}
                    onChange={(e) => setField('handle', e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:border-[#ff6a00] outline-none"
                    placeholder="@alphatrader"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 font-medium mb-1.5">Profit Share (e.g. 15%)</label>
                  <input
                    value={modal.form.profitShare}
                    onChange={(e) => setField('profitShare', e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:border-[#ff6a00] outline-none"
                    placeholder="20%"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 font-medium mb-1.5">Min. Startup (e.g. $50)</label>
                  <input
                    value={modal.form.minStartup}
                    onChange={(e) => setField('minStartup', e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:border-[#ff6a00] outline-none"
                    placeholder="$50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 font-medium mb-1.5">Wins</label>
                  <input
                    type="number"
                    min="0"
                    value={modal.form.wins}
                    onChange={(e) => setField('wins', Number(e.target.value))}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:border-[#ff6a00] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 font-medium mb-1.5">Losses</label>
                  <input
                    type="number"
                    min="0"
                    value={modal.form.losses}
                    onChange={(e) => setField('losses', Number(e.target.value))}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:border-[#ff6a00] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 font-medium mb-1.5">Total Trades</label>
                  <input
                    type="number"
                    min="0"
                    value={modal.form.trades}
                    onChange={(e) => setField('trades', Number(e.target.value))}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2.5 text-white text-sm focus:border-[#ff6a00] outline-none"
                  />
                </div>
                <div className="flex items-center gap-3 col-span-2 pt-1">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={modal.form.isActive}
                    onChange={(e) => setField('isActive', e.target.checked)}
                    className="w-4 h-4 rounded accent-[#ff6a00]"
                  />
                  <label htmlFor="isActive" className="text-sm text-gray-300 cursor-pointer">
                    Active (visible to users)
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-2.5 rounded-xl border border-[#333] text-gray-400 text-sm font-medium hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2.5 rounded-xl bg-[#ff6a00] text-black font-bold text-sm hover:bg-[#ff7b1a] transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : modal.id ? 'Update Expert' : 'Add Expert'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
