export type RewardStepProps = {
  rootVariant: string;
  title: string;
  description: string;
  innerVariant: string;
  iconSrc: string;
};

export const RewardStep = (props: RewardStepProps) => {
  return (
    <div
      className={`box-border caret-transparent gap-x-8 flex flex-col h-full min-h-[auto] min-w-[auto] outline-[3px] relative gap-y-8 no-underline w-full mt-12 mx-auto md:gap-x-16 md:gap-y-16 md:mt-0 md:mx-0 md:pr-12 md:py-12 ${props.rootVariant}`}
    >
      <div className="caret-transparent max-w-[280px] min-h-[auto] min-w-[auto] outline-[3px] no-underline md:max-w-[380px]">
        <div className="items-center caret-transparent gap-x-1.5 flex outline-[3px] gap-y-1.5 no-underline">
          <p className="caret-transparent text-zinc-50 text-[15px] font-semibold leading-[15px] min-h-[auto] min-w-[auto] outline-[3px] no-underline font-mori md:text-base md:leading-4">
            {props.title}
          </p>
        </div>
        <p className="caret-transparent text-slate-300 text-sm leading-6 outline-[3px] no-underline mt-2 md:text-base">
          {props.description}
        </p>
      </div>
      <div className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline transform-none">
        <div
          className={`bg-stone-950 caret-transparent h-[260px] [mask-clip:border-box,border-box] [mask-composite:intersect,intersect] [mask-image:linear-gradient(rgb(0,0,0)_50%,rgba(0,0,0,0)_100%),linear-gradient(to_right,rgb(0,0,0)_70%,rgba(0,0,0,0)_100%)] [mask-mode:match-source,match-source] [mask-origin:border-box,border-box] [mask-position:0%_0%,0%_0%] [mask-repeat:repeat,repeat] [mask-size:auto,auto] outline-[3px] no-underline w-full [mask-position:0%,0%] p-4 rounded-xl md:[mask-clip:border-box] md:[mask-composite:add] md:[mask-mode:match-source] md:[mask-origin:border-box] md:[mask-position:0%_0%] md:[mask-repeat:repeat] md:[mask-size:auto] md:w-auto md:[mask-position:0%] ${props.innerVariant}`}
        >
          <div className="caret-transparent outline-[3px] no-underline">
            <img
              src={props.iconSrc}
              alt="Icon"
              className="caret-transparent inline [mask-image:linear-gradient(rgb(0,0,0)_80%,rgba(0,0,0,0)_100%)] outline-[3px] no-underline align-baseline"
            />
            <div className="caret-transparent h-full outline-[3px] pointer-events-none absolute no-underline w-full overflow-hidden left-0 top-0 before:accent-auto before:bg-[linear-gradient(90deg,rgba(0,0,0,0)_0%,rgba(255,255,255,0.03)_20%,rgba(255,255,255,0.08)_50%,rgba(255,255,255,0.03)_80%,rgba(0,0,0,0)_100%)] before:caret-transparent before:text-black before:block before:text-base before:not-italic before:normal-nums before:font-normal before:h-full before:tracking-[normal] before:leading-4 before:list-outside before:list-disc before:outline-[3px] before:pointer-events-none before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-6/12 before:border-separate before:-left-full before:top-0 before:font-inter"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
