export type AssetTickerRowItem = {
  name: string;
  symbol: string;
  imageUrl: string;
};

export type AssetTickerRowProps = {
  items: AssetTickerRowItem[];
};

export const AssetTickerRow = (props: AssetTickerRowProps) => {
  return (
    <div className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline w-full overflow-hidden">
      <div className="items-center caret-transparent gap-x-3 flex outline-[3px] gap-y-3 no-underline w-max">
        {props.items.map((item) => (
          <div
            className="bg-stone-950 box-border caret-transparent gap-x-3 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-3 no-underline w-max p-3 rounded-md"
            key={`${item.symbol}-${item.name}-${item.imageUrl}`}
          >
            <div className="caret-transparent h-7 min-h-[auto] min-w-[auto] outline-[3px] no-underline w-7 overflow-hidden rounded-sm">
              <img
                alt="icon img"
                src={item.imageUrl}
                className="aspect-[auto_28_/_28] text-transparent inline h-7 outline-[3px] no-underline align-baseline w-7"
              />
            </div>
            <span className="items-center caret-transparent gap-x-1.5 flex min-h-[auto] min-w-[auto] outline-[3px] gap-y-1.5 no-underline">
              <p className="caret-transparent text-zinc-50 text-sm leading-5 min-h-[auto] min-w-[auto] outline-[3px] no-underline">
                {item.name}
              </p>
              <p className="caret-transparent text-gray-400 text-sm leading-5 min-h-[auto] min-w-[auto] outline-[3px] no-underline">
                {item.symbol}
              </p>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
