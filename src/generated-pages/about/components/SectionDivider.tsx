export type SectionDividerProps = {
  dividerVariant: string;
};

export const SectionDivider = (props: SectionDividerProps) => {
  return (
    <div className="caret-transparent h-px max-w-[800px] outline-[3px] absolute no-underline translate-x-[-50.0%] w-full left-2/4 -top-px">
      <img
        src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-4-5.svg"
        alt="Icon"
        className="caret-transparent h-px outline-[3px] pointer-events-none absolute no-underline align-baseline w-full left-0 top-0"
      />
      <div className="items-center caret-transparent gap-x-px flex outline-[3px] relative gap-y-px no-underline w-max mx-auto rounded-[10px] top-0">
        <div className="bg-[#ff6a00] caret-transparent h-px min-h-[auto] min-w-[auto] outline-[3px] no-underline w-0.5 rounded-[10px]"></div>
        <div
          className={`bg-[#ff6a00] caret-transparent h-px min-h-[auto] min-w-[auto] outline-[3px] relative no-underline rounded-[10px] before:accent-auto before:bg-[#ff6a00] before:shadow-[rgba(255,136,0,0.5)_0px_0px_10px_0px,rgba(255,136,0,0.4)_0px_0px_20px_0px,rgba(255,136,0,0.3)_0px_0px_30px_0px,rgba(255,136,0,0.2)_0px_0px_40px_0px] before:caret-transparent before:text-black before:block before:blur-[3px] before:text-base before:not-italic before:normal-nums before:font-normal before:h-0.5 before:tracking-[normal] before:leading-4 before:list-outside before:list-disc before:opacity-40 before:outline-[3px] before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-full before:z-[-1] before:rounded-[10px] before:border-separate before:left-0 before:top-0 before:font-inter ${props.dividerVariant}`}
        ></div>
        <div className="bg-[#ff6a00] caret-transparent h-px min-h-[auto] min-w-[auto] outline-[3px] no-underline w-0.5 rounded-[10px]"></div>
      </div>
    </div>
  );
};
