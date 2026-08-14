import { NavbarLogo } from "./components/NavbarLogo";
import { DesktopNavigation } from "./components/DesktopNavigation";
import { NavbarActions } from "./components/NavbarActions";

export const Navbar = () => {
  return (
    <div className="items-center box-border caret-transparent flex justify-between max-w-[1440px] outline-[3px] no-underline mx-auto px-7 py-6 md:px-20">
      <NavbarLogo />
      <DesktopNavigation />
      <NavbarActions />
    </div>
  );
};
