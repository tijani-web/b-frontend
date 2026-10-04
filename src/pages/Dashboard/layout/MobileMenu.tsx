import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  userInitial: string;
}

export const MobileMenu = ({ isOpen, onClose, userInitial }: MobileMenuProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  if (!isOpen) return null;

  const menuItems = [
    { name: 'Dashboard', icon: <svg className="w-5 h-5 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>, path: '/dashboard' },
    { name: 'Deposit', icon: <svg className="w-5 h-5 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>, path: '/deposit' },
    { name: 'Withdraw', icon: <svg className="w-5 h-5 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>, path: '/withdraw' },
    { name: 'Cold Storage', icon: <svg className="w-5 h-5 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>, path: '/cold-storage' },
    { name: 'Cards', icon: <svg className="w-5 h-5 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>, path: '/cards' },
    { name: 'Assets', icon: <svg className="w-5 h-5 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>, path: '/assets' },
    { name: 'Copy Trading', icon: <svg className="w-5 h-5 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>, path: '/dashboard/copy-trading' },
    { name: 'Markets', icon: <svg className="w-5 h-5 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/></svg>, path: '/markets' },
    { name: 'Mining', icon: <svg className="w-5 h-5 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>, path: '/mining' },
    { name: 'Trade', icon: <svg className="w-5 h-5 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/></svg>, path: '/trade' },
    { name: 'Real Estate', icon: <svg className="w-5 h-5 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>, path: '/real-estate' },
    { name: 'Subscribe', icon: <svg className="w-5 h-5 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>, path: '/subscribe' },
  ];

  const ITEMS_PER_PAGE = 9;
  const totalPages = Math.ceil(menuItems.length / ITEMS_PER_PAGE);
  const displayedItems = menuItems.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);

  return (
    <div className="fixed inset-0 z-50 bg-[#1e1e24] flex flex-col font-inter animate-in slide-in-from-left duration-200">
      {/* Header Profile Area */}
      <div className="flex items-center justify-between p-4 border-b border-[#2a2a32]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-[#ff6a00] flex items-center justify-center text-lg font-bold text-black border-2 border-black">
            {userInitial}
          </div>
          <div>
            <div className="text-white font-bold text-sm">Sta H</div>
            <div className="text-gray-400 text-xs">Starter account</div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-gray-400">
          <button className="hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          </button>
          <button onClick={() => { onClose(); navigate('/settings'); }} className="hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </button>
          <button onClick={onClose} className="hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>

      {/* Grid of Options */}
      <div className="flex-1 overflow-hidden p-4">
        <div className="grid grid-cols-3 gap-3 transition-transform duration-300">
          {displayedItems.map((item, index) => (
            <button 
              key={index} 
              onClick={() => {
                onClose();
                navigate(item.path);
              }}
              className="bg-[#2a2a32] rounded-lg p-4 flex flex-col items-center justify-center gap-1 hover:bg-[#34343d] transition-colors h-24"
            >
              {item.icon}
              <span className="text-gray-300 text-xs text-center font-medium leading-tight">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-4 pb-8 pt-4">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx)}
            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors`}
            aria-label={`Go to page ${idx + 1}`}
          >
            <div className={`w-2.5 h-2.5 rounded-full ${currentPage === idx ? 'bg-white' : 'bg-gray-600'}`} />
          </button>
        ))}
      </div>
    </div>
  );
};
