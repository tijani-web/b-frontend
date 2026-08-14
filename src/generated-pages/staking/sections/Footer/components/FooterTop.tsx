export const FooterTop = () => {
  return (
    <div className="caret-transparent gap-x-16 flex flex-col justify-between outline-[3px] relative gap-y-16 no-underline mt-0 mx-auto pb-16 px-2 md:gap-x-[normal] md:flex-row md:gap-y-[normal] md:mt-[120px] md:px-20">
      <img
        src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-13-1.svg"
        alt="Icon"
        className="caret-transparent h-px outline-[3px] pointer-events-none absolute no-underline align-baseline bottom-0 inset-x-0"
      />
      <a
        href="/"
        className="caret-transparent text-blue-700 block min-h-[auto] min-w-[auto] outline-[3px] underline"
      >
        <div className="caret-transparent outline-[3px] no-underline">
          <img
            src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-14.svg"
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
  );
};
