export type TestimonialCardProps = {
  quoteIconSrc: string;
  quoteIconAlt: string;
  testimonialText: string;
  avatarSrc: string;
  avatarAlt: string;
  name: string;
  role: string;
};

export const TestimonialCard = (props: TestimonialCardProps) => {
  return (
    <div className="bg-stone-950 box-border caret-transparent flex flex-col h-full justify-between min-h-[300px] min-w-[auto] outline-[3px] relative no-underline w-full p-8 rounded-xl">
      <img
        src={props.quoteIconSrc}
        alt={props.quoteIconAlt}
        className="caret-transparent h-full outline-[3px] pointer-events-none absolute no-underline align-baseline w-full left-0 top-0"
      />
      <div className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline">
        <p className="caret-transparent text-slate-200 leading-6 outline-[3px] no-underline font-inter">
          {props.testimonialText}
        </p>
      </div>
      <div className="items-center caret-transparent gap-x-3 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-3 no-underline">
        <img
          alt={props.avatarAlt}
          src={props.avatarSrc}
          className="aspect-[auto_40_/_40] text-transparent h-10 min-h-[auto] min-w-[auto] object-cover outline-[3px] no-underline align-baseline w-10 rounded-[100%]"
        />
        <div className="caret-transparent gap-x-1.5 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-1.5 no-underline">
          <p className="caret-transparent text-zinc-50 font-medium min-h-[auto] min-w-[auto] outline-[3px] no-underline font-inter">
            {props.name}
          </p>
          <p className="caret-transparent text-slate-300 text-[15px] leading-[15px] min-h-[auto] min-w-[auto] outline-[3px] no-underline font-inter">
            {props.role}
          </p>
        </div>
      </div>
    </div>
  );
};
