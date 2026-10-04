export type BenefitCardProps = {
  containerClassName: string;
  decorativeIconUrl?: string;
  decorativeIconClassName?: string;
  backgroundIconUrl: string;
  titleIconUrl: string;
  title: string;
  description: string;
};

export const BenefitCard = (props: BenefitCardProps) => {
  return (
    <div className={props.containerClassName}>
      {props.decorativeIconUrl && props.decorativeIconClassName ? (
        <img
          src={props.decorativeIconUrl}
          alt="Icon"
          className={props.decorativeIconClassName}
        />
      ) : null}
      <img
        src={props.backgroundIconUrl}
        alt="Icon"
        className="caret-transparent hidden outline-[3px] pointer-events-none absolute no-underline align-baseline w-px left-0 inset-y-0 md:block"
      />
      <div className="items-center box-border caret-transparent gap-x-2 flex flex-col outline-[3px] gap-y-2 no-underline md:[align-items:normal]">
        <span className="items-center caret-transparent gap-x-1.5 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-1.5 no-underline">
          <img
            src={props.titleIconUrl}
            alt="Icon"
            className="caret-transparent text-[#ff6a00] h-[18px] outline-[3px] no-underline align-baseline w-[18px]"
          />
          <p className="caret-transparent text-zinc-50 text-sm font-semibold leading-[18px] min-h-[auto] min-w-[auto] outline-[3px] no-underline font-mori">
            {props.title}
          </p>
        </span>
        <p className="caret-transparent text-gray-400 text-sm leading-[22px] min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline font-inter md:text-start">
          {props.description}
        </p>
      </div>
    </div>
  );
};
