import { ContactCard } from "./ContactCard";

export const ContactCards = () => {
  return (
    <div className="caret-transparent outline-[3px] relative no-underline w-max z-10 mt-16 mx-auto">
      <div className="caret-transparent gap-x-6 flex flex-col justify-between outline-[3px] gap-y-6 no-underline md:flex-row">
        <ContactCard
          iconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-7-6.svg"
          title="Send us an email"
          description="Send us an email and our team will get back to you as soon as possible."
          href="mailto://support@BlofinPrime.com"
          linkText="Email us"
        />
        <ContactCard
          iconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-9-5.svg"
          title="Help Center"
          description="Check out our frequently asked questions in our help center and find the answers you need."
          href="/help-center"
          linkText="Go to help center"
        />
      </div>
    </div>
  );
};
