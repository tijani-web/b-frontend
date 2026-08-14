export const Hero = () => {
  return (
    <section className="caret-transparent outline-[3px] relative no-underline py-24 md:py-40">
      <div className="items-center box-border caret-transparent gap-x-4 flex flex-col max-w-[650px] outline-[3px] relative gap-y-4 no-underline z-[4] mx-auto">
        <h2 className="caret-transparent text-zinc-50 text-[32px] font-semibold leading-10 min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline font-mori md:text-6xl md:leading-[66px]">
          Built on honesty and
          <span className="caret-transparent inline-block text-[32px] leading-10 outline-[3px] no-underline md:text-6xl md:leading-[66px]">
            financial transparency
          </span>
        </h2>
        <p className="caret-transparent text-slate-200 text-base leading-6 max-w-xs min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline md:text-lg md:leading-[26px] md:max-w-none">
          Explore our core principles, mission, vision, and objectives.
        </p>
      </div>
    </section>
  );
};
