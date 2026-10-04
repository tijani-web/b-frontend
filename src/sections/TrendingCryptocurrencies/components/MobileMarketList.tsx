export const MobileMarketList = () => {
  return (
    <div className="backdrop-blur-[30px] backdrop-saturate-[1.2] shadow-[rgba(255,255,255,0.12)_0px_1px_0px_0px_inset,rgba(255,255,255,0.1)_-1px_-1px_0px_0px_inset,rgba(0,0,0,0.28)_0px_8px_32px_0px] box-border caret-transparent gap-x-6 flex flex-col outline-[3px] relative gap-y-6 no-underline mt-10 p-4 rounded-[20px] md:hidden md:mt-14 md:p-6 md:rounded-[26px] before:accent-auto before:box-border before:caret-transparent before:text-slate-50 before:block before:text-base before:not-italic before:normal-nums before:font-normal before:tracking-[normal] before:leading-4 before:list-outside before:list-disc before:outline-[3px] before:pointer-events-none before:absolute before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:border before:rounded-[20px] before:border-separate before:border-solid before:border-white/10 before:inset-0 before:font-blofinnova before:md:rounded-[26px]">
      <div className="box-border caret-transparent gap-x-4 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 no-underline w-full md:min-h-0 md:min-w-0">
        <div className="items-start box-border caret-transparent gap-x-2 flex shrink-0 justify-between min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 no-underline w-full md:min-h-0 md:min-w-0">
          <div
            role="tablist"
            aria-label="Trending Cryptocurrencies"
            className="items-center box-border caret-transparent gap-x-2 flex flex-wrap min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 no-underline md:min-h-0 md:min-w-0"
          >
            <button
              type="button"
              role="tab"
              className="bg-transparent bg-[position:0px_0px] caret-transparent text-white block text-sm font-bold tracking-[-0.35px] leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline p-0 md:text-2xl md:tracking-[-0.6px] md:leading-[34px] md:min-h-0 md:min-w-0"
            >
              Popular
            </button>
            <button
              type="button"
              role="tab"
              className="bg-transparent bg-[position:0px_0px] caret-transparent text-violet-100/60 block text-sm font-bold tracking-[-0.35px] leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline p-0 md:text-2xl md:tracking-[-0.6px] md:leading-[34px] md:min-h-0 md:min-w-0"
            >
              New Coins
            </button>
            <button
              type="button"
              role="tab"
              className="bg-transparent bg-[position:0px_0px] caret-transparent text-violet-100/60 block text-sm font-bold tracking-[-0.35px] leading-5 min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline p-0 md:text-2xl md:tracking-[-0.6px] md:leading-[34px] md:min-h-0 md:min-w-0"
            >
              Top Gainers
            </button>
          </div>
          <a
            href="https://app.BlofinPrime.com/"
            className="items-center box-border caret-transparent text-violet-100/40 gap-x-1.5 flex shrink-0 text-xs font-medium leading-4 min-h-[auto] min-w-[auto] outline-[3px] gap-y-1.5 no-underline py-1 rounded-lg md:text-[13px] md:leading-5 md:min-h-0 md:min-w-0"
          >
            View More
            <img
              src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-4.svg"
              alt="Icon"
              className="box-border caret-transparent shrink-0 text-xs h-4 leading-4 outline-[3px] no-underline align-baseline w-4 md:text-[13px] md:leading-5"
            />
          </a>
        </div>
        <div
          role="tabpanel"
          className="bg-black box-border caret-transparent gap-x-px flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-px no-underline w-full md:min-h-0 md:min-w-0"
        >
          <div className="bg-black box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline md:min-h-0 md:min-w-0">
            <a
              href="https://app.BlofinPrime.com/"
              className="items-center box-border caret-transparent flex outline-[3px] no-underline w-full py-3 rounded-xl"
            >
              <div className="items-center box-border caret-transparent gap-x-1.5 flex shrink-0 min-h-[auto] min-w-[auto] outline-[3px] gap-y-1.5 no-underline w-[min(42%,160px)] md:min-h-0 md:min-w-0 md:w-[200px]">
                <div className="bg-[oklab(0.999994_0.0000455678_0.0000200868_/_0.06)] box-border caret-transparent shrink-0 h-8 min-h-[auto] min-w-[auto] outline-[3px] no-underline w-8 overflow-hidden rounded-[3.35544e+07px] md:min-h-0 md:min-w-0">
                  <img
                    src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/BTC-y1Z7we69.png"
                    alt=""
                    className="aspect-[auto_32_/_32] box-border caret-transparent h-8 max-w-full object-cover outline-[3px] no-underline align-baseline w-8"
                  />
                </div>
                <p className="box-border caret-transparent text-white basis-[0%] grow text-sm leading-5 min-h-[auto] outline-[3px] no-underline text-ellipsis text-nowrap overflow-hidden md:min-h-0">
                  BTCUSDT
                </p>
              </div>
              <p className="box-border caret-transparent text-white basis-[0%] grow text-sm leading-5 min-h-[auto] outline-[3px] text-center no-underline text-ellipsis text-nowrap overflow-hidden md:min-h-0">
                $75,884.2
              </p>
              <p className="box-border caret-transparent text-rose-500 basis-[0%] grow text-sm leading-5 min-h-[auto] outline-[3px] text-right no-underline text-ellipsis text-nowrap overflow-hidden md:min-h-0">
                -0.93%
              </p>
            </a>
          </div>
          <div className="bg-black box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline md:min-h-0 md:min-w-0">
            <a
              href="https://app.BlofinPrime.com/"
              className="items-center box-border caret-transparent flex outline-[3px] no-underline w-full py-3 rounded-xl"
            >
              <div className="items-center box-border caret-transparent gap-x-1.5 flex shrink-0 min-h-[auto] min-w-[auto] outline-[3px] gap-y-1.5 no-underline w-[min(42%,160px)] md:min-h-0 md:min-w-0 md:w-[200px]">
                <div className="bg-[oklab(0.999994_0.0000455678_0.0000200868_/_0.06)] box-border caret-transparent shrink-0 h-8 min-h-[auto] min-w-[auto] outline-[3px] no-underline w-8 overflow-hidden rounded-[3.35544e+07px] md:min-h-0 md:min-w-0">
                  <img
                    src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/ETH-m5h6bj18.png"
                    alt=""
                    className="aspect-[auto_32_/_32] box-border caret-transparent h-8 max-w-full object-cover outline-[3px] no-underline align-baseline w-8"
                  />
                </div>
                <p className="box-border caret-transparent text-white basis-[0%] grow text-sm leading-5 min-h-[auto] outline-[3px] no-underline text-ellipsis text-nowrap overflow-hidden md:min-h-0">
                  ETHUSDT
                </p>
              </div>
              <p className="box-border caret-transparent text-white basis-[0%] grow text-sm leading-5 min-h-[auto] outline-[3px] text-center no-underline text-ellipsis text-nowrap overflow-hidden md:min-h-0">
                $2,076.9
              </p>
              <p className="box-border caret-transparent text-rose-500 basis-[0%] grow text-sm leading-5 min-h-[auto] outline-[3px] text-right no-underline text-ellipsis text-nowrap overflow-hidden md:min-h-0">
                -0.50%
              </p>
            </a>
          </div>
          <div className="bg-black box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline md:min-h-0 md:min-w-0">
            <a
              href="https://app.BlofinPrime.com/"
              className="items-center box-border caret-transparent flex outline-[3px] no-underline w-full py-3 rounded-xl"
            >
              <div className="items-center box-border caret-transparent gap-x-1.5 flex shrink-0 min-h-[auto] min-w-[auto] outline-[3px] gap-y-1.5 no-underline w-[min(42%,160px)] md:min-h-0 md:min-w-0 md:w-[200px]">
                <div className="bg-[oklab(0.999994_0.0000455678_0.0000200868_/_0.06)] box-border caret-transparent shrink-0 h-8 min-h-[auto] min-w-[auto] outline-[3px] no-underline w-8 overflow-hidden rounded-[3.35544e+07px] md:min-h-0 md:min-w-0">
                  <img
                    src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/ZEC-YwBx4M7E.png"
                    alt=""
                    className="aspect-[auto_32_/_32] box-border caret-transparent h-8 max-w-full object-cover outline-[3px] no-underline align-baseline w-8"
                  />
                </div>
                <p className="box-border caret-transparent text-white basis-[0%] grow text-sm leading-5 min-h-[auto] outline-[3px] no-underline text-ellipsis text-nowrap overflow-hidden md:min-h-0">
                  ZECUSDT
                </p>
              </div>
              <p className="box-border caret-transparent text-white basis-[0%] grow text-sm leading-5 min-h-[auto] outline-[3px] text-center no-underline text-ellipsis text-nowrap overflow-hidden md:min-h-0">
                $567.46
              </p>
              <p className="box-border caret-transparent text-rose-500 basis-[0%] grow text-sm leading-5 min-h-[auto] outline-[3px] text-right no-underline text-ellipsis text-nowrap overflow-hidden md:min-h-0">
                -9.26%
              </p>
            </a>
          </div>
          <div className="bg-black box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline md:min-h-0 md:min-w-0">
            <a
              href="https://app.BlofinPrime.com/"
              className="items-center box-border caret-transparent flex outline-[3px] no-underline w-full py-3 rounded-xl"
            >
              <div className="items-center box-border caret-transparent gap-x-1.5 flex shrink-0 min-h-[auto] min-w-[auto] outline-[3px] gap-y-1.5 no-underline w-[min(42%,160px)] md:min-h-0 md:min-w-0 md:w-[200px]">
                <div className="bg-[oklab(0.999994_0.0000455678_0.0000200868_/_0.06)] box-border caret-transparent shrink-0 h-8 min-h-[auto] min-w-[auto] outline-[3px] no-underline w-8 overflow-hidden rounded-[3.35544e+07px] md:min-h-0 md:min-w-0">
                  <img
                    src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/xrp.png"
                    alt=""
                    className="aspect-[auto_32_/_32] box-border caret-transparent h-8 max-w-full object-cover outline-[3px] no-underline align-baseline w-8"
                  />
                </div>
                <p className="box-border caret-transparent text-white basis-[0%] grow text-sm leading-5 min-h-[auto] outline-[3px] no-underline text-ellipsis text-nowrap overflow-hidden md:min-h-0">
                  XRPUSDT
                </p>
              </div>
              <p className="box-border caret-transparent text-white basis-[0%] grow text-sm leading-5 min-h-[auto] outline-[3px] text-center no-underline text-ellipsis text-nowrap overflow-hidden md:min-h-0">
                $1.332
              </p>
              <p className="box-border caret-transparent text-rose-500 basis-[0%] grow text-sm leading-5 min-h-[auto] outline-[3px] text-right no-underline text-ellipsis text-nowrap overflow-hidden md:min-h-0">
                -0.26%
              </p>
            </a>
          </div>
          <div className="bg-black box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline md:min-h-0 md:min-w-0">
            <a
              href="https://app.BlofinPrime.com/"
              className="items-center box-border caret-transparent flex outline-[3px] no-underline w-full py-3 rounded-xl"
            >
              <div className="items-center box-border caret-transparent gap-x-1.5 flex shrink-0 min-h-[auto] min-w-[auto] outline-[3px] gap-y-1.5 no-underline w-[min(42%,160px)] md:min-h-0 md:min-w-0 md:w-[200px]">
                <div className="bg-[oklab(0.999994_0.0000455678_0.0000200868_/_0.06)] box-border caret-transparent shrink-0 h-8 min-h-[auto] min-w-[auto] outline-[3px] no-underline w-8 overflow-hidden rounded-[3.35544e+07px] md:min-h-0 md:min-w-0">
                  <img
                    src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/sol.png"
                    alt=""
                    className="aspect-[auto_32_/_32] box-border caret-transparent h-8 max-w-full object-cover outline-[3px] no-underline align-baseline w-8"
                  />
                </div>
                <p className="box-border caret-transparent text-white basis-[0%] grow text-sm leading-5 min-h-[auto] outline-[3px] no-underline text-ellipsis text-nowrap overflow-hidden md:min-h-0">
                  SOLUSDT
                </p>
              </div>
              <p className="box-border caret-transparent text-white basis-[0%] grow text-sm leading-5 min-h-[auto] outline-[3px] text-center no-underline text-ellipsis text-nowrap overflow-hidden md:min-h-0">
                $83.93
              </p>
              <p className="box-border caret-transparent text-emerald-500 basis-[0%] grow text-sm leading-5 min-h-[auto] outline-[3px] text-right no-underline text-ellipsis text-nowrap overflow-hidden md:min-h-0">
                +0.06%
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
