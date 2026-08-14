import { BenefitCard } from "./BenefitCard";

export const BenefitsGrid = () => {
  return (
    <div className="bg-[position:0px_0px] caret-transparent max-w-[1062px] outline-[3px] no-underline w-full mt-16 mx-auto">
      <div className="caret-transparent flex flex-col justify-between outline-[3px] no-underline mt-[120px] md:flex-row">
        <BenefitCard
          containerVariant="after:transform-none after:md:block after:md:translate-x-[0.5px] after:md:translate-y-[-5px]"
          backgroundIconUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-10-6.svg"
          titleIconUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-11-5.svg"
          title="Licensed and Regulated"
          description="We hold ourselves to the highest levels of integrity and professionalism."
        />
        <BenefitCard
          containerVariant="after:transform-none after:md:block after:md:translate-x-[0.5px] after:md:translate-y-[-5px]"
          backgroundIconUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-10-6.svg"
          titleIconUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-12-4.svg"
          title="Secure Trading account"
          description="Secure trading account built to streamline your trading experience."
        />
        <BenefitCard
          containerVariant=""
          decorativeIconUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-13-3.svg"
          decorativeIconClassName="caret-transparent hidden outline-[3px] pointer-events-none absolute no-underline align-baseline w-px right-0 inset-y-0 md:block"
          backgroundIconUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-10-6.svg"
          titleIconUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-14-2.svg"
          title="Open an account in seconds"
          description="Simple and easy registration process with your convenience in mind."
        />
      </div>
    </div>
  );
};
