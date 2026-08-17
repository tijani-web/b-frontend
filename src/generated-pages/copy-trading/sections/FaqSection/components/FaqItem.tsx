import { useState } from "react";

export type FaqItemProps = {
  question: string;
  answer?: string;
};

export const FaqItem = (props: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const answer = props.answer || "Detailed information regarding this topic will be provided soon. Our support team is actively working on comprehensive guides.";

  return (
    <div className="border-b-violet-300/10 border-b caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline">
      <h3 className="caret-transparent text-[18.72px] font-bold outline-[3px] no-underline">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="items-center bg-transparent caret-transparent hover:text-white transition-colors text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-[3px] relative gap-y-4 text-left no-underline w-full pl-3 pr-1 py-4"
        >
          {props.question}
          <svg
            className={"w-5 h-5 transition-transform duration-200 " + (isOpen ? 'rotate-180 text-[#ff6a00]' : '')}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </h3>
      {isOpen && (
        <div className="pl-3 pr-4 pb-5 text-gray-500 text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
          {answer}
        </div>
      )}
    </div>
  );
};
