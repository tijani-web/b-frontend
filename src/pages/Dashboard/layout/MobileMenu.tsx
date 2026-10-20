import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  userInitial: string;
}

export const MobileMenu = ({ isOpen, onClose, userInitial }: MobileMenuProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [userEmail, setUserEmail] = useState<string>('');
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
        .then(r => r.json())
        .then(d => {
          if (d.user?.email) setUserEmail(d.user.email);
        })
        .catch(() => {});
    }
  }, []);

  if (!isOpen) return null;

  const menuItems = [
    // Page 1 - Core Trading & Financial Activities
    { name: 'Dashboard', icon: <svg className="w-5 h-5 mb-2 text-[#ff6a00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>, path: '/dashboard' },
    { name: 'Deposit', icon: <svg className="w-5 h-5 mb-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>, path: '/deposit' },
    { name: 'Withdraw', icon: <svg className="w-5 h-5 mb-2 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>, path: '/withdraw' },
    { name: 'Trade', icon: <svg className="w-5 h-5 mb-2 text-[#ff6a00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/></svg>, path: '/trade' },
    { name: 'Markets', icon: <svg className="w-5 h-5 mb-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/></svg>, path: '/markets' },
    { name: 'Copy Trading', icon: <svg className="w-5 h-5 mb-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>, path: '/dashboard/copy-trading' },
    { name: 'Signals', icon: <svg className="w-5 h-5 mb-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>, path: '/signals' },
    { name: 'Mining', icon: <svg className="w-5 h-5 mb-2 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>, path: '/mining' },
    { name: 'History', icon: <svg className="w-5 h-5 mb-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>, path: '/transactions' },

    // Page 2 - Wealth, Products & Account
    { name: 'Stake', icon: <svg className="w-5 h-5 mb-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>, path: '/stake' },
    { name: 'Real Estate', icon: <svg className="w-5 h-5 mb-2 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>, path: '/real-estate' },
    { name: 'Subscribe', icon: <svg className="w-5 h-5 mb-2 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>, path: '/subscribe' },
    { name: 'Cold Storage', icon: <svg className="w-5 h-5 mb-2 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>, path: '/cold-storage' },
    { name: 'Assets', icon: <svg className="w-5 h-5 mb-2 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>, path: '/assets' },
    { name: 'Referrals', icon: <svg className="w-5 h-5 mb-2 text-[#ff6a00]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"/></svg>, path: '/referrals' },
    { name: 'KYC Verify', icon: <svg className="w-5 h-5 mb-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>, path: '/kyc' },
    { name: 'Settings', icon: <svg className="w-5 h-5 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/></svg>, path: '/settings' },
    { name: 'Support', icon: <svg className="w-5 h-5 mb-2 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg>, path: '/support' },
  ];

  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(menuItems.length / ITEMS_PER_PAGE);
  const displayedItems = menuItems.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Horizontal swipe threshold: 45px
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 45) {
      if (deltaX < 0) {
        // Swiped left -> next page
        if (currentPage < totalPages - 1) {
          setSlideDirection('left');
          setCurrentPage(p => p + 1);
        }
      } else {
        // Swiped right -> prev page
        if (currentPage > 0) {
          setSlideDirection('right');
          setCurrentPage(p => p - 1);
        }
      }
    } else if (deltaY > 80 && Math.abs(deltaY) > Math.abs(deltaX)) {
      // Swiped down -> close menu
      onClose();
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-[#141418] flex flex-col font-inter animate-in slide-in-from-left duration-200 select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top drag handle indicator for swipe-down to dismiss */}
      <div className="w-full flex justify-center pt-2 pb-1" onClick={onClose}>
        <div className="w-12 h-1 bg-neutral-700 rounded-full" />
      </div>

      {/* Header Profile Area */}
      <div className="flex items-center justify-between p-4 border-b border-[#23232b]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#ff6a00] flex items-center justify-center text-lg font-bold text-black border-2 border-black/40 shadow-sm">
            {userInitial}
          </div>
          <div className="max-w-[200px]">
            <div className="text-white font-bold text-sm truncate">{userEmail ? userEmail.split('@')[0] : 'My Account'}</div>
            <div className="text-gray-400 text-xs truncate">{userEmail || 'Standard Account'}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          <button onClick={() => { onClose(); navigate('/settings'); }} className="p-2 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </button>
          <button onClick={onClose} className="p-2 hover:text-white transition-colors" aria-label="Close menu">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>

      {/* Swipe instruction hint */}
      <div className="flex items-center justify-between px-4 pt-2 text-[11px] text-gray-500">
        <span>Swipe left/right to change pages</span>
        <span>Page {currentPage + 1} of {totalPages}</span>
      </div>

      {/* Grid of Options with touch swipe */}
      <div className="flex-1 overflow-hidden p-4 flex flex-col justify-center">
        <div 
          key={currentPage}
          className="grid grid-cols-3 gap-3 animate-in fade-in zoom-in-95 duration-150"
        >
          {displayedItems.map((item, index) => (
            <button 
              key={index} 
              onClick={() => {
                onClose();
                navigate(item.path);
              }}
              className="bg-[#202028] hover:bg-[#2b2b36] border border-[#2d2d38] rounded-xl p-3 flex flex-col items-center justify-center gap-1 active:scale-95 transition-all h-24 shadow-sm"
            >
              {item.icon}
              <span className="text-gray-200 text-xs text-center font-medium leading-tight">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Pagination dots & indicators */}
      <div className="flex flex-col items-center gap-2 pb-8 pt-2">
        <div className="flex justify-center gap-3">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className="p-2 flex items-center justify-center rounded-full transition-transform"
              aria-label={`Go to page ${idx + 1}`}
            >
              <div className={`transition-all duration-200 rounded-full ${currentPage === idx ? 'w-6 h-2 bg-[#ff6a00]' : 'w-2 h-2 bg-neutral-600'}`} />
            </button>
          ))}
        </div>
        <p className="text-[10px] text-neutral-500">Swipe down or tap close to exit</p>
      </div>
    </div>
  );
};
