export const FooterLegal = () => {
  return (
    <div className="caret-transparent gap-x-16 flex flex-col justify-between outline-[3px] relative gap-y-16 no-underline mt-10 mx-auto pb-10 px-2 md:gap-x-[normal] md:flex-row md:gap-y-[normal] md:px-20">
      <img
        src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-18.svg"
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
  );
};
