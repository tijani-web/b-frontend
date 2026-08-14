import { MobileMarketList } from "@/sections/TrendingCryptocurrencies/components/MobileMarketList";
import { MarketCategoryCard } from "@/sections/TrendingCryptocurrencies/components/MarketCategoryCard";
import { ViewMoreButton } from "@/sections/TrendingCryptocurrencies/components/ViewMoreButton";

export const TrendingCryptocurrencies = () => {
  return (
    <section className="bg-black box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] relative no-underline w-full">
      <div className="box-border caret-transparent max-w-full outline-[3px] no-underline w-full mx-auto pt-12 pb-20 px-4 md:max-w-[1200px] md:pt-20 md:px-0">
        <h2 className="box-border caret-transparent text-white text-[28px] font-bold tracking-[-0.7px] leading-[34px] outline-[3px] text-center no-underline w-full md:text-7xl md:tracking-[-1.8px] md:leading-[90px]">
          Trending Cryptocurrencies
        </h2>
        <p className="box-border caret-transparent text-violet-100/80 text-lg leading-[26px] max-w-[900px] outline-[3px] text-center no-underline w-full mt-4 mx-auto md:text-2xl md:leading-[34px] md:mt-6">
          Explore news, popular assets, and top gainers in real time
        </p>
        <MobileMarketList />
        <div className="box-border caret-transparent gap-x-6 hidden grid-cols-[repeat(3,minmax(0px,1fr))] outline-[3px] gap-y-6 no-underline mt-10 md:grid md:mt-16">
          <MarketCategoryCard
            title="Popular"
            items={[
              {
                href: "https://app.BlofinPrime.com/",
                imageUrl:
                  "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/BTC-y1Z7we69.png",
                imageAlt: "",
                symbol: "BTCUSDT",
                name: "Bitcoin",
                price: "$75,884.2",
                change: "-0.93%",
                changeClassName: "text-rose-500",
              },
              {
                href: "https://app.BlofinPrime.com/",
                imageUrl:
                  "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/ETH-m5h6bj18.png",
                imageAlt: "",
                symbol: "ETHUSDT",
                name: "Ethereum",
                price: "$2,076.9",
                change: "-0.50%",
                changeClassName: "text-rose-500",
              },
              {
                href: "https://app.BlofinPrime.com/",
                imageUrl:
                  "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/ZEC-YwBx4M7E.png",
                imageAlt: "",
                symbol: "ZECUSDT",
                name: "Zcash",
                price: "$567.46",
                change: "-9.26%",
                changeClassName: "text-rose-500",
              },
              {
                href: "https://app.BlofinPrime.com/",
                imageUrl:
                  "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/xrp.png",
                imageAlt: "",
                symbol: "XRPUSDT",
                name: "Ripple",
                price: "$1.332",
                change: "-0.26%",
                changeClassName: "text-rose-500",
              },
              {
                href: "https://app.BlofinPrime.com/",
                imageUrl:
                  "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/sol.png",
                imageAlt: "",
                symbol: "SOLUSDT",
                name: "Solana",
                price: "$83.93",
                change: "+0.06%",
                changeClassName: "text-emerald-500",
              },
            ]}
          />
          <MarketCategoryCard
            title="New Coins"
            items={[
              {
                href: "https://app.BlofinPrime.com/",
                iconText: "CO",
                imageAlt: "",
                symbol: "COHRUSDT",
                name: "COHR",
                price: "$386.78",
                change: "+1.05%",
                changeClassName: "text-emerald-500",
              },
              {
                href: "https://app.BlofinPrime.com/",
                iconText: "NB",
                imageAlt: "",
                symbol: "NBISUSDT",
                name: "NBIS",
                price: "$210.8",
                change: "-2.98%",
                changeClassName: "text-rose-500",
              },
              {
                href: "https://app.BlofinPrime.com/",
                iconText: "WD",
                imageAlt: "",
                symbol: "WDCUSDT",
                name: "WDC",
                price: "$539.31",
                change: "+1.70%",
                changeClassName: "text-emerald-500",
              },
              {
                href: "https://app.BlofinPrime.com/",
                iconText: "UR",
                imageAlt: "",
                symbol: "URNMUSDT",
                name: "URNM",
                price: "$60.72",
                change: "+3.05%",
                changeClassName: "text-emerald-500",
              },
              {
                href: "https://app.BlofinPrime.com/",
                iconText: "10",
                imageAlt: "",
                symbol: "10000NEXUSDT",
                name: "1000…",
                price: "$0.03457",
                change: "-6.44%",
                changeClassName: "text-rose-500",
              },
            ]}
          />
          <MarketCategoryCard
            title="Top Gainers"
            items={[
              {
                href: "https://app.BlofinPrime.com/",
                iconText: "DR",
                imageAlt: "",
                symbol: "DRIFTUSDT",
                name: "DRIFT",
                price: "$0.0456",
                change: "+26.32%",
                changeClassName: "text-emerald-500",
              },
              {
                href: "https://app.BlofinPrime.com/",
                imageUrl:
                  "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/US-3J5krwT5.png",
                imageAlt: "",
                symbol: "USUSDT",
                name: "Talus Network",
                price: "$0.007005",
                change: "+25.58%",
                changeClassName: "text-emerald-500",
              },
              {
                href: "https://app.BlofinPrime.com/",
                iconText: "MU",
                imageAlt: "",
                symbol: "MUUSDT",
                name: "MU",
                price: "$949.74",
                change: "+21.33%",
                changeClassName: "text-emerald-500",
              },
              {
                href: "https://app.BlofinPrime.com/",
                imageUrl:
                  "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/IO-J34XsTA3.png",
                imageAlt: "",
                symbol: "IOUSDT",
                name: "io.net",
                price: "$0.1782",
                change: "+16.17%",
                changeClassName: "text-emerald-500",
              },
              {
                href: "https://app.BlofinPrime.com/",
                imageUrl:
                  "https://c.animaapp.com/ms9b4yl7eEtjhI/assets/PHA-kG7Yf7k3.png",
                imageAlt: "",
                symbol: "PHAUSDT",
                name: "Phala Network",
                price: "$0.05344",
                change: "+15.32%",
                changeClassName: "text-emerald-500",
              },
            ]}
          />
        </div>
        <ViewMoreButton />
      </div>
    </section>
  );
};
