import { HeroBadge } from "./components/HeroBadge";
import { HeroCta } from "./components/HeroCta";

export const HeroSection = () => {
  return (
    <div className="box-border caret-transparent max-w-[1440px] outline-[3px] no-underline mx-auto px-7 md:px-20">
      <div className="caret-transparent h-full outline-[3px] absolute no-underline w-full z-[-2] left-0 top-0">
        <div className="caret-transparent h-full outline-[3px] pointer-events-none relative no-underline w-full z-[3] overflow-hidden">
          <img
            src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/image-1.png"
            className="caret-black block h-auto outline-0 align-middle w-auto md:aspect-[auto_1280_/_1000] md:caret-transparent md:inline md:h-[1000px] md:outline-[3px] md:overscroll-x-auto md:overscroll-y-auto md:snap-align-none md:snap-normal md:snap-none md:no-underline md:decoration-auto md:underline-offset-auto md:align-baseline md:w-screen md:[mask-position:0%] md:scroll-m-0 md:scroll-p-[auto]"
          />
        </div>
      </div>
      <section className="caret-transparent outline-[3px] relative no-underline py-24 md:py-40">
        <div className="items-center box-border caret-transparent gap-x-4 flex flex-col max-w-[480px] outline-[3px] relative gap-y-4 no-underline z-[4] mx-auto md:max-w-[650px]">
          <HeroBadge />
          <h2 className="caret-transparent text-zinc-50 text-[32px] font-semibold leading-10 min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline font-mori md:text-6xl md:leading-[66px]">
            Stake your crypto
            <span className="caret-transparent inline-block text-[32px] leading-10 outline-[3px] no-underline md:text-6xl md:leading-[66px]">
              and earn rewards
            </span>
          </h2>
          <p className="caret-transparent text-slate-200 text-base leading-6 max-w-xs min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline md:text-lg md:leading-[26px] md:max-w-none">
            Earn daily reward by staking your crypto
          </p>
          <HeroCta />
          <div className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline">
            <img
              src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-5-2.svg"
              alt="Icon"
              className="caret-transparent inline h-[150px] outline-[3px] no-underline align-baseline w-[150px] mt-8 md:h-[250px] md:w-[250px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
