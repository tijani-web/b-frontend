import { Hero } from "@/sections/Hero";
import { TrendingCryptocurrencies } from "@/sections/TrendingCryptocurrencies";
import { TradingWay } from "@/sections/TradingWay";
import { AssetProtection } from "@/sections/AssetProtection";
import { GlobalVoices } from "@/sections/GlobalVoices";
import { Testimonials } from "@/sections/Testimonials";
import { EventsCarousel } from "@/sections/EventsCarousel";
import { PartnerLogos } from "@/sections/PartnerLogos";
import { Faq } from "@/sections/Faq";
import { Footer } from "@/sections/Footer";

export const MainContent = () => {
  return (
    <main className="box-border caret-transparent w-full outline-[3px] no-underline overflow-hidden">
      <div className="bg-black box-border caret-transparent text-slate-50 outline-[3px] no-underline font-blofinnova">
        <div className="box-border caret-transparent gap-x-10 flex flex-col outline-[3px] gap-y-10 no-underline md:gap-x-24 md:gap-y-24">
          <Hero />
          <TrendingCryptocurrencies />
          <TradingWay />
          <AssetProtection />
          <GlobalVoices />
          <Testimonials />
          <EventsCarousel />
          <PartnerLogos />
          <Faq />
        </div>
      </div>
      <Footer />
    </main>
  );
};
