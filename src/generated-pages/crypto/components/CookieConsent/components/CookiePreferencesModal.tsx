export const CookiePreferencesModal = () => {
  return (
    <div className="bg-black/40 box-border caret-transparent hidden h-full outline-[3px] fixed no-underline w-full z-[2147483647] left-0 top-0">
      <div className="bg-white box-border caret-transparent text-gray-800 flex flex-col text-sm leading-[22px] max-h-[calc(100%_-_20px)] max-w-[95%] outline-[3px] relative text-left no-underline w-[800px] overflow-hidden m-auto pl-2.5 pr-1 pt-[30px] rounded-[5px] top-2/4 md:max-h-[800px] md:px-0 md:rounded-[10px]">
        <img
          src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-19.svg"
          alt="Icon"
          className="bg-zinc-100 box-border caret-transparent text-lg h-[26px] leading-[normal] outline-[3px] absolute text-center no-underline align-baseline w-[26px] p-[7px] rounded-[26px] right-5 top-5"
        />
        <div className="box-border caret-transparent flex flex-col h-full outline-[3px] no-underline overflow-auto pb-0 px-2.5 md:pb-[30px] md:px-0">
          <div className="border-b-zinc-300 border-l-gray-800 border-r-gray-800 border-t-gray-800 box-border caret-transparent outline-[3px] no-underline mb-[30px] pb-[25px] px-[30px] border-b">
            <div className="box-border caret-transparent text-xl font-bold outline-[3px] no-underline mb-2.5">
              Your Cookie Preference
            </div>
            <div
              role="link"
              className="box-border caret-transparent outline-[3px] no-underline"
            >
              We use different types of cookies to optimize your experience on
              our website. Click on the categories that you want to allow. Visit
              our website to learn more about our{" "}
              <a
                href="https://www.zoho.com/salesiq/cookies-policy.html"
                role="link"
                className="box-border caret-transparent text-sky-500 outline-[3px] underline"
              >
                Cookie Policy
              </a>
            </div>
          </div>
          <div className="box-border caret-transparent outline-[3px] no-underline overflow-auto px-[30px]">
            <div className="border-b-zinc-300 border-l-gray-800 border-r-gray-800 border-t-gray-800 box-border caret-transparent outline-[3px] no-underline mb-[30px] pb-[25px] border-b">
              <label className="items-center box-border caret-transparent inline-flex outline-[3px] relative no-underline pl-5 md:pl-10">
                <input
                  type="checkbox"
                  className="bg-transparent box-border caret-transparent text-neutral-600 block text-[13.3333px] leading-[normal] outline-[3px] absolute text-start no-underline overflow-visible mr-2.5 p-0 left-0 font-arial md:left-2.5"
                />
                <span className="box-border caret-transparent text-black block text-[15px] outline-[3px] no-underline">
                  Essential
                </span>
              </label>
              <div className="box-border caret-transparent text-stone-500 outline-[3px] no-underline mt-[5px] pl-5 md:pl-10">
                These cookies are necessary for the basic functionality of the
                website. Without these cookies, certain functions, like live
                chat, knowledge base, etc., will not work.
                <span
                  role="button"
                  className="box-border caret-transparent text-sky-500 outline-[3px] no-underline"
                >
                  Learn more
                </span>
              </div>
            </div>
            <div className="border-b-zinc-300 border-l-gray-800 border-r-gray-800 border-t-gray-800 box-border caret-transparent outline-[3px] no-underline mb-[30px] pb-[25px] border-b">
              <label className="items-center box-border caret-transparent inline-flex outline-[3px] relative no-underline pl-5 md:pl-10">
                <input
                  type="checkbox"
                  className="bg-transparent box-border caret-transparent text-black block text-[13.3333px] leading-[normal] outline-[3px] absolute text-start no-underline overflow-visible mr-2.5 p-0 left-0 font-arial md:left-2.5"
                />
                <span className="box-border caret-transparent text-black block text-[15px] outline-[3px] no-underline">
                  Performance
                </span>
              </label>
              <div className="box-border caret-transparent text-stone-500 outline-[3px] no-underline mt-[5px] pl-5 md:pl-10">
                These cookies are used to enhance your browsing experience.
                Also, these cookies will aid us in assisting you better with our
                engagement and support tools.
                <span
                  role="button"
                  className="box-border caret-transparent text-sky-500 outline-[3px] no-underline"
                >
                  Learn more
                </span>
              </div>
            </div>
            <div className="box-border caret-transparent outline-[3px] no-underline mb-2.5 pb-[25px]">
              <label className="items-center box-border caret-transparent inline-flex outline-[3px] relative no-underline pl-5 md:pl-10">
                <input
                  type="checkbox"
                  className="bg-transparent box-border caret-transparent text-black block text-[13.3333px] leading-[normal] outline-[3px] absolute text-start no-underline overflow-visible mr-2.5 p-0 left-0 font-arial md:left-2.5"
                />
                <span className="box-border caret-transparent text-black block text-[15px] outline-[3px] no-underline">
                  Analytics
                </span>
              </label>
              <div className="box-border caret-transparent text-stone-500 outline-[3px] no-underline mt-[5px] pl-5 md:pl-10">
                These cookies are used to help us understand how our website is
                being used. They can also be used to analyze the effectiveness
                of our marketing activities and to create a personalized
                browsing experience for you.
                <span
                  role="button"
                  className="box-border caret-transparent text-sky-500 outline-[3px] no-underline"
                >
                  Learn more
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="items-center bg-white border-b-gray-800 border-l-gray-800 border-r-gray-800 border-t-zinc-100 box-border caret-transparent flex shrink-0 h-20 justify-center outline-[3px] relative no-underline w-[calc(100%_+_40px)] px-[30px] border-t -left-5 md:w-full md:px-0 md:left-auto">
          <div
            role="button"
            className="items-center bg-white box-border caret-transparent text-neutral-400 flex text-sm h-[42px] justify-center min-w-[140px] outline-[3px] no-underline w-40 border border-neutral-400 mr-0 px-[13px] rounded-md border-solid right-[30px] inset-y-0 md:text-[15px] md:mr-5 md:right-[110px]"
          >
            Use Essential Only
          </div>
          <div
            role="button"
            className="items-center bg-sky-600 box-border caret-transparent text-white flex text-sm h-[42px] justify-center min-w-[140px] outline-[3px] no-underline w-40 mr-0 px-[13px] rounded-md right-[30px] inset-y-0 md:text-[15px] md:mr-5 md:right-[110px] hover:bg-sky-700"
          >
            Accept
          </div>
        </div>
      </div>
    </div>
  );
};
