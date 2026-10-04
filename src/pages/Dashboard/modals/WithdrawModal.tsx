import { useState } from 'react';

interface WithdrawModalProps {
  onClose: () => void;
}

const ASSETS = [
  { symbol: 'BTC', name: 'Bitcoin', color: '#F7931A', icon: '₿' },
  { symbol: 'ETH', name: 'Ethereum', color: '#627EEA', icon: 'Ξ' },
];

export const WithdrawModal = ({ onClose }: WithdrawModalProps) => {
  const [selectedAsset, setSelectedAsset] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/custody/withdraw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          asset: selectedAsset,
          amount: parseFloat(amount),
          address,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Withdrawal failed');
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-md shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Withdraw</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white font-semibold text-lg">Withdrawal Submitted!</p>
            <p className="text-gray-400 text-sm mt-2">Your withdrawal is being processed on the blockchain.</p>
            <button onClick={onClose} className="mt-6 w-full bg-[#ff6a00] text-black font-semibold rounded-lg py-3">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleWithdraw} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Asset</label>
              <div className="flex gap-3">
                {ASSETS.map(a => (
                  <button
                    key={a.symbol}
                    type="button"
                    onClick={() => setSelectedAsset(a.symbol)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all font-medium ${
                      selectedAsset === a.symbol
                        ? 'border-[#ff6a00] bg-[#ff6a00]/10 text-white'
                        : 'border-neutral-700 bg-neutral-800 text-gray-400 hover:border-neutral-600'
                    }`}
                  >
                    <span style={{ color: a.color }}>{a.icon}</span>
                    {a.symbol}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0.00"
                step="any"
                required
                className="w-full bg-black border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff6a00] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Destination Address</label>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder={`Enter ${selectedAsset} address`}
                required
                className="w-full bg-black border border-neutral-700 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-[#ff6a00] transition-colors"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div className="pt-2">
              <p className="text-xs text-gray-500 mb-3">⚠️ Double-check the destination address. Withdrawals are irreversible.</p>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#ff6a00] hover:bg-[#ff7b1a] disabled:opacity-50 text-black font-semibold rounded-lg py-3 transition-colors"
              >
                {loading ? 'Processing...' : `Withdraw ${selectedAsset}`}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
