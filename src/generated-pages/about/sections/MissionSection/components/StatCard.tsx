export type StatCardProps = {
  rootVariantClass: string;
  showAccentIcon: boolean;
  accentIconUrl: string;
  mainIconUrl: string;
  firstActiveDigit: string;
  secondActiveDigit: string;
  showThirdDigit: boolean;
  thirdActiveDigit: string;
  suffix: string;
  label: string;
};

export const StatCard = (props: StatCardProps) => {
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const renderDigitColumn = (activeDigit: string) => {
    return (
      <span className="caret-transparent inline-block outline-[3px] relative no-underline text-nowrap">
        {digits.map((digit) => (
          <span
            key={digit}
            className={
              digit === activeDigit
                ? "caret-transparent inline-block outline-[3px] no-underline text-nowrap py-1"
                : "caret-transparent hidden outline-[3px] absolute no-underline text-nowrap py-1 left-2/4 top-0"
            }
          >
            {digit}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div
      className={`box-border caret-transparent grid-cols-[1fr] max-w-[360px] min-h-[auto] min-w-[auto] outline-[3px] relative no-underline w-full mx-auto p-7 md:grid-cols-none md:max-w-none md:mx-0 md:p-11 after:accent-auto after:bg-slate-200 after:caret-transparent after:text-black after:hidden after:text-base after:not-italic after:normal-nums after:font-normal after:h-2.5 after:tracking-[normal] after:leading-4 after:list-outside after:list-disc after:mr-[-0.5px] after:opacity-[0.72] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:w-px after:z-[1] after:rounded-xl after:border-separate after:right-0 after:top-2/4 after:font-inter ${props.rootVariantClass}`}
    >
      {props.showAccentIcon && (
        <img
          src={props.accentIconUrl}
          alt="Icon"
          className="caret-transparent hidden outline-[3px] pointer-events-none absolute no-underline align-baseline w-px inset-y-0 md:block right-0"
        />
      )}
      <img
        src={props.mainIconUrl}
        alt="Icon"
        className="caret-transparent hidden outline-[3px] pointer-events-none absolute no-underline align-baseline w-px left-0 inset-y-0 md:block"
      />
      <div className="items-center caret-transparent flex flex-col outline-[3px] no-underline">
        <p className="caret-transparent text-zinc-50 text-[32px] font-semibold leading-10 min-h-[auto] min-w-[auto] outline-[3px] no-underline font-inter">
          <div className="caret-transparent inline-block isolate leading-8 outline-[3px] no-underline text-nowrap">
            <span className="caret-transparent inline-block isolate outline-[3px] relative no-underline text-nowrap origin-[100%_50%] z-[5] after:accent-auto after:caret-transparent after:text-zinc-50 after:inline-block after:text-[32px] after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-8 after:list-outside after:list-disc after:outline-[3px] after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:text-nowrap after:visible after:border-separate after:font-inter"></span>
            <span className="caret-transparent inline-block [mask-clip:border-box,border-box,border-box,border-box,border-box,border-box] [mask-composite:add,add,add,add,add,add] [mask-image:linear-gradient(to_right,rgba(0,0,0,0)_0px,rgb(0,0,0)_16px,rgb(0,0,0)_calc(100%_-_16px),rgba(0,0,0,0)),linear-gradient(rgba(0,0,0,0)_0px,rgb(0,0,0)_8px,rgb(0,0,0)_calc(100%_-_8px),rgba(0,0,0,0)_100%),radial-gradient(at_100%_100%,rgb(0,0,0)_0px,rgba(0,0,0,0)_71%),radial-gradient(at_0%_100%,rgb(0,0,0)_0px,rgba(0,0,0,0)_71%),radial-gradient(at_0%_0%,rgb(0,0,0)_0px,rgba(0,0,0,0)_71%),radial-gradient(at_100%_0%,rgb(0,0,0)_0px,rgba(0,0,0,0)_71%)] [mask-mode:match-source,match-source,match-source,match-source,match-source,match-source] [mask-origin:border-box,border-box,border-box,border-box,border-box,border-box] [mask-position:50%_50%,50%_50%,0%_0%,100%_0%,100%_100%,0%_100%] [mask-repeat:no-repeat,no-repeat,no-repeat,no-repeat,no-repeat,no-repeat] [mask-size:100%_calc(100%_-_16px),calc(100%_-_32px)_100%,16px_8px,16px_8px,16px_8px,16px_8px] outline-[3px] relative no-underline text-nowrap origin-[0%_0%] -mx-4">
              <span className="caret-transparent inline-block outline-[3px] no-underline text-nowrap origin-[0%_0%] px-4 py-1">
                <span className="caret-transparent inline-block isolate outline-[3px] relative no-underline text-nowrap origin-[100%_50%] after:accent-auto after:caret-transparent after:text-zinc-50 after:inline-block after:text-[32px] after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-8 after:list-outside after:list-disc after:outline-[3px] after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:text-nowrap after:visible after:py-1 after:border-separate after:font-inter">
                  {renderDigitColumn(props.firstActiveDigit)}
                  {renderDigitColumn(props.secondActiveDigit)}
                  {props.showThirdDigit &&
                    renderDigitColumn(props.thirdActiveDigit)}
                </span>
                <span className="caret-transparent inline-block isolate outline-[3px] relative no-underline text-nowrap origin-[0%_50%] after:accent-auto after:caret-transparent after:text-zinc-50 after:inline-block after:text-[32px] after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-8 after:list-outside after:list-disc after:outline-[3px] after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:text-nowrap after:visible after:py-1 after:border-separate after:font-inter"></span>
              </span>
            </span>
            <span className="caret-transparent inline-block isolate outline-[3px] relative no-underline text-nowrap origin-[0%_50%] z-[5] after:accent-auto after:caret-transparent after:text-zinc-50 after:inline-block after:text-[32px] after:not-italic after:normal-nums after:font-semibold after:tracking-[normal] after:leading-8 after:list-outside after:list-disc after:outline-[3px] after:pointer-events-auto after:text-start after:no-underline after:indent-[0px] after:normal-case after:text-nowrap after:visible after:border-separate after:font-inter">
              <span className="caret-transparent inline-block isolate outline-[3px] relative no-underline text-nowrap">
                <span className="caret-transparent inline-block mix-blend-plus-lighter outline-[3px] no-underline text-nowrap">
                  {props.suffix}
                </span>
              </span>
            </span>
          </div>
        </p>
        <p className="caret-transparent text-gray-400 text-sm leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline font-inter">
          {props.label}
        </p>
      </div>
    </div>
  );
};
