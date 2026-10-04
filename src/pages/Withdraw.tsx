import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './Dashboard/layout/Sidebar';
import { BottomNav } from './Dashboard/layout/BottomNav';
import { Header } from './Dashboard/layout/Header';
import { coinsApi, withdrawalsApi } from '../lib/api';

interface CoinNetwork {
  id: string;
  coin: string;
  network: string;
  label: string;
}

interface SavedAddress {
  id: string;
  coin: string;
  network: string;
  address: string;
  label?: string;
}

interface Wallet {
  coin: string;
  balance: string;
}

type WithdrawalStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';

export const Withdraw = () => {
  const navigate = useNavigate();

  const [coins, setCoins] = useState<CoinNetwork[]>([]);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [withdrawals, setWithdrawals] = useState<any[]>([]);
  const [prices, setPrices] = useState<Record<string, number>>({});

  const [walletBalance, setWalletBalance] = useState<string>('0');
  
  const [modalView, setModalView] = useState<'method' | 'timeline' | 'confirmation' | 'success' | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [selectedCoinName, setSelectedCoinName] = useState<string>('');
  const [selectedNetworkId, setSelectedNetworkId] = useState<string>('');
  
  const [form, setForm] = useState({
    amount: '',
    toAddress: '',
    saveAddress: false,
    addressLabel: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) { navigate('/login'); return; }
    load();
  }, [navigate]);

  const load = async () => {
    try {
      const [coinsRes, walletsRes, addrRes, wdRes] = await Promise.all([
        coinsApi.getAll(),
        fetch('/api/user/wallets', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
        withdrawalsApi.getAddresses(),
        withdrawalsApi.getMyWithdrawals(),
      ]);
      setCoins(coinsRes.data || []);
      setWallets(walletsRes.data || []);
      setSavedAddresses(addrRes.data || []);
      setWithdrawals(wdRes.data || []);
      
      // Fetch live prices
      fetch('/api/market/prices?symbols=BTC,ETH,USDT,SOL')
        .then(r => r.json())
        .then(data => setPrices(data.data || {}))
        .catch(() => {});
    } catch {}
  };

  const fetchBalance = (coin: string) => {
    // Backend Wallet model uses 'coin' field (not 'asset')
    const w = wallets.find((w: any) => w.coin === coin);
    setWalletBalance(w ? String(w.balance) : '0');
  };

  const openModal = () => {
    setModalView('method');
    setSelectedMethod('');
    setStep(1);
    setSelectedCoinName('');
    setSelectedNetworkId('');
    setForm({ amount: '', toAddress: '', saveAddress: false, addressLabel: '' });
    setError('');
  };

  const closeModal = () => {
    setModalView(null);
  };

  const uniqueCoinNames = Array.from(new Set(coins.map(c => c.coin)));
  const availableNetworks = coins.filter(c => c.coin === selectedCoinName);
  const selectedCoinNetwork = coins.find(c => c.id === selectedNetworkId);

  const handleMethodContinue = () => {
    if (selectedMethod === 'crypto') {
      setModalView('timeline');
    }
  };

  const handleTokenSelect = (coin: string) => {
    setSelectedCoinName(coin);
    setSelectedNetworkId('');
    fetchBalance(coin);
    setStep(2); // Auto-advance
  };

  const handleNetworkSelect = (netId: string) => {
    setSelectedNetworkId(netId);
    const cn = coins.find(c => c.id === netId);
    if (cn) {
      const saved = savedAddresses.find(a => a.coin === cn.coin && a.network === cn.network);
      setForm(f => ({ ...f, toAddress: saved?.address || '' }));
    }
    setStep(3); // Auto-advance
  };

  const handleTimelineContinue = () => {
    if (step === 3 && form.toAddress) {
      setModalView('confirmation');
    }
  };

  const handleSubmit = async () => {
    if (!selectedCoinNetwork || !form.amount || !form.toAddress) {
      setError('Missing required fields.');
      return;
    }
    
    if (Number(form.amount) > Number(walletBalance)) {
      setError('Insufficient balance.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      if (form.saveAddress && form.toAddress) {
        await withdrawalsApi.saveAddress({
          coin: selectedCoinNetwork.coin,
          network: selectedCoinNetwork.network,
          address: form.toAddress,
          label: form.addressLabel || undefined,
        });
      }

      await withdrawalsApi.create({
        coinNetworkId: selectedCoinNetwork.id,
        amount: form.amount,
        toAddress: form.toAddress,
      });

      setModalView('success');
      load();
    } catch (err: any) {
      setError(err.message || 'Failed to submit withdrawal');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-inter overflow-x-hidden">
      <Sidebar />
      <div className="md:pl-64 flex-1 flex flex-col">
        <Header />
        <main className="p-8 flex-1 bg-[#0a0a0a]">
          
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Withdrawals</h1>
            <button 
              onClick={openModal}
              className="bg-[#ff6a00] hover:bg-[#ff7b1a] text-white px-5 py-2.5 rounded text-sm font-medium transition-colors"
            >
              Withdraw now
            </button>
          </div>

          <div className="bg-transparent">
            {withdrawals.length === 0 ? (
              <p className="text-gray-500 text-sm mt-10">You have not made any withdrawals yet, <button onClick={openModal} className="text-[#ff6a00] hover:underline">Click here</button> to withdraw.</p>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="text-gray-500 border-b border-neutral-800">
                  <tr>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">To Address</th>
                    <th className="pb-3 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {withdrawals.map(w => (
                    <tr key={w.id}>
                      <td className="py-4 text-gray-300">{new Date(w.createdAt).toLocaleDateString()}</td>
                      <td className="py-4 text-gray-300 font-mono">{Number(w.amount)} {w.coin}</td>
                      <td className="py-4 text-gray-300 font-mono text-xs max-w-[150px] truncate">{w.toAddress}</td>
                      <td className="py-4 text-right">
                        <span className={`px-2 py-1 rounded text-xs ${
                          w.status === 'PENDING' ? 'text-yellow-500 bg-yellow-500/10' :
                          w.status === 'APPROVED' ? 'text-blue-500 bg-blue-500/10' :
                          w.status === 'COMPLETED' ? 'text-green-500 bg-green-500/10' :
                          'text-red-500 bg-red-500/10'
                        }`}>
                          {w.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>

      {modalView === 'method' && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1c1c1c] rounded-xl w-full max-w-md shadow-2xl flex flex-col border border-neutral-800">
            <div className="flex items-center justify-between p-5 border-b border-neutral-800">
              <h2 className="text-lg font-bold">Make a withdrawal</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-400 text-sm mb-6">
                To make a withdrawal, choose your preferred method and click on the continue button
              </p>
              <div className="mb-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">Payment Options</p>
                <div 
                  onClick={() => setSelectedMethod('crypto')}
                  className={`p-4 border rounded-xl cursor-pointer transition-colors flex items-center justify-between ${
                    selectedMethod === 'crypto' ? 'border-[#ff6a00] bg-[#ff6a00]/5' : 'border-neutral-700 bg-neutral-900 hover:border-neutral-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-[#ff6a00]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <span className="font-semibold">Crypto</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === 'crypto' ? 'border-[#ff6a00]' : 'border-neutral-600'}`}>
                    {selectedMethod === 'crypto' && <div className="w-2.5 h-2.5 rounded-full bg-[#ff6a00]" />}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-neutral-800">
              <button 
                onClick={handleMethodContinue}
                disabled={!selectedMethod}
                className="w-full py-3 bg-[#6e6e6e] hover:bg-[#858585] text-white disabled:opacity-50 disabled:cursor-not-allowed font-medium rounded transition-colors"
                style={{ backgroundColor: selectedMethod ? '#ff6a00' : '#6e6e6e' }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {modalView === 'timeline' && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1c1c1c] rounded-xl w-full max-w-lg shadow-2xl flex flex-col border border-neutral-800">
            <div className="flex items-center justify-between p-5 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <button onClick={() => setModalView('method')} className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h2 className="text-lg font-bold">Crypto withdrawal</h2>
              </div>
              <button onClick={closeModal} className="text-gray-500 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              <p className="text-gray-400 text-sm mb-6">
                To proceed, select your token and network, enter destination details and click on the continue button.
              </p>

              <div className="relative pl-6 space-y-6">
                <div className="absolute left-2.5 top-2 bottom-6 w-0.5 bg-neutral-800 z-0"></div>

                {/* Step 1 */}
                <div className="relative z-10">
                  <div className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-[10px] border-2 ${step >= 1 ? 'border-[#ff6a00] text-[#ff6a00] bg-[#1c1c1c]' : 'border-neutral-600 text-neutral-600 bg-[#1c1c1c]'}`}>
                    1
                  </div>
                  <p className={`text-sm mb-2 ${step >= 1 ? 'text-white' : 'text-gray-500'}`}>Select token to withdraw</p>
                  {step === 1 && (
                    <select 
                      value={selectedCoinName}
                      onChange={(e) => handleTokenSelect(e.target.value)}
                      className="w-full bg-[#141414] border border-neutral-800 rounded-lg p-3 text-sm focus:outline-none focus:border-[#ff6a00]"
                    >
                      <option value="" disabled>Select token</option>
                      {uniqueCoinNames.map(coin => (
                        <option key={coin} value={coin}>{coin}</option>
                      ))}
                    </select>
                  )}
                  {step > 1 && (
                    <div onClick={() => setStep(1)} className="w-full bg-black border border-neutral-800 rounded-lg p-3 text-sm text-gray-300 cursor-pointer flex justify-between">
                      <span>{selectedCoinName}</span>
                      <span className="text-[#ff6a00] text-xs">Edit</span>
                    </div>
                  )}
                </div>

                {/* Step 2 */}
                <div className="relative z-10">
                  <div className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-[10px] border-2 ${step >= 2 ? 'border-[#ff6a00] text-[#ff6a00] bg-[#1c1c1c]' : 'border-neutral-600 text-neutral-600 bg-[#1c1c1c]'}`}>
                    2
                  </div>
                  <p className={`text-sm mb-2 ${step >= 2 ? 'text-white' : 'text-gray-500'}`}>Select network</p>
                  {step === 2 && (
                    <select 
                      value={selectedNetworkId}
                      onChange={(e) => handleNetworkSelect(e.target.value)}
                      className="w-full bg-[#141414] border border-neutral-800 rounded-lg p-3 text-sm focus:outline-none focus:border-[#ff6a00]"
                    >
                      <option value="" disabled>Select network</option>
                      {availableNetworks.map(net => (
                        <option key={net.id} value={net.id}>{net.network}</option>
                      ))}
                    </select>
                  )}
                  {step > 2 && (
                    <div onClick={() => setStep(2)} className="w-full bg-black border border-neutral-800 rounded-lg p-3 text-sm text-gray-300 cursor-pointer flex justify-between">
                      <span>{selectedCoinNetwork?.network}</span>
                      <span className="text-[#ff6a00] text-xs">Edit</span>
                    </div>
                  )}
                </div>

                {/* Step 3 */}
                <div className="relative z-10">
                  <div className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-[10px] border-2 ${step >= 3 ? 'border-[#ff6a00] text-[#ff6a00] bg-[#1c1c1c]' : 'border-neutral-600 text-neutral-600 bg-[#1c1c1c]'}`}>
                    3
                  </div>
                  <p className={`text-sm mb-2 ${step >= 3 ? 'text-white' : 'text-gray-500'}`}>Destination details</p>
                  {step >= 3 && (
                    <div className="w-full bg-[#141414] border border-neutral-800 rounded-lg p-4 space-y-4">
                      <div className="flex items-center justify-between text-xs bg-black rounded p-2 border border-neutral-800">
                        <span className="text-gray-500">Available Balance:</span>
                        <span className="text-[#ff6a00] font-mono">{Number(walletBalance).toFixed(4)} {selectedCoinName}</span>
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 block mb-1">Destination Address</label>
                        <input 
                          type="text" required
                          value={form.toAddress} onChange={e => setForm({...form, toAddress: e.target.value})}
                          className="w-full bg-black border border-neutral-800 rounded p-2 text-sm focus:outline-none focus:border-[#ff6a00] font-mono text-gray-300"
                          placeholder="Enter address"
                        />
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <input
                          type="checkbox" id="saveAddr"
                          checked={form.saveAddress} onChange={e => setForm({...form, saveAddress: e.target.checked})}
                          className="accent-[#ff6a00]"
                        />
                        <label htmlFor="saveAddr" className="text-xs text-gray-400">Save address for future use</label>
                      </div>
                      
                      {form.saveAddress && (
                        <div>
                          <input 
                            type="text" placeholder="Address Label (e.g. My Binance)"
                            value={form.addressLabel} onChange={e => setForm({...form, addressLabel: e.target.value})}
                            className="w-full bg-black border border-neutral-800 rounded p-2 text-sm focus:outline-none focus:border-[#ff6a00]"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-neutral-800">
              <button 
                onClick={handleTimelineContinue}
                disabled={step < 3 || !form.toAddress}
                className="w-full py-3 bg-[#6e6e6e] hover:bg-[#858585] text-white disabled:opacity-50 disabled:cursor-not-allowed font-medium rounded transition-colors"
                style={{ backgroundColor: (step === 3 && form.toAddress) ? '#ff6a00' : '#6e6e6e' }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {modalView === 'confirmation' && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1c1c1c] rounded-xl w-full max-w-md shadow-2xl flex flex-col border border-neutral-800">
            <div className="flex items-center justify-between p-5 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <button onClick={() => setModalView('timeline')} className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h2 className="text-lg font-bold">Confirmation</h2>
              </div>
              <button onClick={closeModal} className="text-gray-500 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              
              <div>
                <label className="text-sm text-gray-400 block mb-2 font-medium">Amount to withdraw:</label>
                <div className="relative">
                  <input 
                    type="number" step="any" min="0" max={walletBalance}
                    value={form.amount} onChange={e => setForm({...form, amount: e.target.value})}
                    className="w-full bg-[#141414] border border-neutral-800 rounded-lg p-3 pr-20 text-white text-lg font-medium focus:outline-none focus:border-[#ff6a00]"
                    placeholder="0"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-[#2a2a2a] px-2 py-1 rounded text-xs font-bold text-white">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {selectedCoinName}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Current {selectedCoinName} balance</span>
                  <span className="text-white font-medium">{Number(walletBalance)} {selectedCoinName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Minimum withdrawal</span>
                  <span className="text-white font-medium">$10.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Maximum withdrawal</span>
                  <span className="text-white font-medium">$500,000.00</span>
                </div>
              </div>

              <div className="bg-[#141414] border border-neutral-800 rounded-lg p-4">
                <label className="text-xs text-gray-500 block mb-1">Destination Address:</label>
                <p className="font-mono text-xs break-all text-gray-300">{form.toAddress}</p>
                <label className="text-xs text-gray-500 block mb-1 mt-3">Network:</label>
                <p className="text-xs text-gray-300">{selectedCoinNetwork?.network}</p>
              </div>

              <div className="flex justify-between pt-2">
                <span className="text-gray-400 font-medium">Total withdrawal value</span>
                <span className="text-white font-medium">${form.amount && prices[selectedCoinName] ? (Number(form.amount) * prices[selectedCoinName]).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}</span>
              </div>

              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </div>

            <div className="p-5 border-t border-neutral-800">
              <button 
                onClick={handleSubmit}
                disabled={!form.amount || submitting || Number(form.amount) <= 0 || Number(form.amount) > Number(walletBalance)}
                className="w-full py-3.5 bg-[#6e6e6e] text-white disabled:opacity-50 disabled:cursor-not-allowed font-medium rounded-lg transition-colors text-[15px]"
                style={{ backgroundColor: (form.amount && Number(form.amount) > 0 && Number(form.amount) <= Number(walletBalance)) ? '#8b8b8b' : '#6e6e6e' }}
              >
                {submitting ? 'Submitting...' : 'Confirm Withdrawal'}
              </button>
            </div>
          </div>
        </div>
      )}

      {modalView === 'success' && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1c1c1c] rounded-xl w-full max-w-sm shadow-2xl flex flex-col border border-neutral-800 p-8 items-center text-center">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 border border-blue-500/20">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Withdrawal Submitted</h3>
            <p className="text-gray-400 text-sm mb-8">Your withdrawal request is pending processing. Funds have been reserved.</p>
            <button onClick={closeModal} className="w-full py-3 bg-[#ff6a00] hover:bg-[#ff7b1a] text-white font-bold rounded-lg transition-colors">
              Close
            </button>
          </div>
        </div>
      )}
      <BottomNav />
    </div>
  );
};
