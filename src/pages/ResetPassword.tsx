import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing reset token.');
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword: password }),
      });

      let data: any = {};
      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        try {
          data = await response.json();
        } catch {
          data = {};
        }
      } else {
        await response.text().catch(() => '');
      }

      if (!response.ok) {
        throw new Error(
          data.error ||
          (response.status >= 500
            ? 'The server is temporarily unavailable. Please try again in a few moments.'
            : 'Failed to reset password. Please check your reset link and try again.')
        );
      }

      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err: any) {
      const msg = err?.message || '';
      if (msg.includes('Unexpected token') || msg.includes('JSON')) {
        setError('The server is temporarily busy. Please wait a moment and try again.');
      } else {
        setError(msg || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center font-inter">
      <div className="w-full max-w-md bg-neutral-900 p-8 rounded-2xl shadow-xl border border-neutral-800">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">New Password</h2>
          <p className="text-gray-400 mt-2">Enter your new password below</p>
        </div>
        
        {error && <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-400 text-sm">{error}</div>}
        
        {success ? (
          <div className="text-center bg-black border border-green-500/30 rounded-lg p-6">
            <p className="text-green-400 font-medium">Password reset successfully!</p>
            <p className="text-sm text-gray-400 mt-2">Redirecting to login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">New Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00] transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Confirm Password</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-black border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00] transition-colors"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button 
              type="submit" 
              disabled={!token || loading}
              className="w-full bg-[#ff6a00] hover:bg-[#ff7b1a] text-black font-semibold rounded-lg px-4 py-3 transition-colors mt-6 disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
