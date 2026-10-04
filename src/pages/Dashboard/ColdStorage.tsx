import { useState } from 'react';
import { Sidebar } from './layout/Sidebar';
import { Header } from './layout/Header';
import { BottomNav } from './layout/BottomNav';

const HOW_IT_WORKS = [
  {
    q: 'What is Cold Storage?',
    a: 'Cold storage is a secure way to store your cryptocurrency assets offline, providing enhanced security and protection against online threats.',
  },
  {
    q: 'How Cold Storage Works',
    a: '1. Deposit: Transfer assets from your trading account to cold storage.\n2. Secure Storage: Assets are stored offline for maximum security.\n3. Withdraw: Access your assets anytime by withdrawing back to your trading account.',
  },
  {
    q: 'Benefits of Cold Storage',
    a: 'Enhanced security through offline storage, protection from online threats, instant access when needed, and perfect for long-term asset holding.',
  },
  {
    q: 'Important Notes',
    a: 'Cold storage provides enhanced security but may have longer processing times. You can only deposit assets you have in your trading account. Withdrawals are processed instantly to your trading account.',
  },
];

export const ColdStorage = () => {
  const [activeTab, setActiveTab] = useState<'assets' | 'howItWorks'>('assets');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-inter overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 md:ml-[260px] flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full pb-32 md:pb-8">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">Cold Storage</h1>
          </div>

          <div className="flex gap-6 border-b border-[#222] mb-8">
            <button
              onClick={() => setActiveTab('assets')}
              className={`pb-3 text-sm font-bold transition-colors border-b-2 -mb-px ${
                activeTab === 'assets' ? 'text-white border-[#ff6a00]' : 'text-gray-500 border-transparent hover:text-gray-300'
              }`}
            >
              Assets
            </button>
            <button
              onClick={() => setActiveTab('howItWorks')}
              className={`pb-3 text-sm font-bold transition-colors border-b-2 -mb-px ${
                activeTab === 'howItWorks' ? 'text-white border-[#ff6a00]' : 'text-gray-500 border-transparent hover:text-gray-300'
              }`}
            >
              How it works
            </button>
          </div>

          {activeTab === 'assets' ? (
            <div className="animate-in fade-in duration-300">
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-2 text-gray-400">
                  <span className="text-sm font-medium">Cold Storage Value</span>
                  <svg className="w-4 h-4 cursor-pointer hover:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                </div>
                <div className="text-[32px] font-bold">$0</div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-white">Your assets</h2>
                <button className="bg-[#ff6a00] hover:bg-[#ff7b1a] text-black font-bold text-sm px-4 py-2 rounded-lg transition-colors">
                  Add asset
                </button>
              </div>

              <div className="bg-[#141414] border border-[#222] rounded-xl overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-[#222]">
                      <th className="p-4 text-xs font-medium text-gray-500 w-1/4">Asset</th>
                      <th className="p-4 text-xs font-medium text-gray-500 w-1/4">Current Price</th>
                      <th className="p-4 text-xs font-medium text-gray-500 w-1/4">In Wallet</th>
                      <th className="p-4 text-xs font-medium text-gray-500 w-1/4">Current Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={4} className="p-8 text-center text-gray-500 text-sm">
                        No cold storage assets found
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in duration-300 max-w-3xl">
              <h2 className="text-xl font-bold text-white mb-6">How it works</h2>
              <div className="space-y-4">
                {HOW_IT_WORKS.map((item, index) => (
                  <div key={index} className="bg-[#141414] border border-[#222] rounded-xl overflow-hidden transition-all duration-300">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full p-4 flex items-center justify-between hover:bg-[#1a1a1a] transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-[#2a2a2a] rounded flex items-center justify-center text-xs font-bold text-white shrink-0">
                          {index + 1}
                        </div>
                        <span className="font-bold text-sm text-white">{item.q}</span>
                      </div>
                      <svg className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    <div className={`transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                      <div className="p-4 pt-0 text-sm text-gray-400 leading-relaxed whitespace-pre-line ml-9 border-t border-[#222] mt-2">
                        {item.a}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
      <BottomNav />
    </div>
  );
};
