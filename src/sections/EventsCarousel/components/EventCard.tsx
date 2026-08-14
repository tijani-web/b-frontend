export type EventCardProps = {
  href: string;
  ariaLabel: string;
  imageUrl: string;
  imageAlt: string;
  title: string;
};

export const EventCard = (props: EventCardProps) => {
  return (
    <a
      href={props.href}
      aria-label={props.ariaLabel}
      className="box-border caret-transparent block shrink-0 h-[420px] min-h-[auto] min-w-[auto] outline-[3px] relative text-left no-underline w-[340px] overflow-hidden"
    >
      <img
        src={props.imageUrl}
        alt={props.imageAlt}
        className="box-border caret-transparent h-full max-w-full object-cover outline-[3px] absolute no-underline align-baseline w-full inset-0"
      />
      <div className="bg-[linear-gradient(in_oklab,rgba(16,16,20,0)_53.744%,rgba(16,16,20,0.8)_100%)] box-border caret-transparent outline-[3px] pointer-events-none absolute no-underline inset-0"></div>
      <div className="box-border caret-transparent outline-[3px] absolute no-underline z-10 pb-[45px] bottom-0 inset-x-0">
        <div className="items-center bg-black/40 box-border caret-transparent flex h-[60px] justify-center outline-[3px] no-underline w-full px-3">
          <p className="box-border caret-transparent text-white flow-root text-xl font-bold leading-[30px] min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline w-full overflow-hidden">
            {props.title}
          </p>
        </div>
      </div>
    </a>
  );
};
