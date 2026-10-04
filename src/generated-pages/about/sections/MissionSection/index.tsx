import { SectionDivider } from "../../components/SectionDivider";
import { MissionStats } from "./components/MissionStats";

export const MissionSection = () => {
  return (
    <section className="caret-transparent outline-[3px] relative no-underline mb-24 pt-24 px-7 md:px-20">
      <SectionDivider dividerVariant="w-[300px]" />
      <div className="bg-[linear-gradient(rgba(255,136,0,0.047)_0%,rgba(0,0,0,0)_40.24%)] caret-transparent h-full outline-[3px] pointer-events-none absolute no-underline w-full z-[1] left-0 top-0"></div>
      <div className="bg-[position:0px_0px] caret-transparent max-w-[1062px] outline-[3px] no-underline w-full mt-16 mx-auto">
        <div className="caret-transparent gap-x-8 grid max-w-[360px] outline-[3px] gap-y-8 no-underline w-max mx-auto md:max-w-none">
          <div className="caret-transparent max-w-[800px] min-h-[auto] min-w-[auto] outline-[3px] no-underline">
            <div className="items-center caret-transparent flex flex-col outline-[3px] no-underline md:[align-items:normal] md:block md:flex-row">
              <div className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline mb-3 md:min-h-0 md:min-w-0">
                <div className="items-center backdrop-blur-[2px] bg-violet-300/10 caret-transparent gap-x-1.5 flex outline-[3px] relative gap-y-1.5 no-underline w-max px-2 py-1 rounded-[120px]">
                  <div className="caret-transparent outline-[3px] pointer-events-none absolute no-underline z-0 rounded-[120px] -inset-px">
                    <img
                      src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-5-5.svg"
                      alt="Icon"
                      className="caret-transparent inline h-full outline-[3px] no-underline align-baseline w-full"
                    />
                  </div>
                  <p className="bg-clip-text bg-[linear-gradient(90deg,color(srgb_1_0.673333_0.3)_0%,color(srgb_1_0.626667_0.2)_100%)] caret-transparent text-sm leading-[18px] min-h-[auto] min-w-[auto] outline-[3px] relative no-underline z-[1]">
                    Our mission
                  </p>
                </div>
              </div>
              <p className="caret-transparent text-zinc-50 text-[28px] font-semibold leading-10 max-w-xs min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline font-mori md:text-[40px] md:leading-[48px] md:max-w-none md:min-h-0 md:min-w-0 md:text-start">
                We bring honesty and transparency to financial services
                technology
              </p>
            </div>
            <MissionStats />
          </div>
          <div className="caret-transparent max-w-[800px] min-h-[auto] min-w-[auto] outline-[3px] no-underline w-full mt-0 md:mt-16">
            <p className="caret-transparent text-gray-400 text-[15px] leading-6 max-w-xs outline-[3px] no-underline font-inter md:text-base md:max-w-none">
              Welcome to Blofin Prime, a global online trading firm providing
              24-hour access to a wide range of markets, including crypto,
              forex, commodities, futures, indices, and stocks, supported by
              high liquidity, low spreads, mobile trading, and advanced
              technical analysis tools through our platform.
              <br className="caret-transparent text-[15px] outline-[3px] no-underline md:text-base" />
              <br className="caret-transparent text-[15px] outline-[3px] no-underline md:text-base" />
              <br className="caret-transparent text-[15px] outline-[3px] no-underline md:text-base" />
              We uphold strict security standards and deliver tailored trading
              conditions while empowering traders with the knowledge, tools, and
              products designed to improve efficiency, performance, and
              sustainable growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
