import { useState, useEffect } from 'react';
import { Sidebar } from './Dashboard/layout/Sidebar';
import { BottomNav } from './Dashboard/layout/BottomNav';
import { Header } from './Dashboard/layout/Header';
import { useNavigate } from 'react-router-dom';

interface Transaction {
  id: string;
  type: string;
  asset: string;
  amount: string;
  usdValue: string | null;
  status: string;
  txHash: string | null;
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  COMPLETED: 'text-green-400 bg-green-400/10',
  PENDING: 'text-[#ff6a00] bg-[#ff6a00]/10',
  FAILED: 'text-red-400 bg-red-400/10',
};

const TYPE_ICONS: Record<string, string> = {
  DEPOSIT: '↓',
  WITHDRAWAL: '↑',
  TRADE: '⇄',
  COPY_TRADE: '⊕',
};

const TYPE_COLORS: Record<string, string> = {
  DEPOSIT: 'text-green-400',
  WITHDRAWAL: 'text-red-400',
  TRADE: 'text-[#ff6a00]',
  COPY_TRADE: 'text-purple-400',
};

export const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState('ALL');

  const navigate = useNavigate();

  const fetchTransactions = async (p: number) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const res = await fetch(`/api/user/transactions?page=${p}&limit=15`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        return;
      }
      const data = await res.json();
      setTransactions(data.data || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(page);
  }, [page]);

  const filtered = filter === 'ALL'
    ? transactions
    : transactions.filter(t => t.type === filter);

  return (
    <div className="min-h-screen bg-black text-white font-inter overflow-x-hidden">
      <Sidebar />
      <div className="md:pl-64">
        <Header />
        <main className="p-4 md:p-8 pb-32 md:pb-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Transaction History</h1>
            <p className="text-gray-400 text-sm mt-1">A complete record of all your account activity</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2 custom-scrollbar">
            {['ALL', 'DEPOSIT', 'WITHDRAWAL', 'TRADE', 'COPY_TRADE'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-[#ff6a00] text-black'
                    : 'bg-neutral-800 text-gray-400 hover:text-white hover:bg-neutral-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-x-auto custom-scrollbar pb-2">
            <table className="w-full text-left">
              <thead className="bg-neutral-950 border-b border-neutral-800 text-gray-400 text-sm">
                <tr>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Asset</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium">USD Value</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">TX Hash</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-[#ff6a00] border-t-transparent rounded-full animate-spin" />
                        Loading transactions...
                      </div>
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <p className="text-gray-500 text-lg">No transactions yet</p>
                      <p className="text-gray-600 text-sm mt-1">Make a deposit or trade to get started</p>
                    </td>
                  </tr>
                ) : (
                  filtered.map(tx => (
                    <tr key={tx.id} className="hover:bg-neutral-800/40 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`text-lg font-bold ${TYPE_COLORS[tx.type] || 'text-gray-400'}`}>
                            {TYPE_ICONS[tx.type] || '?'}
                          </span>
                          <span className="text-sm font-medium capitalize">{tx.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm bg-neutral-800 px-2 py-0.5 rounded">{tx.asset}</span>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm">{parseFloat(tx.amount).toFixed(8)}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {tx.usdValue ? `$${parseFloat(tx.usdValue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '—'}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUS_COLORS[tx.status] || 'text-gray-400 bg-gray-400/10'}`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {tx.txHash ? (
                          <span className="font-mono text-xs text-[#ff6a00] truncate block max-w-[120px]" title={tx.txHash}>
                            {tx.txHash.substring(0, 12)}...
                          </span>
                        ) : (
                          <span className="text-gray-600">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {new Date(tx.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
              <span>Page {page} of {totalPages}</span>
              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                  className="px-3 py-1.5 bg-neutral-800 rounded-lg hover:bg-neutral-700 disabled:opacity-40 transition-colors"
                >
                  ← Prev
                </button>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(p => p + 1)}
                  className="px-3 py-1.5 bg-neutral-800 rounded-lg hover:bg-neutral-700 disabled:opacity-40 transition-colors"
                >
                  Next →
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
      <BottomNav />
    </div>
  );
};
