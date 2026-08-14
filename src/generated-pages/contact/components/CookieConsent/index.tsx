import { CookieBanner } from "./CookieBanner";
import { CookiePreferencesModal } from "./CookiePreferencesModal";

export const CookieConsent = () => {
  return (
    <div className="caret-transparent outline-[3px] no-underline">
      <CookieBanner />
      <CookiePreferencesModal />
    </div>
  );
};
