import { useState } from "react";

const FAQ_DATA: { category: string; questions: { q: string; a: string }[] }[] = [
  {
    category: "Trading",
    questions: [
      {
        q: "What is leverage trading?",
        a: "Leverage trading lets you control a larger position with a smaller amount of capital. For example, with 10x leverage you can control $10,000 worth of assets with only $1,000. While it amplifies potential profits, it also increases risk.",
      },
      {
        q: "How do I start trading?",
        a: "Getting started is easy: 1) Create an account and complete KYC verification. 2) Deposit funds using USDT, BTC, ETH or other supported assets. 3) Navigate to the Dashboard and use the trading panel to select your asset, set your amount and leverage, then click Buy or Sell.",
      },
      {
        q: "What trading tools are available?",
        a: "Blofin Prime offers real-time TradingView charts, leverage trading (up to 100x), copy trading, cloud mining contracts, and portfolio management across multiple assets.",
      },
      {
        q: "What is the minimum amount I can trade with?",
        a: "The minimum trade amount is $10 USD equivalent. For copy trading, the minimum allocation per trader is also $10. Mining contracts start from $500.",
      },
    ],
  },
  {
    category: "Stocks",
    questions: [
      { q: "What stocks and ETFs can I trade?", a: "You can trade a wide range of US and international stocks, ETFs, and indices. Our catalog is updated regularly with new instruments." },
      { q: "How do I invest in stocks?", a: "Go to the Stocks section in your dashboard, search for the stock you want, set your investment amount, and confirm. It's that simple." },
      { q: "What is the difference between stocks and ETFs?", a: "A stock represents ownership in a single company, while an ETF (Exchange-Traded Fund) holds a basket of assets, providing diversification in a single instrument." },
      { q: "What is the minimum amount I can invest in stocks?", a: "The minimum investment for stocks is $10 USD or equivalent." },
    ],
  },
  {
    category: "Real Estate",
    questions: [
      { q: "What is real estate investing on your platform?", a: "We offer fractional real estate investing, allowing you to own a share of premium properties and earn rental income and appreciation without needing to buy an entire property." },
      { q: "How do I invest in real estate?", a: "Browse available properties in the Real Estate section, select a property, choose your investment amount, and confirm. You'll start earning rental income proportional to your share." },
      { q: "How do I earn money from real estate investments?", a: "You earn through two ways: monthly rental income distributed to your wallet, and capital appreciation when the property value increases." },
      { q: "What is the minimum and maximum amount I can invest?", a: "The minimum investment is $100 USD. There is no fixed maximum, subject to property availability." },
    ],
  },
  {
    category: "Crypto",
    questions: [
      { q: "What cryptocurrencies can I trade?", a: "We support Bitcoin (BTC), Ethereum (ETH), USDT, and many other popular cryptocurrencies. The full list is available in the trading section." },
      { q: "How do I trade cryptocurrencies?", a: "Go to the Crypto section, choose a trading pair, set your order type (market or limit), input your amount, and execute the trade." },
      { q: "What features are available for crypto trading?", a: "We offer spot trading, futures, leverage up to 100x, real-time charts, order books, and automated copy trading for crypto." },
      { q: "What is the minimum amount I can trade crypto with?", a: "The minimum crypto trade amount is $10 USD or equivalent in any supported cryptocurrency." },
    ],
  },
  {
    category: "Copy Trading",
    questions: [
      { q: "What is copy trading?", a: "Copy trading lets you automatically replicate the trades of expert traders. When they open or close a position, your account does the same proportionally." },
      { q: "How do I copy an expert?", a: "Go to the Copy Trading section, browse our list of verified experts, review their performance stats, and click 'Copy'. Set your allocation amount and you're done." },
      { q: "How do I stop copying an expert?", a: "Go to your active copy trades in the dashboard and click 'Stop Copying'. Your positions will be managed or closed according to your preference." },
      { q: "What is the minimum amount I can copy an expert with?", a: "The minimum copy trading allocation per expert is $10 USD." },
    ],
  },
  {
    category: "Staking",
    questions: [
      { q: "How do I stake?", a: "Go to the Staking section, choose an asset and duration, enter your stake amount, and confirm. Your rewards will be auto-credited to your wallet." },
      { q: "How long does a staking duration last?", a: "Staking durations vary from 7 days to 365 days. Longer durations typically offer higher APY rates." },
      { q: "What is the minimum and maximum amount I can stake?", a: "The minimum staking amount is $50 USD. There is no fixed maximum." },
      { q: "How do I make money with staking?", a: "You earn Annual Percentage Yield (APY) on your staked assets. The yield is paid out daily or at the end of the staking period, depending on the plan." },
    ],
  },
];

type FaqItemProps = { q: string; a: string; isOpen: boolean; onToggle: () => void };

const FaqItem = ({ q, a, isOpen, onToggle }: FaqItemProps) => (
  <div className="border-b border-violet-300/10">
    <h3>
      <button
        type="button"
        onClick={onToggle}
        className="items-center bg-transparent caret-transparent hover:text-white transition-colors text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-none relative text-left no-underline w-full pl-3 pr-1 py-4"
      >
        {q}
        <svg
          className={"w-5 h-5 shrink-0 transition-transform duration-200 mr-1 " + (isOpen ? "rotate-180 text-[#ff6a00]" : "")}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </h3>
    <div className={"overflow-hidden transition-all duration-300 " + (isOpen ? "max-h-48 pb-4" : "max-h-0")}>
      <p className="pl-3 pr-4 text-gray-500 text-sm leading-relaxed">{a}</p>
    </div>
  </div>
);

export const FaqSearchFilters = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [openItem, setOpenItem] = useState<string | null>(null);

  const filtered = FAQ_DATA.filter(
    (cat) => category === "all" || cat.category === category
  ).map((cat) => ({
    ...cat,
    questions: cat.questions.filter(
      (item) => !search || item.q.toLowerCase().includes(search.toLowerCase()) || item.a.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((cat) => cat.questions.length > 0);

  return (
    <div className="caret-transparent outline-[3px] relative no-underline w-full z-10 mt-16 mx-auto">
      {/* Search + Filter */}
      <div className="gap-x-3 flex font-medium max-w-[480px] outline-[3px] gap-y-3 no-underline mb-8 mx-auto md:max-w-[680px]">
        <div className="items-center bg-stone-950 box-border gap-x-2 flex basis-[0%] grow min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 no-underline w-[70%] px-3 py-2 rounded-lg md:w-auto">
          <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search for answers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-zinc-50 block basis-[0%] grow text-sm font-normal leading-5 min-h-[auto] min-w-[auto] outline-none no-underline"
          />
        </div>
        <div className="items-center bg-stone-950 box-border flex max-w-none min-h-[auto] min-w-[auto] outline-[3px] relative no-underline w-[30%] px-3 py-2 rounded-lg md:max-w-[140px] md:min-w-[140px] md:w-full">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="appearance-none bg-transparent text-gray-400 block text-sm leading-5 min-h-[auto] min-w-[auto] outline-none no-underline w-full pr-6 hover:text-zinc-50 cursor-pointer"
          >
            <option value="all">All</option>
            {FAQ_DATA.map((c) => (
              <option key={c.category} value={c.category}>{c.category}</option>
            ))}
          </select>
          <svg className="w-4 h-4 text-gray-400 absolute right-3 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* FAQ List */}
      <div className="gap-x-16 flex flex-col max-w-[480px] outline-[3px] gap-y-16 no-underline w-full mx-auto md:max-w-[680px]">
        {filtered.length === 0 && (
          <p className="text-gray-500 text-center py-8">No results found for "{search}"</p>
        )}
        {filtered.map((cat) => (
          <div key={cat.category} className="gap-x-4 flex flex-col gap-y-4">
            <p className="text-zinc-50 font-semibold leading-[14px] px-3 font-mori">{cat.category}</p>
            <div role="region" className="box-border flex flex-col justify-center outline-[3px] no-underline w-full">
              {cat.questions.map((item) => {
                const key = `${cat.category}-${item.q}`;
                return (
                  <FaqItem
                    key={key}
                    q={item.q}
                    a={item.a}
                    isOpen={openItem === key}
                    onToggle={() => setOpenItem(openItem === key ? null : key)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
