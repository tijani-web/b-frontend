import { EventCard } from "@/sections/EventsCarousel/components/EventCard";
import { CarouselDots } from "@/sections/EventsCarousel/components/CarouselDots";

export const EventsCarousel = () => {
  return (
    <section className="bg-black box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] overflow-x-hidden overflow-y-auto relative no-underline w-full">
      <div className="box-border caret-transparent max-w-full outline-[3px] no-underline w-full mx-auto px-4 md:max-w-[1200px] md:px-0">
        <div className="box-border caret-transparent gap-x-6 flex flex-col outline-[3px] gap-y-6 text-center no-underline w-full mb-8 md:mb-12">
          <h2 className="box-border caret-transparent text-white text-[28px] font-medium tracking-[-0.7px] leading-[34px] min-h-[auto] min-w-[auto] outline-[3px] no-underline md:text-7xl md:tracking-[-1.8px] md:leading-[90px]">
            Whale Move, World Groove
          </h2>
          <p className="box-border caret-transparent text-violet-100/80 text-xs leading-[18px] max-w-[1360px] min-h-[auto] min-w-[auto] outline-[3px] no-underline mx-auto md:text-2xl md:leading-[34px]">
            Capturing our presence across global events and communities
          </p>
        </div>
      </div>
      <div
        role="region"
        aria-label="Community activities"
        className="box-border caret-transparent max-w-[375px] outline-[3px] relative no-underline w-screen left-2/4 md:max-w-screen-xl"
      >
        <div className="box-border caret-transparent outline-[3px] relative no-underline w-full overflow-hidden">
          <div className="box-border caret-transparent flex h-[90px] justify-center outline-[3px] pointer-events-none absolute no-underline z-30 overflow-hidden top-0 inset-x-0">
            <div className="bg-black box-border caret-transparent h-[140px] outline-[3px] absolute no-underline translate-x-[-50.0%] translate-y-[-68.0%] w-[122%] rounded-[50%] left-2/4 top-0"></div>
          </div>
          <div className="box-border caret-transparent flex h-[90px] justify-center outline-[3px] pointer-events-none absolute no-underline z-30 overflow-hidden bottom-0 inset-x-0">
            <div className="bg-black box-border caret-transparent h-[140px] outline-[3px] absolute no-underline translate-x-[-50.0%] translate-y-[68.0%] w-[122%] rounded-[50%] left-2/4 bottom-0"></div>
          </div>
          <div className="box-border caret-transparent outline-[3px] relative no-underline z-10 overflow-hidden py-2 md:py-0">
            <div className="box-border caret-transparent max-w-[1860px] outline-[3px] relative no-underline w-full overflow-hidden mx-auto">
              <div className="box-border caret-transparent gap-x-10 flex justify-center outline-[3px] relative gap-y-10 no-underline w-full overflow-hidden">
                <EventCard
                  href="https://app.BlofinPrime.com/"
                  ariaLabel="TOKEN2049 SG"
                  imageUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/J5nFYM2a66Q7.png"
                  imageAlt="TOKEN2049 SG"
                  title="TOKEN2049 SG"
                />
                <EventCard
                  href="https://app.BlofinPrime.com/"
                  ariaLabel="TOKEN2049"
                  imageUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/tjeAyPjm2t15.png"
                  imageAlt="TOKEN2049"
                  title="TOKEN2049"
                />
                <EventCard
                  href="https://app.BlofinPrime.com/"
                  ariaLabel="Whales Bash in Barcelona"
                  imageUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/54KJ8p4HbY77.png"
                  imageAlt="Whales Bash in Barcelona"
                  title="Whales Bash in Barcelona"
                />
                <EventCard
                  href="https://app.BlofinPrime.com/"
                  ariaLabel="TOKEN2049"
                  imageUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/b52HBCSRA6Ex.png"
                  imageAlt="TOKEN2049"
                  title="TOKEN2049"
                />
                <EventCard
                  href="https://app.BlofinPrime.com/"
                  ariaLabel="Whale's Rave: Arcadia"
                  imageUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/9Jj95TRWK4jY.png"
                  imageAlt="Whale's Rave: Arcadia"
                  title="Whale's Rave: Arcadia"
                />
              </div>
            </div>
          </div>
        </div>
        <CarouselDots />
      </div>
    </section>
  );
};
