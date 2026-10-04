import { FaqItem } from "@/sections/Faq/components/FaqItem";

export const FaqSection = () => {
  return (
    <section className="caret-transparent outline-[3px] relative no-underline px-7 py-16 md:pt-24 md:pb-0 md:px-20">
      <div className="caret-transparent h-px max-w-[800px] outline-[3px] absolute no-underline translate-x-[-50.0%] w-full left-2/4 -top-px">
        <img
          src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-14-3.svg"
          alt="Icon"
          className="caret-transparent h-px outline-[3px] pointer-events-none absolute no-underline align-baseline w-full left-0 top-0"
        />
        <div className="items-center caret-transparent gap-x-px flex outline-[3px] relative gap-y-px no-underline w-max mx-auto rounded-[10px] top-0">
          <div className="bg-[#ff6a00] caret-transparent h-px min-h-[auto] min-w-[auto] outline-[3px] no-underline w-0.5 rounded-[10px]"></div>
          <div className="bg-[#ff6a00] caret-transparent h-px min-h-[auto] min-w-[auto] outline-[3px] relative no-underline w-[200px] rounded-[10px] before:accent-auto before:bg-[#ff6a00] before:shadow-[rgba(255,136,0,0.5)_0px_0px_10px_0px,rgba(255,136,0,0.4)_0px_0px_20px_0px,rgba(255,136,0,0.3)_0px_0px_30px_0px,rgba(255,136,0,0.2)_0px_0px_40px_0px] before:caret-transparent before:text-black before:block before:blur-[3px] before:text-base before:not-italic before:normal-nums before:font-normal before:h-0.5 before:tracking-[normal] before:leading-4 before:list-outside before:list-disc before:opacity-40 before:outline-[3px] before:pointer-events-auto before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:w-full before:z-[-1] before:rounded-[10px] before:border-separate before:left-0 before:top-0 before:font-inter"></div>
          <div className="bg-[#ff6a00] caret-transparent h-px min-h-[auto] min-w-[auto] outline-[3px] no-underline w-0.5 rounded-[10px]"></div>
        </div>
      </div>
      <div className="bg-[linear-gradient(rgba(255,136,0,0.047)_0%,rgba(0,0,0,0)_40.24%)] caret-transparent h-full opacity-30 outline-[3px] pointer-events-none absolute no-underline w-full z-[1] left-0 top-0"></div>
      <div className="bg-[position:0px_0px] box-border caret-transparent max-w-[480px] outline-[3px] no-underline w-full mt-0 mx-auto md:max-w-[1062px] md:mt-16">
        <div className="caret-transparent gap-x-8 grid outline-[3px] gap-y-8 no-underline mx-auto">
          <div className="caret-transparent gap-x-16 flex flex-col max-w-[800px] min-h-[auto] min-w-[auto] outline-[3px] gap-y-16 no-underline w-full mb-24 mx-auto">
            <p className="caret-transparent text-zinc-50 text-[32px] font-semibold leading-[48px] min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline font-mori md:text-[40px]">
              Stocks FAQs
            </p>
            <div className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline">
              <div
                role="region"
                className="box-border caret-transparent text-[lab(8.11897_0.811279_-12.254)] flex flex-col justify-center outline-[3px] no-underline w-full"
              >
                <FaqItem question="What stocks and ETFs can I trade?" />
                <FaqItem question="How do I invest in stocks?" />
                <FaqItem question="What is the difference between stocks and ETFs?" />
                <FaqItem question="What is the minimum amount I can invest in stocks?" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
