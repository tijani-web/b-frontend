import { FaqItem } from "@/sections/Faq/components/FaqItem";

export const Faq = () => {
  return (
    <section className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] relative no-underline w-full">
      <div className="box-border caret-transparent gap-x-6 flex flex-col max-w-full outline-[3px] gap-y-6 no-underline w-full mx-auto px-4 py-6 md:gap-x-10 md:max-w-[1200px] md:gap-y-10 md:px-0 md:py-10">
        <div className="items-center box-border caret-transparent gap-x-2.5 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-2.5 no-underline w-full">
          <h2 className="box-border caret-transparent text-white basis-[0%] grow text-[28px] font-bold tracking-[normal] leading-[34px] min-h-[auto] outline-[3px] no-underline capitalize md:text-[54px] md:font-medium md:tracking-[-1.35px] md:leading-[60px]">
            FAQ
          </h2>
          <a
            href="/help-center"
            className="items-center box-border caret-transparent text-white gap-x-2 flex shrink-0 text-sm font-medium leading-5 min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 no-underline py-2.5 rounded-lg md:text-lg md:leading-[26px] md:py-[15px]"
          >
            <span className="box-border caret-transparent block text-sm leading-5 min-h-[auto] min-w-[auto] outline-[3px] no-underline text-nowrap md:text-lg md:leading-[26px]">
              Help Center
            </span>
            <img
              src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-8.svg"
              alt="Icon"
              className="box-border caret-transparent shrink-0 text-sm h-[18px] leading-5 outline-[3px] no-underline align-baseline w-[18px] md:text-lg md:h-6 md:leading-[26px] md:w-6"
            />
          </a>
        </div>
        <div className="box-border caret-transparent gap-x-6 grid min-h-[auto] min-w-[auto] outline-[3px] gap-y-6 no-underline">
          <FaqItem question="What is leverage trading?" />
          <FaqItem question="How do I start trading?" />
          <FaqItem question="What trading tools are available?" />
          <FaqItem question="What is the minimum amount I can trade with?" />
        </div>
      </div>
    </section>
  );
};
