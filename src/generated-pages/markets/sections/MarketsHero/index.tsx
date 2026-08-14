import { HeroBadge } from "./components/HeroBadge";
import { HeroCta } from "./components/HeroCta";
import { MarketsTable } from "./components/MarketsTable";

export const MarketsHero = () => {
  return (
    <section className="caret-transparent outline-[3px] relative no-underline py-24 md:py-[165px]">
      <div className="items-center box-border caret-transparent gap-x-4 flex flex-col max-w-[650px] outline-[3px] relative gap-y-4 no-underline z-[4] mx-auto">
        <HeroBadge />
        <h2 className="caret-transparent text-zinc-50 text-[32px] font-semibold leading-10 min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline font-mori md:text-6xl md:leading-[66px]">
          Supported Markets
        </h2>
        <p className="caret-transparent text-slate-200 text-base leading-6 max-w-xs min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline md:text-lg md:leading-[26px] md:max-w-none">
          Get access to all the markets listed below and many more using our
          powerful trading platform.
        </p>
        <HeroCta
          containerVariant="items-center gap-x-3 flex min-h-[auto] min-w-[auto] gap-y-3 mt-6"
          linkVariant="min-h-[auto] min-w-[auto]"
        />
      </div>
      <MarketsTable />
      <HeroCta containerVariant="relative z-10 mx-auto" linkVariant="" />
    </section>
  );
};
