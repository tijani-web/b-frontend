import { useState } from 'react';
import { Link } from 'react-router-dom';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reset link');
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center font-inter">
      <div className="w-full max-w-md bg-neutral-900 p-8 rounded-2xl shadow-xl border border-neutral-800">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Reset Password</h2>
          <p className="text-gray-400 mt-2">Enter your email to receive a reset link</p>
        </div>
        
        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-neutral-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00] transition-colors"
                placeholder="name@example.com"
                required
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#ff6a00] hover:bg-[#ff7b1a] disabled:opacity-50 text-black font-semibold rounded-lg px-4 py-3 transition-colors mt-6"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        ) : (
          <div className="text-center bg-black border border-green-500/30 rounded-lg p-6">
            <p className="text-green-400 font-medium">Reset link sent!</p>
            <p className="text-sm text-gray-400 mt-2">If an account exists for {email}, you will receive an email shortly.</p>
          </div>
        )}
        
        <p className="text-center text-gray-400 mt-6 text-sm">
          Remember your password? <Link to="/login" className="text-[#ff6a00] hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};
