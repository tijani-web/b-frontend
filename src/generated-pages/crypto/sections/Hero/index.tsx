import { HeroBadge } from "./components/HeroBadge";
import { HeroCta } from "./components/HeroCta";
import { HeroArtwork } from "./components/HeroArtwork";

export const Hero = () => {
  return (
    <div className="box-border caret-transparent max-w-[1440px] outline-[3px] no-underline mx-auto px-7 md:px-20">
      <section className="caret-transparent max-h-[500px] outline-[3px] relative no-underline overflow-hidden py-24 md:max-h-[650px] md:py-[165px]">
        <div className="items-center box-border caret-transparent gap-x-4 flex flex-col max-w-[550px] outline-[3px] relative gap-y-4 no-underline z-[4] mx-auto">
          <HeroBadge />
          <h2 className="caret-transparent text-zinc-50 text-[32px] font-semibold leading-10 min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline font-mori md:text-5xl md:leading-[52px]">
            Trade cryptocurrencies
            <span className="caret-transparent inline-block text-[32px] leading-10 outline-[3px] no-underline md:text-5xl md:leading-[52px]">
              on our platform
            </span>
          </h2>
          <p className="caret-transparent text-slate-200 text-base leading-6 max-w-xs min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline md:text-lg md:leading-[26px] md:max-w-none">
            Start trading cryptocurrencies quickly, easily and safely from
            wherever you are, in just seconds.
          </p>
          <HeroCta />
        </div>
        <div className="bg-[radial-gradient(circle,rgb(0,0,0)_15%,rgba(0,0,0,0)_100%)] caret-transparent h-full outline-[3px] absolute no-underline w-full z-[3] left-0 top-0"></div>
        <HeroArtwork />
      </section>
    </div>
  );
};
