import { FaqHero } from "../FaqHero/index";

export const MainContent = () => {
  return (
    <main className="box-border caret-transparent max-w-[375px] outline-[3px] no-underline overflow-hidden md:max-w-screen-xl">
      <div className="box-border caret-transparent max-w-[1440px] outline-[3px] no-underline mx-auto px-7 md:px-20">
        <FaqHero />
      </div>
      <footer className="caret-transparent outline-[3px] relative no-underline mb-[90px] pt-12 px-7 md:mb-[180px] md:px-20">
        <div className="bg-[linear-gradient(rgba(255,136,0,0.047)_0%,rgba(0,0,0,0)_40.24%)] caret-transparent h-full opacity-30 outline-[3px] pointer-events-none absolute no-underline w-full z-[1] left-0 top-0"></div>
        <div className="caret-transparent [mask-image:linear-gradient(rgb(0,0,0)_95%,rgba(0,0,0,0)_100%)] max-w-[480px] outline-[3px] relative no-underline mx-auto pb-12 md:max-w-[1200px]">
          <div className="caret-transparent gap-x-16 flex flex-col justify-between outline-[3px] relative gap-y-16 no-underline mt-0 mx-auto pb-16 px-2 md:gap-x-[normal] md:flex-row md:gap-y-[normal] md:mt-[120px] md:px-20">
            <img
              src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-8-1.svg"
              alt="Icon"
              className="caret-transparent h-px outline-[3px] pointer-events-none absolute no-underline align-baseline bottom-0 inset-x-0"
            />
            <a
              href="/"
              className="caret-transparent text-blue-700 block min-h-[auto] min-w-[auto] outline-[3px] underline"
            >
              <div className="caret-transparent outline-[3px] no-underline">
                <img
                  src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-9-1.svg"
                  alt="Icon"
                  className="caret-transparent text-zinc-50 inline h-8 outline-[3px] no-underline align-baseline"
                />
              </div>
            </a>
            <div className="caret-transparent gap-x-16 flex flex-wrap min-h-[auto] min-w-[auto] outline-[3px] gap-y-16 no-underline w-full md:flex-nowrap md:w-auto">
              <div className="caret-transparent flex flex-col min-h-[auto] min-w-[auto] outline-[3px] no-underline">
                <p className="caret-transparent text-zinc-50 text-[13px] font-medium leading-5 min-h-[auto] min-w-[auto] outline-[3px] no-underline font-inter">
                  Explore
                </p>
                <ul className="caret-transparent gap-x-4 flex flex-col list-none min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 no-underline mt-3 pl-0">
                  <li className="caret-transparent text-[13px] leading-5 min-h-[auto] min-w-[auto] outline-[3px] no-underline font-inter">
                    <a
                      href="/staking"
                      className="caret-transparent text-slate-300 outline-[3px] no-underline"
                    >
                      Staking
                    </a>
                  </li>
                  <li className="caret-transparent text-[13px] leading-5 min-h-[auto] min-w-[auto] outline-[3px] no-underline font-inter">
                    <a
                      href="/markets"
                      className="caret-transparent text-slate-300 outline-[3px] no-underline"
                    >
                      Markets
                    </a>
                  </li>
                  <li className="caret-transparent text-[13px] leading-5 min-h-[auto] min-w-[auto] outline-[3px] no-underline font-inter">
                    <a
                      href="/real-estate"
                      className="caret-transparent text-slate-300 outline-[3px] no-underline"
                    >
                      Real Estate
                    </a>
                  </li>
                </ul>
              </div>
              <div className="caret-transparent flex flex-col min-h-[auto] min-w-[auto] outline-[3px] no-underline">
                <p className="caret-transparent text-zinc-50 text-[13px] font-medium leading-5 min-h-[auto] min-w-[auto] outline-[3px] no-underline font-inter">
                  Company
                </p>
                <ul className="caret-transparent gap-x-4 flex flex-col list-none min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 no-underline mt-3 pl-0">
                  <li className="caret-transparent text-[13px] leading-5 min-h-[auto] min-w-[auto] outline-[3px] no-underline font-inter">
                    <a
                      href="/about"
                      className="caret-transparent text-slate-300 outline-[3px] no-underline"
                    >
                      About us
                    </a>
                  </li>
                  <li className="caret-transparent text-[13px] leading-5 min-h-[auto] min-w-[auto] outline-[3px] no-underline font-inter">
                    <a
                      href="/contact"
                      className="caret-transparent text-slate-300 outline-[3px] no-underline"
                    >
                      Contact
                    </a>
                  </li>
                  <li className="caret-transparent text-[13px] leading-5 min-h-[auto] min-w-[auto] outline-[3px] no-underline font-inter">
                    <a
                      href="/help-center"
                      className="caret-transparent text-slate-300 outline-[3px] no-underline"
                    >
                      Help Center
                    </a>
                  </li>
                </ul>
              </div>
              <div className="caret-transparent flex flex-col min-h-[auto] min-w-[auto] outline-[3px] no-underline">
                <p className="caret-transparent text-zinc-50 text-[13px] font-medium leading-5 min-h-[auto] min-w-[auto] outline-[3px] no-underline font-inter">
                  Trade
                </p>
                <ul className="caret-transparent gap-x-4 flex flex-col list-none min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 no-underline mt-3 pl-0">
                  <li className="caret-transparent text-[13px] leading-5 min-h-[auto] min-w-[auto] outline-[3px] no-underline font-inter">
                    <a
                      href="/crypto"
                      className="caret-transparent text-slate-300 outline-[3px] no-underline"
                    >
                      Crypto
                    </a>
                  </li>
                  <li className="caret-transparent text-[13px] leading-5 min-h-[auto] min-w-[auto] outline-[3px] no-underline font-inter">
                    <a
                      href="/stocks"
                      className="caret-transparent text-slate-300 outline-[3px] no-underline"
                    >
                      Stocks and ETFs
                    </a>
                  </li>
                  <li className="caret-transparent text-[13px] leading-5 min-h-[auto] min-w-[auto] outline-[3px] no-underline font-inter">
                    <a
                      href="/copy-trading"
                      className="caret-transparent text-slate-300 outline-[3px] no-underline"
                    >
                      Copy Trading
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="caret-transparent gap-x-16 flex flex-col justify-between outline-[3px] relative gap-y-16 no-underline mt-10 mx-auto pb-10 px-2 md:gap-x-[normal] md:flex-row md:gap-y-[normal] md:px-20">
            <img
              src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-10-1.svg"
              alt="Icon"
              className="caret-transparent h-px outline-[3px] pointer-events-none absolute no-underline align-baseline bottom-0 inset-x-0"
            />
            <div className="items-center caret-transparent gap-x-4 flex flex-wrap min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 no-underline text-nowrap w-full md:flex-nowrap md:text-wrap md:w-auto">
              <p className="caret-transparent text-gray-400 text-[13px] min-h-[auto] min-w-[auto] outline-[3px] no-underline text-nowrap md:text-wrap">
                © 2026Blofin Prime Ltd. All rights reserved
              </p>
              <a
                href="/terms"
                className="caret-transparent text-gray-400 block text-[13px] min-h-[auto] min-w-[auto] outline-[3px] underline text-nowrap md:text-wrap"
              >
                Terms &amp; Conditions
              </a>
              <a
                href="/privacy"
                className="caret-transparent text-gray-400 block text-[13px] min-h-[auto] min-w-[auto] outline-[3px] underline text-nowrap md:text-wrap"
              >
                Privacy Policy
              </a>
            </div>
          </div>
          <div className="caret-transparent gap-x-16 flex flex-col justify-between outline-[3px] gap-y-16 no-underline mt-16 mx-auto px-2 md:gap-x-[normal] md:flex-row md:gap-y-[normal] md:px-20">
            <p className="caret-transparent text-slate-300 text-[13px] leading-5 min-h-[auto] min-w-[auto] outline-[3px] no-underline w-full md:w-auto">
              The risk of loss in online trading of stocks, options, futures,
              currencies, foreign equities, and fixed Income can be substantial.
              <br className="caret-transparent outline-[3px] no-underline" />
              <br className="caret-transparent outline-[3px] no-underline" />
              Before trading, clients must read the relevant risk disclosure
              statements on our Warnings and Disclosures page. Trading on margin
              is only for experienced investors with high risk tolerance. You
              may lose more than your initial investment.
              <br className="caret-transparent outline-[3px] no-underline" />
              <br className="caret-transparent outline-[3px] no-underline" />
              For additional information about rates on margin loans, please see
              Margin Loan Rates. Security futures involve a high degree of risk
              and are not suitable for all investors. The amount you may lose
              may be greater than your initial investment.For trading security
              futures, read the Security Futures Risk Disclosure Statement.
              Structured products and fixed income products such as bonds are
              complex products that are more risky and are not suitable for all
              investors. Before trading, please read the Risk Warning and
              Disclosure Statement.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};
