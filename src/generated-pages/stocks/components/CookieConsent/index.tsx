import { CookieBanner } from "./components/CookieBanner";
import { CookiePreferencesModal } from "./components/CookiePreferencesModal";

export const CookieConsent = () => {
  return (
    <div className="caret-transparent outline-[3px] no-underline">
      <CookieBanner />
      <CookiePreferencesModal />
    </div>
  );
};
