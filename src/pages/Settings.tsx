import { Sidebar } from './Dashboard/layout/Sidebar';
import { BottomNav } from './Dashboard/layout/BottomNav';
import { Header } from './Dashboard/layout/Header';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type User = {
  email: string;
  kycStatus: string;
  createdAt: string;
  twoFactorEnabled?: boolean;
};

export const Settings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  // KYC
  const [kycLoading, setKycLoading] = useState(false);

  // Password modal
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdError, setPwdError] = useState('');
  const [pwdSuccess, setPwdSuccess] = useState(false);

  // 2FA modal
  const [show2faModal, setShow2faModal] = useState(false);
  const [twoFaStep, setTwoFaStep] = useState<1 | 2>(1);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [twoFaSecret, setTwoFaSecret] = useState('');
  const [twoFaCode, setTwoFaCode] = useState('');
  const [twoFaLoading, setTwoFaLoading] = useState(false);
  const [twoFaError, setTwoFaError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }
    fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        if (data.user) setUser(data.user);
        else { localStorage.removeItem('token'); navigate('/login'); }
      })
      .catch(() => {});
  }, [navigate]);

  // ── KYC ──────────────────────────────────────────────────
  const handleKyc = () => {
    navigate('/kyc');
  };

  // ── Password ──────────────────────────────────────────────
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdLoading(true);
    setPwdError('');
    setPwdSuccess(false);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/user/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update password');
      setPwdSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      setPwdError(err.message);
    } finally {
      setPwdLoading(false);
    }
  };

  // ── 2FA ──────────────────────────────────────────────────
  const handleGenerate2fa = async () => {
    setTwoFaLoading(true);
    setTwoFaError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/user/2fa/generate', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setQrCodeUrl(data.qrCodeUrl);
      setTwoFaSecret(data.secret);
      setTwoFaStep(1);
      setShow2faModal(true);
    } catch (e: any) {
      alert(e.message || 'Failed to start 2FA');
    } finally {
      setTwoFaLoading(false);
    }
  };

  const handleVerify2fa = async (e: React.FormEvent) => {
    e.preventDefault();
    setTwoFaLoading(true);
    setTwoFaError('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/user/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ token: twoFaCode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setUser(prev => prev ? { ...prev, twoFactorEnabled: true } : null);
      setTwoFaStep(2);
    } catch (e: any) {
      setTwoFaError(e.message);
    } finally {
      setTwoFaLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-inter overflow-x-hidden">
      <Sidebar />
      <div className="md:pl-64">
        <Header />
        <main className="p-4 md:p-8 pb-32 md:pb-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Account Settings</h1>
            <p className="text-gray-400 text-sm mt-1">Manage your account details and verification</p>
          </div>

          <div className="max-w-3xl space-y-6">
            {/* Profile */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email Address</label>
                  <div className="bg-black border border-neutral-800 rounded-lg px-4 py-3 text-gray-300">
                    {user?.email || 'Loading...'}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Account Created</label>
                  <div className="bg-black border border-neutral-800 rounded-lg px-4 py-3 text-gray-300">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Loading...'}
                  </div>
                </div>
              </div>
            </div>

            {/* KYC */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-4">
                <div>
                  <h2 className="text-lg font-bold mb-1">Identity Verification (KYC)</h2>
                  <p className="text-sm text-gray-400">Verify your identity to unlock higher limits and features.</p>
                </div>
                <div className="flex items-center gap-2 bg-black px-3 py-1.5 rounded-lg border border-neutral-800 w-fit">
                  <span className={`w-2 h-2 rounded-full ${user?.kycStatus === 'VERIFIED' ? 'bg-green-500' : 'bg-[#ff6a00]'}`} />
                  <span className="text-sm font-medium">{user?.kycStatus || 'PENDING'}</span>
                </div>
              </div>
              <button
                onClick={handleKyc}
                disabled={user?.kycStatus === 'VERIFIED' || kycLoading}
                className="bg-[#ff6a00] hover:bg-[#ff7b1a] disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold rounded-lg px-6 py-2.5 transition-colors"
              >
                {user?.kycStatus === 'VERIFIED' ? '✓ Identity Verified' : kycLoading ? 'Verifying...' : 'Start Verification'}
              </button>
            </div>

            {/* Security */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold mb-4">Security</h2>

              <div className="flex items-center justify-between py-3 border-b border-neutral-800">
                <div>
                  <p className="font-medium">Password</p>
                  <p className="text-sm text-gray-400">Change your account password</p>
                </div>
                <button
                  onClick={() => { setShowPasswordModal(true); setPwdSuccess(false); setPwdError(''); }}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm font-medium transition-colors"
                >
                  Update
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">Two-Factor Authentication (2FA)</p>
                  <p className="text-sm text-gray-400">Secure your account with Google Authenticator</p>
                </div>
                <button
                  onClick={handleGenerate2fa}
                  disabled={twoFaLoading || user?.twoFactorEnabled}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    user?.twoFactorEnabled
                      ? 'bg-green-500/10 text-green-500 cursor-default'
                      : 'bg-[#ff6a00]/10 text-[#ff6a00] hover:bg-[#ff6a00]/20'
                  }`}
                >
                  {user?.twoFactorEnabled ? '✓ Enabled' : twoFaLoading ? 'Loading...' : 'Enable'}
                </button>
              </div>
            </div>

            {/* Logout */}
            <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-red-500 mb-1">Log Out</h2>
                <p className="text-sm text-gray-400">Securely sign out of your account on this device.</p>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  navigate('/login');
                }}
                className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white font-bold rounded-lg px-6 py-2.5 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* ── Password Modal ── */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Update Password</h2>
              <button onClick={() => setShowPasswordModal(false)} className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {pwdSuccess ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white font-medium">Password updated successfully!</p>
                <button onClick={() => setShowPasswordModal(false)} className="mt-6 w-full bg-[#ff6a00] text-black font-semibold rounded-lg py-2">Close</button>
              </div>
            ) : (
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Current Password</label>
                  <input
                    type="password" value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    required
                    className="w-full bg-black border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-[#ff6a00] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">New Password</label>
                  <input
                    type="password" value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                    className="w-full bg-black border border-neutral-700 rounded-lg px-4 py-2 text-white focus:border-[#ff6a00] outline-none"
                  />
                </div>
                {pwdError && <p className="text-red-400 text-sm">{pwdError}</p>}
                <button type="submit" disabled={pwdLoading} className="w-full bg-[#ff6a00] text-black font-semibold rounded-lg py-2.5 mt-2 disabled:opacity-50">
                  {pwdLoading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── 2FA Modal ── */}
      {show2faModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Setup 2-Factor Auth</h2>
              <button onClick={() => setShow2faModal(false)} className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {twoFaStep === 1 ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-400">Scan this QR code with Google Authenticator or Authy.</p>
                <div className="bg-white p-4 rounded-lg flex justify-center mx-auto w-fit">
                  {qrCodeUrl && <img src={qrCodeUrl} alt="2FA QR Code" className="w-48 h-48" />}
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Or enter this code manually:</p>
                  <code className="bg-black border border-neutral-800 px-3 py-1 rounded text-[#ff6a00] font-mono tracking-widest break-all text-sm">{twoFaSecret}</code>
                </div>

                <form onSubmit={handleVerify2fa} className="pt-4 border-t border-neutral-800">
                  <label className="block text-sm text-gray-400 mb-2">Enter 6-digit code from your app</label>
                  <input
                    type="text" value={twoFaCode}
                    onChange={e => setTwoFaCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="000000"
                    maxLength={6}
                    required
                    className="w-full bg-black border border-neutral-700 rounded-lg px-4 py-3 text-white focus:border-[#ff6a00] outline-none text-center text-2xl tracking-[0.5em]"
                  />
                  {twoFaError && <p className="text-red-400 text-sm mt-2">{twoFaError}</p>}
                  <button type="submit" disabled={twoFaLoading || twoFaCode.length !== 6} className="w-full bg-[#ff6a00] text-black font-semibold rounded-lg py-2.5 mt-4 disabled:opacity-50">
                    {twoFaLoading ? 'Verifying...' : 'Verify & Enable'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-white font-bold text-lg">2FA Successfully Enabled!</p>
                <p className="text-sm text-gray-400 mt-2">Your account is now protected with Two-Factor Authentication.</p>
                <button onClick={() => setShow2faModal(false)} className="mt-6 w-full bg-neutral-800 hover:bg-neutral-700 text-white font-semibold rounded-lg py-2.5 transition-colors">
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <BottomNav />
    </div>
  );
};
