import { UtilityOverlays } from "./components/UtilityOverlays";
import { Navbar } from "@/sections/Navbar";
import { MainContent } from "./sections/MainContent/index";
import { CookieConsent } from "./sections/CookieConsent/index";

export const App = () => {
  return (
    <body className="accent-auto bg-black caret-transparent text-black block text-base not-italic normal-nums font-normal tracking-[normal] leading-4 list-outside list-disc outline-[3px] pointer-events-auto text-start no-underline indent-[0px] normal-case visible border-separate top-0 font-inter">
      <UtilityOverlays
        variant="default"
        rootClassName="hidden"
        languageImageSrc=""
        languageImageAlt=""
        languageLabel=""
        chatAriaLabel=""
        chatButtonAriaLabel=""
      />
      <UtilityOverlays
        variant="language"
        rootClassName=""
        languageImageSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/en.svg"
        languageImageAlt="en"
        languageLabel="en"
        chatAriaLabel=""
        chatButtonAriaLabel=""
      />
      <Navbar />
      <UtilityOverlays
        variant="default"
        rootClassName="block md:hidden"
        languageImageSrc=""
        languageImageAlt=""
        languageLabel=""
        chatAriaLabel=""
        chatButtonAriaLabel=""
      />
      <MainContent />
      <UtilityOverlays
        variant="default"
        rootClassName="block absolute"
        languageImageSrc=""
        languageImageAlt=""
        languageLabel=""
        chatAriaLabel=""
        chatButtonAriaLabel=""
      />
      <UtilityOverlays
        variant="chat"
        rootClassName=""
        languageImageSrc=""
        languageImageAlt=""
        languageLabel=""
        chatAriaLabel="Live chat widget"
        chatButtonAriaLabel="Chat Widget"
      />
      <CookieConsent />
    </body>
  );
};
