export const CookieNotice = ({ onAccept }: { onAccept?: () => void }) => {
  return (
    <div className="bg-slate-700/90 box-border caret-transparent text-white table text-[15px] leading-[15px] outline-[3px] fixed table-fixed text-center no-underline w-full z-[2147483647] px-[30px] py-5 left-0 bottom-0">
      <span className="caret-transparent inline-block max-w-[80%] outline-[3px] text-left no-underline align-middle mr-[15px]">
        We use cookies to give you the best possible experience while you browse
        through our website. By pursuing the use of our website you implicitly
        agree to the usage of cookies on this site.
        <a
          href="https://www.zoho.com/salesiq/cookies-policy.html"
          role="link"
          className="caret-transparent outline-[3px] underline ml-1 text-[#ff6a00]"
        >
          Learn more
        </a>
      </span>
      <div className="caret-transparent inline-block outline-[3px] no-underline align-middle">
        <div
          role="button"
          onClick={onAccept}
          className="bg-white hover:bg-gray-200 cursor-pointer caret-transparent text-zinc-800 inline-block outline-[3px] no-underline align-middle mr-[15px] px-[15px] py-[5px] rounded-md border-2 border-solid border-white transition-colors"
        >
          Accept All
        </div>
        <div
          role="button"
          onClick={onAccept}
          className="caret-transparent hover:bg-slate-600 cursor-pointer inline-block outline-[3px] no-underline align-middle mr-[15px] px-[15px] py-[5px] rounded-md border-2 border-solid border-white transition-colors"
        >
          Preferences
        </div>
      </div>
    </div>
  );
};
