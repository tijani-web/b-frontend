import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { coinsApi } from '../../lib/api';

export const AdminWalletSettings = () => {
  const navigate = useNavigate();
  const [coins, setCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  // New Coin Form
  const [showAddCoin, setShowAddCoin] = useState(false);
  const [newCoin, setNewCoin] = useState({ coin: '', network: '', label: '', isEnabled: true });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }
    load();
  }, [navigate]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await coinsApi.adminGetAll();
      setCoins(res.data || []);
    } catch { navigate('/login'); }
    finally { setLoading(false); }
  };

  const handleToggleEnable = async (id: string, current: boolean) => {
    try {
      await coinsApi.update(id, { isEnabled: !current });
      load();
    } catch (err: any) { setError(err.message); }
  };

  const handleUpdateAddress = async (coinId: string, addressId: string | null, newAddress: string) => {
    if (!newAddress.trim()) {
      setError('Address cannot be empty');
      return;
    }
    try {
      if (addressId) {
        await coinsApi.updateAddress(addressId, { address: newAddress });
      } else {
        await coinsApi.addAddress(coinId, { address: newAddress });
      }
      load();
    } catch (err: any) { setError(err.message); }
  };

  const handleCreateCoin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await coinsApi.create(newCoin);
      setShowAddCoin(false);
      setNewCoin({ coin: '', network: '', label: '', isEnabled: true });
      load();
    } catch (err: any) { setError(err.message); }
  };

  const handleDeleteCoin = async (id: string) => {
    if (!confirm('Are you sure you want to delete this coin/network? This cannot be undone.')) return;
    try {
      await coinsApi.delete(id);
      load();
    } catch (err: any) { setError(err.message); }
  };

  return (
    <AdminLayout>
      <div className="p-8 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Wallet Settings</h1>
            <p className="text-gray-400 text-sm mt-0.5">Manage supported coins, networks, and your deposit addresses.</p>
          </div>
          <button
            onClick={() => setShowAddCoin(true)}
            className="px-4 py-2 bg-[#ff6a00] hover:bg-[#ff6a00] text-black font-semibold rounded-xl text-sm transition-colors"
          >
            + Add Coin/Network
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4 text-red-400 text-sm">⚠ {error}</div>
        )}

        {showAddCoin && (
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl p-6 mb-8">
            <h2 className="font-semibold mb-4">Add New Cryptocurrency & Network</h2>
            <form onSubmit={handleCreateCoin} className="flex flex-wrap gap-4 items-end">
              <div>
                <label className="text-xs text-gray-400 block mb-1">Symbol (e.g. USDT)</label>
                <input required type="text" value={newCoin.coin} onChange={e => setNewCoin(c => ({ ...c, coin: e.target.value.toUpperCase() }))} className="bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-sm w-32" />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">Network (e.g. TRC20)</label>
                <input required type="text" value={newCoin.network} onChange={e => setNewCoin(c => ({ ...c, network: e.target.value }))} className="bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-sm w-32" />
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="text-xs text-gray-400 block mb-1">Display Label (e.g. USDT (TRC20))</label>
                <input required type="text" value={newCoin.label} onChange={e => setNewCoin(c => ({ ...c, label: e.target.value }))} className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-3 py-2 text-sm" />
              </div>
              <div className="flex gap-2">
                <button type="button" onClick={() => setShowAddCoin(false)} className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#ff6a00] hover:bg-[#ff6a00] text-black font-semibold rounded-lg text-sm transition-colors">Save</button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <p className="text-gray-500 text-sm">Loading...</p>
        ) : (
          <div className="space-y-4">
            {coins.map((c) => {
              const addressObj = c.walletAddresses?.[0];
              const currentAddress = addressObj?.address || '';
              return (
                <div key={c.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-6 transition-all hover:border-neutral-700">
                  
                  {/* Coin Info */}
                  <div className="w-48 shrink-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{c.coin}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${c.isEnabled ? 'bg-green-500/10 text-green-400' : 'bg-neutral-800 text-gray-500'}`}>
                        {c.isEnabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">{c.network}</p>
                    <p className="text-gray-500 text-xs mt-1">Label: {c.label}</p>
                  </div>

                  {/* Wallet Address Edit */}
                  <div className="flex-1">
                    <label className="text-xs text-gray-400 block mb-1 uppercase tracking-wider">Deposit Address</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        defaultValue={currentAddress}
                        placeholder="Enter your wallet address for deposits"
                        className="flex-1 bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 font-mono text-sm text-[#ff6a00] focus:outline-none focus:border-[#ff6a00] transition-colors"
                        onBlur={(e) => {
                          if (e.target.value !== currentAddress) {
                            handleUpdateAddress(c.id, addressObj?.id || null, e.target.value);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.currentTarget.blur();
                          }
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5">Press Enter or click away to save. This is where user deposits will be sent.</p>
                  </div>

                  {/* Actions */}
                  <div className="flex md:flex-col gap-2 shrink-0 md:w-32">
                    <button
                      onClick={() => handleToggleEnable(c.id, c.isEnabled)}
                      className={`w-full px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${c.isEnabled ? 'bg-neutral-800 hover:bg-neutral-700 text-white' : 'bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20'}`}
                    >
                      {c.isEnabled ? 'Disable' : 'Enable'}
                    </button>
                    <button
                      onClick={() => handleDeleteCoin(c.id)}
                      className="w-full px-3 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-lg text-xs font-semibold transition-colors"
                    >
                      Delete
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
