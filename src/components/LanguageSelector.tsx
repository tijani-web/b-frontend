export const LanguageSelector = () => {
  return (
    <div className="caret-transparent outline-[3px] no-underline">
      <div className="caret-transparent hidden outline-[3px] no-underline"></div>
      <div className="caret-transparent outline-[3px] fixed no-underline z-[999999] left-5 bottom-5">
        <div className="bg-white shadow-[rgba(0,0,0,0.15)_0px_5px_15px_0px] caret-transparent text-neutral-600 inline-block text-xl leading-5 outline-[3px] no-underline overflow-hidden rounded-sm font-arial">
          <div className="bg-white caret-transparent outline-[3px] relative text-left no-underline uppercase z-[888] overflow-hidden">
            <div className="caret-transparent text-zinc-800 font-bold outline-[3px] no-underline px-[15px] py-2.5">
              <img
                src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/en.svg"
                alt="en"
                className="caret-transparent inline-block outline-[3px] no-underline w-[33px] mr-[5px] rounded-[3px]"
              />
              <span className="caret-transparent outline-[3px] relative no-underline top-0.5">
                en
              </span>
              <span className="bg-[url(data:image/svg+xml;utf8,<svg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2716%27%20height=%2716%27%20viewBox=%270%200%20285%20285%27><path%20d=%27M282%2076.5l-14.2-14.3a9%209%200%200%200-13.1%200L142.5%20174.4%2030.3%2062.2a9%209%200%200%200-13.2%200L3%2076.5a9%209%200%200%200%200%2013.1l133%20133a9%209%200%200%200%2013.1%200l133-133a9%209%200%200%200%200-13z%27%20style=%27fill:%23666%27/></svg>)] bg-center bg-no-repeat bg-size-[11px] caret-transparent inline-block h-6 outline-[3px] no-underline align-middle w-[15px] -scale-100"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
