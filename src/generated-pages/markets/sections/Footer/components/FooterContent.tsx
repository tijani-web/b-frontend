import { FooterTop } from "./FooterTop";
import { FooterLegal } from "./FooterLegal";
import { FooterRiskDisclosure } from "./FooterRiskDisclosure";

export const FooterContent = () => {
  return (
    <div className="caret-transparent [mask-image:linear-gradient(rgb(0,0,0)_95%,rgba(0,0,0,0)_100%)] max-w-[480px] outline-[3px] relative no-underline mx-auto pb-12 md:max-w-[1200px]">
      <FooterTop />
      <FooterLegal />
      <FooterRiskDisclosure />
    </div>
  );
};
