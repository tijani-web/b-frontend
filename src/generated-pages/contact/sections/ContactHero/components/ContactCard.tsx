export type ContactCardProps = {
  iconSrc: string;
  title: string;
  description: string;
  href: string;
  linkText: string;
};

export const ContactCard = (props: ContactCardProps) => {
  return (
    <div className="items-start bg-stone-950 box-border caret-transparent flex flex-col h-full justify-between max-w-[400px] min-h-[auto] min-w-[auto] outline-[3px] relative no-underline w-full p-6 rounded-xl">
      <img
        src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-5-6.svg"
        alt="Icon"
        className="caret-transparent h-full [mask-image:linear-gradient(rgb(0,0,0)_50%,rgba(0,0,0,0)_100%)] opacity-[0.46] outline-[3px] absolute no-underline align-baseline w-full z-[1] left-0 top-0"
      />
      <img
        src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-6-6.svg"
        alt="Icon"
        className="caret-transparent h-full outline-[3px] pointer-events-none absolute no-underline align-baseline w-full left-0 top-0"
      />
      <div className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline">
        <div className="caret-transparent outline-[3px] no-underline">
          <div className="items-center caret-transparent gap-x-2 flex outline-[3px] gap-y-2 no-underline">
            <img
              src={props.iconSrc}
              alt="Icon"
              className="caret-transparent text-gray-400 h-6 outline-[3px] no-underline align-baseline w-6"
            />
            <p className="caret-transparent text-zinc-50 text-[15px] font-medium leading-[15px] min-h-[auto] min-w-[auto] outline-[3px] no-underline font-inter">
              {props.title}
            </p>
          </div>
          <p className="caret-transparent text-slate-300 text-sm leading-6 max-w-[280px] outline-[3px] no-underline w-full mt-2 font-inter md:max-w-none md:w-auto">
            {props.description}
          </p>
        </div>
        <div className="caret-transparent outline-[3px] no-underline w-max mt-6">
          <a
            href={props.href}
            className="items-center bg-stone-950 box-border caret-transparent text-zinc-50 gap-x-2 flex outline-[3px] relative gap-y-2 no-underline text-nowrap border border-violet-300/10 overflow-hidden px-3 py-2 rounded-xl border-solid after:accent-auto after:bg-[linear-gradient(rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.1)_100%)] after:caret-transparent after:text-zinc-50 after:block after:text-base after:not-italic after:normal-nums after:font-normal after:h-full after:tracking-[normal] after:leading-4 after:list-outside after:list-disc after:outline-[3px] after:pointer-events-none after:absolute after:text-start after:no-underline after:indent-[0px] after:normal-case after:text-nowrap after:visible after:w-full after:border-separate after:left-0 after:top-0 after:font-inter"
          >
            <p className="caret-transparent text-sm font-medium leading-5 min-h-[auto] min-w-[auto] outline-[3px] relative no-underline text-nowrap z-[1]">
              {props.linkText}
            </p>
            <img
              src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-8-6.svg"
              alt="Icon"
              className="caret-transparent h-4 outline-[3px] no-underline text-nowrap align-baseline w-4"
            />
          </a>
        </div>
      </div>
    </div>
  );
};
