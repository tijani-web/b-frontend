import { TopUtilityWidgets } from "./components/TopUtilityWidgets";
import { Navbar } from "@/sections/Navbar";
import { MainContent } from "./sections/MainContent/index";
import { FloatingWidget } from "./components/FloatingWidget";
import { CookieConsent } from "./components/CookieConsent/index";

export const App = () => {
  return (
    <body className="accent-auto bg-black caret-transparent text-black block text-base not-italic normal-nums font-normal tracking-[normal] leading-4 list-outside list-disc outline-[3px] pointer-events-auto text-start no-underline indent-[0px] normal-case visible border-separate top-0 font-inter">
      <TopUtilityWidgets
        isExpanded={false}
        languageIconUrl=""
        languageIconAlt=""
        languageLabel=""
      />
      <TopUtilityWidgets
        isExpanded={true}
        languageIconUrl="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/en.svg"
        languageIconAlt="en"
        languageLabel="en"
      />
      <Navbar />
      <div className="caret-transparent block outline-[3px] no-underline md:hidden"></div>
      <MainContent />
      <div className="caret-transparent block outline-[3px] absolute no-underline"></div>
      <FloatingWidget />
      <CookieConsent />
    </body>
  );
};
