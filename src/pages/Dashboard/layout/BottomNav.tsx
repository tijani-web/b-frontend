import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  {
    to: '/dashboard',
    label: 'Wallet',
    icon: (active: boolean) => (
      <svg className={`w-6 h-6 ${active ? 'text-white' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    to: '/markets',
    label: 'Explore',
    icon: (active: boolean) => (
      <svg className={`w-6 h-6 ${active ? 'text-white' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
  {
    to: '/dashboard/copy-trading',
    label: 'Trade',
    center: true,
    icon: (_active: boolean) => (
      <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    to: '/earn',
    label: 'DeFi',
    icon: (active: boolean) => (
      <svg className={`w-6 h-6 ${active ? 'text-white' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
  {
    to: '/mining',
    label: 'Boost',
    icon: (active: boolean) => (
      <svg className={`w-6 h-6 ${active ? 'text-white' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#111] border-t border-[#222] flex items-end md:hidden pb-safe">
      {navItems.map((item) => {
        const isActive = location.pathname === item.to;

        if (item.center) {
          return (
            <button
              key={item.to}
              onClick={() => navigate(item.to)}
              className="flex-1 flex flex-col items-center py-3"
            >
              <div className="w-12 h-12 bg-[#ff6a00] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,106,0,0.5)] -mt-5">
                {item.icon(isActive)}
              </div>
              <span className="text-[10px] text-gray-500 mt-1">{item.label}</span>
            </button>
          );
        }

        return (
          <button
            key={item.to}
            onClick={() => navigate(item.to)}
            className="flex-1 flex flex-col items-center py-3 gap-1"
          >
            {item.icon(isActive)}
            <span className={`text-[10px] font-medium ${isActive ? 'text-white' : 'text-gray-500'}`}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
