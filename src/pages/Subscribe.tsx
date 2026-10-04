import { useState, useEffect } from 'react';
import { Sidebar } from './Dashboard/layout/Sidebar';
import { Header } from './Dashboard/layout/Header';
import { BottomNav } from './Dashboard/layout/BottomNav';
import { useNavigate } from 'react-router-dom';

interface Plan {
  id: string;
  name: string;
  minAmount: number;
  maxAmount: number;
  durationDays: number;
  roi: string;
}

const HOW_IT_WORKS = [
  { q: 'What is a subscription?', a: 'A subscription is a time-limited investment plan that gives you access to automatic trading strategies. Each plan has a minimum investment, a fixed duration, and a guaranteed ROI.' },
  { q: 'What is a subscription balance?', a: 'Your subscription balance is the total amount you have invested in active subscription plans. This balance grows as your ROI is applied.' },
  { q: 'How do I fund my subscription balance?', a: 'You can fund your subscription balance by making a deposit to your account. Once your deposit is approved, your balance will be credited and you can subscribe to a plan.' },
  { q: 'How do I subscribe?', a: 'Select a plan that matches your investment goals, enter the amount you wish to invest (within the plan\'s min/max range), and click Subscribe.' },
  { q: 'How long does a subscription last?', a: 'Each plan has a defined duration (e.g., 3 days, 5 days, or 7 days). After the plan expires, your principal plus ROI is returned to your account.' },
  { q: 'How do I make money with subscriptions?', a: 'Each plan offers a fixed ROI (Return on Investment). For example, a 200% ROI on a 3-day Starter plan means a $11,000 investment would return $22,000 after 3 days.' },
];

export const Subscribe = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'plans' | 'history' | 'howItWorks'>('plans');
  const [plans, setPlans] = useState<Plan[]>([]);
  const [subscriptionBalance, setSubscriptionBalance] = useState(0);
  const [activePlan, setActivePlan] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [amounts, setAmounts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchPlans();
    fetchMyData();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await fetch('/api/subscriptions/plans', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.plans) {
        setPlans(data.plans);
        const initAmounts: Record<string, string> = {};
        data.plans.forEach((p: Plan) => {
          initAmounts[p.id] = String(p.minAmount);
        });
        setAmounts(initAmounts);
      }
    } catch {}
    setLoading(false);
  };

  const fetchMyData = async () => {
    try {
      const res = await fetch('/api/subscriptions/my', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.balance !== undefined) setSubscriptionBalance(data.balance);
      if (data.activePlan) setActivePlan(data.activePlan);
      if (data.subscriptions) setHistory(data.subscriptions);
    } catch {}
  };

  const handleSubscribe = async (planId: string) => {
    setError(null);
    setSuccess(null);
    setSubscribing(planId);
    try {
      const res = await fetch('/api/subscriptions/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ planId, amount: amounts[planId] }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Subscription failed');
      } else {
        setSuccess('Subscription activated successfully!');
        fetchMyData();
      }
    } catch {
      setError('Network error. Please try again.');
    }
    setSubscribing(null);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-inter overflow-x-hidden">
      <Sidebar />
      <div className="flex-1 md:ml-[260px] flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full pb-32 md:pb-8">
          {/* Top info bar */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <span>Subscription Balance</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              </div>
              <div className="text-[32px] font-bold">${subscriptionBalance.toLocaleString()}</div>
              <div className="text-gray-500 text-sm mt-1">
                Your current subscription is: <span className="text-white">{activePlan || '-'}</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/deposit')}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#141414] border border-[#2a2a2a] text-white text-sm font-medium rounded-lg hover:bg-[#1a1a1a] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              Deposit
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-[#222] mb-8">
            {(['plans', 'history', 'howItWorks'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-bold transition-colors border-b-2 -mb-px capitalize ${
                  activeTab === tab ? 'text-white border-[#ff6a00]' : 'text-gray-500 border-transparent hover:text-gray-300'
                }`}
              >
                {tab === 'howItWorks' ? 'How it works' : tab === 'history' ? 'Your history' : 'Plans'}
              </button>
            ))}
          </div>

          {/* Alerts */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">{error}</div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm">{success}</div>
          )}

          {/* Plans Tab */}
          {activeTab === 'plans' && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-base font-bold text-white mb-6">Plans</h2>
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1,2,3].map(i => (
                    <div key={i} className="bg-[#141414] border border-[#222] rounded-xl p-6 animate-pulse h-64" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {plans.map(plan => (
                    <div key={plan.id} className="bg-[#141414] border border-[#222] rounded-xl p-6 flex flex-col gap-4 hover:border-[#333] transition-colors">
                      <h3 className="text-[#ff6a00] font-bold text-base">{plan.name}</h3>
                      <div className="space-y-2.5 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Minimum</span>
                          <span className="text-white font-medium">${Number(plan.minAmount).toLocaleString()}.00</span>
                        </div>
                        <div className="flex justify-between border-t border-[#1e1e1e] pt-2.5">
                          <span className="text-gray-500">Maximum</span>
                          <span className="text-white font-medium">${Number(plan.maxAmount).toLocaleString()}.00</span>
                        </div>
                        <div className="flex justify-between border-t border-[#1e1e1e] pt-2.5">
                          <span className="text-gray-500">Plan duration</span>
                          <span className="text-white font-medium">{plan.durationDays} days</span>
                        </div>
                        <div className="flex justify-between border-t border-[#1e1e1e] pt-2.5">
                          <span className="text-gray-500">ROI</span>
                          <span className="text-green-500 font-bold">{plan.roi}</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Amount</label>
                        <div className="flex items-center bg-[#0d0d0d] border border-[#2a2a2a] rounded-lg overflow-hidden">
                          <input
                            type="number"
                            value={amounts[plan.id] || ''}
                            onChange={e => setAmounts(prev => ({ ...prev, [plan.id]: e.target.value }))}
                            className="flex-1 bg-transparent px-3 py-2 text-white text-sm outline-none"
                            min={plan.minAmount}
                            max={plan.maxAmount}
                          />
                          <span className="px-3 text-gray-500 text-xs border-l border-[#2a2a2a]">USD</span>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span className="text-gray-600">Current balance</span>
                          <span className="text-gray-600">${subscriptionBalance.toFixed(2)}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSubscribe(plan.id)}
                        disabled={subscribing === plan.id}
                        className="w-full py-3 rounded-lg text-sm font-bold transition-colors bg-[#2a2a2a] hover:bg-[#ff6a00] text-gray-300 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {subscribing === plan.id ? 'Processing...' : 'Subscribe'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="animate-in fade-in duration-300">
              <div className="bg-[#141414] border border-[#222] rounded-xl overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                  <thead>
                    <tr className="border-b border-[#222]">
                      <th className="p-4 text-xs font-medium text-gray-500">Plan</th>
                      <th className="p-4 text-xs font-medium text-gray-500">Amount</th>
                      <th className="p-4 text-xs font-medium text-gray-500">Status</th>
                      <th className="p-4 text-xs font-medium text-gray-500">Start</th>
                      <th className="p-4 text-xs font-medium text-gray-500">End</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.length === 0 ? (
                      <tr><td colSpan={5} className="p-8 text-center text-gray-500 text-sm">No subscription history yet</td></tr>
                    ) : history.map((s: any) => (
                      <tr key={s.id} className="border-t border-[#1a1a1a] hover:bg-[#1a1a1a] transition-colors">
                        <td className="p-4 text-sm text-white">{s.plan?.name}</td>
                        <td className="p-4 text-sm text-white">${Number(s.amount).toLocaleString()}</td>
                        <td className="p-4 text-sm">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                            s.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' :
                            s.status === 'COMPLETED' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>{s.status}</span>
                        </td>
                        <td className="p-4 text-sm text-gray-400">{new Date(s.startDate).toLocaleDateString()}</td>
                        <td className="p-4 text-sm text-gray-400">{new Date(s.endDate).toLocaleDateString()}</td>
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
                    <div className={`transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
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
    </div>
  );
};
