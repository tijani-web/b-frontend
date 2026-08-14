import { Hero } from "../Hero/index";
import { StepsSection } from "../StepsSection/index";
import { RewardsSection } from "../RewardsSection/index";
import { FaqSection } from "../FaqSection/index";
import { Footer } from "../Footer/index";

export const MainContent = () => {
  return (
    <main className="box-border caret-transparent max-w-[375px] outline-[3px] no-underline overflow-hidden md:max-w-screen-xl">
      <Hero />
      <StepsSection />
      <RewardsSection />
      <FaqSection />
      <Footer />
    </main>
  );
};
