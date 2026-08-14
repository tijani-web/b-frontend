export const MobileMenuButton = () => {
  return (
    <div className="caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] no-underline md:hidden md:min-h-0 md:min-w-0">
      <div className="items-center bg-neutral-950 box-border caret-transparent text-zinc-50 gap-x-2 flex justify-center outline-[3px] relative gap-y-2 no-underline text-nowrap overflow-hidden p-2 rounded-xl after:accent-auto after:bg-[linear-gradient(rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.1)_100%)] after:caret-transparent after:text-zinc-50 after:block after:text-base after:not-italic after:normal-nums after:font-normal after:h-full after:tracking-[normal] after:leading-4 after:list-outside after:list-disc after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:text-nowrap after:visible after:w-full after:border-separate after:left-0 after:top-0 after:font-inter">
        <div className="items-center caret-transparent flex h-5 justify-center min-h-[auto] min-w-[auto] outline-[3px] relative no-underline text-nowrap w-5 z-[1] md:min-h-0 md:min-w-0">
          <img
            src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-3.svg"
            alt="Icon"
            className="caret-transparent h-full outline-[3px] no-underline text-nowrap align-baseline w-full"
          />
        </div>
      </div>
    </div>
  );
};
