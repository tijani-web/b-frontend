export const HeroContent = () => {
  return (
    <div className="items-center box-border caret-transparent gap-x-4 flex flex-col max-w-[400px] outline-[3px] relative gap-y-4 no-underline z-[4] mx-auto">
      <div className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline">
        <div className="items-center backdrop-blur-[2px] bg-violet-300/10 caret-transparent gap-x-1.5 flex outline-[3px] relative gap-y-1.5 no-underline w-max px-2 py-1 rounded-[120px]">
          <div className="caret-transparent outline-[3px] pointer-events-none absolute no-underline z-0 rounded-[120px] -inset-px">
            <img
              src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-13-4.svg"
              alt="Icon"
              className="caret-transparent inline h-full outline-[3px] no-underline align-baseline w-full"
            />
          </div>
          <p className="bg-clip-text bg-[linear-gradient(90deg,color(srgb_1_0.673333_0.3)_0%,color(srgb_1_0.626667_0.2)_100%)] caret-transparent text-sm leading-[18px] min-h-[auto] min-w-[auto] outline-[3px] relative no-underline z-[1]">
            Stocks
          </p>
        </div>
      </div>
      <h2 className="caret-transparent text-zinc-50 text-[32px] font-semibold leading-10 min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline font-mori md:text-[50px] md:leading-[58px]">
        Trade shares{" "}
        <span className="caret-transparent inline-block text-[32px] leading-10 outline-[3px] no-underline md:text-[50px] md:leading-[58px]">
          on our platform
        </span>
      </h2>
      <p className="caret-transparent text-slate-200 text-base leading-6 max-w-xs min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline md:text-lg md:leading-[26px] md:max-w-none">
        Invest in over 1,000 stocks and ETFs directly on our platform
      </p>
      <div className="items-center caret-transparent gap-x-3 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-3 no-underline w-max mt-6">
        <a
          href="https://app.BlofinPrime.com/register"
          className="content-center items-center bg-amber-500 shadow-[rgba(113,50,245,0.2)_0px_2px_5px_0px,rgba(255,255,255,0.08)_0px_2px_3px_0px_inset] box-border caret-transparent text-zinc-50 gap-x-2 grid justify-center min-h-[auto] min-w-[auto] outline-[3px] relative gap-y-2 no-underline text-nowrap overflow-hidden px-3 py-2 rounded-xl"
        >
          <div className="bg-[linear-gradient(rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_100%)] caret-transparent h-full outline-[3px] pointer-events-none absolute no-underline text-nowrap w-full left-0 top-0"></div>
          <p className="caret-transparent text-sm font-medium leading-5 min-h-[auto] min-w-[auto] outline-[3px] relative no-underline text-nowrap z-[1]">
            Get started
          </p>
        </a>
      </div>
    </div>
  );
};
