export type NewsCardProps = {
  href: string;
  cardVariant: string;
  title: string;
  description: string;
  imageUrl: string;
};

export const NewsCard = (props: NewsCardProps) => {
  return (
    <a
      href={props.href}
      className={`backdrop-blur-[30px] backdrop-saturate-[1.2] shadow-[rgba(255,255,255,0.12)_0px_1px_0px_0px_inset,rgba(255,255,255,0.1)_-1px_-1px_0px_0px_inset,rgba(0,0,0,0.28)_0px_8px_32px_0px] box-border caret-transparent gap-x-6 flex flex-col shrink h-auto justify-normal min-h-[auto] min-w-[auto] order-none outline-[3px] relative gap-y-6 no-underline w-full p-8 rounded-[26px] md:gap-x-0 md:shrink-0 md:h-[476px] md:justify-between md:gap-y-0 md:w-[438px] before:accent-auto before:box-border before:caret-transparent before:text-slate-50 before:block before:text-base before:not-italic before:normal-nums before:font-normal before:tracking-[normal] before:leading-4 before:list-outside before:list-disc before:outline-[3px] before:pointer-events-none before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:border before:rounded-[26px] before:border-separate before:border-solid before:border-white/10 before:inset-0 before:font-blofinnova ${props.cardVariant}`}
    >
      <div className="box-border caret-transparent gap-x-4 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 no-underline w-full">
        <h3 className="box-border caret-transparent text-white flow-root text-lg font-bold leading-[26px] min-h-[auto] min-w-[auto] outline-[3px] no-underline overflow-hidden md:text-[27.2px] md:leading-[38.533px]">
          {props.title}
        </h3>
        <p className="box-border caret-transparent text-violet-100/40 flow-root text-sm leading-[22px] min-h-[auto] min-w-[auto] outline-[3px] no-underline overflow-hidden md:text-[18.133px] md:leading-[27.2px]">
          {props.description}
        </p>
      </div>
      <div className="box-border caret-transparent shrink-0 h-8 min-h-[auto] min-w-[auto] outline-[3px] no-underline w-full md:h-[38px]">
        <img
          alt=""
          src={props.imageUrl}
          className="aspect-[auto_340_/_36] box-border text-transparent h-full max-w-full object-contain object-[0%_50%] outline-[3px] no-underline align-baseline"
        />
      </div>
    </a>
  );
};
