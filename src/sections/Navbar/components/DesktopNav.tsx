import { useState } from 'react';
import { Link } from 'react-router-dom';

const NAV_ITEMS = [
  {
    label: 'Explore',
    subItems: [
      { 
        label: 'Markets', 
        description: 'View live prices and charts',
        link: '/markets',
        icon: (
          <svg className="w-5 h-5 text-[#ff6a00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        )
      },
      { 
        label: 'Crypto', 
        description: 'Trade top cryptocurrencies',
        link: '/crypto',
        icon: (
          <svg className="w-5 h-5 text-[#ff6a00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      { 
        label: 'Stocks & ETFs', 
        description: 'Invest and trade shares',
        link: '/stocks',
        icon: (
          <svg className="w-5 h-5 text-[#ff6a00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        )
      },
    ]
  },
  {
    label: 'Company',
    subItems: [
      { 
        label: 'About us', 
        description: 'About Blofin Prime',
        link: '/about',
        icon: (
          <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      { 
        label: 'Contact', 
        description: 'Send us a message',
        link: '/contact',
        icon: (
          <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )
      },
      { 
        label: 'Help center', 
        description: 'Frequently asked questions',
        link: '/help-center',
        icon: (
          <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
    ]
  },
  {
    label: 'Trade',
    subItems: [
      { 
        label: 'Spot Trading', 
        description: 'Trade crypto instantly',
        link: '/crypto',
        icon: (
          <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      },
      { 
        label: 'Copy Trading', 
        description: 'Copy expert trades on autopilot',
        link: '/copy-trading',
        icon: (
          <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )
      },
      { 
        label: 'Staking', 
        description: 'Earn passive yield on crypto',
        link: '/staking',
        icon: (
          <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
    ]
  }
];

export const DesktopNav = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className="hidden max-w-[500px] w-full mx-auto md:block z-[999]">
      <nav className="w-full mx-auto p-1">
        <ul className="flex items-center justify-center gap-x-6 list-none pl-0 m-0">
          {NAV_ITEMS.map((item) => (
            <li 
              key={item.label} 
              className="relative"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                className={`flex items-center gap-x-1 text-sm font-medium px-3 py-2 rounded-xl font-inter transition-colors ${
                  openDropdown === item.label ? 'text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
                <svg 
                  className={`w-4 h-4 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {openDropdown === item.label && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[340px] bg-[#1a1d24] border border-[#2d333b] rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden z-[999] transition-all duration-200">
                  <div className="px-5 pt-4 pb-2">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{item.label}</span>
                  </div>
                  <div className="p-2">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.label}
                        to={subItem.link}
                        className="flex items-start gap-4 p-3 rounded-xl hover:bg-[#252b36] transition-colors group"
                        onClick={() => setOpenDropdown(null)}
                      >
                        <div className="flex-shrink-0 mt-0.5 w-10 h-10 rounded-lg bg-[#252b36] group-hover:bg-[#1a1d24] flex items-center justify-center border border-[#2d333b]">
                          {subItem.icon}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-gray-100 group-hover:text-white mb-0.5">
                            {subItem.label}
                          </span>
                          <span className="text-[13px] text-gray-400 leading-snug">
                            {subItem.description}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
