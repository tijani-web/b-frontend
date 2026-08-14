import { HeroBadge } from "./components/HeroBadge";
import { HeroCta } from "./components/HeroCta";
import { HeroImage } from "./components/HeroImage";

export const Hero = () => {
  return (
    <div className="box-border caret-transparent max-w-[1440px] outline-[3px] no-underline mx-auto px-7 md:px-20">
      <section className="caret-transparent outline-[3px] relative no-underline py-24 md:py-[165px]">
        <div className="items-center box-border caret-transparent gap-x-4 flex flex-col max-w-[650px] outline-[3px] relative gap-y-4 no-underline z-[4] mx-auto">
          <HeroBadge />
          <h2 className="caret-transparent text-zinc-50 text-[32px] font-semibold leading-10 min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline font-mori md:text-6xl md:leading-[66px]">
            Follow, copy, profit.
          </h2>
          <p className="caret-transparent text-slate-200 text-base leading-6 max-w-xs min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline md:text-lg md:leading-[26px] md:max-w-none">
            Copy proven traders on autopilot in one-click
          </p>
          <HeroCta />
        </div>
        <HeroImage />
      </section>
      <div className="caret-transparent h-full [mask-clip:border-box,border-box,border-box,border-box] [mask-composite:intersect,intersect,intersect,intersect] [mask-image:linear-gradient(rgb(0,0,0)_50%,rgba(0,0,0,0)_80%),linear-gradient(to_top,rgb(0,0,0)_90%,rgba(0,0,0,0)_100%),linear-gradient(to_left,rgb(0,0,0)_90%,rgba(0,0,0,0)_100%),linear-gradient(to_right,rgb(0,0,0)_90%,rgba(0,0,0,0)_100%)] [mask-mode:match-source,match-source,match-source,match-source] [mask-origin:border-box,border-box,border-box,border-box] [mask-position:0%_0%,0%_0%,0%_0%,0%_0%] [mask-repeat:repeat,repeat,repeat,repeat] [mask-size:auto,auto,auto,auto] outline-[3px] pointer-events-none absolute no-underline w-full [mask-position:0%,0%,0%,0%] left-0 top-0">
        <div className="caret-transparent h-full opacity-10 outline-[3px] no-underline w-full z-[-1]">
          <div className="caret-transparent h-full outline-[3px] relative no-underline w-full overflow-hidden">
            <img
              src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/image-1.png"
              className="aspect-[auto_1280_/_1000] caret-transparent h-full outline-[3px] no-underline align-baseline w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
