export const RewardsIntro = () => {
  return (
    <div className="items-center caret-transparent flex flex-col max-w-[800px] min-h-[auto] min-w-[auto] outline-[3px] no-underline mt-16 mx-auto md:mt-24">
      <p className="caret-transparent text-zinc-50 text-[28px] font-semibold leading-10 max-w-[360px] min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline font-mori md:text-[40px] md:leading-[48px] md:max-w-[500px]">
        Earn weekly staking rewards on your crypto. Easy, fast and reliable.
      </p>
      <div className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline w-max mt-8">
        <a
          href="https://app.BlofinPrime.com/stake"
          className="content-center items-center bg-amber-500 shadow-[rgba(113,50,245,0.2)_0px_2px_5px_0px,rgba(255,255,255,0.08)_0px_2px_3px_0px_inset] box-border caret-transparent text-zinc-50 gap-x-2 grid justify-center outline-[3px] relative gap-y-2 no-underline text-nowrap overflow-hidden px-3 py-2 rounded-xl"
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
