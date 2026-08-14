import { useState } from "react";
import { CookieNotice } from "@/components/CookieBanner/components/CookieNotice";
import { CookiePreferencesModal } from "@/components/CookieBanner/components/CookiePreferencesModal";

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="caret-transparent outline-[3px] no-underline">
      <CookieNotice onAccept={() => setIsVisible(false)} />
      <CookiePreferencesModal />
    </div>
  );
};
