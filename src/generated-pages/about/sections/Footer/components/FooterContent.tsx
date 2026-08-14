import { FooterColumn } from "./FooterColumn";

export const FooterContent = () => {
  return (
    <div className="caret-transparent gap-x-16 flex flex-col justify-between outline-[3px] relative gap-y-16 no-underline mt-0 mx-auto pb-16 px-2 md:gap-x-[normal] md:flex-row md:gap-y-[normal] md:mt-[120px] md:px-20">
      <img
        src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-16-1.svg"
        alt="Icon"
        className="caret-transparent h-px outline-[3px] pointer-events-none absolute no-underline align-baseline bottom-0 inset-x-0"
      />
      <a
        href="/"
        className="caret-transparent text-blue-700 block min-h-[auto] min-w-[auto] outline-[3px] underline"
      >
        <div className="caret-transparent outline-[3px] no-underline">
          <img
            src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-17.svg"
            alt="Icon"
            className="caret-transparent text-zinc-50 inline h-8 outline-[3px] no-underline align-baseline"
          />
        </div>
      </a>
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
  );
};
