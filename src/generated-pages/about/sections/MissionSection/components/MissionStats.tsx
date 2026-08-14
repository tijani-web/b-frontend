import { StatCard } from "./StatCard";

export const MissionStats = () => {
  return (
    <div className="caret-transparent flex flex-col outline-[3px] no-underline mt-24 md:flex-row">
      <StatCard
        rootVariantClass="after:transform-none after:md:block after:md:translate-x-[0.5px] after:md:translate-y-[-5px]"
        showAccentIcon={false}
        accentIconUrl=""
        mainIconUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-6-5.svg"
        firstActiveDigit="2"
        secondActiveDigit="5"
        showThirdDigit={true}
        thirdActiveDigit="0"
        suffix="M+"
        label="Payouts"
      />
      <StatCard
        rootVariantClass="after:transform-none after:md:block after:md:translate-x-[0.5px] after:md:translate-y-[-5px]"
        showAccentIcon={false}
        accentIconUrl=""
        mainIconUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-6-5.svg"
        firstActiveDigit="1"
        secondActiveDigit="2"
        showThirdDigit={true}
        thirdActiveDigit="0"
        suffix="+"
        label="Countries registered"
      />
      <StatCard
        rootVariantClass=""
        showAccentIcon={true}
        accentIconUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-5.svg"
        mainIconUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-6-5.svg"
        firstActiveDigit="1"
        secondActiveDigit="3"
        showThirdDigit={false}
        thirdActiveDigit=""
        suffix="M+"
        label="Trades processed"
      />
    </div>
  );
};
