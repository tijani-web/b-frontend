import { MobileMenuButton } from "./MobileMenuButton";

export const HeaderActions = () => {
  return (
    <div className="items-center caret-transparent gap-x-3 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-3 no-underline w-max">
      <div className="caret-transparent hidden min-h-0 min-w-0 outline-[3px] no-underline md:block md:min-h-[auto] md:min-w-[auto]">
        <a
          href="https://app.BlofinPrime.com/register"
          className="content-center items-center bg-amber-500 shadow-[rgba(113,50,245,0.2)_0px_2px_5px_0px,rgba(255,255,255,0.08)_0px_2px_3px_0px_inset] box-border caret-transparent text-zinc-50 gap-x-2 grid justify-center outline-[3px] relative gap-y-2 no-underline text-nowrap overflow-hidden px-3 py-2 rounded-xl"
        >
          <div className="bg-[linear-gradient(rgba(255,255,255,0.12)_0%,rgba(255,255,255,0)_100%)] caret-transparent h-full outline-[3px] pointer-events-none absolute no-underline text-nowrap w-full left-0 top-0"></div>
          <p className="caret-transparent text-sm font-medium leading-5 min-h-0 min-w-0 outline-[3px] relative no-underline text-nowrap z-[1] md:min-h-[auto] md:min-w-[auto]">
            Get started
          </p>
        </a>
      </div>
      <a
        href="https://app.BlofinPrime.com/login"
        className="items-center bg-neutral-950 box-border caret-transparent text-zinc-50 gap-x-2 flex min-h-[auto] min-w-[auto] outline-[3px] relative gap-y-2 no-underline text-nowrap overflow-hidden px-3 py-2 rounded-xl after:accent-auto after:bg-[linear-gradient(rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.1)_100%)] after:caret-transparent after:text-zinc-50 after:block after:text-base after:not-italic after:normal-nums after:font-normal after:h-full after:tracking-[normal] after:leading-4 after:list-outside after:list-disc after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:text-nowrap after:visible after:w-full after:border-separate after:left-0 after:top-0 after:font-inter"
      >
        <p className="caret-transparent text-sm font-medium leading-5 min-h-[auto] min-w-[auto] outline-[3px] relative no-underline text-nowrap z-[1]">
          Log in
        </p>
      </a>
      <MobileMenuButton />
    </div>
  );
};
