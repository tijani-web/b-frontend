import { FooterTop } from "./components/FooterTop";
import { FooterBottom } from "./components/FooterBottom";
import { FooterDisclaimer } from "./components/FooterDisclaimer";

export const Footer = () => {
  return (
    <footer className="caret-transparent outline-[3px] relative no-underline mb-[90px] pt-12 px-7 md:mb-[180px] md:px-20">
      <div className="bg-[linear-gradient(rgba(255,136,0,0.047)_0%,rgba(0,0,0,0)_40.24%)] caret-transparent h-full opacity-30 outline-[3px] pointer-events-none absolute no-underline w-full z-[1] left-0 top-0"></div>
      <div className="caret-transparent [mask-image:linear-gradient(rgb(0,0,0)_95%,rgba(0,0,0,0)_100%)] max-w-[480px] outline-[3px] relative no-underline mx-auto pb-12 md:max-w-[1200px]">
        <FooterTop />
        <FooterBottom />
        <FooterDisclaimer />
      </div>
    </footer>
  );
};
