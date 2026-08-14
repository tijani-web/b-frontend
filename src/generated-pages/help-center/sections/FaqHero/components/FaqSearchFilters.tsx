export const FaqSearchFilters = () => {
  return (
    <div className="caret-transparent outline-[3px] relative no-underline w-full z-10 mt-16 mx-auto">
      <div className="caret-transparent gap-x-3 flex font-medium max-w-[480px] outline-[3px] gap-y-3 no-underline mb-8 mx-auto md:max-w-[680px]">
        <div className="items-center bg-stone-950 box-border caret-transparent gap-x-2 flex basis-[0%] grow min-h-[auto] min-w-[auto] outline-[3px] gap-y-2 no-underline w-[70%] px-3 py-2 rounded-lg md:w-auto">
          <img
            src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-5-1.svg"
            alt="Icon"
            className="caret-transparent text-gray-400 shrink-0 h-4 outline-[3px] no-underline align-baseline w-4"
          />
          <input
            type="text"
            placeholder="Search for answers..."
            value=""
            className="bg-transparent bg-[position:0px_0px] caret-transparent text-zinc-50 block basis-[0%] grow text-sm font-normal leading-5 min-h-[auto] min-w-[auto] outline-[3px] no-underline"
          />
        </div>
        <div className="items-center bg-stone-950 box-border caret-transparent flex max-w-none min-h-[auto] min-w-[auto] outline-[3px] relative no-underline w-[30%] px-3 py-2 rounded-lg md:max-w-[120px] md:min-w-[120px] md:w-full">
          <select className="appearance-none bg-transparent bg-[position:0px_0px] caret-transparent text-gray-400 block text-sm leading-5 min-h-[auto] min-w-[auto] outline-[3px] no-underline w-full pr-6 hover:text-zinc-50 hover:border-zinc-50">
            <option
              value="all"
              className="items-center caret-transparent gap-x-[7px] font-normal min-h-6 min-w-6 outline-[3px] gap-y-[7px] no-underline hover:bg-[oklab(0.67725_0.0163646_-0.0424284_/_0.1)]"
            >
              All
            </option>
            <option
              value="Trading"
              className="items-center caret-transparent gap-x-[7px] font-normal min-h-6 min-w-6 outline-[3px] gap-y-[7px] no-underline hover:bg-[oklab(0.67725_0.0163646_-0.0424284_/_0.1)]"
            >
              Trading
            </option>
            <option
              value="Stocks"
              className="items-center caret-transparent gap-x-[7px] font-normal min-h-6 min-w-6 outline-[3px] gap-y-[7px] no-underline hover:bg-[oklab(0.67725_0.0163646_-0.0424284_/_0.1)]"
            >
              Stocks
            </option>
            <option
              value="Real Estate"
              className="items-center caret-transparent gap-x-[7px] font-normal min-h-6 min-w-6 outline-[3px] gap-y-[7px] no-underline hover:bg-[oklab(0.67725_0.0163646_-0.0424284_/_0.1)]"
            >
              Real Estate
            </option>
            <option
              value="Crypto"
              className="items-center caret-transparent gap-x-[7px] font-normal min-h-6 min-w-6 outline-[3px] gap-y-[7px] no-underline hover:bg-[oklab(0.67725_0.0163646_-0.0424284_/_0.1)]"
            >
              Crypto
            </option>
            <option
              value="Copy Trading"
              className="items-center caret-transparent gap-x-[7px] font-normal min-h-6 min-w-6 outline-[3px] gap-y-[7px] no-underline hover:bg-[oklab(0.67725_0.0163646_-0.0424284_/_0.1)]"
            >
              Copy Trading
            </option>
            <option
              value="Staking"
              className="items-center caret-transparent gap-x-[7px] font-normal min-h-6 min-w-6 outline-[3px] gap-y-[7px] no-underline hover:bg-[oklab(0.67725_0.0163646_-0.0424284_/_0.1)]"
            >
              Staking
            </option>
          </select>
          <img
            src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-6-1.svg"
            alt="Icon"
            className="caret-transparent text-gray-400 shrink-0 h-6 outline-[3px] pointer-events-none absolute no-underline align-baseline w-6 right-3"
          />
        </div>
      </div>
      <div className="caret-transparent gap-x-16 flex flex-col max-w-[480px] outline-[3px] gap-y-16 no-underline w-full mx-auto md:max-w-[680px]">
        <div className="caret-transparent gap-x-4 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 no-underline">
          <p className="caret-transparent text-zinc-50 font-semibold leading-[14px] min-h-[auto] min-w-[auto] outline-[3px] no-underline px-3 font-mori">
            Trading
          </p>
          <div className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline">
            <div
              role="region"
              className="box-border caret-transparent text-[lab(8.11897_0.811279_-12.254)] flex flex-col justify-center outline-[3px] no-underline w-full"
            >
              <div className="border-b-violet-300/10 border-l-[lab(8.11897_0.811279_-12.254)] border-r-[lab(8.11897_0.811279_-12.254)] border-t-[lab(8.11897_0.811279_-12.254)] caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline border-b">
                <h3 className="caret-transparent text-[18.72px] font-bold leading-[18.72px] outline-[3px] no-underline">
                  <button
                    type="button"
                    className="items-baseline bg-transparent bg-[position:0px_0px] caret-transparent text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-[3px] relative gap-y-4 text-left no-underline w-full pl-3 pr-1 py-4"
                  >
                    What is leverage trading?
                    <img
                      src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-1.svg"
                      alt="Icon"
                      className="box-border caret-transparent text-slate-200 shrink-0 h-5 outline-[3px] no-underline align-baseline w-5 mr-2"
                    />
                  </button>
                </h3>
              </div>
              <div className="border-b-violet-300/10 border-l-[lab(8.11897_0.811279_-12.254)] border-r-[lab(8.11897_0.811279_-12.254)] border-t-[lab(8.11897_0.811279_-12.254)] caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline border-b">
                <h3 className="caret-transparent text-[18.72px] font-bold leading-[18.72px] outline-[3px] no-underline">
                  <button
                    type="button"
                    className="items-baseline bg-transparent bg-[position:0px_0px] caret-transparent text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-[3px] relative gap-y-4 text-left no-underline w-full pl-3 pr-1 py-4"
                  >
                    How do I start trading?
                    <img
                      src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-1.svg"
                      alt="Icon"
                      className="box-border caret-transparent text-slate-200 shrink-0 h-5 outline-[3px] no-underline align-baseline w-5 mr-2"
                    />
                  </button>
                </h3>
              </div>
              <div className="border-b-violet-300/10 border-l-[lab(8.11897_0.811279_-12.254)] border-r-[lab(8.11897_0.811279_-12.254)] border-t-[lab(8.11897_0.811279_-12.254)] caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline border-b">
                <h3 className="caret-transparent text-[18.72px] font-bold leading-[18.72px] outline-[3px] no-underline">
                  <button
                    type="button"
                    className="items-baseline bg-transparent bg-[position:0px_0px] caret-transparent text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-[3px] relative gap-y-4 text-left no-underline w-full pl-3 pr-1 py-4"
                  >
                    What trading tools are available?
                    <img
                      src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-1.svg"
                      alt="Icon"
                      className="box-border caret-transparent text-slate-200 shrink-0 h-5 outline-[3px] no-underline align-baseline w-5 mr-2"
                    />
                  </button>
                </h3>
              </div>
              <div className="border-b-violet-300/10 border-l-[lab(8.11897_0.811279_-12.254)] border-r-[lab(8.11897_0.811279_-12.254)] border-t-[lab(8.11897_0.811279_-12.254)] caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline border-b">
                <h3 className="caret-transparent text-[18.72px] font-bold leading-[18.72px] outline-[3px] no-underline">
                  <button
                    type="button"
                    className="items-baseline bg-transparent bg-[position:0px_0px] caret-transparent text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-[3px] relative gap-y-4 text-left no-underline w-full pl-3 pr-1 py-4"
                  >
                    What is the minimum amount I can trade with?
                    <img
                      src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-1.svg"
                      alt="Icon"
                      className="box-border caret-transparent text-slate-200 shrink-0 h-5 outline-[3px] no-underline align-baseline w-5 mr-2"
                    />
                  </button>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="caret-transparent gap-x-4 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 no-underline">
          <p className="caret-transparent text-zinc-50 font-semibold leading-[14px] min-h-[auto] min-w-[auto] outline-[3px] no-underline px-3 font-mori">
            Stocks
          </p>
          <div className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline">
            <div
              role="region"
              className="box-border caret-transparent text-[lab(8.11897_0.811279_-12.254)] flex flex-col justify-center outline-[3px] no-underline w-full"
            >
              <div className="border-b-violet-300/10 border-l-[lab(8.11897_0.811279_-12.254)] border-r-[lab(8.11897_0.811279_-12.254)] border-t-[lab(8.11897_0.811279_-12.254)] caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline border-b">
                <h3 className="caret-transparent text-[18.72px] font-bold leading-[18.72px] outline-[3px] no-underline">
                  <button
                    type="button"
                    className="items-baseline bg-transparent bg-[position:0px_0px] caret-transparent text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-[3px] relative gap-y-4 text-left no-underline w-full pl-3 pr-1 py-4"
                  >
                    What stocks and ETFs can I trade?
                    <img
                      src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-1.svg"
                      alt="Icon"
                      className="box-border caret-transparent text-slate-200 shrink-0 h-5 outline-[3px] no-underline align-baseline w-5 mr-2"
                    />
                  </button>
                </h3>
              </div>
              <div className="border-b-violet-300/10 border-l-[lab(8.11897_0.811279_-12.254)] border-r-[lab(8.11897_0.811279_-12.254)] border-t-[lab(8.11897_0.811279_-12.254)] caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline border-b">
                <h3 className="caret-transparent text-[18.72px] font-bold leading-[18.72px] outline-[3px] no-underline">
                  <button
                    type="button"
                    className="items-baseline bg-transparent bg-[position:0px_0px] caret-transparent text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-[3px] relative gap-y-4 text-left no-underline w-full pl-3 pr-1 py-4"
                  >
                    How do I invest in stocks?
                    <img
                      src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-1.svg"
                      alt="Icon"
                      className="box-border caret-transparent text-slate-200 shrink-0 h-5 outline-[3px] no-underline align-baseline w-5 mr-2"
                    />
                  </button>
                </h3>
              </div>
              <div className="border-b-violet-300/10 border-l-[lab(8.11897_0.811279_-12.254)] border-r-[lab(8.11897_0.811279_-12.254)] border-t-[lab(8.11897_0.811279_-12.254)] caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline border-b">
                <h3 className="caret-transparent text-[18.72px] font-bold leading-[18.72px] outline-[3px] no-underline">
                  <button
                    type="button"
                    className="items-baseline bg-transparent bg-[position:0px_0px] caret-transparent text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-[3px] relative gap-y-4 text-left no-underline w-full pl-3 pr-1 py-4"
                  >
                    What is the difference between stocks and ETFs?
                    <img
                      src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-1.svg"
                      alt="Icon"
                      className="box-border caret-transparent text-slate-200 shrink-0 h-5 outline-[3px] no-underline align-baseline w-5 mr-2"
                    />
                  </button>
                </h3>
              </div>
              <div className="border-b-violet-300/10 border-l-[lab(8.11897_0.811279_-12.254)] border-r-[lab(8.11897_0.811279_-12.254)] border-t-[lab(8.11897_0.811279_-12.254)] caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline border-b">
                <h3 className="caret-transparent text-[18.72px] font-bold leading-[18.72px] outline-[3px] no-underline">
                  <button
                    type="button"
                    className="items-baseline bg-transparent bg-[position:0px_0px] caret-transparent text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-[3px] relative gap-y-4 text-left no-underline w-full pl-3 pr-1 py-4"
                  >
                    What is the minimum amount I can invest in stocks?
                    <img
                      src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-1.svg"
                      alt="Icon"
                      className="box-border caret-transparent text-slate-200 shrink-0 h-5 outline-[3px] no-underline align-baseline w-5 mr-2"
                    />
                  </button>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="caret-transparent gap-x-4 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 no-underline">
          <p className="caret-transparent text-zinc-50 font-semibold leading-[14px] min-h-[auto] min-w-[auto] outline-[3px] no-underline px-3 font-mori">
            Real Estate
          </p>
          <div className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline">
            <div
              role="region"
              className="box-border caret-transparent text-[lab(8.11897_0.811279_-12.254)] flex flex-col justify-center outline-[3px] no-underline w-full"
            >
              <div className="border-b-violet-300/10 border-l-[lab(8.11897_0.811279_-12.254)] border-r-[lab(8.11897_0.811279_-12.254)] border-t-[lab(8.11897_0.811279_-12.254)] caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline border-b">
                <h3 className="caret-transparent text-[18.72px] font-bold leading-[18.72px] outline-[3px] no-underline">
                  <button
                    type="button"
                    className="items-baseline bg-transparent bg-[position:0px_0px] caret-transparent text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-[3px] relative gap-y-4 text-left no-underline w-full pl-3 pr-1 py-4"
                  >
                    What is real estate investing on your platform?
                    <img
                      src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-1.svg"
                      alt="Icon"
                      className="box-border caret-transparent text-slate-200 shrink-0 h-5 outline-[3px] no-underline align-baseline w-5 mr-2"
                    />
                  </button>
                </h3>
              </div>
              <div className="border-b-violet-300/10 border-l-[lab(8.11897_0.811279_-12.254)] border-r-[lab(8.11897_0.811279_-12.254)] border-t-[lab(8.11897_0.811279_-12.254)] caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline border-b">
                <h3 className="caret-transparent text-[18.72px] font-bold leading-[18.72px] outline-[3px] no-underline">
                  <button
                    type="button"
                    className="items-baseline bg-transparent bg-[position:0px_0px] caret-transparent text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-[3px] relative gap-y-4 text-left no-underline w-full pl-3 pr-1 py-4"
                  >
                    How do I invest in real estate?
                    <img
                      src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-1.svg"
                      alt="Icon"
                      className="box-border caret-transparent text-slate-200 shrink-0 h-5 outline-[3px] no-underline align-baseline w-5 mr-2"
                    />
                  </button>
                </h3>
              </div>
              <div className="border-b-violet-300/10 border-l-[lab(8.11897_0.811279_-12.254)] border-r-[lab(8.11897_0.811279_-12.254)] border-t-[lab(8.11897_0.811279_-12.254)] caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline border-b">
                <h3 className="caret-transparent text-[18.72px] font-bold leading-[18.72px] outline-[3px] no-underline">
                  <button
                    type="button"
                    className="items-baseline bg-transparent bg-[position:0px_0px] caret-transparent text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-[3px] relative gap-y-4 text-left no-underline w-full pl-3 pr-1 py-4"
                  >
                    How do I earn money from real estate investments?
                    <img
                      src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-1.svg"
                      alt="Icon"
                      className="box-border caret-transparent text-slate-200 shrink-0 h-5 outline-[3px] no-underline align-baseline w-5 mr-2"
                    />
                  </button>
                </h3>
              </div>
              <div className="border-b-violet-300/10 border-l-[lab(8.11897_0.811279_-12.254)] border-r-[lab(8.11897_0.811279_-12.254)] border-t-[lab(8.11897_0.811279_-12.254)] caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline border-b">
                <h3 className="caret-transparent text-[18.72px] font-bold leading-[18.72px] outline-[3px] no-underline">
                  <button
                    type="button"
                    className="items-baseline bg-transparent bg-[position:0px_0px] caret-transparent text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-[3px] relative gap-y-4 text-left no-underline w-full pl-3 pr-1 py-4"
                  >
                    What is the minimum and maximum amount I can invest?
                    <img
                      src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-1.svg"
                      alt="Icon"
                      className="box-border caret-transparent text-slate-200 shrink-0 h-5 outline-[3px] no-underline align-baseline w-5 mr-2"
                    />
                  </button>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="caret-transparent gap-x-4 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 no-underline">
          <p className="caret-transparent text-zinc-50 font-semibold leading-[14px] min-h-[auto] min-w-[auto] outline-[3px] no-underline px-3 font-mori">
            Crypto
          </p>
          <div className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline">
            <div
              role="region"
              className="box-border caret-transparent text-[lab(8.11897_0.811279_-12.254)] flex flex-col justify-center outline-[3px] no-underline w-full"
            >
              <div className="border-b-violet-300/10 border-l-[lab(8.11897_0.811279_-12.254)] border-r-[lab(8.11897_0.811279_-12.254)] border-t-[lab(8.11897_0.811279_-12.254)] caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline border-b">
                <h3 className="caret-transparent text-[18.72px] font-bold leading-[18.72px] outline-[3px] no-underline">
                  <button
                    type="button"
                    className="items-baseline bg-transparent bg-[position:0px_0px] caret-transparent text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-[3px] relative gap-y-4 text-left no-underline w-full pl-3 pr-1 py-4"
                  >
                    What cryptocurrencies can I trade?
                    <img
                      src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-1.svg"
                      alt="Icon"
                      className="box-border caret-transparent text-slate-200 shrink-0 h-5 outline-[3px] no-underline align-baseline w-5 mr-2"
                    />
                  </button>
                </h3>
              </div>
              <div className="border-b-violet-300/10 border-l-[lab(8.11897_0.811279_-12.254)] border-r-[lab(8.11897_0.811279_-12.254)] border-t-[lab(8.11897_0.811279_-12.254)] caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline border-b">
                <h3 className="caret-transparent text-[18.72px] font-bold leading-[18.72px] outline-[3px] no-underline">
                  <button
                    type="button"
                    className="items-baseline bg-transparent bg-[position:0px_0px] caret-transparent text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-[3px] relative gap-y-4 text-left no-underline w-full pl-3 pr-1 py-4"
                  >
                    How do I trade cryptocurrencies?
                    <img
                      src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-1.svg"
                      alt="Icon"
                      className="box-border caret-transparent text-slate-200 shrink-0 h-5 outline-[3px] no-underline align-baseline w-5 mr-2"
                    />
                  </button>
                </h3>
              </div>
              <div className="border-b-violet-300/10 border-l-[lab(8.11897_0.811279_-12.254)] border-r-[lab(8.11897_0.811279_-12.254)] border-t-[lab(8.11897_0.811279_-12.254)] caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline border-b">
                <h3 className="caret-transparent text-[18.72px] font-bold leading-[18.72px] outline-[3px] no-underline">
                  <button
                    type="button"
                    className="items-baseline bg-transparent bg-[position:0px_0px] caret-transparent text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-[3px] relative gap-y-4 text-left no-underline w-full pl-3 pr-1 py-4"
                  >
                    What features are available for crypto trading?
                    <img
                      src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-1.svg"
                      alt="Icon"
                      className="box-border caret-transparent text-slate-200 shrink-0 h-5 outline-[3px] no-underline align-baseline w-5 mr-2"
                    />
                  </button>
                </h3>
              </div>
              <div className="border-b-violet-300/10 border-l-[lab(8.11897_0.811279_-12.254)] border-r-[lab(8.11897_0.811279_-12.254)] border-t-[lab(8.11897_0.811279_-12.254)] caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline border-b">
                <h3 className="caret-transparent text-[18.72px] font-bold leading-[18.72px] outline-[3px] no-underline">
                  <button
                    type="button"
                    className="items-baseline bg-transparent bg-[position:0px_0px] caret-transparent text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-[3px] relative gap-y-4 text-left no-underline w-full pl-3 pr-1 py-4"
                  >
                    What is the minimum amount I can trade crypto with?
                    <img
                      src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-1.svg"
                      alt="Icon"
                      className="box-border caret-transparent text-slate-200 shrink-0 h-5 outline-[3px] no-underline align-baseline w-5 mr-2"
                    />
                  </button>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="caret-transparent gap-x-4 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 no-underline">
          <p className="caret-transparent text-zinc-50 font-semibold leading-[14px] min-h-[auto] min-w-[auto] outline-[3px] no-underline px-3 font-mori">
            Copy Trading
          </p>
          <div className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline">
            <div
              role="region"
              className="box-border caret-transparent text-[lab(8.11897_0.811279_-12.254)] flex flex-col justify-center outline-[3px] no-underline w-full"
            >
              <div className="border-b-violet-300/10 border-l-[lab(8.11897_0.811279_-12.254)] border-r-[lab(8.11897_0.811279_-12.254)] border-t-[lab(8.11897_0.811279_-12.254)] caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline border-b">
                <h3 className="caret-transparent text-[18.72px] font-bold leading-[18.72px] outline-[3px] no-underline">
                  <button
                    type="button"
                    className="items-baseline bg-transparent bg-[position:0px_0px] caret-transparent text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-[3px] relative gap-y-4 text-left no-underline w-full pl-3 pr-1 py-4"
                  >
                    What is copy trading?
                    <img
                      src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-1.svg"
                      alt="Icon"
                      className="box-border caret-transparent text-slate-200 shrink-0 h-5 outline-[3px] no-underline align-baseline w-5 mr-2"
                    />
                  </button>
                </h3>
              </div>
              <div className="border-b-violet-300/10 border-l-[lab(8.11897_0.811279_-12.254)] border-r-[lab(8.11897_0.811279_-12.254)] border-t-[lab(8.11897_0.811279_-12.254)] caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline border-b">
                <h3 className="caret-transparent text-[18.72px] font-bold leading-[18.72px] outline-[3px] no-underline">
                  <button
                    type="button"
                    className="items-baseline bg-transparent bg-[position:0px_0px] caret-transparent text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-[3px] relative gap-y-4 text-left no-underline w-full pl-3 pr-1 py-4"
                  >
                    How do I copy an expert?
                    <img
                      src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-1.svg"
                      alt="Icon"
                      className="box-border caret-transparent text-slate-200 shrink-0 h-5 outline-[3px] no-underline align-baseline w-5 mr-2"
                    />
                  </button>
                </h3>
              </div>
              <div className="border-b-violet-300/10 border-l-[lab(8.11897_0.811279_-12.254)] border-r-[lab(8.11897_0.811279_-12.254)] border-t-[lab(8.11897_0.811279_-12.254)] caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline border-b">
                <h3 className="caret-transparent text-[18.72px] font-bold leading-[18.72px] outline-[3px] no-underline">
                  <button
                    type="button"
                    className="items-baseline bg-transparent bg-[position:0px_0px] caret-transparent text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-[3px] relative gap-y-4 text-left no-underline w-full pl-3 pr-1 py-4"
                  >
                    How do I stop copying an expert?
                    <img
                      src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-1.svg"
                      alt="Icon"
                      className="box-border caret-transparent text-slate-200 shrink-0 h-5 outline-[3px] no-underline align-baseline w-5 mr-2"
                    />
                  </button>
                </h3>
              </div>
              <div className="border-b-violet-300/10 border-l-[lab(8.11897_0.811279_-12.254)] border-r-[lab(8.11897_0.811279_-12.254)] border-t-[lab(8.11897_0.811279_-12.254)] caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline border-b">
                <h3 className="caret-transparent text-[18.72px] font-bold leading-[18.72px] outline-[3px] no-underline">
                  <button
                    type="button"
                    className="items-baseline bg-transparent bg-[position:0px_0px] caret-transparent text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-[3px] relative gap-y-4 text-left no-underline w-full pl-3 pr-1 py-4"
                  >
                    What is the minimum amount I can copy an expert with?
                    <img
                      src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-1.svg"
                      alt="Icon"
                      className="box-border caret-transparent text-slate-200 shrink-0 h-5 outline-[3px] no-underline align-baseline w-5 mr-2"
                    />
                  </button>
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="caret-transparent gap-x-4 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 no-underline">
          <p className="caret-transparent text-zinc-50 font-semibold leading-[14px] min-h-[auto] min-w-[auto] outline-[3px] no-underline px-3 font-mori">
            Staking
          </p>
          <div className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline">
            <div
              role="region"
              className="box-border caret-transparent text-[lab(8.11897_0.811279_-12.254)] flex flex-col justify-center outline-[3px] no-underline w-full"
            >
              <div className="border-b-violet-300/10 border-l-[lab(8.11897_0.811279_-12.254)] border-r-[lab(8.11897_0.811279_-12.254)] border-t-[lab(8.11897_0.811279_-12.254)] caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline border-b">
                <h3 className="caret-transparent text-[18.72px] font-bold leading-[18.72px] outline-[3px] no-underline">
                  <button
                    type="button"
                    className="items-baseline bg-transparent bg-[position:0px_0px] caret-transparent text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-[3px] relative gap-y-4 text-left no-underline w-full pl-3 pr-1 py-4"
                  >
                    How do I stake?
                    <img
                      src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-1.svg"
                      alt="Icon"
                      className="box-border caret-transparent text-slate-200 shrink-0 h-5 outline-[3px] no-underline align-baseline w-5 mr-2"
                    />
                  </button>
                </h3>
              </div>
              <div className="border-b-violet-300/10 border-l-[lab(8.11897_0.811279_-12.254)] border-r-[lab(8.11897_0.811279_-12.254)] border-t-[lab(8.11897_0.811279_-12.254)] caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline border-b">
                <h3 className="caret-transparent text-[18.72px] font-bold leading-[18.72px] outline-[3px] no-underline">
                  <button
                    type="button"
                    className="items-baseline bg-transparent bg-[position:0px_0px] caret-transparent text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-[3px] relative gap-y-4 text-left no-underline w-full pl-3 pr-1 py-4"
                  >
                    How long does a staking duration last?
                    <img
                      src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-1.svg"
                      alt="Icon"
                      className="box-border caret-transparent text-slate-200 shrink-0 h-5 outline-[3px] no-underline align-baseline w-5 mr-2"
                    />
                  </button>
                </h3>
              </div>
              <div className="border-b-violet-300/10 border-l-[lab(8.11897_0.811279_-12.254)] border-r-[lab(8.11897_0.811279_-12.254)] border-t-[lab(8.11897_0.811279_-12.254)] caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline border-b">
                <h3 className="caret-transparent text-[18.72px] font-bold leading-[18.72px] outline-[3px] no-underline">
                  <button
                    type="button"
                    className="items-baseline bg-transparent bg-[position:0px_0px] caret-transparent text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-[3px] relative gap-y-4 text-left no-underline w-full pl-3 pr-1 py-4"
                  >
                    What is the minimum and maximum amount I can stake?
                    <img
                      src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-1.svg"
                      alt="Icon"
                      className="box-border caret-transparent text-slate-200 shrink-0 h-5 outline-[3px] no-underline align-baseline w-5 mr-2"
                    />
                  </button>
                </h3>
              </div>
              <div className="border-b-violet-300/10 border-l-[lab(8.11897_0.811279_-12.254)] border-r-[lab(8.11897_0.811279_-12.254)] border-t-[lab(8.11897_0.811279_-12.254)] caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline border-b">
                <h3 className="caret-transparent text-[18.72px] font-bold leading-[18.72px] outline-[3px] no-underline">
                  <button
                    type="button"
                    className="items-baseline bg-transparent bg-[position:0px_0px] caret-transparent text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-[3px] relative gap-y-4 text-left no-underline w-full pl-3 pr-1 py-4"
                  >
                    How do I make money with staking?
                    <img
                      src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-1.svg"
                      alt="Icon"
                      className="box-border caret-transparent text-slate-200 shrink-0 h-5 outline-[3px] no-underline align-baseline w-5 mr-2"
                    />
                  </button>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
