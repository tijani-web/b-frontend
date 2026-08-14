import { SectionDivider } from "../../components/SectionDivider";
import { SectionHeader } from "../../components/SectionHeader";
import { BenefitsGrid } from "./components/BenefitsGrid";

export const BenefitsSection = () => {
  return (
    <section className="caret-transparent outline-[3px] relative no-underline mb-24 pt-24 px-7 md:px-20">
      <SectionDivider />
      <div className="bg-[linear-gradient(rgba(255,136,0,0.047)_0%,rgba(0,0,0,0)_40.24%)] caret-transparent h-full opacity-30 outline-[3px] pointer-events-none absolute no-underline w-full z-[1] left-0 top-0"></div>
      <SectionHeader />
      <BenefitsGrid />
    </section>
  );
};
