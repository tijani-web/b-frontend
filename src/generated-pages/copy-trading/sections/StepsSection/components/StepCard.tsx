export type StepCardProps = {
  iconUrl: string;
  stepNumber: string;
  title: string;
  description: string;
};

export const StepCard = (props: StepCardProps) => {
  return (
    <div className="bg-stone-950 box-border caret-transparent flex flex-col h-full justify-between min-h-[220px] min-w-[auto] outline-[3px] relative no-underline w-full p-6 rounded-xl">
      <img
        src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-9.svg"
        alt="Icon"
        className="caret-transparent h-full [mask-image:linear-gradient(rgb(0,0,0)_50%,rgba(0,0,0,0)_100%)] opacity-[0.46] outline-[3px] absolute no-underline align-baseline w-full z-[1] left-0 top-0"
      />
      <img
        src={props.iconUrl}
        alt="Icon"
        className="caret-transparent h-full outline-[3px] pointer-events-none absolute no-underline align-baseline w-full left-0 top-0"
      />
      <div className="content-center bg-[#ff6a00] caret-transparent grid h-6 justify-center min-h-[auto] min-w-[auto] outline-[3px] no-underline w-6 rounded-[100%]">
        <p className="caret-transparent text-zinc-50 text-[13px] font-medium leading-[13px] min-h-[auto] min-w-[auto] outline-[3px] no-underline font-mori">
          {props.stepNumber}
        </p>
      </div>
      <div className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline">
        <div className="caret-transparent outline-[3px] no-underline">
          <p className="caret-transparent text-zinc-50 text-[15px] font-medium leading-[15px] outline-[3px] no-underline font-inter">
            {props.title}
          </p>
          <p className="caret-transparent text-slate-300 text-[15px] leading-5 outline-[3px] no-underline mt-2 font-inter">
            {props.description}
          </p>
        </div>
      </div>
    </div>
  );
};
