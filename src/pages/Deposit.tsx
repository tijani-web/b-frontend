import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './Dashboard/layout/Sidebar';
import { BottomNav } from './Dashboard/layout/BottomNav';
import { Header } from './Dashboard/layout/Header';
import { coinsApi, depositsApi } from '../lib/api';

interface CoinNetwork {
  id: string;
  coin: string;
  network: string;
  label: string;
  walletAddresses: { address: string }[];
}

interface DepositHistory {
  id: string;
  coin: string;
  network: string;
  amount: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  txHash?: string;
  walletAddressUsed: string;
  rejectionReason?: string;
  createdAt: string;
}

export const Deposit = () => {
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);

  const [coins, setCoins] = useState<CoinNetwork[]>([]);
  const [deposits, setDeposits] = useState<DepositHistory[]>([]);
  const [walletBalance, setWalletBalance] = useState<string>('0');
  const [prices, setPrices] = useState<Record<string, number>>({});
  
  const [modalView, setModalView] = useState<'method' | 'timeline' | 'confirmation' | 'success' | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [selectedCoinName, setSelectedCoinName] = useState<string>('');
  const [selectedNetworkId, setSelectedNetworkId] = useState<string>('');
  
  const [form, setForm] = useState({ amount: '', txHash: '' });
  const [proofFile, setProofFile] = useState<File | null>(null);
  
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [copied, setCopied] = useState(false);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) { navigate('/login'); return; }

    coinsApi.getAll().then((d) => setCoins(d.data || [])).catch(() => {});
    refreshDeposits();
    
    // Fetch live prices
    fetch('/api/market/prices?symbols=BTC,ETH,USDT,SOL')
      .then(r => r.json())
      .then(data => setPrices(data.data || {}))
      .catch(() => {});
  }, [navigate]);

  const fetchBalance = async (coin: string) => {
    try {
      const r = await fetch('/api/user/wallets', { headers: { Authorization: `Bearer ${token}` } });
      const data = await r.json();
      // Backend Wallet model uses 'coin' field (not 'asset')
      const wallet = (data.data || []).find((w: any) => w.coin === coin);
      setWalletBalance(wallet ? String(wallet.balance) : '0');
    } catch {
      setWalletBalance('0');
    }
  };

  const refreshDeposits = () => {
    depositsApi.getMyDeposits().then((d) => setDeposits(d.data || [])).catch(() => {});
  };

  const openModal = () => {
    setModalView('method');
    setSelectedMethod('');
    setStep(1);
    setSelectedCoinName('');
    setSelectedNetworkId('');
    setForm({ amount: '', txHash: '' });
    setProofFile(null);
    setSubmitError('');
  };

  const closeModal = () => {
    setModalView(null);
  };

  const uniqueCoinNames = Array.from(new Set(coins.map(c => c.coin)));
  const availableNetworks = coins.filter(c => c.coin === selectedCoinName);
  const selectedCoinNetwork = coins.find(c => c.id === selectedNetworkId);
  const walletAddress = selectedCoinNetwork?.walletAddresses?.[0]?.address || 'No address configured for this network';

  const handleCopy = () => {
    if (walletAddress && walletAddress !== 'No address configured for this network') {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
    setStep(3); // Auto-advance
  };

  const handleTimelineContinue = () => {
    if (step === 3 && selectedCoinNetwork) {
      setModalView('confirmation');
    }
  };

  const handleSubmit = async () => {
    if (!selectedCoinNetwork || !form.amount) {
      setSubmitError('Please enter an amount.');
      return;
    }
    if (!proofFile) {
      setSubmitError('Payment proof is required.');
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    const fd = new FormData();
    fd.append('coinNetworkId', selectedCoinNetwork.id);
    fd.append('amount', form.amount);
    if (form.txHash) fd.append('txHash', form.txHash);
    fd.append('proof', proofFile);

    try {
      await depositsApi.create(fd);
      setModalView('success');
      refreshDeposits();
    } catch (err: any) {
      setSubmitError(err.message || 'Failed to submit deposit');
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
            <h1 className="text-2xl font-bold">Deposits</h1>
            <button 
              onClick={openModal}
              className="bg-[#ff6a00] hover:bg-[#ff7b1a] text-white px-5 py-2.5 rounded text-sm font-medium transition-colors"
            >
              Deposit now
            </button>
          </div>

          <div className="bg-transparent">
            {deposits.length === 0 ? (
              <p className="text-gray-500 text-sm mt-10">You have not made any deposits yet, <button onClick={openModal} className="text-[#ff6a00] hover:underline">Click here</button> to deposit.</p>
            ) : (
              <table className="w-full text-left text-sm">
                <thead className="text-gray-500 border-b border-neutral-800">
                  <tr>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Reference</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Total (USD)</th>
                    <th className="pb-3 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {deposits.map(d => (
                    <tr key={d.id}>
                      <td className="py-4 text-gray-300">{new Date(d.createdAt).toLocaleDateString()}</td>
                      <td className="py-4 text-gray-300 font-mono text-xs">{d.id.split('-')[0]}</td>
                      <td className="py-4 text-gray-300">{Number(d.amount)} {d.coin}</td>
                      <td className="py-4 text-gray-300">
                        ${prices[d.coin] ? (Number(d.amount) * prices[d.coin]).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '—'}
                      </td>
                      <td className="py-4 text-right">
                        <span className={`px-2 py-1 rounded text-xs ${
                          d.status === 'PENDING' ? 'text-yellow-500 bg-yellow-500/10' :
                          d.status === 'APPROVED' ? 'text-green-500 bg-green-500/10' :
                          'text-red-500 bg-red-500/10'
                        }`}>
                          {d.status}
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
              <h2 className="text-lg font-bold">Make a deposit</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-400 text-sm mb-6">
                To make a deposit, choose your preferred method and click on the continue button
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
                <h2 className="text-lg font-bold">Crypto deposit</h2>
              </div>
              <button onClick={closeModal} className="text-gray-500 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="p-6 flex-1 overflow-y-auto">
              <p className="text-gray-400 text-sm mb-6">
                To proceed, select your token and network, make payment to the address shown and click on the continue button.
              </p>

              <div className="relative pl-6 space-y-6">
                <div className="absolute left-2.5 top-2 bottom-6 w-0.5 bg-neutral-800 z-0"></div>

                {/* Step 1 */}
                <div className="relative z-10">
                  <div className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-[10px] border-2 ${step >= 1 ? 'border-[#ff6a00] text-[#ff6a00] bg-[#1c1c1c]' : 'border-neutral-600 text-neutral-600 bg-[#1c1c1c]'}`}>
                    1
                  </div>
                  <p className={`text-sm mb-2 ${step >= 1 ? 'text-white' : 'text-gray-500'}`}>Select token to deposit</p>
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
                  <p className={`text-sm mb-2 ${step >= 3 ? 'text-white' : 'text-gray-500'}`}>Deposit details</p>
                  {step >= 3 && (
                    <div className="w-full bg-[#141414] border border-neutral-800 rounded-lg p-4">
                      {walletAddress !== 'No address configured for this network' ? (
                        <div className="flex flex-col items-center">
                          <p className="text-xs text-gray-400 mb-2 w-full text-left">Transfer exactly via {selectedCoinNetwork?.network}</p>
                          <div className="bg-white p-2 rounded mb-3">
                            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${walletAddress}`} alt="QR" className="w-32 h-32" />
                          </div>
                          <div className="flex items-center gap-2 w-full bg-black rounded p-2 border border-neutral-800">
                            <span className="text-xs font-mono text-gray-300 truncate flex-1">{walletAddress}</span>
                            <button onClick={handleCopy} className="text-[#ff6a00] text-xs font-medium px-2 py-1 bg-[#ff6a00]/10 rounded">
                              {copied ? 'Copied!' : 'Copy'}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-red-400">No deposit address available for this network. Please contact support.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-neutral-800">
              <button 
                onClick={handleTimelineContinue}
                disabled={step < 3 || walletAddress === 'No address configured for this network'}
                className="w-full py-3 bg-[#6e6e6e] hover:bg-[#858585] text-white disabled:opacity-50 disabled:cursor-not-allowed font-medium rounded transition-colors"
                style={{ backgroundColor: (step === 3 && walletAddress !== 'No address configured for this network') ? '#ff6a00' : '#6e6e6e' }}
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
                <label className="text-sm text-gray-400 block mb-2 font-medium">Amount:</label>
                <div className="relative">
                  <input 
                    type="number" step="any" min="0"
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
                  <span className="text-gray-400 font-medium">Minimum deposit</span>
                  <span className="text-white font-medium">$10.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Maximum deposit</span>
                  <span className="text-white font-medium">$500,000.00</span>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 block mb-2 font-medium">Payment proof:</label>
                <div 
                  onClick={() => fileRef.current?.click()}
                  className="w-full bg-[#141414] border border-neutral-800 rounded-lg p-4 flex items-center justify-center gap-2 cursor-pointer hover:border-[#ff6a00] transition-colors"
                >
                  <svg className="w-5 h-5 text-[#ff6a00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                  <span className="text-[#ff6a00] font-medium text-sm">
                    {proofFile ? proofFile.name : 'Click here to upload payment proof'}
                  </span>
                  <input 
                    ref={fileRef} type="file" className="hidden" accept="image/*,application/pdf"
                    onChange={e => setProofFile(e.target.files?.[0] || null)}
                  />
                </div>
              </div>

              <div className="flex justify-between pt-2">
                <span className="text-gray-400 font-medium">Total deposit value</span>
                <span className="text-white font-medium">${form.amount && prices[selectedCoinName] ? (Number(form.amount) * prices[selectedCoinName]).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00'}</span>
              </div>

              {submitError && <p className="text-red-400 text-sm mt-2">{submitError}</p>}
            </div>

            <div className="p-5 border-t border-neutral-800">
              <button 
                onClick={handleSubmit}
                disabled={!form.amount || !proofFile || submitting}
                className="w-full py-3.5 bg-[#6e6e6e] text-white disabled:opacity-50 disabled:cursor-not-allowed font-medium rounded-lg transition-colors text-[15px]"
                style={{ backgroundColor: (form.amount && proofFile) ? '#8b8b8b' : '#6e6e6e' }}
              >
                {submitting ? 'Submitting...' : 'I have made this deposit'}
              </button>
            </div>
          </div>
        </div>
      )}

      {modalView === 'success' && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1c1c1c] rounded-xl w-full max-w-sm shadow-2xl flex flex-col border border-neutral-800 p-8 items-center text-center">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Deposit Submitted</h3>
            <p className="text-gray-400 text-sm mb-8">Your deposit request is pending administrator approval. We will notify you once it is processed.</p>
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
