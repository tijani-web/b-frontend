import { NavbarLogo } from "@/sections/Navbar/components/NavbarLogo";
import { DesktopNav } from "@/sections/Navbar/components/DesktopNav";
import { NavbarActions } from "@/sections/Navbar/components/NavbarActions";

export const Navbar = () => {
  return (
    <div className="items-center box-border caret-transparent flex justify-between max-w-[1440px] outline-[3px] no-underline mx-auto px-7 py-6 md:px-20">
      <NavbarLogo />
      <DesktopNav />
      <NavbarActions />
    </div>
  );
};
