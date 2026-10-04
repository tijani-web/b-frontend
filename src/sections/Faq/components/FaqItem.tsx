import { useState } from "react";

export type FaqItemProps = {
  question: string;
  answer?: string;
};

const FAQ_ANSWERS: Record<string, string> = {
  "What is leverage trading?":
    "Leverage trading lets you control a larger position with a smaller amount of capital. For example, with 10x leverage you can control $10,000 worth of assets with only $1,000. While it amplifies potential profits, it also increases risk — you can lose more than your initial deposit.",
  "How do I start trading?":
    "Getting started is easy: 1) Create an account and complete KYC verification. 2) Deposit funds using USDT, BTC, ETH or other supported assets. 3) Navigate to the Dashboard and use the trading panel to select your asset, set your amount and leverage, then click Buy or Sell.",
  "What trading tools are available?":
    "Blofin Prime offers a full suite of tools including: real-time TradingView charts, leverage trading (up to 100x), copy trading (auto-copy top traders), cloud mining contracts, and portfolio management across multiple assets.",
  "What is the minimum amount I can trade with?":
    "The minimum trade amount is $10 USD equivalent. For copy trading, the minimum allocation per trader is also $10. Mining contracts start from $500.",
};

export const FaqItem = (props: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const answer = props.answer ?? FAQ_ANSWERS[props.question] ?? "Please contact our support team for more information about this topic.";

  return (
    <article className="backdrop-blur-[30px] backdrop-saturate-[1.2] shadow-[rgba(255,255,255,0.12)_0px_1px_0px_0px_inset,rgba(255,255,255,0.1)_-1px_-1px_0px_0px_inset,rgba(0,0,0,0.28)_0px_8px_32px_0px] box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] relative no-underline px-4 py-6 rounded-[26px] md:px-10 md:py-8 before:accent-auto before:box-border before:caret-transparent before:text-slate-50 before:block before:text-base before:not-italic before:normal-nums before:font-normal before:tracking-[normal] before:leading-4 before:list-outside before:list-disc before:outline-[3px] before:pointer-events-none before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:border before:rounded-[26px] before:border-separate before:border-solid before:border-white/10 before:inset-0 before:font-blofinnova transition-all">
      <h3 className="box-border caret-transparent outline-[3px] no-underline">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="items-center bg-transparent bg-[position:0px_0px] caret-transparent text-slate-100 gap-x-3 flex text-lg font-medium justify-between leading-[26px] outline-[3px] gap-y-3 text-left no-underline w-full p-0 md:text-2xl md:leading-[34px] cursor-pointer"
        >
          <span className="box-border caret-transparent block basis-[0%] grow text-lg leading-[26px] min-h-[auto] outline-[3px] no-underline pr-2 md:text-2xl md:leading-[34px]">
            {props.question}
          </span>
          {/* Animated +/× icon */}
          <span className={`items-center box-border caret-transparent flex shrink-0 text-lg justify-center leading-[26px] min-h-[auto] min-w-[auto] outline-[3px] no-underline border p-1.5 rounded-lg border-solid transition-all duration-300 ${isOpen ? 'border-[#ff6a00]/60 bg-[#ff6a00]/10 rotate-45' : 'border-white/20'} md:text-2xl md:leading-[34px]`}>
            <svg
              className={`w-5 h-5 transition-colors duration-300 ${isOpen ? 'text-[#ff6a00]' : 'text-white/60'}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </span>
        </button>
      </h3>

      {/* Answer panel with smooth expand */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}`}
      >
        <p className="text-gray-400 text-base leading-relaxed md:text-lg">
          {answer}
        </p>
      </div>
    </article>
  );
};
