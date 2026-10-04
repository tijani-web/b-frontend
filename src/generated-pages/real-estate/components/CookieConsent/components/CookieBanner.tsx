export const CookieBanner = () => {
  return (
    <div className="bg-slate-700/90 box-border caret-transparent text-white table text-[15px] leading-[15px] outline-[3px] fixed table-fixed text-center no-underline w-full z-[2147483647] px-[30px] py-5 left-0 bottom-0">
      <span className="caret-transparent inline-block max-w-[80%] outline-[3px] text-left no-underline align-middle mr-[15px]">
        We use cookies to give you the best possible experience while you browse
        through our website. By pursuing the use of our website you implicitly
        agree to the usage of cookies on this site.
        <a
          href="https://www.zoho.com/salesiq/cookies-policy.html"
          role="link"
          className="caret-transparent outline-[3px] underline"
        >
          Learn more
        </a>
      </span>
      <div className="caret-transparent inline-block outline-[3px] no-underline align-middle">
        <div
          role="button"
          className="bg-white caret-transparent text-zinc-800 inline-block outline-[3px] no-underline align-middle mr-[15px] px-[15px] py-[5px] rounded-md border-2 border-solid border-white"
        >
          Accept All
        </div>
        <div
          role="button"
          className="caret-transparent inline-block outline-[3px] no-underline align-middle mr-[15px] px-[15px] py-[5px] rounded-md border-2 border-solid border-white"
        >
          Preferences
        </div>
      </div>
    </div>
  );
};
