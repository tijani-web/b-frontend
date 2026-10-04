export type TradingMediaProps = {
  rootVariant: string;
  innerVariant: string;
};

export const TradingMedia = (props: TradingMediaProps) => {
  return (
    <div
      className={`box-border caret-transparent shrink-0 outline-[3px] relative no-underline mx-auto ${props.rootVariant}`}
    >
      <div
        className={`bg-black box-border caret-transparent outline-[3px] absolute no-underline border border-zinc-800 overflow-hidden border-solid inset-0 ${props.innerVariant}`}
      >
        <div className="box-border caret-transparent h-full outline-[3px] relative no-underline w-full inset-0">
          <img
            alt=""
            src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/copy-trade.webp"
            className="box-border text-transparent h-full max-w-full object-cover object-[50%_0%] outline-[3px] absolute no-underline align-baseline w-full z-0 inset-0"
          />
          <video
            poster="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/copy-trade.webp"
            autoPlay
            muted
            playsInline
            loop
            preload="auto"
            className="box-border caret-transparent h-full max-w-full object-cover object-[50%_0%] outline-[3px] pointer-events-none absolute no-underline align-baseline w-full z-[1] inset-0"
          >
            <source
              src="https://s2.blofin.com/frontend/_home_website/_next/static/home-public-static/videos/home/tradingYourWay/copy-trade.mp4"
              type="video/mp4"
              className="caret-transparent text-black leading-[normal] outline-[3px] pointer-events-auto no-underline font-times_new_roman"
            />
          </video>
        </div>
        <div className="bg-[linear-gradient(in_oklab,rgba(0,0,0,0)_0%,rgb(0,0,0)_100%)] box-border caret-transparent h-[105px] outline-[3px] pointer-events-none absolute no-underline z-[2] bottom-0 inset-x-0"></div>
        <div className="bg-black box-border caret-transparent blur-[56px] h-8 outline-[3px] pointer-events-none absolute no-underline z-[2] -bottom-1 inset-x-0"></div>
      </div>
    </div>
  );
};
