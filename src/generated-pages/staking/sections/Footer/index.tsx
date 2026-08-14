import { FooterContent } from "./components/FooterContent";

export const Footer = () => {
  return (
    <footer className="caret-transparent outline-[3px] relative no-underline mb-[90px] pt-12 px-7 md:mb-[180px] md:px-20">
      <div className="bg-[linear-gradient(rgba(255,136,0,0.047)_0%,rgba(0,0,0,0)_40.24%)] caret-transparent h-full opacity-30 outline-[3px] pointer-events-none absolute no-underline w-full z-[1] left-0 top-0"></div>
      <FooterContent />
    </footer>
  );
};
