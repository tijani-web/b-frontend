import { useEffect, useState } from 'react';

export const LoadingScreen = () => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.');
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] z-[9999] flex flex-col items-center justify-center">
      {/* Animated background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff6a00]/5 rounded-full blur-[120px] animate-pulse" />
      </div>

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative">
          {/* Outer ring animation */}
          <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-[0_0_40px_rgba(255,106,0,0.4)] animate-[bounce_2s_ease-in-out_infinite]">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 12C17.433 12 19 10.433 19 8.5C19 6.567 17.433 5 15.5 5H6V19H15.5C17.433 19 19 17.433 19 15.5C19 13.567 17.433 12 15.5 12ZM10 8.5H14C14 8.5 14 11 11.5 11H10V8.5ZM10 15.5V13H11.5C14 13 14 15.5 14 15.5H10Z" fill="#000"/>
              <path d="M19 8.5C19 7.03 18.09 5.77 16.8 5.24C16.42 5.08 15.98 5 15.5 5H6V19H15.5C17.433 19 19 17.433 19 15.5C19 14.12 18.2 12.92 17 12.35C18.2 11.78 19 10.58 19 9.2V8.5Z" fill="#ff6a00" opacity="0.8"/>
            </svg>
          </div>
        </div>

        {/* Brand name */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-white">Blofin</span>
            <span className="text-[#ff6a00]">Prime</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1 font-medium tracking-wider uppercase">Professional Trading Platform</p>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-0.5 bg-[#1a1a1a] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#ff6a00] to-[#ff9a00] rounded-full animate-[loading_1.5s_ease-in-out_infinite]" style={{width: '60%'}} />
        </div>

        <p className="text-gray-600 text-xs tracking-widest font-medium">LOADING{dots}</p>
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-200%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};
