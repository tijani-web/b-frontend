import { FaqItem } from "@/sections/Faq/components/FaqItem";

export type FaqCategoryProps = {
  title: string;
  questions: string[];
};

export const FaqCategory = (props: FaqCategoryProps) => {
  return (
    <div className="caret-transparent gap-x-4 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 no-underline">
      <p className="caret-transparent text-zinc-50 font-semibold leading-[14px] min-h-[auto] min-w-[auto] outline-[3px] no-underline px-3 font-mori">
        {props.title}
      </p>
      <div className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline">
        <div
          role="region"
          className="box-border caret-transparent flex flex-col justify-center outline-[3px] no-underline w-full gap-4"
        >
          {props.questions.map((question) => (
             <FaqItem key={question} question={question} />
          ))}
        </div>
      </div>
    </div>
  );
};
