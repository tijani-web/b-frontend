import { SectionDivider } from "../../components/SectionDivider";
import { FaqList } from "./components/FaqList";

export const FaqSection = () => {
  return (
    <section className="caret-transparent outline-[3px] relative no-underline px-7 py-16 md:pt-24 md:pb-0 md:px-20">
      <SectionDivider />
      <div className="bg-[linear-gradient(rgba(255,136,0,0.047)_0%,rgba(0,0,0,0)_40.24%)] caret-transparent h-full opacity-30 outline-[3px] pointer-events-none absolute no-underline w-full z-[1] left-0 top-0"></div>
      <div className="bg-[position:0px_0px] box-border caret-transparent max-w-[480px] outline-[3px] no-underline w-full mt-0 mx-auto md:max-w-[1062px] md:mt-16">
        <div className="caret-transparent gap-x-8 grid outline-[3px] gap-y-8 no-underline mx-auto">
          <div className="caret-transparent gap-x-16 flex flex-col max-w-[800px] min-h-[auto] min-w-[auto] outline-[3px] gap-y-16 no-underline w-full mb-24 mx-auto">
            <p className="caret-transparent text-zinc-50 text-[32px] font-semibold leading-[48px] min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline font-mori md:text-[40px]">
              Stocks FAQs
            </p>
            <FaqList />
          </div>
        </div>
      </div>
    </section>
  );
};
