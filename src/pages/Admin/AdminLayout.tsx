import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NAV = [
  { href: '/admin', label: 'Overview', icon: '📊' },
  { href: '/admin/deposits', label: 'Deposits', icon: '⬇️' },
  { href: '/admin/withdrawals', label: 'Withdrawals', icon: '⬆️' },
  { href: '/admin/kyc', label: 'KYC', icon: '🪪' },
  { href: '/admin/users', label: 'Users', icon: '👥' },
  { href: '/admin/wallet-settings', label: 'Wallet Settings', icon: '⚙️' },
];

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-black text-white font-inter flex flex-col md:flex-row">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-neutral-800 bg-[#0a0a0a] z-40 sticky top-0">
        <div>
          <span className="text-[#ff6a00] font-bold">BlofinPrime</span>
          <span className="text-gray-500 text-xs ml-2">Admin</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-black border-r border-neutral-800 flex flex-col transition-transform duration-300 ease-in-out
        md:relative md:w-56 md:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-5 border-b border-neutral-800 hidden md:block">
          <p className="text-[#ff6a00] font-bold text-lg">BlofinPrime</p>
          <p className="text-gray-500 text-xs mt-0.5">Admin Panel</p>
        </div>
        <div className="p-5 border-b border-neutral-800 md:hidden flex justify-between items-center">
           <p className="text-[#ff6a00] font-bold text-lg">BlofinPrime Admin</p>
           <button onClick={() => setMobileMenuOpen(false)}><svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${active ? 'bg-[#ff6a00]/10 text-[#ff6a00] font-medium' : 'text-gray-400 hover:text-white hover:bg-neutral-800'}`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-neutral-800">
          <button onClick={logout} className="w-full text-left text-sm text-gray-500 hover:text-red-400 px-3 py-2 transition-colors">
            ← Back to App
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto pb-32 md:pb-0">
        {children}
      </main>
    </div>
  );
};
