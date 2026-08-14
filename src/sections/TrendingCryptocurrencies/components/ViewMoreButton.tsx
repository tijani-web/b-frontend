export const ViewMoreButton = () => {
  return (
    <div className="box-border caret-transparent hidden justify-center outline-[3px] no-underline mt-8 md:flex md:mt-10">
      <a
        href="https://app.BlofinPrime.com/"
        className="items-center box-border caret-transparent text-violet-100/40 gap-x-1.5 inline-flex text-xs font-medium leading-4 min-h-0 min-w-0 outline-[3px] gap-y-1.5 no-underline px-4 py-2 rounded-lg md:gap-x-2 md:flex md:text-[13px] md:leading-5 md:min-h-[auto] md:min-w-[auto] md:gap-y-2 md:px-6"
      >
        View More
        <img
          src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-5.svg"
          alt="Icon"
          className="box-border caret-transparent shrink-0 text-xs h-4 leading-4 outline-[3px] no-underline align-baseline w-4 md:text-[13px] md:h-[18px] md:leading-5 md:w-[18px]"
        />
      </a>
    </div>
  );
};
