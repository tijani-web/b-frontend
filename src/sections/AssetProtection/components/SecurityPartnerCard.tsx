export type SecurityPartnerCardProps = {
  imageUrl: string;
  title: string;
  description: string;
};

export const SecurityPartnerCard = (props: SecurityPartnerCardProps) => {
  return (
    <article className="backdrop-blur-[30px] backdrop-saturate-[1.2] shadow-[rgba(255,255,255,0.12)_0px_1px_0px_0px_inset,rgba(255,255,255,0.1)_-1px_-1px_0px_0px_inset,rgba(0,0,0,0.28)_0px_8px_32px_0px] box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] relative no-underline p-4 rounded-[26px] md:min-h-[152px] md:px-6 md:py-10 before:accent-auto before:box-border before:caret-transparent before:text-slate-50 before:block before:text-base before:not-italic before:normal-nums before:font-normal before:tracking-[normal] before:leading-4 before:list-outside before:list-disc before:outline-[3px] before:pointer-events-none before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:border before:rounded-[26px] before:border-separate before:border-solid before:border-white/10 before:inset-0 before:font-blofinnova">
      <div className="items-center box-border caret-transparent gap-x-3 flex flex-col outline-[3px] gap-y-3 no-underline w-full md:items-stretch">
        <div className="items-center box-border caret-transparent gap-x-3 flex shrink justify-center min-h-[auto] min-w-[auto] outline-[3px] gap-y-3 no-underline w-full pr-1 md:shrink-0">
          <img
            alt=""
            src={props.imageUrl}
            className="aspect-[auto_32_/_32] box-border text-transparent shrink-0 h-6 max-w-full min-h-[auto] min-w-[auto] object-contain outline-[3px] no-underline align-baseline w-6 md:h-8 md:w-8"
          />
          <h3 className="box-border caret-transparent text-white text-lg font-medium leading-[26px] min-h-[auto] outline-[3px] text-center no-underline md:text-2xl md:leading-[34px]">
            {props.title}
          </h3>
        </div>
        <p className="box-border caret-transparent text-violet-100/60 text-sm leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline w-full md:text-lg md:leading-[26px]">
          {props.description}
        </p>
      </div>
    </article>
  );
};
