import { Hero } from "../Hero/index";
import { MissionSection } from "../MissionSection/index";
import { BenefitsSection } from "../BenefitsSection/index";
import { TestimonialsSection } from "../TestimonialsSection/index";
import { Footer } from "../Footer/index";

export const MainContent = () => {
  return (
    <main className="box-border caret-transparent max-w-[375px] outline-[3px] no-underline overflow-hidden md:max-w-screen-xl">
      <div className="box-border caret-transparent max-w-[1440px] outline-[3px] no-underline mx-auto px-7 md:px-20">
        <div className="caret-transparent h-full outline-[3px] absolute no-underline w-full z-[-2] left-0 top-0">
          <div className="caret-transparent h-full outline-[3px] pointer-events-none relative no-underline w-full z-[3] overflow-hidden">
            <img
              src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/image-1.png"
              className="caret-black block h-auto outline-0 align-middle w-auto md:aspect-[auto_1280_/_1000] md:caret-transparent md:inline md:h-[1000px] md:outline-[3px] md:overscroll-x-auto md:overscroll-y-auto md:snap-align-none md:snap-normal md:snap-none md:no-underline md:decoration-auto md:underline-offset-auto md:align-baseline md:w-screen md:[mask-position:0%] md:scroll-m-0 md:scroll-p-[auto]"
            />
          </div>
        </div>
        <Hero />
      </div>
      <MissionSection />
      <BenefitsSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
};
