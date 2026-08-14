import { TradingFeatureCard } from "@/sections/TradingWay/components/TradingFeatureCard";
import { TradingMedia } from "@/sections/TradingWay/components/TradingMedia";

export const TradingWay = () => {
  return (
    <section className="bg-black box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] relative no-underline w-full overflow-hidden">
      <div className="box-border caret-transparent gap-x-6 flex flex-col max-w-full outline-[3px] relative gap-y-6 no-underline w-full z-10 mx-auto px-4 py-6 md:gap-x-10 md:max-w-[1200px] md:gap-y-10 md:px-0 md:py-20">
        <h2 className="box-border caret-transparent text-white text-[28px] font-bold leading-[34px] min-h-[auto] min-w-[auto] outline-[3px] relative text-center no-underline z-10 md:text-7xl md:font-medium md:leading-[90px]">
          Your Trading, Your Way
        </h2>
        <div className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] relative no-underline w-full">
          <div className="items-center box-border caret-transparent gap-x-10 hidden outline-[3px] relative gap-y-10 no-underline w-full pt-6">
            <div className="box-border caret-transparent gap-x-10 flex basis-[0%] flex-col grow outline-[3px] gap-y-10 no-underline">
              <TradingFeatureCard
                title="Copy Trade"
                description="Buy and sell crypto instantly with real-time market prices. Perfect for beginners and pros alike."
                imageUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/copy-trade.svg"
                rootVariant="min-h-0 md:w-full"
                contentVariant=""
                headerVariant="gap-x-1 flex-row gap-y-1 md:items-start md:gap-x-6 md:flex-col md:gap-y-6"
                imageVariant="h-6 w-6 md:h-8 md:w-8"
                titleWrapperVariant="w-auto md:w-full"
                titleVariant=""
                descriptionVariant="text-violet-100/60 text-sm leading-5 md:text-xl md:leading-[30px]"
              />
              <TradingFeatureCard
                title="Future/Spot"
                description="High-performance trading with real-time listings and fast, reliable execution designed for confident decisions."
                imageUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/future-spot.svg"
                rootVariant="min-h-0 md:w-full"
                contentVariant=""
                headerVariant="gap-x-1 flex-row gap-y-1 md:items-start md:gap-x-6 md:flex-col md:gap-y-6"
                imageVariant="h-6 w-6 md:h-8 md:w-8"
                titleWrapperVariant="w-auto md:w-full"
                titleVariant=""
                descriptionVariant="text-violet-100/60 text-sm leading-5 md:text-xl md:leading-[30px]"
              />
              <TradingFeatureCard
                title="UTA"
                description="Automate your trades 24/7 with AI-powered bots. Optimize your strategies and seize market opportunities easily."
                imageUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/uta.svg"
                rootVariant="min-h-0 md:w-full"
                contentVariant=""
                headerVariant="gap-x-1 flex-row gap-y-1 md:items-start md:gap-x-6 md:flex-col md:gap-y-6"
                imageVariant="h-6 w-6 md:h-8 md:w-8"
                titleWrapperVariant="w-auto md:w-full"
                titleVariant=""
                descriptionVariant="text-violet-100/60 text-sm leading-5 md:text-xl md:leading-[30px]"
              />
              <TradingFeatureCard
                title="Earn"
                description="Diversified yield products designed for everyday users, simple, accessible, and rewarding to hold"
                imageUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/earn.svg"
                rootVariant="min-h-0 md:w-full"
                contentVariant=""
                headerVariant="gap-x-1 flex-row gap-y-1 md:items-start md:gap-x-6 md:flex-col md:gap-y-6"
                imageVariant="h-6 w-6 md:h-8 md:w-8"
                titleWrapperVariant="w-auto md:w-full"
                titleVariant=""
                descriptionVariant="text-violet-100/60 text-sm leading-5 md:text-xl md:leading-[30px]"
              />
            </div>
            <TradingMedia
              rootVariant="self-center h-[754px] w-[440px]"
              innerVariant="rounded-t-[34px]"
            />
          </div>
          <div className="items-stretch box-border caret-transparent gap-x-10 hidden outline-[3px] relative gap-y-10 no-underline w-full pt-6 md:flex">
            <div className="[align-items:normal] box-border caret-transparent gap-x-20 flex basis-[0%] flex-col grow min-h-0 outline-[3px] gap-y-20 no-underline py-10 md:items-end md:min-h-[auto]">
              <TradingFeatureCard
                title="Copy Trade"
                description="Buy and sell crypto instantly with real-time market prices. Perfect for beginners and pros alike."
                imageUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/copy-trade.svg"
                rootVariant="min-h-0 min-w-0 md:min-w-[auto] md:w-full"
                contentVariant="min-h-0 min-w-0 md:min-h-[auto] md:min-w-[auto]"
                headerVariant="gap-x-1 flex-row min-h-0 gap-y-1 md:items-start md:gap-x-6 md:flex-col md:min-h-[auto] md:gap-y-6"
                imageVariant="h-6 min-h-0 min-w-0 w-6 md:h-8 md:min-h-[auto] md:min-w-[auto] md:w-8"
                titleWrapperVariant="min-h-0 w-auto md:min-h-[auto] md:w-full"
                titleVariant="min-h-0 md:min-h-[auto]"
                descriptionVariant="text-violet-100/60 text-sm leading-5 min-h-0 min-w-0 md:text-xl md:leading-[30px] md:min-h-[auto] md:min-w-[auto]"
              />
              <TradingFeatureCard
                title="Future/Spot"
                description="High-performance trading with real-time listings and fast, reliable execution designed for confident decisions."
                imageUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/future-spot.svg"
                rootVariant="min-h-0 min-w-0 md:min-w-[auto] md:w-full"
                contentVariant="min-h-0 min-w-0 md:min-h-[auto] md:min-w-[auto]"
                headerVariant="gap-x-1 flex-row min-h-0 gap-y-1 md:items-start md:gap-x-6 md:flex-col md:min-h-[auto] md:gap-y-6"
                imageVariant="h-6 min-h-0 min-w-0 w-6 md:h-8 md:min-h-[auto] md:min-w-[auto] md:w-8"
                titleWrapperVariant="min-h-0 w-auto md:min-h-[auto] md:w-full"
                titleVariant="min-h-0 md:min-h-[auto]"
                descriptionVariant="text-violet-100/60 text-sm leading-5 min-h-0 min-w-0 md:text-xl md:leading-[30px] md:min-h-[auto] md:min-w-[auto]"
              />
            </div>
            <TradingMedia
              rootVariant="self-stretch min-h-[580px] min-w-0 w-[480px] md:min-w-[auto]"
              innerVariant="rounded-t-[36px]"
            />
            <div className="[align-items:normal] box-border caret-transparent gap-x-20 flex basis-[0%] flex-col grow min-h-0 outline-[3px] gap-y-20 no-underline py-10 md:items-start md:min-h-[auto]">
              <TradingFeatureCard
                title="UTA"
                description="Automate your trades 24/7 with AI-powered bots. Optimize your strategies and seize market opportunities easily."
                imageUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/uta.svg"
                rootVariant="min-h-0 min-w-0 md:min-w-[auto] md:w-full"
                contentVariant="min-h-0 min-w-0 md:min-h-[auto] md:min-w-[auto]"
                headerVariant="gap-x-1 flex-row min-h-0 gap-y-1 md:items-start md:gap-x-6 md:flex-col md:min-h-[auto] md:gap-y-6"
                imageVariant="h-6 min-h-0 min-w-0 w-6 md:h-8 md:min-h-[auto] md:min-w-[auto] md:w-8"
                titleWrapperVariant="min-h-0 w-auto md:min-h-[auto] md:w-full"
                titleVariant="min-h-0 md:min-h-[auto]"
                descriptionVariant="text-violet-100/60 text-sm leading-5 min-h-0 min-w-0 md:text-xl md:leading-[30px] md:min-h-[auto] md:min-w-[auto]"
              />
              <TradingFeatureCard
                title="Earn"
                description="Diversified yield products designed for everyday users, simple, accessible, and rewarding to hold"
                imageUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/earn.svg"
                rootVariant="min-h-0 min-w-0 md:min-w-[auto] md:w-full"
                contentVariant="min-h-0 min-w-0 md:min-h-[auto] md:min-w-[auto]"
                headerVariant="gap-x-1 flex-row min-h-0 gap-y-1 md:items-start md:gap-x-6 md:flex-col md:min-h-[auto] md:gap-y-6"
                imageVariant="h-6 min-h-0 min-w-0 w-6 md:h-8 md:min-h-[auto] md:min-w-[auto] md:w-8"
                titleWrapperVariant="min-h-0 w-auto md:min-h-[auto] md:w-full"
                titleVariant="min-h-0 md:min-h-[auto]"
                descriptionVariant="text-violet-100/60 text-sm leading-5 min-h-0 min-w-0 md:text-xl md:leading-[30px] md:min-h-[auto] md:min-w-[auto]"
              />
            </div>
          </div>
          <div className="box-border caret-transparent gap-x-6 grid grid-cols-[repeat(1,minmax(0px,1fr))] outline-[3px] relative gap-y-6 no-underline z-10 md:hidden md:grid-cols-[repeat(2,minmax(0px,1fr))] md:gap-y-16">
            <TradingFeatureCard
              title="Copy Trade"
              description="Buy and sell crypto instantly with real-time market prices. Perfect for beginners and pros alike."
              imageUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/copy-trade.svg"
              rootVariant="justify-self-auto min-h-[auto] min-w-[auto] md:justify-self-start md:min-w-0 md:w-[400px]"
              contentVariant="min-h-[auto] min-w-[auto] md:min-h-0 md:min-w-0"
              headerVariant="gap-x-3 min-h-[auto] gap-y-3 md:min-h-0"
              imageVariant="h-8 min-h-[auto] min-w-[auto] w-8 md:min-h-0 md:min-w-0"
              titleWrapperVariant="min-h-[auto] md:min-h-0"
              titleVariant="min-h-[auto] md:min-h-0"
              descriptionVariant="text-violet-100/40 text-xl leading-[30px] min-h-[auto] min-w-[auto] md:min-h-0 md:min-w-0"
            />
            <TradingFeatureCard
              title="Future/Spot"
              description="High-performance trading with real-time listings and fast, reliable execution designed for confident decisions."
              imageUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/future-spot.svg"
              rootVariant="justify-self-auto min-h-[auto] min-w-[auto] md:justify-self-end md:min-w-0 md:w-[400px]"
              contentVariant="min-h-[auto] min-w-[auto] md:min-h-0 md:min-w-0"
              headerVariant="gap-x-3 min-h-[auto] gap-y-3 md:min-h-0"
              imageVariant="h-8 min-h-[auto] min-w-[auto] w-8 md:min-h-0 md:min-w-0"
              titleWrapperVariant="min-h-[auto] md:min-h-0"
              titleVariant="min-h-[auto] md:min-h-0"
              descriptionVariant="text-violet-100/40 text-xl leading-[30px] min-h-[auto] min-w-[auto] md:min-h-0 md:min-w-0"
            />
            <TradingFeatureCard
              title="UTA"
              description="Automate your trades 24/7 with AI-powered bots. Optimize your strategies and seize market opportunities easily."
              imageUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/uta.svg"
              rootVariant="justify-self-auto min-h-[auto] min-w-[auto] md:justify-self-start md:min-w-0 md:w-[400px]"
              contentVariant="min-h-[auto] min-w-[auto] md:min-h-0 md:min-w-0"
              headerVariant="gap-x-3 min-h-[auto] gap-y-3 md:min-h-0"
              imageVariant="h-8 min-h-[auto] min-w-[auto] w-8 md:min-h-0 md:min-w-0"
              titleWrapperVariant="min-h-[auto] md:min-h-0"
              titleVariant="min-h-[auto] md:min-h-0"
              descriptionVariant="text-violet-100/40 text-xl leading-[30px] min-h-[auto] min-w-[auto] md:min-h-0 md:min-w-0"
            />
            <TradingFeatureCard
              title="Earn"
              description="Diversified yield products designed for everyday users, simple, accessible, and rewarding to hold"
              imageUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/earn.svg"
              rootVariant="justify-self-auto min-h-[auto] min-w-[auto] md:justify-self-end md:min-w-0 md:w-[400px]"
              contentVariant="min-h-[auto] min-w-[auto] md:min-h-0 md:min-w-0"
              headerVariant="gap-x-3 min-h-[auto] gap-y-3 md:min-h-0"
              imageVariant="h-8 min-h-[auto] min-w-[auto] w-8 md:min-h-0 md:min-w-0"
              titleWrapperVariant="min-h-[auto] md:min-h-0"
              titleVariant="min-h-[auto] md:min-h-0"
              descriptionVariant="text-violet-100/40 text-xl leading-[30px] min-h-[auto] min-w-[auto] md:min-h-0 md:min-w-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
