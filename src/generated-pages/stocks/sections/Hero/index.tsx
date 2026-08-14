import { HeroIconCarousel } from "./components/HeroIconCarousel";
import { HeroContent } from "./components/HeroContent";

export const Hero = () => {
  return (
    <section className="caret-transparent outline-[3px] relative no-underline py-24 md:pt-40 md:pb-[200px]">
      <div className="caret-transparent flex justify-center ml-[-187.5px] mr-[-187.5px] outline-[3px] relative no-underline w-screen inset-x-2/4 md:ml-[-640px] md:mr-[-640px]">
        <HeroIconCarousel />
      </div>
      <HeroContent />
    </section>
  );
};
