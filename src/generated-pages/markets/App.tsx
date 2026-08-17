import { LanguageSelector } from "@/components/LanguageSelector";
import { Navbar } from "@/sections/Navbar";
import { MainContent } from "./sections/MainContent/index";
import { ChatWidget } from "./components/ChatWidget";
import { CookieConsent } from "./components/CookieConsent";

export const App = () => {
  return (
    <body className="accent-auto bg-black caret-transparent text-black block text-base not-italic normal-nums font-normal tracking-[normal] leading-4 list-outside list-disc outline-[3px] pointer-events-auto text-start no-underline indent-[0px] normal-case visible border-separate top-0 font-inter">
      <div className="caret-transparent hidden outline-[3px] no-underline"></div>
      <div className="caret-transparent outline-[3px] no-underline">
        <div className="caret-transparent hidden outline-[3px] no-underline"></div>
        <LanguageSelector />
      </div>
      <Navbar />
      <div className="caret-transparent block outline-[3px] no-underline md:hidden"></div>
      <MainContent />
      <div className="caret-transparent block outline-[3px] absolute no-underline"></div>
      <ChatWidget />
      <CookieConsent />
    </body>
  );
};
