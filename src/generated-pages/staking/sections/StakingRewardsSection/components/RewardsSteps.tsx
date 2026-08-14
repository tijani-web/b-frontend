import { RewardStep } from "./RewardStep";

export const RewardsSteps = () => {
  return (
    <div className="box-border caret-transparent flex flex-col h-full max-w-[450px] min-h-[auto] min-w-[auto] outline-[3px] relative no-underline w-full mx-auto md:box-content md:flex-row md:max-w-[1062px]">
      <img
        src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-2.svg"
        alt="Icon"
        className="caret-transparent h-px outline-[3px] pointer-events-none absolute no-underline translate-x-[-50.0%] align-baseline w-full left-2/4 right-auto top-0 md:transform-none md:w-auto md:inset-x-0"
      />
      <img
        src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-8-2.svg"
        alt="Icon"
        className="caret-transparent h-px outline-[3px] pointer-events-none absolute no-underline translate-x-[-50.0%] align-baseline w-full left-2/4 right-auto bottom-0 md:transform-none md:w-auto md:inset-x-0"
      />
      <RewardStep
        rootVariant="pr-0 py-0"
        title="Stake eligible asset"
        description="Simply fund your account with any eligible staking asset, to auto earn rewards."
        innerVariant=""
        iconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-9-2.svg"
      />
      <div className="caret-transparent hidden h-full outline-[3px] pointer-events-none absolute no-underline transform-none w-px left-2/4 top-0 md:block md:translate-x-[-50.0%]">
        <img
          src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-10-2.svg"
          alt="Icon"
          className="caret-transparent inline h-full outline-[3px] no-underline align-baseline w-px"
        />
      </div>
      <RewardStep
        rootVariant="p-0 md:pl-[52px]"
        title="Receive daily rewards"
        description="Your earnings automatically accrue in your account, with a full history available."
        innerVariant="relative"
        iconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-11-2.svg"
      />
    </div>
  );
};
