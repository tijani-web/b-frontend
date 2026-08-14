import { FeaturedArticle } from "@/sections/GlobalVoices/components/FeaturedArticle";
import { NewsCard } from "@/sections/GlobalVoices/components/NewsCard";

export const GlobalVoices = () => {
  return (
    <section className="bg-black box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] relative no-underline w-full">
      <div className="items-center box-border caret-transparent gap-x-10 flex flex-col max-w-full outline-[3px] gap-y-10 no-underline w-full mx-auto px-4 py-6 md:max-w-[1200px] md:px-0 md:py-20">
        <div className="box-border caret-transparent gap-x-4 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 text-center no-underline w-full">
          <h2 className="box-border caret-transparent text-white text-[28px] font-medium tracking-[-0.7px] leading-[34px] min-h-[auto] min-w-[auto] outline-[3px] no-underline md:text-7xl md:tracking-[-1.8px] md:leading-[90px]">
            Global Voices, Shared Narrative
          </h2>
          <p className="box-border caret-transparent text-violet-100/60 text-xs leading-[18px] max-w-[900px] min-h-[auto] min-w-[auto] outline-[3px] no-underline mx-auto md:text-2xl md:leading-[34px]">
            Global perspectives shaping a shared recognition of our vision
          </p>
        </div>
        <div className="items-center box-border caret-transparent gap-x-6 flex flex-col h-auto justify-normal min-h-[auto] min-w-[auto] outline-[3px] gap-y-6 no-underline w-full md:flex-row md:h-[548px] md:justify-center md:min-h-0">
          <FeaturedArticle />
          <div className="box-border caret-transparent gap-x-6 flex basis-auto flex-col grow-0 justify-normal min-h-[auto] min-w-[auto] order-2 outline-[3px] gap-y-6 no-underline w-full md:contents md:basis-[0%] md:grow md:justify-center md:min-h-0 md:min-w-0">
            <NewsCard
              href="https://app.BlofinPrime.com/"
              cardVariant="md:order-1"
              title="Futures performance rivals top exchanges across BTC, ETH, and leading altcoins"
              description="A significant milestone in futures market performance, establishing a top-tier competitor in both liquidity and trade execution quality."
              imageUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/t7JR3iaWf7wM.png"
            />
            <NewsCard
              href="https://app.BlofinPrime.com/"
              cardVariant="md:order-3"
              title="Empowering users with a coin-margined perpetual trading solution"
              description="A user-centric innovation: the launch of coin-margined perpetual contracts for leading crypto assets including Bitcoin (BTC)."
              imageUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/5pF282biYda7.jpeg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
