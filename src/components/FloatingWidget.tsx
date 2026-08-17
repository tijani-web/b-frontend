import { useState } from 'react';

export const FloatingWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'conversation'>('home');

  return (
    <div className="fixed bottom-6 right-6 z-[2147483647] font-inter">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[350px] h-[500px] bg-[#f9f9f9] rounded-2xl shadow-2xl border border-gray-100 flex flex-col mb-2 origin-bottom-right transition-all overflow-hidden">
          
          {activeTab === 'home' ? (
            /* ── HOME TAB ── */
            <div className="flex flex-col h-full bg-[#f4f5f7]">
              {/* Orange Header block */}
              <div className="bg-[#ff8c00] pt-12 pb-20 px-6 text-white relative flex-shrink-0">
                <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 opacity-80 hover:opacity-100">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <h2 className="text-3xl font-bold mb-2">Hi there!</h2>
                <p className="text-[15px] font-medium">We typically reply within a few minutes</p>
              </div>

              {/* Chat action card */}
              <div className="px-5 -mt-10 flex-1 relative z-10">
                <button 
                  onClick={() => setActiveTab('conversation')}
                  className="w-full bg-white rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex items-center gap-4 text-left transition-transform hover:scale-[1.02]"
                >
                  <div className="w-12 h-12 rounded-full bg-[#e8f3ef] text-[#4f8a73] flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-[#333] text-base font-semibold">Chat with us now</h4>
                    <p className="text-gray-500 text-[13px] mt-0.5">Will reply in few minutes</p>
                  </div>
                </button>
              </div>

              {/* Bottom Nav */}
              <div className="bg-white rounded-b-2xl border-t border-gray-200">
                <div className="flex px-2 pt-2">
                  <button 
                    onClick={() => setActiveTab('home')}
                    className={`flex-1 flex flex-col items-center py-2 border-b-[3px] transition-colors ${activeTab === 'home' ? 'border-[#ff8c00] text-[#ff8c00]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  >
                    <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                    </svg>
                    <span className="text-[13px] font-medium">Home</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('conversation')}
                    className={`flex-1 flex flex-col items-center py-2 border-b-[3px] transition-colors ${activeTab === 'conversation' ? 'border-[#ff8c00] text-[#ff8c00]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                  >
                    <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                    </svg>
                    <span className="text-[13px] font-medium">Conversation</span>
                  </button>
                </div>
                {/* Zoho branding */}
                <div className="text-center py-2.5 text-[11px] text-gray-500 flex items-center justify-center gap-1.5 bg-white rounded-b-2xl border-t border-gray-100">
                  <div className="w-4 h-4 rounded-full border border-red-500 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  </div>
                  Driven by Zoho SalesIQ
                </div>
              </div>
            </div>
          ) : (
            /* ── CONVERSATION TAB ── */
            <div className="flex flex-col h-full bg-white">
              {/* Header */}
              <div className="bg-[#ff8c00] px-4 py-3 text-white flex items-center gap-3">
                <button onClick={() => setActiveTab('home')} className="hover:opacity-80">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 overflow-hidden">
                  <svg className="w-6 h-6 mt-1.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <span className="font-semibold text-[15px]">Chat with us now</span>
                <button onClick={() => setIsOpen(false)} className="ml-auto opacity-80 hover:opacity-100">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Chat Body */}
              <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center p-6 bg-white relative">
                {/* Generic illustration simulating Zoho's graphic */}
                <div className="mb-4 relative">
                  <div className="w-48 h-36 bg-gray-50 flex items-center justify-center text-gray-200 rounded-lg border border-gray-100">
                    <svg className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="absolute top-2 left-6 w-8 h-8 bg-[#ff8c00] rounded-full" />
                  <div className="absolute top-8 left-10 w-24 h-16 bg-purple-500 rounded-lg opacity-80" />
                </div>
                <p className="text-[#888] font-medium text-[15px]">We're online!</p>
              </div>

              {/* Input Area */}
              <div className="border-t border-[#ff8c00] p-2 flex items-center bg-white relative">
                <input 
                  type="text" 
                  placeholder="We are here to help you" 
                  className="flex-1 py-3 px-3 outline-none text-[15px] placeholder-gray-400"
                  disabled
                />
                <button className="w-10 h-10 bg-[#e57d00] rounded-full flex items-center justify-center text-white flex-shrink-0 transition-transform hover:scale-105">
                  <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>

              {/* Zoho branding */}
              <div className="text-center py-2.5 text-[11px] text-gray-500 flex items-center justify-center gap-1.5 bg-gray-50 border-t border-gray-100">
                <div className="w-4 h-4 rounded-full border border-red-500 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                </div>
                Driven by Zoho SalesIQ
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating Chat Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-[60px] h-[60px] bg-[#ff8c00] hover:bg-[#e57d00] text-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(255,140,0,0.4)] transition-all hover:scale-105 active:scale-95"
        aria-label="Live chat"
      >
        {isOpen ? (
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-8 h-8 mt-0.5 mr-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
          </svg>
        )}
      </button>
    </div>
  );
};
