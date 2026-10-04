export type TestimonialCardProps = {
  ratingLabel: string;
  starIconUrls: string[];
  testimonial: string;
  avatarUrl: string;
  avatarAlt: string;
  name: string;
  role: string;
};

export const TestimonialCard = (props: TestimonialCardProps) => {
  return (
    <article className="backdrop-blur-[30px] backdrop-saturate-[1.2] shadow-[rgba(255,255,255,0.12)_0px_1px_0px_0px_inset,rgba(255,255,255,0.1)_-1px_-1px_0px_0px_inset,rgba(0,0,0,0.28)_0px_8px_32px_0px] box-border caret-transparent gap-x-6 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] relative gap-y-6 no-underline p-6 rounded-[26px] md:p-8 before:accent-auto before:box-border before:caret-transparent before:text-slate-50 before:block before:text-base before:not-italic before:normal-nums before:font-normal before:tracking-[normal] before:leading-4 before:list-outside before:list-disc before:outline-[3px] before:pointer-events-none before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:border before:rounded-[26px] before:border-separate before:border-solid before:border-white/10 before:inset-0 before:font-blofinnova">
      <div
        role="img"
        aria-label={props.ratingLabel}
        className="items-center box-border caret-transparent gap-x-1 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-1 no-underline"
      >
        {props.starIconUrls.map((starIconUrl, index) => (
          <img
            key={`${starIconUrl}-${index}`}
            src={starIconUrl}
            alt="Icon"
            className="box-border caret-transparent h-[18px] outline-[3px] no-underline align-baseline w-[18px]"
          />
        ))}
      </div>
      <p className="box-border caret-transparent text-violet-100/90 basis-[0%] grow text-base leading-[26px] min-h-[auto] min-w-[auto] outline-[3px] no-underline md:text-lg md:leading-7">
        {props.testimonial}
      </p>
      <div className="items-center box-border caret-transparent gap-x-3 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-3 no-underline">
        <img
          src={props.avatarUrl}
          alt={props.avatarAlt}
          className="aspect-[auto_44_/_44] bg-[oklab(0.999994_0.0000455678_0.0000200868_/_0.06)] box-border caret-transparent shrink-0 h-11 max-w-full min-h-[auto] min-w-[auto] object-cover outline-[3px] no-underline align-baseline w-11 rounded-[3.35544e+07px]"
        />
        <div className="box-border caret-transparent min-h-[auto] outline-[3px] no-underline">
          <p className="box-border caret-transparent text-white font-medium leading-6 outline-[3px] no-underline text-ellipsis text-nowrap overflow-hidden">
            {props.name}
          </p>
          <p className="box-border caret-transparent text-violet-100/50 text-sm leading-5 outline-[3px] no-underline text-ellipsis text-nowrap overflow-hidden">
            {props.role}
          </p>
        </div>
      </div>
    </article>
  );
};
