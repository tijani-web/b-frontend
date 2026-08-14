import { useState } from 'react';

const LANGUAGES = [
  { code: 'en', label: 'English', icon: 'https://c.animaapp.com/ms9b4yl7eEtjhI/assets/en.svg' },
  { code: 'es', label: 'Español', icon: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg' },
  { code: 'zh', label: '中文', icon: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg' },
];

export const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(LANGUAGES[0]);
  return (
    <div className="caret-transparent outline-[3px] no-underline">
      <div className="caret-transparent hidden outline-[3px] no-underline"></div>
      <div className="caret-transparent outline-[3px] fixed no-underline z-[999999] left-5 bottom-5">
        <div className="bg-white shadow-[rgba(0,0,0,0.15)_0px_5px_15px_0px] caret-transparent text-neutral-600 inline-block text-xl leading-5 outline-[3px] no-underline overflow-hidden rounded-lg font-arial">
          
          {isOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-40 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-100">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { setSelected(lang); setIsOpen(false); }}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3 transition-colors text-sm font-bold text-gray-800"
                >
                  <img src={lang.icon} alt={lang.code} className="w-5 h-3 object-cover rounded-sm" />
                  {lang.label}
                </button>
              ))}
            </div>
          )}

          <div className="bg-white caret-transparent outline-[3px] relative text-left no-underline uppercase z-[888] overflow-hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="caret-transparent text-zinc-800 font-bold outline-[3px] no-underline px-[15px] py-2.5 flex items-center hover:bg-gray-50 transition-colors w-full cursor-pointer"
            >
              <img
                src={selected.icon}
                alt={selected.code}
                className="caret-transparent inline-block outline-[3px] no-underline w-[33px] h-5 object-cover mr-[5px] rounded-[3px]"
              />
              <span className="caret-transparent outline-[3px] relative no-underline">
                {selected.code}
              </span>
              <svg 
                className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
