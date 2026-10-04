import { SectionDivider } from "../../components/SectionDivider";
import { InvestmentStats } from "./components/InvestmentStats";
import { InvestmentBenefits } from "./components/InvestmentBenefits";

export const InvestmentOverview = () => {
  return (
    <section className="caret-transparent outline-[3px] relative no-underline mb-24 pt-24 px-7 md:px-20">
      <SectionDivider
        iconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-5-4.svg"
        iconAlt="Icon"
      />
      <div className="bg-[linear-gradient(rgba(255,136,0,0.047)_0%,rgba(0,0,0,0)_40.24%)] caret-transparent h-full opacity-30 outline-[3px] pointer-events-none absolute no-underline w-full z-[1] left-0 top-0"></div>
      <div className="bg-[position:0px_0px] caret-transparent max-w-[360px] outline-[3px] no-underline w-full mt-16 mx-auto md:max-w-[1062px]">
        <img
          alt="mission"
          src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/real-estate-mission.avif"
          className="aspect-[auto_1238_/_495] box-border text-transparent inline h-[280px] [mask-image:linear-gradient(rgb(0,0,0)_30%,rgba(0,0,0,0)_90%)] max-w-[360px] mix-blend-luminosity object-cover outline-[3px] no-underline align-baseline w-full rounded-t-xl md:h-[360px] md:max-w-none"
        />
        <div className="caret-transparent gap-x-16 flex flex-col justify-between max-w-[360px] outline-[3px] gap-y-16 no-underline w-full mx-auto md:flex-row md:max-w-none">
          <div className="caret-transparent max-w-full min-h-[auto] min-w-[auto] outline-[3px] no-underline md:max-w-[650px]">
            <p className="caret-transparent text-zinc-50 text-[28px] font-semibold leading-10 max-w-xs outline-[3px] text-center no-underline mx-auto font-mori md:text-[32px] md:leading-[48px] md:max-w-[500px] md:text-start md:mx-0">
              Creating a simple marketplace for seamless investing, where
              individuals and businesses alike can connect with the financial
              opportunities they seek.
            </p>
            <p className="caret-transparent text-gray-400 text-[15px] leading-6 max-w-xs outline-[3px] text-center no-underline mt-8 mx-auto font-inter md:text-base md:max-w-none md:text-start md:mx-0">
              Whether you&#39;re taking your first step into the investment
              world or looking to diversify your portfolio, we provide a
              transparent, user-friendly environment that fosters confidence and
              success. Our commitment to innovation and accessibility ensures
              that you have everything you need to make informed decisions and
              reach your financial goals.
              <br className="caret-transparent text-[15px] outline-[3px] text-center no-underline md:text-base md:text-start" />
              <br className="caret-transparent text-[15px] outline-[3px] text-center no-underline md:text-base md:text-start" />
              <br className="caret-transparent text-[15px] outline-[3px] text-center no-underline md:text-base md:text-start" />
              Join us and experience a new way of investing that puts you in
              control, simplifying the complex and making the path to financial
              growth more attainable than ever before.
            </p>
          </div>
          <InvestmentStats />
        </div>
        <InvestmentBenefits />
      </div>
    </section>
  );
};
