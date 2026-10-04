import { useState } from 'react';

interface DepositModalProps {
  onClose: () => void;
}

const ASSETS = [
  { symbol: 'BTC', name: 'Bitcoin', color: '#F7931A', icon: '₿' },
  { symbol: 'ETH', name: 'Ethereum', color: '#627EEA', icon: 'Ξ' },
];

export const DepositModal = ({ onClose }: DepositModalProps) => {
  const [selectedAsset, setSelectedAsset] = useState('BTC');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const generateAddress = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/custody/deposit-address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ asset: selectedAsset }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate address');
      setAddress(data.address);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-md shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Deposit</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-5">
          <label className="block text-sm text-gray-400 mb-2">Select Asset</label>
          <div className="flex gap-3">
            {ASSETS.map(a => (
              <button
                key={a.symbol}
                onClick={() => { setSelectedAsset(a.symbol); setAddress(''); }}
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

        {!address ? (
          <button
            onClick={generateAddress}
            disabled={loading}
            className="w-full bg-[#ff6a00] hover:bg-[#ff7b1a] disabled:opacity-50 text-black font-semibold rounded-lg py-3 transition-colors"
          >
            {loading ? 'Generating Address...' : `Generate ${selectedAsset} Deposit Address`}
          </button>
        ) : (
          <div className="space-y-3">
            <label className="block text-sm text-gray-400">Your {selectedAsset} Deposit Address</label>
            <div className="bg-black border border-neutral-700 rounded-lg p-4">
              <p className="text-white text-sm font-mono break-all">{address}</p>
            </div>
            <button
              onClick={copyAddress}
              className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-semibold rounded-lg py-3 transition-colors"
            >
              {copied ? '✓ Copied!' : 'Copy Address'}
            </button>
            <p className="text-xs text-gray-500 text-center">
              Only send {selectedAsset} to this address. Minimum confirmations required before balance updates.
            </p>
          </div>
        )}

        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
      </div>
    </div>
  );
};
