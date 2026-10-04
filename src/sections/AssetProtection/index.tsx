import { SecurityPartnerCard } from "@/sections/AssetProtection/components/SecurityPartnerCard";

export const AssetProtection = () => {
  return (
    <section className="box-border caret-transparent min-h-[auto] min-w-[auto] outline-[3px] relative no-underline w-full">
      <div className="box-border caret-transparent max-w-full outline-[3px] no-underline w-full mx-auto px-4 md:max-w-[1200px] md:px-0">
        <h2 className="box-border caret-transparent text-white text-[28px] font-medium leading-[34px] outline-[3px] text-center no-underline md:text-[54px] md:leading-[60px]">
          Your Assets, Protected
        </h2>
        <p className="box-border caret-transparent text-violet-100/80 text-base leading-[22.72px] max-w-[1200px] outline-[3px] text-center no-underline mt-3 mx-auto md:text-xl md:leading-[28.4px] md:mt-5">
          Built with institutional-grade custody, real-time risk monitoring, and
          globally recognized security partners.
        </p>
        <div className="box-border caret-transparent h-[280px] outline-[3px] relative no-underline w-[280px] mx-auto my-10 md:h-[506px] md:w-[506px] md:mt-[54px] md:mb-[50px]">
          <div className="box-border caret-transparent h-full outline-[3px] relative no-underline w-full">
            <img
              alt=""
              src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/main.webp"
              className="box-border text-transparent h-full max-w-full object-contain outline-[3px] absolute no-underline align-baseline w-full z-0 inset-0"
            />
            <video
              poster="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/main.webp"
              autoplay=""
              muted=""
              playsInline=""
              loop=""
              preload="auto"
              className="box-border caret-transparent h-full max-w-full outline-[3px] pointer-events-none absolute no-underline align-baseline w-full z-[1] inset-0"
            >
              <source
                src="https://s2.blofin.com/frontend/_home_website/_next/static/home-public-static/videos/home/securityProof/main.webm"
                type="video/webm"
                className="caret-transparent text-black leading-[normal] outline-[3px] pointer-events-auto no-underline font-times_new_roman"
              />
              <source
                src="https://s2.blofin.com/frontend/_home_website/_next/static/home-public-static/videos/home/securityProof/main.mov"
                type="video/quicktime"
                className="caret-transparent text-black leading-[normal] outline-[3px] pointer-events-auto no-underline font-times_new_roman"
              />
            </video>
          </div>
        </div>
        <div className="box-border caret-transparent gap-x-6 grid grid-cols-[repeat(1,minmax(0px,1fr))] outline-[3px] gap-y-6 no-underline md:gap-x-10 md:grid-cols-[repeat(3,minmax(0px,1fr))] md:gap-y-10">
          <SecurityPartnerCard
            imageUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/fireblocks.svg"
            title="Fireblocks"
            description="Institutional custody with top-tier security"
          />
          <SecurityPartnerCard
            imageUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/chainalysis.svg"
            title="Chainalysis"
            description="Continuous monitoring to detect and deter illicit activity across the network."
          />
          <SecurityPartnerCard
            imageUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/iso-27001.png"
            title="ISO 27001"
            description="Information security management aligned to international standards."
          />
        </div>
      </div>
    </section>
  );
};
