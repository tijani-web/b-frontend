export type TradingFeatureCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  rootVariant: string;
  contentVariant: string;
  headerVariant: string;
  imageVariant: string;
  titleWrapperVariant: string;
  titleVariant: string;
  descriptionVariant: string;
};

export const TradingFeatureCard = (props: TradingFeatureCardProps) => {
  return (
    <div
      className={`bg-transparent box-border caret-transparent text-white flex flex-col h-auto max-w-none outline-[3px] relative no-underline w-auto z-10 border overflow-hidden px-4 py-6 rounded-[26px] border-solid border-[oklab(0.999994_0.0000455678_0.0000200868_/_0.1)] md:bg-white/0 md:h-80 md:max-w-full md:min-h-80 md:px-6 ${props.rootVariant}`}
    >
      <div
        className={`box-border caret-transparent gap-x-4 flex flex-col outline-[3px] relative gap-y-4 no-underline z-[1] ${props.contentVariant}`}
      >
        <div
          className={`items-center box-border caret-transparent flex outline-[3px] no-underline w-full ${props.headerVariant}`}
        >
          <img
            alt=""
            src={props.imageUrl}
            className={`aspect-[auto_32_/_32] box-border text-transparent shrink-0 max-w-full object-contain outline-[3px] no-underline align-baseline ${props.imageVariant}`}
          />
          <div
            className={`items-center box-border caret-transparent gap-x-2 flex basis-[0%] grow justify-between outline-[3px] gap-y-2 no-underline ${props.titleWrapperVariant}`}
          >
            <h3
              className={`box-border caret-transparent text-lg font-medium leading-[26px] outline-[3px] no-underline md:text-[28px] md:leading-[34px] ${props.titleVariant}`}
            >
              {props.title}
            </h3>
          </div>
        </div>
        <p
          className={`box-border caret-transparent outline-[3px] no-underline ${props.descriptionVariant}`}
        >
          {props.description}
        </p>
      </div>
    </div>
  );
};
