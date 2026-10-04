import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<{fullName?: string, kycStatus?: string, email?: string} | null>(null);

  const [earnOpen, setEarnOpen] = useState(true);
  const [tradeOpen, setTradeOpen] = useState(true);
  const [moreOpen, setMoreOpen] = useState(true);
  const [comingSoonDrawer, setComingSoonDrawer] = useState<string | null>(null);
  const [referralDrawer, setReferralDrawer] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json())
        .then(d => {
          if (d.user) setUser(d.user);
          if (d.user?.role === 'ADMIN') setIsAdmin(true);
        })
        .catch(() => {});
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getInitials = (name?: string, email?: string) => {
    if (name) return name.substring(0, 2).toUpperCase();
    if (email) return email.substring(0, 2).toUpperCase();
    return 'U';
  };

  const NavLink = ({ to, icon, label, indent = false, badge }: { to: string; icon: JSX.Element; label: string; indent?: boolean; badge?: string }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
          isActive ? 'bg-[#1c1c1c] text-white' : 'text-gray-400 hover:text-white hover:bg-[#1c1c1c]/50'
        } ${indent ? 'pl-9' : ''}`}
      >
        <span className={isActive ? 'text-white' : 'text-gray-500'}>{icon}</span>
        <span className="flex-1">{label}</span>
        {badge && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#ff6a00]/20 text-[#ff6a00]">{badge}</span>}
      </Link>
    );
  };

  const SectionHeader = ({ label, open, onToggle }: { label: string; open: boolean; onToggle: () => void }) => (
    <div className="mt-4 mb-1 px-3 flex justify-between items-center text-xs font-semibold text-gray-500 cursor-pointer hover:text-gray-300" onClick={onToggle}>
      <span>{label}</span>
      <svg className={`w-3 h-3 transition-transform ${open ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
    </div>
  );

  const DrawerLink = ({ icon, label }: { icon: JSX.Element; label: string }) => (
    <button
      onClick={() => setComingSoonDrawer(label)}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-gray-400 hover:text-white hover:bg-[#1c1c1c]/50 pl-9"
    >
      <span className="text-gray-500">{icon}</span>
      <span className="flex-1 text-left">{label}</span>
    </button>
  );

  return (
    <aside className="w-[260px] bg-[#0A0A0A] flex-col h-screen fixed left-0 top-0 text-gray-400 font-inter border-r border-[#1a1a1a] hidden md:flex">
      <div className="p-6 pb-2">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 12C17.433 12 19 10.433 19 8.5C19 6.567 17.433 5 15.5 5H6V19H15.5C17.433 19 19 17.433 19 15.5C19 13.567 17.433 12 15.5 12ZM10 8.5H14C14 8.5 14 11 11.5 11H10V8.5ZM10 15.5V13H11.5C14 13 14 15.5 14 15.5H10Z" fill="#000"/>
              <path d="M19 8.5C19 7.03 18.09 5.77 16.8 5.24C16.42 5.08 15.98 5 15.5 5H6V19H15.5C17.433 19 19 17.433 19 15.5C19 14.12 18.2 12.92 17 12.35C18.2 11.78 19 10.58 19 9.2V8.5Z" fill="#ff6a00" opacity="0.8"/>
            </svg>
          </div>
          <div>
            <span className="text-white font-bold text-sm tracking-wide">Blofin</span><span className="text-[#ff6a00] font-bold text-sm tracking-wide">Prime</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 space-y-1 mt-6 hide-scrollbar pb-6 custom-scrollbar">
        <NavLink to="/dashboard" label="Dashboard" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>} />
        <NavLink to="/deposit" label="Deposit" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>} />
        <NavLink to="/withdraw" label="Withdraw" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
        <NavLink to="/assets" label="Assets" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>} />
        <NavLink to="/markets" label="Markets" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} />

        {/* Services section */}
        <SectionHeader label="Services" open={moreOpen} onToggle={() => setMoreOpen(!moreOpen)} />
        {moreOpen && (
          <div className="space-y-0.5">
            <NavLink indent to="/cold-storage" label="Cold Storage" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>} />
            <DrawerLink label="Cards" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>} />
            <NavLink indent to="/subscribe" label="Subscribe" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>} />
            <NavLink indent to="/signals" label="Signals" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>} />
            <DrawerLink label="Connect Wallet" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>} />
          </div>
        )}

        {/* Earn section */}
        <SectionHeader label="Earn" open={earnOpen} onToggle={() => setEarnOpen(!earnOpen)} />
        {earnOpen && (
          <div className="space-y-0.5">
            <NavLink indent to="/dashboard/copy-trading" label="Copy Trading" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>} />
            <NavLink indent to="/mining" label="Mining" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>} />
            <NavLink indent to="/real-estate" label="Real Estate" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>} />
            <NavLink indent to="/stake" label="Stake" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
            <button onClick={() => setReferralDrawer(true)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-gray-400 hover:text-white hover:bg-[#1c1c1c]/50 pl-9">
              <span className="text-gray-500"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg></span>
              <span className="flex-1 text-left">Referrals</span>
            </button>
          </div>
        )}

        {/* Trade section */}
        <SectionHeader label="Trade" open={tradeOpen} onToggle={() => setTradeOpen(!tradeOpen)} />
        {tradeOpen && (
          <div className="space-y-0.5">
            <NavLink indent to="/trade" label="Trade" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>} />
          </div>
        )}

        <div className="h-4" /> {/* Spacer */}
        <NavLink to="/settings" label="Settings" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} />

        {isAdmin && (
          <div className="pt-4 pb-2 px-3">
            <p className="text-xs font-semibold text-[#ff6a00] uppercase tracking-wider">Admin</p>
            <Link
              to="/admin"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-[#ff6a00] hover:bg-[#1c1c1c] mt-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Admin Panel
            </Link>
          </div>
        )}
      </nav>

      <div className="p-4 mt-auto border-t border-[#1a1a1a]">
        <div className="flex items-center justify-between p-3 bg-[#111] rounded-xl hover:bg-[#1a1a1a] transition-colors cursor-pointer" onClick={() => navigate('/settings')}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#1f1f1f] flex items-center justify-center text-sm font-semibold text-[#ff6a00]">
              {getInitials(user?.fullName, user?.email)}
            </div>
            <div>
              <p className="text-white text-sm font-medium truncate w-[110px]">{user?.fullName || user?.email?.split('@')[0] || 'User'}</p>
              <div className="text-green-500 text-[10px] flex items-center gap-1">
                {user?.kycStatus === 'VERIFIED' ? 'Verified' : 'Verify your account'}
                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); handleLogout(); }}
            className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"
            title="Log out"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>

      {/* Coming Soon Drawer */}
      {comingSoonDrawer && (
        <>
          <div className="fixed inset-0 bg-black/60 z-[60]" onClick={() => setComingSoonDrawer(null)} />
          <div className="fixed top-0 right-0 h-full w-[400px] bg-[#1c1c1c] z-[70] shadow-2xl flex flex-col transform transition-transform duration-300">
            <div className="flex items-center justify-between p-6 border-b border-[#2a2a2a]">
              <div className="flex items-center gap-3">
                <button onClick={() => setComingSoonDrawer(null)} className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h2 className="text-xl font-bold text-white">{comingSoonDrawer}</h2>
              </div>
              <button onClick={() => setComingSoonDrawer(null)} className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <p className="text-gray-400 text-sm font-medium text-center">Not available at the moment. Coming soon</p>
            </div>

            <div className="p-6 flex justify-end">
              <button className="w-12 h-12 bg-[#ff6a00] hover:bg-[#ff7b1a] rounded-full flex items-center justify-center transition-colors">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Referral Drawer */}
      {referralDrawer && (
        <>
          <div className="fixed inset-0 bg-black/60 z-[60]" onClick={() => setReferralDrawer(false)} />
          <div className="fixed top-0 right-0 h-full w-[400px] bg-[#1c1c1c] z-[70] shadow-2xl flex flex-col transform transition-transform duration-300">
            <div className="flex items-center justify-between p-6 border-b border-[#2a2a2a]">
              <div className="flex items-center gap-3">
                <button onClick={() => setReferralDrawer(false)} className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>
                <h2 className="text-xl font-bold text-white">Referral program</h2>
              </div>
              <button onClick={() => setReferralDrawer(false)} className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto">
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Invite your friends to join our platform by using your referral code on sign up! You'll earn $1,000.00 anytime your friends make a deposit on our platform. It's a win-win for everyone!
              </p>
              
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-300 mb-2 block">Your referral balance:</label>
                <div className="flex gap-2">
                  <input type="text" readOnly value="$0.00" className="flex-1 bg-[#141414] border border-[#2a2a2a] rounded-lg px-4 py-2 text-white outline-none" />
                  <button className="bg-gray-400 hover:bg-gray-300 text-gray-900 font-bold px-4 py-2 rounded-lg transition-colors">CLAIM</button>
                </div>
              </div>
              
              <div className="mb-8">
                <label className="text-sm font-medium text-gray-300 mb-2 block">Your referral code:</label>
                <div className="flex gap-2">
                  <input type="text" readOnly value="ZmthdEJXa05SU9JcXN6MUdOWWtwMj" className="flex-1 bg-[#141414] border border-[#2a2a2a] rounded-lg px-4 py-2 text-white outline-none text-sm font-mono truncate" />
                  <button className="bg-[#ff6a00] hover:bg-[#ff7b1a] text-white font-bold px-4 py-2 rounded-lg transition-colors">COPY</button>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-300 mb-4">Statistics</h3>
                <div className="flex gap-12">
                  <div>
                    <div className="text-gray-500 text-sm mb-1">Friends invited</div>
                    <div className="text-xl font-bold text-white">0</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-sm mb-1">Rewards claimed</div>
                    <div className="text-xl font-bold text-white">$0.00</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-300 mb-4">Referrals</h3>
                <div className="relative mb-6">
                  <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  <input type="text" placeholder="Search for a referral" className="w-full bg-[#141414] border border-[#2a2a2a] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white outline-none placeholder-gray-600 focus:border-[#444]" />
                </div>

                <div className="flex flex-col items-center justify-center py-12">
                  <svg className="w-12 h-12 text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 4v16m8-8H4" /></svg>
                  <p className="text-gray-400 text-sm">No referrals yet.</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </aside>
  );
};

