import { HeroBadge } from "./components/HeroBadge";
import { ContactCards } from "./components/ContactCards";

export const ContactHero = () => {
  return (
    <section className="caret-transparent outline-[3px] relative no-underline py-24 md:py-[165px]">
      <div className="items-center box-border caret-transparent gap-x-4 flex flex-col max-w-[480px] outline-[3px] relative gap-y-4 no-underline z-[4] mx-auto md:max-w-[650px]">
        <HeroBadge />
        <h2 className="caret-transparent text-zinc-50 text-[32px] font-semibold leading-10 min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline font-mori md:text-6xl md:leading-[66px]">
          How can we help?
        </h2>
        <p className="caret-transparent text-slate-200 text-base leading-6 min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline md:text-lg md:leading-[26px]">
          Share your support, concern, comment, or technical issue below, or
          check out our help center.
        </p>
      </div>
      <ContactCards />
    </section>
  );
};
