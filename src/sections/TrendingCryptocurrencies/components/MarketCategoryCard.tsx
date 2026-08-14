export type MarketCategoryCardItem = {
  href: string;
  iconText?: string;
  imageUrl?: string;
  imageAlt: string;
  symbol: string;
  name: string;
  price: string;
  change: string;
  changeClassName: string;
};

export type MarketCategoryCardProps = {
  title: string;
  items: MarketCategoryCardItem[];
};

export const MarketCategoryCard = (props: MarketCategoryCardProps) => {
  return (
    <article className="backdrop-blur-[30px] backdrop-saturate-[1.2] shadow-[rgba(255,255,255,0.12)_0px_1px_0px_0px_inset,rgba(255,255,255,0.1)_-1px_-1px_0px_0px_inset,rgba(0,0,0,0.28)_0px_8px_32px_0px] box-border caret-transparent gap-x-3 flex flex-col min-h-0 min-w-0 outline-[3px] relative gap-y-3 no-underline px-3 py-5 rounded-[20px] md:gap-x-4 md:min-h-[auto] md:min-w-[auto] md:gap-y-4 md:px-4 md:py-7 md:rounded-[26px] before:accent-auto before:box-border before:caret-transparent before:text-slate-50 before:block before:text-base before:not-italic before:normal-nums before:font-normal before:tracking-[normal] before:leading-4 before:list-outside before:list-disc before:outline-[3px] before:pointer-events-none before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:border before:rounded-[20px] before:border-separate before:border-solid before:border-white/10 before:inset-0 before:font-blofinnova before:md:rounded-[26px]">
      <h3 className="box-border caret-transparent text-white text-lg font-bold leading-[26px] min-h-0 min-w-0 outline-[3px] text-center no-underline w-full md:text-2xl md:leading-[34px] md:min-h-[auto] md:min-w-[auto]">
        {props.title}
      </h3>
      <div className="box-border caret-transparent flex flex-col min-h-0 min-w-0 outline-[3px] no-underline w-full md:min-h-[auto] md:min-w-[auto]">
        {props.items.map((item) => (
          <a
            href={item.href}
            className="items-center box-border caret-transparent gap-x-3 flex justify-between min-h-0 min-w-0 outline-[3px] gap-y-3 no-underline px-2.5 py-2 rounded-xl md:min-h-[auto] md:min-w-[auto] md:px-3 md:py-2.5"
            key={`${item.symbol}-${item.name}`}
          >
            <div className="items-center box-border caret-transparent gap-x-2 flex basis-[0%] grow min-h-0 outline-[3px] gap-y-2 no-underline md:gap-x-2.5 md:min-h-[auto] md:gap-y-2.5">
              {item.imageUrl ? (
                <div className="box-border caret-transparent shrink-0 h-8 min-h-0 min-w-0 outline-[3px] no-underline w-8 rounded-[3.35544e+07px] md:min-h-[auto] md:min-w-[auto] bg-[oklab(0.999994_0.0000455678_0.0000200868_/_0.06)] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    className="aspect-[auto_32_/_32] box-border caret-transparent h-8 max-w-full object-cover outline-[3px] no-underline align-baseline w-8"
                  />
                </div>
              ) : (
                <div className="box-border caret-transparent shrink-0 h-8 min-h-0 min-w-0 outline-[3px] no-underline w-8 rounded-[3.35544e+07px] md:min-h-[auto] md:min-w-[auto] items-center bg-[linear-gradient(to_right_bottom,oklab(0.999994_0.0000455678_0.0000200868_/_0.14)_0%,oklab(0.999994_0.0000455678_0.0000200868_/_0.05)_100%)] text-white flex text-[10px] font-bold justify-center tracking-[-0.25px] leading-[10px]">
                  {item.iconText}
                </div>
              )}
              <div className="box-border caret-transparent min-h-0 outline-[3px] no-underline md:min-h-[auto]">
                <p className="box-border caret-transparent text-white text-xs font-normal leading-[18px] outline-[3px] no-underline text-ellipsis text-nowrap overflow-hidden md:text-sm md:font-medium md:leading-5">
                  {item.symbol}
                </p>
                <p className="box-border caret-transparent text-violet-100/60 text-[11px] leading-4 outline-[3px] no-underline text-ellipsis text-nowrap overflow-hidden md:text-xs md:leading-[18px]">
                  {item.name}
                </p>
              </div>
            </div>
            <div className="items-end box-border caret-transparent gap-x-0 flex basis-[0%] flex-col grow justify-center min-h-0 outline-[3px] gap-y-0 text-right no-underline md:min-h-[auto]">
              <p className="box-border caret-transparent text-white text-xs font-normal leading-[18px] min-h-0 min-w-0 outline-[3px] no-underline text-nowrap md:text-sm md:font-medium md:leading-5 md:min-h-[auto] md:min-w-[auto]">
                {item.price}
              </p>
              <p
                className={`box-border caret-transparent text-xs font-normal leading-[18px] min-h-0 min-w-0 outline-[3px] no-underline text-nowrap md:text-sm md:font-medium md:leading-5 md:min-h-[auto] md:min-w-[auto] ${item.changeClassName}`}
              >
                {item.change}
              </p>
            </div>
          </a>
        ))}
      </div>
    </article>
  );
};
