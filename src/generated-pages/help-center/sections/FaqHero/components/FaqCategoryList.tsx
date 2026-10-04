import { FaqCategory } from "./FaqCategory";

export const FaqCategoryList = () => {
  return (
    <div className="caret-transparent gap-x-16 flex flex-col max-w-[480px] outline-[3px] gap-y-16 no-underline w-full mx-auto md:max-w-[680px]">
      <FaqCategory
        title="Trading"
        questions={[
          "What is leverage trading?",
          "How do I start trading?",
          "What trading tools are available?",
          "What is the minimum amount I can trade with?",
        ]}
      />
      <FaqCategory
        title="Stocks"
        questions={[
          "What stocks and ETFs can I trade?",
          "How do I invest in stocks?",
          "What is the difference between stocks and ETFs?",
          "What is the minimum amount I can invest in stocks?",
        ]}
      />
      <FaqCategory
        title="Real Estate"
        questions={[
          "What is real estate investing on your platform?",
          "How do I invest in real estate?",
          "How do I earn money from real estate investments?",
          "What is the minimum and maximum amount I can invest?",
        ]}
      />
      <FaqCategory
        title="Crypto"
        questions={[
          "What cryptocurrencies can I trade?",
          "How do I trade cryptocurrencies?",
          "What features are available for crypto trading?",
          "What is the minimum amount I can trade crypto with?",
        ]}
      />
      <FaqCategory
        title="Copy Trading"
        questions={[
          "What is copy trading?",
          "How do I copy an expert?",
          "How do I stop copying an expert?",
          "What is the minimum amount I can copy an expert with?",
        ]}
      />
      <FaqCategory
        title="Staking"
        questions={[
          "How do I stake?",
          "How long does a staking duration last?",
          "What is the minimum and maximum amount I can stake?",
          "How do I make money with staking?",
        ]}
      />
    </div>
  );
};
