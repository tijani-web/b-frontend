export const HeroBackground = () => {
  return (
    <div className="box-border caret-transparent outline-[3px] pointer-events-none absolute no-underline z-0 inset-0">
      <img
        alt=""
        src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/registration-hero-wingsuit_2880_860.webp"
        className="box-border text-transparent h-full max-w-full object-cover outline-[3px] absolute no-underline align-baseline w-full inset-0"
      />
      <video
        poster="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/registration-hero-wingsuit_2880_860.webp"
        autoplay=""
        muted=""
        playsInline=""
        loop=""
        preload="auto"
        className="box-border caret-transparent h-full max-w-full object-cover outline-[3px] absolute no-underline align-baseline w-full z-[1] inset-0"
      >
        <source
          src="https://s2.blofin.com/frontend/_home_website/_next/static/home-public-static/videos/home/heroBanner/registration-hero-wingsuit_2880_860.webm"
          type="video/webm"
          className="caret-transparent text-black leading-[normal] outline-[3px] pointer-events-auto no-underline font-times_new_roman"
        />
        <source
          src="https://s2.blofin.com/frontend/_home_website/_next/static/home-public-static/videos/home/heroBanner/registration-hero-wingsuit_2880_860.mp4"
          type="video/mp4"
          className="caret-transparent text-black leading-[normal] outline-[3px] pointer-events-auto no-underline font-times_new_roman"
        />
      </video>
    </div>
  );
};
