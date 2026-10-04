import { MarketRow } from "./MarketRow";

export const MarketsTable = () => {
  return (
    <div className="caret-transparent outline-[3px] no-underline w-full z-10 mt-16 mx-auto md:w-4/5">
      <div className="box-border caret-transparent [mask-image:linear-gradient(rgb(0,0,0)_50%,rgba(0,0,0,0)_100%)] outline-[3px] no-underline w-full overflow-hidden p-3 rounded-lg font-inter">
        <div className="caret-transparent outline-[3px] no-underline">
          <table className="caret-transparent outline-[3px] no-underline w-full p-6 border-collapse">
            <thead className="bg-stone-950 box-border caret-transparent outline-[3px] no-underline align-baseline">
              <tr className="items-center bg-[position:0px_0px] caret-transparent gap-x-3 flex justify-between outline-[3px] gap-y-3 no-underline w-full px-2 py-1 rounded-lg">
                <th className="items-center caret-transparent text-gray-400 gap-x-0.5 flex text-xs font-medium justify-start max-w-[250px] min-h-[auto] min-w-[50px] outline-[3px] gap-y-0.5 text-center no-underline w-full p-2">
                  <img
                    alt="watchlist star"
                    src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/filled.svg"
                    className="aspect-[auto_14_/_14] text-transparent hidden h-3.5 min-h-0 min-w-0 outline-[3px] no-underline align-baseline w-3.5 mr-2 md:block md:min-h-[auto] md:min-w-[auto]"
                  />
                  <p className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline">
                    Asset
                  </p>
                </th>
                <th className="caret-transparent text-gray-400 hidden text-xs font-medium min-w-[60px] outline-[3px] text-center no-underline w-full p-2">
                  Symbol
                </th>
                <th className="content-center caret-transparent text-gray-400 hidden text-xs font-medium justify-center min-h-0 min-w-[60px] outline-[3px] text-center no-underline capitalize w-full p-2 md:grid md:min-h-[auto]">
                  Type
                </th>
                <th className="content-center caret-transparent text-gray-400 grid text-xs font-medium justify-center min-h-[auto] min-w-[100px] outline-[3px] text-center no-underline w-full p-2">
                  Current price (USD)
                </th>
                <th className="caret-transparent text-gray-400 gap-x-1.5 flex text-xs font-medium justify-center min-h-[auto] min-w-[50px] outline-[3px] gap-y-1.5 text-center no-underline w-full p-2">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="caret-transparent gap-x-2 grid h-[97%] [mask-image:linear-gradient(0deg,rgba(0,0,0,0),rgb(0,0,0)_3px,rgb(0,0,0)_calc(100%_-_18px),rgba(0,0,0,0))] outline-[3px] gap-y-2 no-underline align-baseline w-full overflow-scroll pt-3">
              <MarketRow
                iconAlt="BTC icon"
                iconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/BTC.svg"
                name="Bitcoin"
                symbol="BTC"
                category="crypto"
                price="$63,115.25"
              />
              <MarketRow
                iconAlt="ETH icon"
                iconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/ETH.svg"
                name="Ethereum"
                symbol="ETH"
                category="crypto"
                price="$1,871.83"
              />
              <MarketRow
                iconAlt="AAPL icon"
                iconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/AAPL.svg"
                name="Apple"
                symbol="AAPL"
                category="stocks"
                price="$302.87"
              />
              <MarketRow
                iconAlt="TSLA icon"
                iconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/TSLA.svg"
                name="Tesla"
                symbol="TSLA"
                category="stocks"
                price="$310.59"
              />
              <MarketRow
                iconAlt="LTC icon"
                iconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/LTC.svg"
                name="Litecoin"
                symbol="LTC"
                category="crypto"
                price="$44.98"
              />
              <MarketRow
                iconAlt="XRP icon"
                iconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/XRP.svg"
                name="Ripple"
                symbol="XRP"
                category="crypto"
                price="$1.07"
              />
              <MarketRow
                iconAlt="SPY icon"
                iconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/spdr.png"
                name="S&P 500 ETF Trust"
                symbol="SPY"
                category="ETFs"
                price="$745.99"
              />
              <MarketRow
                iconAlt="AMZN icon"
                iconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/AMZN.svg"
                name="Amazon"
                symbol="AMZN"
                category="stocks"
                price="$271.62"
              />
              <MarketRow
                iconAlt="ADA icon"
                iconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/ADA.svg"
                name="Cardano"
                symbol="ADA"
                category="crypto"
                price="$0.17"
              />
              <MarketRow
                iconAlt="NVDA icon"
                iconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/NVDA.svg"
                name="Nvidia"
                symbol="NVDA"
                category="stocks"
                price="$198.87"
              />
              <MarketRow
                iconAlt="QQQ icon"
                iconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/invesco.png"
                name="QQQ Trust Series 1"
                symbol="QQQ"
                category="ETFs"
                price="$688.42"
              />
              <MarketRow
                iconAlt="VTI icon"
                iconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/vanguard.png"
                name="Total Stock Market ETF"
                symbol="VTI"
                category="ETFs"
                price="$323.76"
              />
              <MarketRow
                iconAlt="XLM icon"
                iconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/XLM.svg"
                name="Stellar"
                symbol="XLM"
                category="crypto"
                price="$0.17"
              />
              <MarketRow
                iconAlt="NFLX icon"
                iconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/NFLX.svg"
                name="Netflix"
                symbol="NFLX"
                category="stocks"
                price="$71.77"
              />
              <MarketRow
                iconAlt="SOL icon"
                iconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/SOL.svg"
                name="Solana"
                symbol="SOL"
                category="crypto"
                price="$73.11"
              />
              <MarketRow
                iconAlt="VGT icon"
                iconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/vanguard.png"
                name="Information Technology ETF"
                symbol="VGT"
                category="ETFs"
                price="$420.00"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
