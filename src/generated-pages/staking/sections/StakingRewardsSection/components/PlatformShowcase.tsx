export const PlatformShowcase = () => {
  return (
    <div className="items-center caret-transparent flex flex-col max-w-[350px] min-h-[auto] min-w-[auto] outline-[3px] no-underline mt-24 mx-auto md:max-w-none">
      <p className="caret-transparent text-zinc-50 text-[28px] font-semibold leading-10 max-w-[360px] min-h-[auto] min-w-[auto] outline-[3px] text-center no-underline font-mori md:text-[40px] md:leading-[48px] md:max-w-[500px]">
        All in one intuitive and easy to use platform
      </p>
      <div className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] relative no-underline w-max mt-6 mx-auto md:mt-16">
        <img
          alt="hero screenshot"
          src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/desktop-preview.png"
          className="aspect-[auto_2400_/_1500] bg-stone-950 text-transparent hidden h-[750px] [mask-image:linear-gradient(rgb(0,0,0)_50%,rgba(0,0,0,0)_100%)] object-cover outline-[3px] no-underline align-baseline rounded-t-3xl md:inline"
        />
        <img
          alt="hero screenshot"
          src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/mobile-preview.png"
          className="aspect-[auto_700_/_860] bg-stone-950 text-transparent block h-auto [mask-image:linear-gradient(rgb(0,0,0)_50%,rgba(0,0,0,0)_100%)] max-w-xs object-cover outline-[3px] no-underline align-baseline w-[700px] rounded-t-3xl md:hidden md:h-[860px] md:max-w-none md:object-fill"
        />
      </div>
    </div>
  );
};
