import { SectionDivider } from "../../components/SectionDivider";
import { FaqItem } from "@/sections/Faq/components/FaqItem";

export const FaqSection = () => {
  return (
    <section className="caret-transparent outline-[3px] relative no-underline px-7 py-16 md:pt-24 md:pb-0 md:px-20">
      <SectionDivider
        imageUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-5-9.svg"
        imageAlt="Icon"
      />
      <div className="bg-[linear-gradient(rgba(255,136,0,0.047)_0%,rgba(0,0,0,0)_40.24%)] caret-transparent h-full opacity-30 outline-[3px] pointer-events-none absolute no-underline w-full z-[1] left-0 top-0"></div>
      <div className="bg-[position:0px_0px] box-border caret-transparent max-w-[480px] outline-[3px] no-underline w-full mt-0 mx-auto md:max-w-[1062px] md:mt-16">
        <div className="caret-transparent gap-x-8 grid outline-[3px] gap-y-8 no-underline mx-auto">
          <div className="caret-transparent gap-x-16 flex flex-col max-w-[800px] min-h-[auto] min-w-[auto] outline-[3px] gap-y-16 no-underline w-full mb-24 mx-auto">
            <p className="caret-transparent text-zinc-50 text-[32px] font-semibold leading-[48px] min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline font-mori md:text-[40px]">
              Copy trading FAQs
            </p>
            <div className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline">
              <div
                role="region"
                className="box-border caret-transparent text-[lab(8.11897_0.811279_-12.254)] flex flex-col justify-center outline-[3px] no-underline w-full"
              >
                <FaqItem question="What is copy trading?" />
                <FaqItem question="How do I copy an expert?" />
                <FaqItem question="How do I stop copying an expert?" />
                <FaqItem question="What is the minimum amount I can copy an expert with?" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
