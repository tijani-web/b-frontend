import { HeroBadge } from "./components/HeroBadge";
import { HeroCta } from "./components/HeroCta";
import { HeroMedia } from "./components/HeroMedia";

export const Hero = () => {
  return (
    <div className="box-border caret-transparent max-w-[1440px] outline-[3px] no-underline mx-auto px-7 md:px-20">
      <section className="caret-transparent max-h-[500px] outline-[3px] relative no-underline overflow-hidden py-24 md:max-h-[650px] md:py-[165px]">
        <div className="items-center box-border caret-transparent gap-x-4 flex flex-col max-w-[360px] outline-[3px] relative gap-y-4 no-underline z-[4] mx-auto md:max-w-[450px]">
          <HeroBadge />
          <h2 className="caret-transparent text-zinc-50 text-[32px] font-semibold leading-10 min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline font-mori md:text-5xl md:leading-[52px]">
            A new way to invest in real estate.
          </h2>
          <p className="caret-transparent text-slate-200 text-base leading-6 max-w-xs min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline md:text-lg md:leading-[26px] md:max-w-none">
            We&#39;re providing an easier way to build a real estate portfolio,
            no landlording required.
          </p>
          <HeroCta />
        </div>
        <div className="caret-transparent outline-[3px] no-underline"></div>
        <HeroMedia />
      </section>
    </div>
  );
};
