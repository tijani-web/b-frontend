import { useState, useEffect } from "react";
import { CookieNotice } from "@/components/CookieBanner/components/CookieNotice";
import { CookiePreferencesModal } from "@/components/CookieBanner/components/CookiePreferencesModal";

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="caret-transparent outline-[3px] no-underline">
      <CookieNotice onAccept={handleAccept} />
      <CookiePreferencesModal />
    </div>
  );
};
