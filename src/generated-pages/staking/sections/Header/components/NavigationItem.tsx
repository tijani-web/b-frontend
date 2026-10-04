export type NavigationItemProps = {
  label: string;
};

export const NavigationItem = (props: NavigationItemProps) => {
  return (
    <li className="caret-transparent min-h-0 min-w-0 outline-[3px] no-underline md:min-h-[auto] md:min-w-[auto]">
      <button
        type="button"
        className="bg-transparent caret-transparent text-slate-200 gap-x-1 flex text-sm font-medium justify-center leading-5 gap-y-1 text-center no-underline px-3 py-2 rounded-xl font-inter"
      >
        {props.label}
        <span className="caret-transparent block h-4 min-h-4 min-w-4 outline-[3px] relative no-underline w-4 z-10">
          <img
            src="https://c.animaapp.com/ms9b4yl7eEtjhI/assets/icon-2.svg"
            alt="Icon"
            className="caret-transparent inline h-2.5 outline-[3px] no-underline align-baseline w-2.5"
          />
        </span>
      </button>
    </li>
  );
};
