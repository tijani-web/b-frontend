import { AssetTickerRow } from "./AssetTickerRow";

export const PortfolioShowcase = () => {
  return (
    <div className="caret-transparent max-w-[360px] min-h-[auto] min-w-[auto] outline-[3px] no-underline w-full mx-auto my-24 md:max-w-none md:w-max">
      <div className="items-center caret-transparent flex flex-col outline-[3px] no-underline mb-12 mx-auto md:mx-0">
        <p className="caret-transparent text-zinc-50 text-[28px] font-semibold leading-10 min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline font-mori md:text-[40px] md:leading-[48px]">
          Build your stock portfolio.
        </p>
        <p className="caret-transparent text-slate-200 text-lg leading-[26px] min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline mt-4">
          Start investing in a world of ever-growing stocks and ETFs.
        </p>
        <div className="bg-stone-950 caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline mt-6 p-0.5 rounded-lg">
          <button
            type="button"
            className="bg-violet-300/10 caret-transparent text-zinc-50 text-sm font-medium leading-5 outline-[3px] text-center no-underline px-3 py-2 rounded-md font-inter"
          >
            <p className="caret-transparent outline-[3px] no-underline">
              Stocks
            </p>
          </button>
          <button
            type="button"
            className="bg-transparent caret-transparent text-gray-400 text-sm font-medium leading-5 outline-[3px] text-center no-underline px-3 py-2 rounded-md font-inter"
          >
            <p className="caret-transparent outline-[3px] no-underline">ETFs</p>
          </button>
        </div>
      </div>
      <div className="items-center caret-transparent gap-x-4 flex flex-col [mask-clip:border-box,border-box] [mask-composite:intersect,intersect] [mask-image:linear-gradient(to_right,rgb(0,0,0)_75%,rgba(0,0,0,0)_100%),linear-gradient(to_left,rgb(0,0,0)_60%,rgba(0,0,0,0)_100%)] [mask-mode:match-source,match-source] [mask-origin:border-box,border-box] [mask-position:0%_0%,0%_0%] [mask-repeat:repeat,repeat] [mask-size:auto,auto] max-w-[360px] outline-[3px] gap-y-4 no-underline overflow-hidden [mask-position:0%,0%] md:max-w-[800px] md:overflow-visible">
        <AssetTickerRow
          items={[
            {
              name: "Apple",
              symbol: "AAPL",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/AAPL.svg",
            },
            {
              name: "Amazon",
              symbol: "AMZN",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/AMZN.svg",
            },
            {
              name: "Netflix",
              symbol: "NFLX",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/NFLX.svg",
            },
            {
              name: "Adobe",
              symbol: "ADBE",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/ADBE.svg",
            },
            {
              name: "Alibaba",
              symbol: "BABA",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/BABA.svg",
            },
            {
              name: "Caterpillar",
              symbol: "CAT",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/CAT.svg",
            },
            {
              name: "Apple",
              symbol: "AAPL",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/AAPL.svg",
            },
            {
              name: "Amazon",
              symbol: "AMZN",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/AMZN.svg",
            },
            {
              name: "Netflix",
              symbol: "NFLX",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/NFLX.svg",
            },
            {
              name: "Adobe",
              symbol: "ADBE",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/ADBE.svg",
            },
            {
              name: "Alibaba",
              symbol: "BABA",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/BABA.svg",
            },
            {
              name: "Caterpillar",
              symbol: "CAT",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/CAT.svg",
            },
          ]}
        />
        <AssetTickerRow
          items={[
            {
              name: "Tesla",
              symbol: "TSLA",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/TSLA.svg",
            },
            {
              name: "Microsoft",
              symbol: "MSFT",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/MSFT.svg",
            },
            {
              name: "Meta Platforms Inc",
              symbol: "FB",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/FB.svg",
            },
            {
              name: "Nvidia",
              symbol: "NVDA",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/NVDA.svg",
            },
            {
              name: "Oracle",
              symbol: "ORCL",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/ORCL.svg",
            },
            {
              name: "PayPal",
              symbol: "PYPL",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/PYPL.svg",
            },
            {
              name: "Tesla",
              symbol: "TSLA",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/TSLA.svg",
            },
            {
              name: "Microsoft",
              symbol: "MSFT",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/MSFT.svg",
            },
            {
              name: "Meta Platforms Inc",
              symbol: "FB",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/FB.svg",
            },
            {
              name: "Nvidia",
              symbol: "NVDA",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/NVDA.svg",
            },
            {
              name: "Oracle",
              symbol: "ORCL",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/ORCL.svg",
            },
            {
              name: "PayPal",
              symbol: "PYPL",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/PYPL.svg",
            },
          ]}
        />
        <AssetTickerRow
          items={[
            {
              name: "Boeing",
              symbol: "BA",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/BA.svg",
            },
            {
              name: "Cisco",
              symbol: "CSCO",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/CSCO.svg",
            },
            {
              name: "Disney",
              symbol: "DIS",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/DIS.svg",
            },
            {
              name: "Coca Cola",
              symbol: "KO",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/KO.svg",
            },
            {
              name: "Nike",
              symbol: "NKE",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/NKE.svg",
            },
            {
              name: "Visa",
              symbol: "V",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/V.svg",
            },
            {
              name: "Boeing",
              symbol: "BA",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/BA.svg",
            },
            {
              name: "Cisco",
              symbol: "CSCO",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/CSCO.svg",
            },
            {
              name: "Disney",
              symbol: "DIS",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/DIS.svg",
            },
            {
              name: "Coca Cola",
              symbol: "KO",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/KO.svg",
            },
            {
              name: "Nike",
              symbol: "NKE",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/NKE.svg",
            },
            {
              name: "Visa",
              symbol: "V",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/V.svg",
            },
          ]}
        />
        <AssetTickerRow
          items={[
            {
              name: "Walmart",
              symbol: "WMT",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/WMT.svg",
            },
            {
              name: "Toyota Motor",
              symbol: "TM",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/TM.svg",
            },
            {
              name: "Chevron",
              symbol: "CVX",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/CVX.svg",
            },
            {
              name: "Merck",
              symbol: "MRK",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/MRK.svg",
            },
            {
              name: "PepsiCo",
              symbol: "PEP",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/PEP.svg",
            },
            {
              name: "Costco",
              symbol: "COST",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/COST.svg",
            },
            {
              name: "Walmart",
              symbol: "WMT",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/WMT.svg",
            },
            {
              name: "Toyota Motor",
              symbol: "TM",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/TM.svg",
            },
            {
              name: "Chevron",
              symbol: "CVX",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/CVX.svg",
            },
            {
              name: "Merck",
              symbol: "MRK",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/MRK.svg",
            },
            {
              name: "PepsiCo",
              symbol: "PEP",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/PEP.svg",
            },
            {
              name: "Costco",
              symbol: "COST",
              imageUrl: "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/COST.svg",
            },
          ]}
        />
      </div>
    </div>
  );
};
