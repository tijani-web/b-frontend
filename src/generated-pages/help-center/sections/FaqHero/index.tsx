import { FaqSearchFilters } from "./components/FaqSearchFilters";

export const FaqHero = () => {
  return (
    <section className="caret-transparent outline-[3px] relative no-underline py-24 md:py-[165px]">
      <div className="items-center box-border caret-transparent gap-x-4 flex flex-col max-w-[650px] outline-[3px] relative gap-y-4 no-underline z-[4] mx-auto">
        <div className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline">
          <div className="items-center backdrop-blur-[2px] bg-violet-300/10 caret-transparent gap-x-1.5 flex outline-[3px] relative gap-y-1.5 no-underline w-max px-2 py-1 rounded-[120px]">
            <div className="caret-transparent outline-[3px] pointer-events-none absolute no-underline z-0 rounded-[120px] -inset-px">
              <img
                src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-4-1.svg"
                alt="Icon"
                className="caret-transparent inline h-full outline-[3px] no-underline align-baseline w-full"
              />
            </div>
            <p className="bg-clip-text bg-[linear-gradient(90deg,color(srgb_1_0.673333_0.3)_0%,color(srgb_1_0.626667_0.2)_100%)] caret-transparent text-sm leading-[18px] min-h-[auto] min-w-[auto] outline-[3px] relative no-underline z-[1]">
              Help Center
            </p>
          </div>
        </div>
        <h2 className="caret-transparent text-zinc-50 text-[32px] font-semibold leading-10 min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline font-mori md:text-6xl md:leading-[66px]">
          Frequently Asked Questions.
        </h2>
        <p className="caret-transparent text-slate-200 text-base leading-6 max-w-xs min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline md:text-lg md:leading-[26px] md:max-w-none">
          Got Questions? Answers and advice from the Team
        </p>
      </div>
      <FaqSearchFilters />
    </section>
  );
};
