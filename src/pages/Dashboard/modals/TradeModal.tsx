import { useState, useEffect } from 'react';

interface TradeModalProps {
  defaultFrom?: string;
  onClose: () => void;
}

const ASSETS = [
  { symbol: 'BTC', name: 'Bitcoin', color: '#F7931A', icon: '₿' },
  { symbol: 'ETH', name: 'Ethereum', color: '#627EEA', icon: 'Ξ' },
  { symbol: 'USDT', name: 'Tether', color: '#26A17B', icon: '₮' },
];

export const TradeModal = ({ defaultFrom = 'USDT', onClose }: TradeModalProps) => {
  const [fromAsset, setFromAsset] = useState(defaultFrom);
  const [toAsset, setToAsset] = useState(defaultFrom === 'BTC' ? 'USDT' : 'BTC');
  const [amount, setAmount] = useState('');
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<{ received: number; asset: string } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/market/prices?symbols=BTC,ETH,USDT')
      .then(r => r.json())
      .then(data => setPrices(data.data || {}))
      .catch(() => {});
  }, []);

  const fromPrice = prices[fromAsset] || 0;
  const toPrice = prices[toAsset] || 0;
  const estimatedReceive = fromPrice && toPrice && amount
    ? ((parseFloat(amount) * fromPrice) / toPrice).toFixed(8)
    : '0';

  const handleSwap = () => {
    const temp = fromAsset;
    setFromAsset(toAsset);
    setToAsset(temp);
    setAmount('');
  };

  const handleTrade = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/trade/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          fromAsset,
          toAsset,
          amount: parseFloat(amount),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Trade failed');
      setSuccess({ received: data.receivedAmount, asset: toAsset });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toAssetOptions = ASSETS.filter(a => a.symbol !== fromAsset);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-md shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Trade</h2>
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
            <p className="text-white font-semibold text-lg">Trade Executed!</p>
            <p className="text-gray-400 text-sm mt-2">
              You received <span className="text-[#ff6a00] font-bold">{success.received.toFixed(8)} {success.asset}</span>
            </p>
            <button onClick={onClose} className="mt-6 w-full bg-[#ff6a00] text-black font-semibold rounded-lg py-3">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleTrade} className="space-y-4">
            {/* From */}
            <div className="bg-black border border-neutral-700 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs text-gray-400 uppercase tracking-wider">From</label>
                <select
                  value={fromAsset}
                  onChange={e => { setFromAsset(e.target.value); setAmount(''); }}
                  className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:border-[#ff6a00]"
                >
                  {ASSETS.map(a => (
                    <option key={a.symbol} value={a.symbol}>{a.symbol}</option>
                  ))}
                </select>
              </div>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0.00"
                step="any"
                required
                className="w-full bg-transparent text-white text-2xl font-bold focus:outline-none placeholder-neutral-700"
              />
              {fromPrice > 0 && amount && (
                <p className="text-xs text-gray-500 mt-1">≈ ${(parseFloat(amount) * fromPrice).toLocaleString()} USD</p>
              )}
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleSwap}
                className="w-10 h-10 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all"
              >
                ⇅
              </button>
            </div>

            {/* To */}
            <div className="bg-black border border-neutral-700 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs text-gray-400 uppercase tracking-wider">To</label>
                <select
                  value={toAsset}
                  onChange={e => setToAsset(e.target.value)}
                  className="bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-1 text-white text-sm focus:outline-none focus:border-[#ff6a00]"
                >
                  {toAssetOptions.map(a => (
                    <option key={a.symbol} value={a.symbol}>{a.symbol}</option>
                  ))}
                </select>
              </div>
              <p className="text-2xl font-bold text-gray-400">{estimatedReceive}</p>
              {toPrice > 0 && (
                <p className="text-xs text-gray-500 mt-1">
                  1 {fromAsset} ≈ {(fromPrice / toPrice).toFixed(8)} {toAsset}
                </p>
              )}
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading || !amount}
              className="w-full bg-[#ff6a00] hover:bg-[#ff7b1a] disabled:opacity-50 text-black font-semibold rounded-lg py-3 transition-colors"
            >
              {loading ? 'Executing Trade...' : `Swap ${fromAsset} → ${toAsset}`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
