import { useState, useMemo, useEffect } from 'react';

const ALL_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'zh-CN', label: '中文' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'it', label: 'Italiano' },
  { code: 'pt', label: 'Português' },
  { code: 'ru', label: 'Русский' },
  { code: 'ar', label: 'العربية' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'nl', label: 'Nederlands' },
];

export const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  
  // Try to get language from cookie or default to en
  const getInitialLang = () => {
    const match = document.cookie.match(/googtrans=\/en\/([a-zA-Z-]+)/);
    const code = match ? match[1] : 'en';
    return ALL_LANGUAGES.find(l => l.code === code) || ALL_LANGUAGES[0];
  };

  const [selected, setSelected] = useState(getInitialLang());

  const filteredLanguages = useMemo(() => {
    return ALL_LANGUAGES.filter(lang => 
      lang.label.toLowerCase().includes(search.toLowerCase()) || 
      lang.code.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleLanguageChange = (lang: typeof ALL_LANGUAGES[0]) => {
    setSelected(lang);
    setIsOpen(false);
    
    // Set google translate cookies (from English to Target)
    document.cookie = `googtrans=/en/${lang.code}; path=/`;
    document.cookie = `googtrans=/en/${lang.code}; domain=${window.location.hostname}; path=/`;
    
    // Reload page to apply translation
    window.location.reload();
  };

  return (
    <div className="fixed z-[999999] left-6 bottom-6 font-inter">
      <div className="relative">
        {isOpen && (
          <div className="absolute bottom-full left-0 mb-3 w-64 bg-[#141414] rounded-xl shadow-2xl border border-white/10 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="p-3 border-b border-white/10">
              <input 
                type="text" 
                placeholder="Search languages..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#1a1a1a] text-white text-sm px-3 py-2 rounded-lg outline-none border border-white/5 focus:border-[#ff6a00] transition-colors"
                autoFocus
              />
            </div>
            <div className="max-h-64 overflow-y-auto custom-scrollbar">
              {filteredLanguages.length > 0 ? filteredLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang)}
                  className={`w-full text-left px-4 py-2.5 hover:bg-white/5 flex items-center justify-between transition-colors text-sm font-medium ${selected.code === lang.code ? 'text-[#ff6a00] bg-white/5' : 'text-gray-300'}`}
                >
                  <span>{lang.label}</span>
                  <span className="text-gray-600 text-xs uppercase">{lang.code}</span>
                </button>
              )) : (
                <div className="px-4 py-3 text-sm text-gray-500 text-center">No languages found</div>
              )}
            </div>
          </div>
        )}

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-[#141414]/80 hover:bg-[#1a1a1a] backdrop-blur-md border border-white/10 text-white font-medium px-4 py-2.5 rounded-full shadow-lg transition-all"
        >
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
          <span className="text-sm tracking-wide">{selected.label}</span>
          <svg 
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
};
