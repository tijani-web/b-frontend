type Props = {
  onClick?: () => void;
  isOpen?: boolean;
};

export const MobileMenuButton = ({ onClick, isOpen = false }: Props) => {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
      aria-expanded={isOpen}
      className="caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] no-underline md:hidden md:min-h-0 md:min-w-0"
    >
      <div className="items-center bg-neutral-950 box-border caret-transparent text-zinc-50 gap-x-2 flex justify-center outline-[3px] relative gap-y-2 no-underline text-nowrap overflow-hidden p-2 rounded-xl">
        <div className="items-center caret-transparent flex h-5 justify-center min-h-[auto] min-w-[auto] outline-[3px] relative no-underline text-nowrap w-5 z-[1] md:min-h-0 md:min-w-0">
          {isOpen ? (
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </div>
      </div>
    </button>
  );
};
