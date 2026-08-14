import { SectionDivider } from "../../components/SectionDivider";
import { SectionHeader } from "../../components/SectionHeader";
import { TestimonialCard } from "./components/TestimonialCard";

export const TestimonialsSection = () => {
  return (
    <section className="caret-transparent outline-[3px] relative no-underline mb-[180px] pt-24 px-7 md:px-20">
      <SectionDivider dividerVariant="w-[200px]" />
      <div className="bg-[linear-gradient(rgba(255,136,0,0.047)_0%,rgba(0,0,0,0)_40.24%)] caret-transparent h-full opacity-30 outline-[3px] pointer-events-none absolute no-underline w-full z-[1] left-0 top-0"></div>
      <SectionHeader
        iconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-14-1.svg"
        eyebrowText="Testimonials"
        title="Tools that move at market speed"
        description="Discover what people are saying about us."
      />
      <div className="bg-[position:0px_0px] caret-transparent max-w-[1062px] outline-[3px] no-underline w-full mt-24 mx-auto">
        <div className="caret-transparent gap-x-6 flex flex-col justify-between max-w-[360px] outline-[3px] gap-y-6 no-underline mx-auto md:flex-row md:max-w-none md:mx-0">
          <TestimonialCard
            quoteIconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-15-1.svg"
            quoteIconAlt="Icon"
            testimonialText="This is an amazing platform which gives you opportunity to achieve their goals and become successful traders with the support of finances."
            avatarSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/73x73-6.png"
            avatarAlt="testimonial of  Adam"
            name="Adam"
            role="User"
          />
          <TestimonialCard
            quoteIconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-15-1.svg"
            quoteIconAlt="Icon"
            testimonialText="legitimate! thank you for the opportunity, nothing out there can compare"
            avatarSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/73x73-1-1.png"
            avatarAlt="testimonial of  Dee"
            name="Dee"
            role="Review expert"
          />
          <TestimonialCard
            quoteIconSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-15-1.svg"
            quoteIconAlt="Icon"
            testimonialText="Amazing experience. I have a very nice experience using this platform. Execution speed is ont of the best all over the market."
            avatarSrc="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/73x73-2-1.png"
            avatarAlt="testimonial of  Pro Kittisak"
            name="Pro Kittisak"
            role="User"
          />
        </div>
      </div>
    </section>
  );
};
