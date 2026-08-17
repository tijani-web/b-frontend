import { useState } from 'react';
import { Link } from 'react-router-dom';

const NAV_ITEMS = [
  {
    label: 'Explore',
    subItems: [
      { label: 'Markets', link: '/markets' },
      { label: 'Crypto', link: '/crypto' },
      { label: 'Stocks', link: '/stocks' },
    ]
  },
  {
    label: 'Company',
    subItems: [
      { label: 'About Us', link: '/about' },
      { label: 'Contact', link: '/contact' },
      { label: 'Help Center', link: '/help-center' },
    ]
  },
  {
    label: 'Trade',
    subItems: [
      { label: 'Spot Trading', link: '/trade' },
      { label: 'Copy Trading', link: '/dashboard/copy-trading' },
      { label: 'Staking', link: '/staking' },
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {openDropdown === item.label && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-[#121519] border border-[#242a31] rounded-xl shadow-2xl py-2 overflow-hidden z-[999]">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.label}
                      to={subItem.link}
                      className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-[#1a1d24] transition-colors"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
