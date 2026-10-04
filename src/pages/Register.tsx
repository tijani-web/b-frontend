import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France',
  'Japan', 'Singapore', 'United Arab Emirates', 'Nigeria', 'South Africa', 'India',
  'Brazil', 'Mexico', 'Netherlands', 'Switzerland', 'Sweden', 'Norway', 'Denmark',
  'Spain', 'Italy', 'Portugal', 'Poland', 'Turkey', 'Saudi Arabia', 'Hong Kong',
  'South Korea', 'Indonesia', 'Malaysia', 'Thailand', 'Philippines', 'Ghana',
  'Kenya', 'Egypt', 'Morocco', 'Pakistan', 'Bangladesh', 'Vietnam', 'Argentina',
  'Chile', 'Colombia', 'Peru', 'New Zealand', 'Ireland', 'Belgium', 'Austria',
];

const CURRENCIES = [
  { code: 'USD', label: 'USD (Account currency)' },
  { code: 'EUR', label: 'EUR (Euro)' },
  { code: 'GBP', label: 'GBP (British Pound)' },
  { code: 'AUD', label: 'AUD (Australian Dollar)' },
  { code: 'CAD', label: 'CAD (Canadian Dollar)' },
  { code: 'JPY', label: 'JPY (Japanese Yen)' },
  { code: 'CHF', label: 'CHF (Swiss Franc)' },
  { code: 'SGD', label: 'SGD (Singapore Dollar)' },
  { code: 'AED', label: 'AED (UAE Dirham)' },
  { code: 'NGN', label: 'NGN (Nigerian Naira)' },
  { code: 'ZAR', label: 'ZAR (South African Rand)' },
  { code: 'INR', label: 'INR (Indian Rupee)' },
];

const EyeIcon = ({ open }: { open: boolean }) => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    {open ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    )}
  </svg>
);

const inputCls = "w-full bg-transparent border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-[#ff6a00] focus:ring-1 focus:ring-[#ff6a00] transition-colors";
const labelCls = "block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide";

export const Register = () => {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', country: '',
    phone: '', password: '', confirmPassword: '', currency: 'USD', referralCode: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showReferral, setShowReferral] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email, password: form.password,
          firstName: form.firstName, lastName: form.lastName,
          phone: form.phone, country: form.country,
          currency: form.currency,
          referralCode: form.referralCode || undefined,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Registration failed');
      navigate('/login');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-inter">
      {/* ── Left Panel: pure black + security animation, zero text ── */}
      <div className="hidden lg:block w-[46%] bg-black relative flex-shrink-0 overflow-hidden">
        {/* Full-bleed image centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[360px] h-[360px]">
            <img
              src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/main.webp"
              alt=""
              className="absolute inset-0 w-full h-full object-contain"
            />
            <video
              autoPlay muted playsInline loop preload="auto"
              poster="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/main.webp"
              className="absolute inset-0 w-full h-full object-contain z-10"
            >
              <source src="https://s2.blofin.com/frontend/_home_website/_next/static/home-public-static/videos/home/securityProof/main.webm" type="video/webm" />
              <source src="https://s2.blofin.com/frontend/_home_website/_next/static/home-public-static/videos/home/securityProof/main.mov" type="video/quicktime" />
            </video>
          </div>
        </div>

        {/* Top-left logo only */}
        <div className="absolute top-8 left-8 z-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M15.5 12C17.433 12 19 10.433 19 8.5C19 6.567 17.433 5 15.5 5H6V19H15.5C17.433 19 19 17.433 19 15.5C19 13.567 17.433 12 15.5 12ZM10 8.5H14C14 8.5 14 11 11.5 11H10V8.5ZM10 15.5V13H11.5C14 13 14 15.5 14 15.5H10Z" fill="#000"/>
              </svg>
            </div>
          </Link>
        </div>
      </div>

      {/* ── Right Panel: form ── */}
      <div className="flex-1 bg-white overflow-y-auto flex items-start justify-center py-10 px-6">
        <div className="w-full max-w-[480px]">

          {/* Mobile: logo + back */}
          <div className="flex items-center justify-between mb-8 lg:hidden">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15.5 12C17.433 12 19 10.433 19 8.5C19 6.567 17.433 5 15.5 5H6V19H15.5C17.433 19 19 17.433 19 15.5C19 13.567 17.433 12 15.5 12ZM10 8.5H14C14 8.5 14 11 11.5 11H10V8.5ZM10 15.5V13H11.5C14 13 14 15.5 14 15.5H10Z" fill="#fff"/>
                </svg>
              </div>
              <span className="font-bold text-base">Blofin<span className="text-[#ff6a00]">Prime</span></span>
            </Link>
            <Link to="/" className="text-sm text-gray-400 hover:text-gray-700">← Back</Link>
          </div>

          {/* Desktop: back link top-right */}
          <div className="hidden lg:flex justify-end mb-6">
            <Link to="/" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">← Back to homepage</Link>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-1">Get started</h1>
          <p className="text-gray-400 text-sm mb-8">Create a new account</p>

          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">{error}</div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            {/* First + Last name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>First name</label>
                <input type="text" value={form.firstName} onChange={set('firstName')} className={inputCls} placeholder="First name" required />
              </div>
              <div>
                <label className={labelCls}>Last name</label>
                <input type="text" value={form.lastName} onChange={set('lastName')} className={inputCls} placeholder="Last name" required />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className={labelCls}>Email address</label>
              <input type="email" value={form.email} onChange={set('email')} className={inputCls} placeholder="you@example.com" required />
            </div>

            {/* Country */}
            <div>
              <label className={labelCls}>Select your country</label>
              <select value={form.country} onChange={set('country')} className={inputCls + ' appearance-none cursor-pointer bg-white'} required>
                <option value="">Select your country</option>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Phone */}
            <div>
              <label className={labelCls}>Phone number</label>
              <input type="tel" value={form.phone} onChange={set('phone')} className={inputCls} placeholder="Phone number" />
            </div>

            {/* Password */}
            <div>
              <label className={labelCls}>Password (min. 6 characters)</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} value={form.password} onChange={set('password')} className={inputCls + ' pr-11'} placeholder="••••••••" required minLength={6} />
                <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label className={labelCls}>Repeat your password</label>
              <div className="relative">
                <input type={showConfirm ? 'text' : 'password'} value={form.confirmPassword} onChange={set('confirmPassword')} className={inputCls + ' pr-11'} placeholder="Repeat your password" required />
                <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
            </div>

            {/* Currency */}
            <div>
              <label className={labelCls}>Account currency</label>
              <select value={form.currency} onChange={set('currency')} className={inputCls + ' appearance-none cursor-pointer bg-white'}>
                {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.label}</option>)}
              </select>
            </div>

            {/* Referral */}
            <div>
              <button type="button" onClick={() => setShowReferral(v => !v)} className="text-sm text-[#ff6a00] hover:underline font-medium">
                Have a referral code?
              </button>
              {showReferral && (
                <input type="text" value={form.referralCode} onChange={set('referralCode')} className={inputCls + ' mt-2'} placeholder="Enter referral code" />
              )}
            </div>

            <p className="text-xs text-gray-400 pt-1">
              Have an account? <Link to="/login" className="text-[#ff6a00] hover:underline font-medium">Log in</Link>
            </p>

            <button type="submit" disabled={loading}
              className="w-full bg-[#ff6a00] hover:bg-[#e05e00] disabled:opacity-50 text-white font-semibold rounded-xl py-3.5 transition-colors text-sm mt-2">
              {loading ? 'Creating Account...' : 'Create account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
