import { MarketsHero } from "../MarketsHero/index";
import { Footer } from "@/sections/Footer";

export const MainContent = () => {
  return (
    <main className="box-border caret-transparent max-w-[375px] outline-[3px] no-underline overflow-hidden md:max-w-screen-xl">
      <div className="box-border caret-transparent max-w-[1440px] outline-[3px] no-underline mx-auto px-7 md:px-20">
        <MarketsHero />
      </div>
      <Footer />
    </main>
  );
};
