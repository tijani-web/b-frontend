export const StepsHeader = () => {
  return (
    <div className="items-center box-border caret-transparent gap-x-4 flex flex-col max-w-[400px] outline-[3px] relative gap-y-4 no-underline mx-auto md:max-w-[550px]">
      <div className="items-center backdrop-blur-[2px] bg-violet-300/10 caret-transparent gap-x-1.5 flex min-h-[auto] min-w-[auto] outline-[3px] relative gap-y-1.5 no-underline w-max px-2 py-1 rounded-[120px]">
        <div className="caret-transparent outline-[3px] pointer-events-none absolute no-underline z-0 rounded-[120px] -inset-px">
          <img
            src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-6-9.svg"
            alt="Icon"
            className="caret-transparent inline h-full outline-[3px] no-underline align-baseline w-full"
          />
        </div>
        <p className="bg-clip-text bg-[linear-gradient(90deg,color(srgb_1_0.673333_0.3)_0%,color(srgb_1_0.626667_0.2)_100%)] caret-transparent text-sm leading-[18px] min-h-[auto] min-w-[auto] outline-[3px] relative no-underline z-[1]">
          Easy to setup
        </p>
      </div>
      <h2 className="caret-transparent text-zinc-50 text-[32px] font-semibold leading-10 min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline font-mori md:text-5xl md:leading-[52px]">
        Get started with copy trading in 3 easy steps
      </h2>
    </div>
  );
};
