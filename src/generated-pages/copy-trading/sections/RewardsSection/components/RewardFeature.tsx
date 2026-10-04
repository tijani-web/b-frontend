export type RewardFeatureProps = {
  rootClassName: string;
  showDecorativeIcon: boolean;
  decorativeIconSrc: string;
  decorativeIconClassName: string;
  backgroundIconSrc: string;
  featureIconSrc: string;
  title: string;
  description: string;
};

export const RewardFeature = (props: RewardFeatureProps) => {
  return (
    <div
      className={`box-border caret-transparent grid-cols-[1fr] max-w-[360px] min-h-[auto] min-w-[auto] outline-[3px] relative no-underline w-full mx-auto p-7 md:grid-cols-none md:max-w-none md:mx-0 md:p-11 after:accent-auto after:bg-slate-200 after:caret-transparent after:text-black after:hidden after:text-base after:not-italic after:normal-nums after:font-normal after:h-2.5 after:tracking-[normal] after:leading-4 after:list-outside after:list-disc after:mr-[-0.5px] after:opacity-[0.72] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:w-px after:z-[1] after:rounded-xl after:border-separate after:right-0 after:top-2/4 after:font-inter ${props.rootClassName}`}
    >
      {props.showDecorativeIcon ? (
        <img
          src={props.decorativeIconSrc}
          alt="Icon"
          className={props.decorativeIconClassName}
        />
      ) : null}
      <img
        src={props.backgroundIconSrc}
        alt="Icon"
        className="caret-transparent hidden outline-[3px] pointer-events-none absolute no-underline align-baseline w-px left-0 inset-y-0 md:block"
      />
      <div className="items-center box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2 no-underline md:[align-items:normal]">
        <span className="items-center caret-transparent gap-x-1.5 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-1.5 no-underline">
          <img
            src={props.featureIconSrc}
            alt="Icon"
            className="caret-transparent text-[#ff6a00] h-[18px] outline-[3px] no-underline align-baseline w-[18px]"
          />
          <p className="caret-transparent text-zinc-50 text-sm font-semibold leading-[18px] min-h-[auto] min-w-[auto] outline-[3px] no-underline font-mori">
            {props.title}
          </p>
        </span>
        <p className="caret-transparent text-gray-400 text-sm leading-[22px] min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline font-inter md:text-start">
          {props.description}
        </p>
      </div>
    </div>
  );
};
