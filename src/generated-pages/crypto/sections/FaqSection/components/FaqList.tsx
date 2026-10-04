import { FaqItem } from "./FaqItem";

export const FaqList = () => {
  return (
    <div className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline">
      <div
        role="region"
        className="box-border caret-transparent text-[lab(8.11897_0.811279_-12.254)] flex flex-col justify-center outline-[3px] no-underline w-full"
      >
        <FaqItem question="What cryptocurrencies can I trade?" />
        <FaqItem question="How do I trade cryptocurrencies?" />
        <FaqItem question="What features are available for crypto trading?" />
        <FaqItem question="What is the minimum amount I can trade crypto with?" />
      </div>
    </div>
  );
};
