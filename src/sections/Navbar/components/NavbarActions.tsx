import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const NavbarActions = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => {
        if (data.user) {
          setIsLoggedIn(true);
          setUserEmail(data.user.email || '');
        }
      })
      .catch(() => {});
  }, []);

  const initial = userEmail ? userEmail[0].toUpperCase() : 'U';

  if (isLoggedIn) {
    return (
      <div className="items-center caret-transparent gap-x-3 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-3 no-underline w-max">
        {/* Dashboard button */}
        <Link
          to="/dashboard"
          className="content-center items-center bg-[#ff6a00] shadow-[rgba(255,106,0,0.3)_0px_2px_8px_0px] box-border caret-transparent text-black gap-x-2 flex justify-center outline-[3px] relative gap-y-2 no-underline text-nowrap overflow-hidden px-4 py-2 rounded-xl font-semibold text-sm hover:bg-[#ff7b1a] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Dashboard
        </Link>

        {/* User avatar initial */}
        <button
          onClick={() => navigate('/settings')}
          className="w-9 h-9 bg-[#1a1a1a] border border-[#333] hover:border-[#ff6a00]/50 rounded-full flex items-center justify-center text-white font-bold text-sm transition-colors"
          title="Account Settings"
        >
          {initial}
        </button>
      </div>
    );
  }

  return (
    <div className="items-center caret-transparent gap-x-3 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-3 no-underline w-max">
      <div className="caret-transparent hidden min-h-0 min-w-0 outline-[3px] no-underline md:block md:min-h-[auto] md:min-w-[auto]">
        <Link
          to="/register"
          className="content-center items-center bg-amber-500 shadow-[rgba(113,50,245,0.2)_0px_2px_5px_0px,rgba(255,255,255,0.08)_0px_2px_3px_0px_inset] box-border caret-transparent text-zinc-50 gap-x-2 grid justify-center outline-[3px] relative gap-y-2 no-underline text-nowrap overflow-hidden px-3 py-2 rounded-xl"
        >
          <div className="bg-[linear-gradient(rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_100%)] caret-transparent h-full outline-[3px] pointer-events-none absolute no-underline text-nowrap w-full left-0 top-0"></div>
          <p className="caret-transparent text-sm font-medium leading-5 min-h-0 min-w-0 outline-[3px] relative no-underline text-nowrap z-[1] md:min-h-[auto] md:min-w-[auto]">
            Get started
          </p>
        </Link>
      </div>
      <Link
        to="/login"
        className="items-center bg-neutral-950 box-border caret-transparent text-zinc-50 gap-x-2 flex min-h-[auto] min-w-[auto] outline-[3px] relative gap-y-2 no-underline text-nowrap overflow-hidden px-3 py-2 rounded-xl after:accent-auto after:bg-[linear-gradient(rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.1)_100%)] after:caret-transparent after:text-zinc-50 after:block after:text-base after:not-italic after:normal-nums after:font-normal after:h-full after:tracking-[normal] after:leading-4 after:list-outside after:list-disc after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:text-nowrap after:visible after:w-full after:border-separate after:left-0 after:top-0 after:font-inter"
      >
        <p className="caret-transparent text-sm font-medium leading-5 min-h-[auto] min-w-[auto] outline-[3px] relative no-underline text-nowrap z-[1]">
          Log in
        </p>
      </Link>
      <div className="caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] no-underline md:hidden md:min-h-0 md:min-w-0">
        <Link
          to="/login"
          className="items-center bg-neutral-950 box-border caret-transparent text-zinc-50 gap-x-2 flex justify-center outline-[3px] relative gap-y-2 no-underline text-nowrap overflow-hidden p-2 rounded-xl after:accent-auto after:bg-[linear-gradient(rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.1)_100%)] after:caret-transparent after:text-zinc-50 after:block after:text-base after:not-italic after:normal-nums after:font-normal after:h-full after:tracking-[normal] after:leading-4 after:list-outside after:list-disc after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:text-nowrap after:visible after:w-full after:border-separate after:left-0 after:top-0 after:font-inter"
        >
          <div className="items-center caret-transparent flex h-5 justify-center min-h-[auto] min-w-[auto] outline-[3px] relative no-underline text-nowrap w-5 z-[1] md:min-h-0 md:min-w-0">
            <img
              src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-3.svg"
              alt="Icon"
              className="caret-transparent h-full outline-[3px] no-underline text-nowrap align-baseline w-full"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};
