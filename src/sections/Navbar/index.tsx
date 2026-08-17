import { useState } from "react";
import { Link } from "react-router-dom";
import { NavbarLogo } from "@/sections/Navbar/components/NavbarLogo";
import { DesktopNav, NAV_ITEMS } from "@/sections/Navbar/components/DesktopNav";
import { NavbarActions } from "@/sections/Navbar/components/NavbarActions";
import { MobileMenuButton } from "@/sections/Navbar/components/MobileMenuButton";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  return (
    <div className="relative items-center box-border caret-transparent flex justify-between max-w-[1440px] outline-[3px] no-underline mx-auto px-7 py-6 md:px-20">
      <NavbarLogo />
      <DesktopNav />
      <div className="flex items-center gap-3">
        <MobileMenuButton onClick={() => setMobileOpen(!mobileOpen)} isOpen={mobileOpen} />
        <NavbarActions />
      </div>

      {/* Mobile dropdown menu (appears below navbar on small screens) */}
      <div className={`md:hidden absolute left-0 right-0 top-full mt-2 z-[1000] transition-all duration-200 ${mobileOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <div className="mx-4 bg-[#0f1113] border border-[#222] rounded-2xl p-4 shadow-lg transform-gpu">
            <div className="flex items-center justify-between mb-4">
              <NavbarLogo />
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="text-gray-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav>
              <div className="flex flex-col gap-4">
                {NAV_ITEMS.map((group) => {
                  const isOpen = !!openGroups[group.label];
                  return (
                    <div
                      key={group.label}
                      className="border-b border-[#202225] pb-3"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenGroups(prev => ({ ...prev, [group.label]: !prev[group.label] }))}
                        onFocus={() => setOpenGroups(prev => ({ ...prev, [group.label]: true }))}
                        className="w-full flex items-center justify-between text-white text-sm py-2"
                      >
                        <span className="font-medium">{group.label}</span>
                        <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      <div className={`mt-2 pl-2 flex flex-col gap-2 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-80 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-1'}`}>
                        {group.subItems.map((sub) => (
                          <Link key={sub.label} to={sub.link} onClick={() => setMobileOpen(false)} className="text-gray-200 text-sm pl-2 transition-colors hover:text-[#ff6a00]">
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}

                <div className="mt-4 flex flex-col">
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-white mb-2">Log in</Link>
                  <Link to="/register" onClick={() => setMobileOpen(false)} className="inline-block bg-[#ff6a00] text-black px-4 py-2 rounded-xl">Get started</Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
    </div>
  );
};
