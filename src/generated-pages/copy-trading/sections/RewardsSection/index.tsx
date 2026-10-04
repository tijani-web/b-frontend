import { RewardsIntro } from "./components/RewardsIntro";
import { RewardFeature } from "./components/RewardFeature";

export const RewardsSection = () => {
  return (
    <section className="caret-transparent outline-[3px] no-underline">
      <div className="bg-[position:0px_0px] caret-transparent max-w-[1062px] outline-[3px] no-underline w-full mt-0 mx-auto md:mt-16">
        <div className="caret-transparent outline-[3px] no-underline">
          <RewardsIntro />
          <div className="caret-transparent flex flex-col justify-between outline-[3px] no-underline mx-auto my-16 md:flex-row md:my-24">
            <RewardFeature
              rootClassName="after:transform-none after:md:block after:md:translate-x-[0.5px] after:md:translate-y-[-5px]"
              showDecorativeIcon={false}
              decorativeIconSrc=""
              decorativeIconClassName=""
              backgroundIconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-10-8.svg"
              featureIconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-11-7.svg"
              title="Licensed and Regulated"
              description="We hold ourselves to the highest levels of integrity and professionalism."
            />
            <RewardFeature
              rootClassName="after:transform-none after:md:block after:md:translate-x-[0.5px] after:md:translate-y-[-5px]"
              showDecorativeIcon={false}
              decorativeIconSrc=""
              decorativeIconClassName=""
              backgroundIconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-10-8.svg"
              featureIconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-12-6.svg"
              title="Secure Trading account"
              description="Secure trading account built to streamline your trading experience."
            />
            <RewardFeature
              rootClassName=""
              showDecorativeIcon={true}
              decorativeIconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-13-5.svg"
              decorativeIconClassName="caret-transparent hidden outline-[3px] pointer-events-none absolute no-underline align-baseline w-px right-0 inset-y-0 md:block"
              backgroundIconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-10-8.svg"
              featureIconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-14-4.svg"
              title="Open an account in seconds"
              description="Simple and easy registration process with your convenience in mind."
            />
          </div>
        </div>
      </div>
    </section>
  );
};
