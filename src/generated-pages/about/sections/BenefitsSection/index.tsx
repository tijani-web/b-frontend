import { SectionDivider } from "../../components/SectionDivider";
import { SectionHeader } from "../../components/SectionHeader";
import { BenefitCard } from "./components/BenefitCard";

export const BenefitsSection = () => {
  return (
    <section className="caret-transparent outline-[3px] relative no-underline mb-24 pt-24 px-7 md:px-20">
      <SectionDivider dividerVariant="w-[200px]" />
      <div className="bg-[linear-gradient(rgba(255,136,0,0.047)_0%,rgba(0,0,0,0)_40.24%)] caret-transparent h-full opacity-30 outline-[3px] pointer-events-none absolute no-underline w-full z-[1] left-0 top-0"></div>
      <SectionHeader
        iconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-8-5.svg"
        eyebrowText="Why we're better"
        title="Expanding access to global markets"
        description="Our team comprises of industry experts who are driven to consistently improve your trading experience."
      />
      <div className="bg-[position:0px_0px] caret-transparent max-w-[1062px] outline-[3px] no-underline w-full mt-16 mx-auto">
        <div className="caret-transparent flex flex-col justify-between outline-[3px] no-underline mt-[120px] md:flex-row">
          <BenefitCard
            containerClassName="box-border caret-transparent grid-cols-[1fr] max-w-[360px] min-h-[auto] min-w-[auto] outline-[3px] relative no-underline w-full mx-auto p-7 md:grid-cols-none md:max-w-none md:mx-0 md:p-11 after:accent-auto after:bg-slate-200 after:caret-transparent after:text-black after:hidden after:text-base after:not-italic after:normal-nums after:font-normal after:h-2.5 after:tracking-[normal] after:leading-4 after:list-outside after:list-disc after:mr-[-0.5px] after:opacity-[0.72] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:transform-none after:visible after:w-px after:z-[1] after:rounded-xl after:border-separate after:right-0 after:top-2/4 after:font-inter after:md:block after:md:translate-x-[0.5px] after:md:translate-y-[-5px]"
            backgroundIconUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-9-4.svg"
            titleIconUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-10-4.svg"
            title="Licensed and Regulated"
            description="We hold ourselves to the highest levels of integrity and professionalism."
          />
          <BenefitCard
            containerClassName="box-border caret-transparent grid-cols-[1fr] max-w-[360px] min-h-[auto] min-w-[auto] outline-[3px] relative no-underline w-full mx-auto p-7 md:grid-cols-none md:max-w-none md:mx-0 md:p-11 after:accent-auto after:bg-slate-200 after:caret-transparent after:text-black after:hidden after:text-base after:not-italic after:normal-nums after:font-normal after:h-2.5 after:tracking-[normal] after:leading-4 after:list-outside after:list-disc after:mr-[-0.5px] after:opacity-[0.72] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:transform-none after:visible after:w-px after:z-[1] after:rounded-xl after:border-separate after:right-0 after:top-2/4 after:font-inter after:md:block after:md:translate-x-[0.5px] after:md:translate-y-[-5px]"
            backgroundIconUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-9-4.svg"
            titleIconUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-11-3.svg"
            title="Secure Trading account"
            description="Secure trading account built to streamline your trading experience."
          />
          <BenefitCard
            containerClassName="box-border caret-transparent grid-cols-[1fr] max-w-[360px] min-h-[auto] min-w-[auto] outline-[3px] relative no-underline w-full mx-auto p-7 md:grid-cols-none md:max-w-none md:mx-0 md:p-11 after:accent-auto after:bg-slate-200 after:caret-transparent after:text-black after:hidden after:text-base after:not-italic after:normal-nums after:font-normal after:h-2.5 after:tracking-[normal] after:leading-4 after:list-outside after:list-disc after:mr-[-0.5px] after:opacity-[0.72] after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:visible after:w-px after:z-[1] after:rounded-xl after:border-separate after:right-0 after:top-2/4 after:font-inter"
            decorativeIconUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-12-2.svg"
            decorativeIconClassName="caret-transparent hidden outline-[3px] pointer-events-none absolute no-underline align-baseline w-px right-0 inset-y-0 md:block"
            backgroundIconUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-9-4.svg"
            titleIconUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-13-2.svg"
            title="Open an account in seconds"
            description="Simple and easy registration process with your convenience in mind."
          />
        </div>
      </div>
    </section>
  );
};
