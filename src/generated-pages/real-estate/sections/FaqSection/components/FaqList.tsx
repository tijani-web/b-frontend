import { FaqItem } from "./FaqItem";

export const FaqList = () => {
  return (
    <div className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline">
      <div
        role="region"
        className="box-border caret-transparent text-[lab(8.11897_0.811279_-12.254)] flex flex-col justify-center outline-[3px] no-underline w-full"
      >
        <FaqItem question="What is real estate investing on your platform?" />
        <FaqItem question="How do I invest in real estate?" />
        <FaqItem question="How do I earn money from real estate investments?" />
        <FaqItem question="What is the minimum and maximum amount I can invest?" />
      </div>
    </div>
  );
};
