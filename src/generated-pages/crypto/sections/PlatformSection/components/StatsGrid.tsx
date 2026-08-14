import { StatCard } from "./StatCard";

export const StatsGrid = () => {
  return (
    <div className="caret-transparent flex flex-col outline-[3px] no-underline mt-24 md:flex-row">
      <StatCard
        containerClassName="after:transform-none after:md:block after:md:translate-x-[0.5px] after:md:translate-y-[-5px]"
        showSecondaryIcon={false}
        suffix="%"
        label="Win Rate"
      />
      <StatCard
        containerClassName="after:transform-none after:md:block after:md:translate-x-[0.5px] after:md:translate-y-[-5px]"
        showSecondaryIcon={false}
        suffix="+"
        label="Active traders"
      />
      <StatCard
        containerClassName=""
        showSecondaryIcon={true}
        suffix="/5"
        label="Excellent Ratung"
      />
    </div>
  );
};
