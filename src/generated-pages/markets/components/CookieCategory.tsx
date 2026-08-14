export type CookieCategoryProps = {
  containerVariant: string;
  inputVariant: string;
  title: string;
  description: string;
};

export const CookieCategory = (props: CookieCategoryProps) => {
  return (
    <div
      className={`box-border caret-transparent outline-[3px] no-underline pb-[25px] ${props.containerVariant}`}
    >
      <label className="items-center box-border caret-transparent inline-flex outline-[3px] relative no-underline pl-5 md:pl-10">
        <input
          type="checkbox"
          className={`bg-transparent box-border caret-transparent block text-[13.3333px] leading-[normal] outline-[3px] absolute text-start no-underline overflow-visible mr-2.5 p-0 left-0 font-arial md:left-2.5 ${props.inputVariant}`}
        />
        <span className="box-border caret-transparent text-black block text-[15px] outline-[3px] no-underline">
          {props.title}
        </span>
      </label>
      <div className="box-border caret-transparent text-stone-500 outline-[3px] no-underline mt-[5px] pl-5 md:pl-10">
        {props.description}
        <span
          role="button"
          className="box-border caret-transparent text-sky-500 outline-[3px] no-underline"
        >
          Learn more
        </span>
      </div>
    </div>
  );
};
