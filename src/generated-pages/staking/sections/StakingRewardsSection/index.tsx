import { SectionDivider } from "../../components/SectionDivider";
import { RewardsIntro } from "./components/RewardsIntro";
import { RewardsSteps } from "./components/RewardsSteps";
import { PlatformShowcase } from "./components/PlatformShowcase";

export const StakingRewardsSection = () => {
  return (
    <section className="caret-transparent outline-[3px] relative no-underline pt-16 px-7 md:pt-24 md:px-20">
      <SectionDivider />
      <div className="bg-[linear-gradient(rgba(255,136,0,0.047)_0%,rgba(0,0,0,0)_40.24%)] caret-transparent h-full opacity-30 outline-[3px] pointer-events-none absolute no-underline w-full z-[1] left-0 top-0"></div>
      <div className="bg-[position:0px_0px] box-border caret-transparent outline-[3px] no-underline w-full mt-0 mx-auto md:mt-16">
        <div className="caret-transparent gap-x-8 grid outline-[3px] gap-y-8 no-underline mx-auto">
          <RewardsIntro />
          <div className="caret-transparent h-16 min-h-[auto] min-w-[auto] outline-[3px] no-underline w-full md:h-24"></div>
          <RewardsSteps />
          <PlatformShowcase />
        </div>
      </div>
    </section>
  );
};
