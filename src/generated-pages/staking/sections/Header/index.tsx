import { HeaderLogo } from "./components/HeaderLogo";
import { DesktopNavigation } from "./components/DesktopNavigation";
import { HeaderActions } from "./components/HeaderActions";

export const Header = () => {
  return (
    <div className="items-center box-border caret-transparent flex justify-between max-w-[1440px] outline-[3px] no-underline mx-auto px-7 py-6 md:px-20">
      <HeaderLogo />
      <DesktopNavigation />
      <HeaderActions />
    </div>
  );
};
