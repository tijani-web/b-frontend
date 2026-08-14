export const HeroBadge = () => {
  return (
    <div className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline">
      <div className="items-center backdrop-blur-[2px] bg-violet-300/10 caret-transparent gap-x-1.5 flex outline-[3px] relative gap-y-1.5 no-underline w-max px-2 py-1 rounded-[120px]">
        <div className="caret-transparent outline-[3px] pointer-events-none absolute no-underline z-0 rounded-[120px] -inset-px">
          <img
            src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-4-6.svg"
            alt="Icon"
            className="caret-transparent inline h-full outline-[3px] no-underline align-baseline w-full"
          />
        </div>
        <p className="bg-clip-text bg-[linear-gradient(90deg,color(srgb_1_0.673333_0.3)_0%,color(srgb_1_0.626667_0.2)_100%)] caret-transparent text-sm leading-[18px] min-h-[auto] min-w-[auto] outline-[3px] relative no-underline z-[1]">
          Contact us
        </p>
      </div>
    </div>
  );
};
