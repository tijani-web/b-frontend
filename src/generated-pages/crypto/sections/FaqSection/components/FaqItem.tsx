export type FaqItemProps = {
  question: string;
};

export const FaqItem = (props: FaqItemProps) => {
  return (
    <div className="border-b-violet-300/10 border-l-[lab(8.11897_0.811279_-12.254)] border-r-[lab(8.11897_0.811279_-12.254)] border-t-[lab(8.11897_0.811279_-12.254)] caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline border-b">
      <h3 className="caret-transparent text-[18.72px] font-bold leading-[18.72px] outline-[3px] no-underline">
        <button
          type="button"
          className="items-baseline bg-transparent bg-[position:0px_0px] caret-transparent text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-[3px] relative gap-y-4 text-left no-underline w-full pl-3 pr-1 py-4"
        >
          {props.question}
          <img
            src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-15-2.svg"
            alt="Icon"
            className="box-border caret-transparent text-slate-200 shrink-0 h-5 outline-[3px] no-underline align-baseline w-5 mr-2"
          />
        </button>
      </h3>
    </div>
  );
};
