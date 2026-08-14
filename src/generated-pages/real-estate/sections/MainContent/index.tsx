import { Hero } from "../Hero/index";
import { InvestmentOverview } from "../InvestmentOverview/index";
import { FaqSection } from "../FaqSection/index";
import { Footer } from "../Footer/index";

export const MainContent = () => {
  return (
    <main className="box-border caret-transparent max-w-[375px] outline-[3px] no-underline overflow-hidden md:max-w-screen-xl">
      <Hero />
      <InvestmentOverview />
      <FaqSection />
      <Footer />
    </main>
  );
};
