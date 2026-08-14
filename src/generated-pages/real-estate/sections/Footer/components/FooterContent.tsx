import { FooterLogo } from "./FooterLogo";
import { FooterColumn } from "./FooterColumn";

export const FooterContent = () => {
  return (
    <div className="caret-transparent [mask-image:linear-gradient(rgb(0,0,0)_95%,rgba(0,0,0,0)_100%)] max-w-[480px] outline-[3px] relative no-underline mx-auto pb-12 md:max-w-[1200px]">
      <div className="caret-transparent gap-x-16 flex flex-col justify-between outline-[3px] relative gap-y-16 no-underline mt-0 mx-auto pb-16 px-2 md:gap-x-[normal] md:flex-row md:gap-y-[normal] md:mt-[120px] md:px-20">
        <img
          src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-4.svg"
          alt="Icon"
          className="caret-transparent h-px outline-[3px] pointer-events-none absolute no-underline align-baseline bottom-0 inset-x-0"
        />
        <FooterLogo />
        <div className="caret-transparent gap-x-16 flex flex-wrap min-h-[auto] min-w-[auto] outline-[3px] gap-y-16 no-underline w-full md:flex-nowrap md:w-auto">
          <FooterColumn
            title="Explore"
            links={[
              { href: "/staking", label: "Staking" },
              { href: "/markets", label: "Markets" },
              { href: "/real-estate", label: "Real Estate" },
            ]}
          />
          <FooterColumn
            title="Company"
            links={[
              { href: "/about", label: "About us" },
              { href: "/contact", label: "Contact" },
              { href: "/help-center", label: "Help Center" },
            ]}
          />
          <FooterColumn
            title="Trade"
            links={[
              { href: "/crypto", label: "Crypto" },
              { href: "/stocks", label: "Stocks and ETFs" },
              { href: "/copy-trading", label: "Copy Trading" },
            ]}
          />
        </div>
      </div>
      <div className="caret-transparent gap-x-16 flex flex-col justify-between outline-[3px] relative gap-y-16 no-underline mt-10 mx-auto pb-10 px-2 md:gap-x-[normal] md:flex-row md:gap-y-[normal] md:px-20">
        <img
          src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-9-3.svg"
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
          statements on our Warnings and Disclosures page. Trading on margin is
          only for experienced investors with high risk tolerance. You may lose
          more than your initial investment.
          <br className="caret-transparent outline-[3px] no-underline" />
          <br className="caret-transparent outline-[3px] no-underline" />
          For additional information about rates on margin loans, please see
          Margin Loan Rates. Security futures involve a high degree of risk and
          are not suitable for all investors. The amount you may lose may be
          greater than your initial investment.For trading security futures,
          read the Security Futures Risk Disclosure Statement. Structured
          products and fixed income products such as bonds are complex products
          that are more risky and are not suitable for all investors. Before
          trading, please read the Risk Warning and Disclosure Statement.
        </p>
      </div>
    </div>
  );
};
