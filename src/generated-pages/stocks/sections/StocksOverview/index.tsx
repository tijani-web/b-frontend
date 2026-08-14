import { SectionDivider } from "../../components/SectionDivider";
import { FeatureCard } from "./components/FeatureCard";
import { PortfolioShowcase } from "./components/PortfolioShowcase";

export const StocksOverview = () => {
  return (
    <section className="caret-transparent outline-[3px] relative no-underline pt-16 px-7 md:pt-24 md:px-20">
      <SectionDivider />
      <div className="bg-[linear-gradient(rgba(255,136,0,0.047)_0%,rgba(0,0,0,0)_40.24%)] caret-transparent h-full opacity-30 outline-[3px] pointer-events-none absolute no-underline w-full z-[1] left-0 top-0"></div>
      <div className="bg-[position:0px_0px] box-border caret-transparent max-w-[1062px] outline-[3px] no-underline w-full mt-0 mx-auto md:mt-16">
        <div className="caret-transparent gap-x-8 flex flex-col outline-[3px] gap-y-8 no-underline mx-auto">
          <div className="items-center caret-transparent flex flex-col max-w-[360px] min-h-[auto] min-w-[auto] outline-[3px] no-underline mt-16 mx-auto md:max-w-[800px] md:mt-0">
            <p className="caret-transparent text-zinc-50 text-[28px] font-semibold leading-10 max-w-[360px] min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline font-mori md:text-[40px] md:leading-[48px] md:max-w-none">
              From blue chips to breakthroughs, you can invest in your favorite
              stocks &amp; ETFs.
            </p>
            <div className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline w-max mt-8">
              <a
                href="https://app.BlofinPrime.com/register"
                className="content-center items-center bg-amber-500 shadow-[rgba(113,50,245,0.2)_0px_2px_5px_0px,rgba(255,255,255,0.08)_0px_2px_3px_0px_inset] box-border caret-transparent text-zinc-50 gap-x-2 grid justify-center outline-[3px] relative gap-y-2 no-underline text-nowrap overflow-hidden px-3 py-2 rounded-xl"
              >
                <div className="bg-[linear-gradient(rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_100%)] caret-transparent h-full outline-[3px] pointer-events-none absolute no-underline text-nowrap w-full left-0 top-0"></div>
                <p className="caret-transparent text-sm font-medium leading-5 min-h-[auto] min-w-[auto] outline-[3px] relative no-underline text-nowrap z-[1]">
                  See all stocks
                </p>
              </a>
            </div>
          </div>
          <div className="caret-transparent h-16 min-h-[auto] min-w-[auto] outline-[3px] no-underline w-full md:h-24"></div>
          <div className="box-border caret-transparent flex flex-col h-full max-w-[360px] min-h-[auto] min-w-[auto] outline-[3px] relative no-underline w-full mx-auto md:box-content md:flex-row md:max-w-none md:mx-0">
            <img
              src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-15-3.svg"
              alt="Icon"
              className="caret-transparent h-px outline-[3px] pointer-events-none absolute no-underline translate-x-[-50.0%] align-baseline w-full left-2/4 right-auto top-0 md:transform-none md:w-auto md:inset-x-0"
            />
            <img
              src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-16-3.svg"
              alt="Icon"
              className="caret-transparent h-px outline-[3px] pointer-events-none absolute no-underline translate-x-[-50.0%] align-baseline w-full left-2/4 right-auto bottom-0 md:transform-none md:w-auto md:inset-x-0"
            />
            <FeatureCard
              className="pr-0 py-0"
              title="Commission free"
              description="Trade stocks and ETFs with zero trade fees and commissions."
              imageAlt="one intuitive platform"
              imageSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/commission-free.png"
            />
            <div className="caret-transparent hidden h-full outline-[3px] pointer-events-none absolute no-underline transform-none w-px left-2/4 top-0 md:block md:translate-x-[-50.0%]">
              <img
                src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-17-1.svg"
                alt="Icon"
                className="caret-transparent inline outline-[3px] no-underline align-baseline"
              />
            </div>
            <FeatureCard
              className="p-0 md:pl-[52px]"
              title="One intuitive platform"
              description="Invest in stocks, ETFs, derivatives, and crypto side by side."
              imageAlt="one intuitive platform"
              imageSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/one-platform.png"
            />
          </div>
          <PortfolioShowcase />
        </div>
      </div>
    </section>
  );
};
