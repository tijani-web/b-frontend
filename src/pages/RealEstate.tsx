import { useState, useEffect } from 'react';
import { Sidebar } from './Dashboard/layout/Sidebar';
import { Header } from './Dashboard/layout/Header';
import { BottomNav } from './Dashboard/layout/BottomNav';

interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  location?: string;
  minAmount: number;
  roi: string;
  strategy: string;
  status: string;
}

// Curated property image URLs (no images on server so we use nice stock photos)
const PROPERTY_IMAGES = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&q=80',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80',
  'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?w=600&q=80',
  'https://images.unsplash.com/photo-1462396240927-52058a6a84ec?w=600&q=80',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
  'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80',
];

const HOW_IT_WORKS = [
  { q: 'What is Real Estate investing?', a: 'Real Estate investing allows you to invest in professionally managed real estate projects, earning returns from rental income and property appreciation without directly owning a property.' },
  { q: 'How do I invest?', a: 'Browse open projects, select one that matches your investment goals, enter your investment amount (at or above the minimum), and click Invest Now. Your funds are deployed immediately.' },
  { q: 'What returns can I expect?', a: 'Each project displays an estimated ROI (Return on Investment). Returns depend on the project type, location, and strategy (Fixed Income or Growth & Income).' },
  { q: 'How do I withdraw my returns?', a: 'Once a project reaches its maturity date, your principal plus returns are automatically credited to your account balance, which you can then withdraw.' },
];

export const RealEstate = () => {
  const [activeTab, setActiveTab] = useState<'open' | 'closed' | 'investments' | 'howItWorks'>('open');
  const [projects, setProjects] = useState<Project[]>([]);
  const [myInvestments, setMyInvestments] = useState<any[]>([]);
  const [totalInvested, setTotalInvested] = useState(0);
  const [loading, setLoading] = useState(true);
  const [investModal, setInvestModal] = useState<Project | null>(null);
  const [investAmount, setInvestAmount] = useState('');
  const [investing, setInvesting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProjects();
    fetchMyInvestments();
  }, [activeTab]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const status = activeTab === 'open' ? 'OPEN' : activeTab === 'closed' ? 'CLOSED' : '';
      const url = status ? `/api/real-estate/projects?status=${status}` : '/api/real-estate/projects';
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setProjects(data.projects || []);
    } catch {}
    setLoading(false);
  };

  const fetchMyInvestments = async () => {
    try {
      const res = await fetch('/api/real-estate/my', { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.investments) setMyInvestments(data.investments);
      if (data.totalInvested !== undefined) setTotalInvested(data.totalInvested);
    } catch {}
  };

  const handleInvest = async () => {
    if (!investModal) return;
    setError(null);
    setInvesting(true);
    try {
      const res = await fetch('/api/real-estate/invest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ projectId: investModal.id, amount: investAmount }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Investment failed');
      } else {
        setSuccess(`Successfully invested $${Number(investAmount).toLocaleString()} in ${investModal.name}!`);
        setInvestModal(null);
        setInvestAmount('');
        fetchMyInvestments();
      }
    } catch {
      setError('Network error. Please try again.');
    }
    setInvesting(false);
  };

  const openProject = (p: Project) => {
    setInvestModal(p);
    setInvestAmount(String(p.minAmount));
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-inter overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 md:ml-[260px] flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full pb-32 md:pb-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Real Estate</h1>
            {totalInvested > 0 && (
              <div className="text-right">
                <div className="text-xs text-gray-500">Total Invested</div>
                <div className="text-lg font-bold text-white">${totalInvested.toLocaleString()}</div>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-[#222] mb-8 overflow-x-auto">
            {(['open', 'closed', 'investments', 'howItWorks'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-bold transition-colors border-b-2 -mb-px whitespace-nowrap ${
                  activeTab === tab ? 'text-white border-[#ff6a00]' : 'text-gray-500 border-transparent hover:text-gray-300'
                }`}
              >
                {tab === 'howItWorks' ? 'How it works' : tab === 'investments' ? 'Your investments' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {success && <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm">{success}</div>}

          {/* Projects Grid */}
          {(activeTab === 'open' || activeTab === 'closed') && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-base font-bold text-white mb-6">{activeTab === 'open' ? 'Open projects' : 'Closed projects'}</h2>
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {[1,2,3,4].map(i => <div key={i} className="bg-[#141414] border border-[#222] rounded-xl h-64 animate-pulse" />)}
                </div>
              ) : projects.length === 0 ? (
                <div className="text-center text-gray-500 py-16">No {activeTab} projects at the moment</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {projects.map((project, idx) => (
                    <div key={project.id} className="bg-[#141414] border border-[#222] rounded-xl overflow-hidden hover:border-[#333] transition-colors flex flex-col">
                      <div className="h-36 overflow-hidden bg-[#1a1a1a]">
                        <img
                          src={project.imageUrl || PROPERTY_IMAGES[idx % PROPERTY_IMAGES.length]}
                          alt={project.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          onError={e => { (e.target as HTMLImageElement).src = PROPERTY_IMAGES[idx % PROPERTY_IMAGES.length]; }}
                        />
                      </div>
                      <div className="p-4 flex flex-col flex-1 gap-3">
                        <div>
                          <h3 className="text-white font-bold text-sm leading-tight">{project.name}</h3>
                          <p className="text-gray-500 text-xs mt-1 leading-relaxed line-clamp-3">{project.description}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <div className="text-gray-500 mb-0.5">Minimum</div>
                            <div className="text-white font-bold">${Number(project.minAmount).toLocaleString()}.00</div>
                          </div>
                          <div>
                            <div className="text-gray-500 mb-0.5">ROI</div>
                            <div className="text-[#ff6a00] font-bold">{project.roi}</div>
                          </div>
                          <div>
                            <div className="text-gray-500 mb-0.5">Strategy</div>
                            <div className="text-white font-bold text-[10px] leading-tight">{project.strategy}</div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-auto">
                          <button
                            onClick={() => openProject(project)}
                            className="flex-1 text-xs font-bold py-2 rounded-lg border border-[#333] text-gray-300 hover:text-white hover:border-[#444] transition-colors"
                          >
                            View project
                          </button>
                          {project.status === 'OPEN' && (
                            <button
                              onClick={() => openProject(project)}
                              className="flex-1 text-xs font-bold py-2 rounded-lg bg-[#ff6a00] hover:bg-[#ff7b1a] text-white transition-colors"
                            >
                              Invest now
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* My Investments Tab */}
          {activeTab === 'investments' && (
            <div className="animate-in fade-in duration-300">
              <div className="bg-[#141414] border border-[#222] rounded-xl overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead>
                    <tr className="border-b border-[#222]">
                      <th className="p-4 text-xs font-medium text-gray-500">Project</th>
                      <th className="p-4 text-xs font-medium text-gray-500">Amount</th>
                      <th className="p-4 text-xs font-medium text-gray-500">ROI</th>
                      <th className="p-4 text-xs font-medium text-gray-500">Strategy</th>
                      <th className="p-4 text-xs font-medium text-gray-500">Status</th>
                      <th className="p-4 text-xs font-medium text-gray-500">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myInvestments.length === 0 ? (
                      <tr><td colSpan={6} className="p-8 text-center text-gray-500 text-sm">No investments yet</td></tr>
                    ) : myInvestments.map((inv: any) => (
                      <tr key={inv.id} className="border-t border-[#1a1a1a] hover:bg-[#1a1a1a] transition-colors">
                        <td className="p-4 text-sm text-white">{inv.project?.name}</td>
                        <td className="p-4 text-sm text-white">${Number(inv.amount).toLocaleString()}</td>
                        <td className="p-4 text-sm text-[#ff6a00] font-bold">{inv.project?.roi}</td>
                        <td className="p-4 text-sm text-gray-400">{inv.project?.strategy}</td>
                        <td className="p-4 text-sm">
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-500/20 text-green-400">{inv.status}</span>
                        </td>
                        <td className="p-4 text-sm text-gray-400">{new Date(inv.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* How it works Tab */}
          {activeTab === 'howItWorks' && (
            <div className="animate-in fade-in duration-300 max-w-3xl">
              <h2 className="text-xl font-bold text-white mb-6">How it works</h2>
              <div className="space-y-4">
                {HOW_IT_WORKS.map((item, index) => (
                  <div key={index} className="bg-[#141414] border border-[#222] rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full p-4 flex items-center justify-between hover:bg-[#1a1a1a] transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-[#2a2a2a] rounded flex items-center justify-center text-xs font-bold text-white shrink-0">{index + 1}</div>
                        <span className="font-bold text-sm text-white">{item.q}</span>
                      </div>
                      <svg className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    <div className={`transition-all duration-300 ${openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                      <div className="p-4 pt-0 text-sm text-gray-400 leading-relaxed ml-9 border-t border-[#222] mt-2">{item.a}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
      <BottomNav />

      {/* Invest Modal */}
      {investModal && (
        <>
          <div className="fixed inset-0 bg-black/70 z-50" onClick={() => setInvestModal(null)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-[#141414] border border-[#2a2a2a] rounded-2xl w-full max-w-md shadow-2xl">
              <div className="p-6 border-b border-[#222] flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">{investModal.name}</h2>
                <button onClick={() => setInvestModal(null)} className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-3 gap-3 bg-[#0d0d0d] rounded-xl p-4 text-center">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Minimum</div>
                    <div className="text-white text-sm font-bold">${Number(investModal.minAmount).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">ROI</div>
                    <div className="text-[#ff6a00] text-sm font-bold">{investModal.roi}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Strategy</div>
                    <div className="text-white text-xs font-bold">{investModal.strategy}</div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{investModal.description}</p>
                {error && <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</div>}
                <div>
                  <label className="text-xs text-gray-500 block mb-1.5">Investment Amount (USD)</label>
                  <div className="flex items-center bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg overflow-hidden">
                    <span className="px-3 text-gray-500 text-sm">$</span>
                    <input
                      type="number"
                      value={investAmount}
                      onChange={e => setInvestAmount(e.target.value)}
                      className="flex-1 bg-transparent px-2 py-3 text-white text-sm outline-none"
                      min={investModal.minAmount}
                    />
                    <span className="px-3 text-gray-500 text-xs border-l border-[#2a2a2a]">USD</span>
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Minimum: ${Number(investModal.minAmount).toLocaleString()}</div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setInvestModal(null)} className="flex-1 py-3 rounded-xl text-sm font-bold border border-[#333] text-gray-300 hover:text-white transition-colors">
                    Cancel
                  </button>
                  <button
                    onClick={handleInvest}
                    disabled={investing}
                    className="flex-1 py-3 rounded-xl text-sm font-bold bg-[#ff6a00] hover:bg-[#ff7b1a] text-white transition-colors disabled:opacity-50"
                  >
                    {investing ? 'Processing...' : 'Invest Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
