import { HeroBackground } from "@/sections/Hero/components/HeroBackground";
import { HeroCta } from "@/sections/Hero/components/HeroCta";

export const Hero = () => {
  return (
    <section
      aria-label="Home hero"
      className="box-border caret-transparent shrink-0 min-h-[auto] min-w-[auto] outline-[3px] overflow-x-hidden overflow-y-auto relative no-underline w-full"
    >
      <div className="bg-black box-border caret-transparent h-[780px] max-h-[780px] min-h-[780px] outline-[3px] relative no-underline w-full overflow-hidden">
        <HeroBackground />
        <div className="bg-[linear-gradient(rgba(0,0,0,0.55)_0%,rgba(0,0,0,0)_20%),linear-gradient(to_top,rgb(0,0,0)_0%,rgba(0,0,0,0)_50%)] bg-[position:0%_0%,0%_0%] bg-size-[auto,auto] box-border caret-transparent outline-[3px] pointer-events-none absolute no-underline z-[2] inset-0"></div>
        <div className="items-center box-border caret-transparent flex flex-col h-full justify-end outline-[3px] relative no-underline z-[3] pb-16 px-4 md:pb-20">
          <div className="items-center box-border caret-transparent gap-x-6 flex flex-col max-w-full min-h-[auto] min-w-[auto] outline-[3px] gap-y-6 text-center no-underline w-full md:max-w-[1200px]">
            <div className="items-center box-border caret-transparent gap-x-3 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-3 no-underline">
              <h1 className="box-border caret-transparent text-white text-[40px] font-medium tracking-[-1.2px] leading-[43.2px] min-h-[auto] min-w-[auto] outline-[3px] no-underline capitalize w-full md:text-[112px] md:tracking-[-3.36px] md:leading-[120.96px]">
                Where whales are made
              </h1>
            </div>
            <HeroCta />
          </div>
        </div>
      </div>
    </section>
  );
};
