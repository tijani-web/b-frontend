import { Hero } from "../Hero/index";
import { PlatformSection } from "../PlatformSection/index";
import { BenefitsSection } from "../BenefitsSection/index";
import { FaqSection } from "../FaqSection/index";
import { Footer } from "@/sections/Footer";

export const MainContent = () => {
  return (
    <main className="box-border caret-transparent max-w-[375px] outline-[3px] no-underline overflow-hidden md:max-w-screen-xl">
      <Hero />
      <PlatformSection />
      <BenefitsSection />
      <FaqSection />
      <Footer />
    </main>
  );
};
