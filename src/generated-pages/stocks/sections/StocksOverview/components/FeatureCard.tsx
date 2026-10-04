export type FeatureCardProps = {
  className: string;
  title: string;
  description: string;
  imageAlt: string;
  imageSrc: string;
};

export const FeatureCard = (props: FeatureCardProps) => {
  return (
    <div
      className={`box-border caret-transparent gap-x-8 flex flex-col h-full min-h-[auto] min-w-[auto] outline-[3px] relative gap-y-8 no-underline w-full mt-12 mx-auto md:gap-x-16 md:gap-y-16 md:mt-0 md:mx-0 md:pr-12 md:py-12 ${props.className}`}
    >
      <div className="caret-transparent max-w-[280px] min-h-[auto] min-w-[auto] outline-[3px] no-underline md:max-w-[380px]">
        <div className="items-center caret-transparent gap-x-1.5 flex outline-[3px] gap-y-1.5 no-underline">
          <p className="caret-transparent text-zinc-50 text-[15px] font-semibold leading-[15px] min-h-[auto] min-w-[auto] outline-[3px] no-underline font-mori md:text-base md:leading-4">
            {props.title}
          </p>
        </div>
        <p className="caret-transparent text-slate-300 text-sm leading-6 outline-[3px] no-underline mt-2 md:text-base">
          {props.description}
        </p>
      </div>
      <div className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline transform-none">
        <img
          alt={props.imageAlt}
          src={props.imageSrc}
          className="aspect-[auto_1000_/_801] text-transparent inline h-[300px] [mask-clip:border-box,border-box] [mask-composite:intersect,intersect] [mask-image:linear-gradient(rgb(0,0,0)_50%,rgba(0,0,0,0)_100%),linear-gradient(to_right,rgb(0,0,0)_70%,rgba(0,0,0,0)_100%)] [mask-mode:match-source,match-source] [mask-origin:border-box,border-box] [mask-position:0%_0%,0%_0%] [mask-repeat:repeat,repeat] [mask-size:auto,auto] outline-[3px] no-underline align-baseline [mask-position:0%,0%] md:[mask-clip:border-box] md:[mask-composite:add] md:[mask-mode:match-source] md:[mask-origin:border-box] md:[mask-position:0%_0%] md:[mask-repeat:repeat] md:[mask-size:auto] md:[mask-position:0%]"
        />
      </div>
    </div>
  );
};
