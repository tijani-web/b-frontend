export type MarketRowProps = {
  iconAlt: string;
  iconSrc: string;
  name: string;
  symbol: string;
  category: string;
  price: string;
};

export const MarketRow = (props: MarketRowProps) => {
  return (
    <tr className="items-center border-b-violet-300/10 caret-transparent gap-x-3 flex justify-between min-h-[auto] min-w-[auto] outline-[3px] gap-y-3 no-underline w-full px-2 py-3 border-b">
      <td className="items-center caret-transparent gap-x-0.5 flex text-sm font-medium justify-start leading-[14px] max-w-[250px] min-h-[auto] min-w-[50px] outline-[3px] gap-y-0.5 no-underline w-full p-0">
        <img
          alt="watchlist star"
          src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/gold.svg"
          className="aspect-[auto_14_/_14] text-transparent hidden h-3.5 min-h-0 min-w-0 outline-[3px] no-underline align-baseline w-3.5 mr-2 md:block md:min-h-[auto] md:min-w-[auto]"
        />
        <img
          alt={props.iconAlt}
          src={props.iconSrc}
          className="aspect-[auto_17_/_17] text-transparent h-[17px] min-h-[auto] min-w-[auto] outline-[3px] no-underline align-baseline w-[17px] mr-2"
        />
        <p className="caret-transparent text-zinc-50 hidden font-semibold min-h-0 min-w-0 outline-[3px] no-underline text-nowrap md:block md:min-h-[auto] md:min-w-[auto]">
          {props.name}
        </p>
        <p className="caret-transparent text-zinc-50 block font-semibold max-w-[120px] min-h-[auto] min-w-[auto] outline-[3px] no-underline text-ellipsis text-nowrap overflow-hidden md:hidden md:min-h-0 md:min-w-0">
          {props.symbol}
        </p>
      </td>
      <td className="content-center caret-transparent text-gray-400 hidden text-sm font-medium justify-center leading-[14px] min-h-0 min-w-[60px] outline-[3px] text-center no-underline capitalize w-full p-0 md:grid md:min-h-[auto]">
        <p className="caret-transparent min-h-0 min-w-0 outline-[3px] no-underline md:min-h-[auto] md:min-w-[auto]">
          {props.category}
        </p>
      </td>
      <td className="content-center caret-transparent text-gray-400 grid text-sm font-medium justify-center leading-[14px] min-h-[auto] min-w-[100px] outline-[3px] text-center no-underline w-full p-0">
        <p className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline">
          {props.price}
        </p>
      </td>
      <td className="caret-transparent gap-x-1.5 flex text-sm font-medium justify-center leading-[14px] min-h-[auto] min-w-[50px] outline-[3px] gap-y-1.5 text-center no-underline w-full p-0">
        <a
          href="https://app.BlofinPrime.com/markets"
          className="items-center bg-neutral-950 box-border caret-transparent text-zinc-50 gap-x-2 flex min-h-[auto] min-w-[auto] outline-[3px] relative gap-y-2 no-underline text-nowrap overflow-hidden px-2 py-1 rounded-lg after:accent-auto after:bg-[linear-gradient(rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.1)_100%)] after:caret-transparent after:text-zinc-50 after:block after:text-sm after:not-italic after:normal-nums after:font-medium after:h-full after:tracking-[normal] after:leading-[14px] after:list-outside after:list-disc after:outline-[3px] after:pointer-events-none after:absolute after:text-center after:no-underline after:indent-[0px] after:normal-case after:text-nowrap after:visible after:w-full after:border-collapse after:left-0 after:top-0 after:font-inter"
        >
          <p className="caret-transparent leading-5 min-h-[auto] min-w-[auto] outline-[3px] relative no-underline text-nowrap z-[1] font-inter">
            Trade
          </p>
        </a>
      </td>
    </tr>
  );
};
