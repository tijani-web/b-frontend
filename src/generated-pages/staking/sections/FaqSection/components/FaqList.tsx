import { FaqItem } from "./FaqItem";

export const FaqList = () => {
  return (
    <div className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline">
      <div
        role="region"
        className="box-border caret-transparent text-[lab(8.11897_0.811279_-12.254)] flex flex-col justify-center outline-[3px] no-underline w-full"
      >
        <FaqItem question="What stocks and ETFs can I trade?" />
        <FaqItem question="How do I invest in stocks?" />
        <FaqItem question="What is the difference between stocks and ETFs?" />
        <FaqItem question="What is the minimum amount I can invest in stocks?" />
      </div>
    </div>
  );
};
