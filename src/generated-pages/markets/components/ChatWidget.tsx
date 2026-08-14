export const ChatWidget = () => {
  return (
    <div
      role="complementary"
      aria-label="Live chat widget"
      className="box-border caret-transparent outline-[3px] relative no-underline z-[2147483647]"
    >
      <div className="items-center bg-amber-500 box-border caret-transparent flex text-[15px] h-[55px] justify-center leading-[15px] outline-[3px] fixed no-underline w-[55px] p-[3px] rounded-[100%] scale-[0.8] right-2.5 bottom-2.5 md:transform-none">
        <span className="box-border caret-transparent block min-h-[auto] min-w-[auto] outline-[3px] no-underline scale-[0.8] md:transform-none"></span>
        <span
          aria-label="Chat Widget"
          role="button"
          className="items-center box-border caret-transparent text-white flex text-[25px] h-full justify-center leading-[25px] outline-[3px] absolute no-underline w-full left-0 top-0 before:accent-auto before:caret-transparent before:text-white before:block before:text-[25px] before:not-italic before:normal-nums before:font-normal before:tracking-[normal] before:leading-[25px] before:list-outside before:list-disc before:min-h-[auto] before:min-w-[auto] before:outline-[3px] before:pointer-events-auto before:text-start before:no-underline before:indent-[0px] before:normal-case before:visible before:border-separate before:font-siq"
        ></span>
      </div>
    </div>
  );
};
