import { SectionDivider } from "../../components/SectionDivider";
import { StatsGrid } from "./components/StatsGrid";

export const PlatformSection = () => {
  return (
    <section className="caret-transparent outline-[3px] relative no-underline mb-24 pt-24 px-7 md:px-20">
      <SectionDivider />
      <div className="bg-[linear-gradient(rgba(255,136,0,0.047)_0%,rgba(0,0,0,0)_40.24%)] caret-transparent h-full opacity-30 outline-[3px] pointer-events-none absolute no-underline w-full z-[1] left-0 top-0"></div>
      <div className="bg-[position:0px_0px] caret-transparent max-w-[1062px] outline-[3px] no-underline w-full mt-16 mx-auto">
        <div className="caret-transparent gap-x-8 grid max-w-[360px] outline-[3px] gap-y-8 no-underline w-max mx-auto md:max-w-none">
          <img
            src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-6-7.svg"
            alt="Icon"
            className="caret-transparent h-[140px] outline-[3px] no-underline align-baseline w-[140px] mt-8 mx-auto -scale-x-100"
          />
          <div className="caret-transparent max-w-[800px] min-h-[auto] min-w-[auto] outline-[3px] no-underline">
            <p className="caret-transparent text-zinc-50 text-[28px] font-semibold leading-10 max-w-xs outline-[3px] text-center no-underline font-mori md:text-[40px] md:leading-[48px] md:max-w-none">
              The only platform you need to trade cryptocurrencies
            </p>
            <StatsGrid />
          </div>
          <div className="caret-transparent max-w-[800px] min-h-[auto] min-w-[auto] outline-[3px] no-underline w-full mt-0 md:mt-16">
            <p className="caret-transparent text-gray-400 text-[15px] leading-6 max-w-xs outline-[3px] no-underline font-inter md:text-base md:max-w-none">
              Enjoy trading and earning from a wide range of cryptocurrencies on
              our state-of-the-art platform. With access to real-time market
              data, comprehensive analysis tools, and dedicated customer
              support, we provide everything you need to navigate the dynamic
              world of digital currencies. Whether you&#39;re a seasoned trader
              or just starting out, our user-friendly interface and educational
              resources make it easy for you to engage with the crypto market.
              Join us and discover the potential for growth and innovation in
              this exciting financial frontier.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
