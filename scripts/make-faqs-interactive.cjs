const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../src/generated-pages');

const faqItemCode = `import { useState } from "react";

export type FaqItemProps = {
  question: string;
  answer?: string;
};

export const FaqItem = (props: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const answer = props.answer || "Detailed information regarding this topic will be provided soon. Our support team is actively working on comprehensive guides.";

  return (
    <div className="border-b-violet-300/10 border-b caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline">
      <h3 className="caret-transparent text-[18.72px] font-bold outline-[3px] no-underline">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="items-center bg-transparent caret-transparent hover:text-white transition-colors text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-[3px] relative gap-y-4 text-left no-underline w-full pl-3 pr-1 py-4"
        >
          {props.question}
          <svg
            className={"w-5 h-5 transition-transform duration-200 " + (isOpen ? 'rotate-180 text-[#ff6a00]' : '')}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </h3>
      {isOpen && (
        <div className="pl-3 pr-4 pb-5 text-gray-500 text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
          {answer}
        </div>
      )}
    </div>
  );
};
`;

const faqCategoryCode = `import { useState } from "react";

export type FaqCategoryProps = {
  title: string;
  questions: string[];
};

export const FaqCategory = (props: FaqCategoryProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="caret-transparent gap-x-4 flex flex-col min-h-[auto] min-w-[auto] outline-[3px] gap-y-4 no-underline">
      <p className="caret-transparent text-zinc-50 font-semibold leading-[14px] min-h-[auto] min-w-[auto] outline-[3px] no-underline px-3 font-mori">
        {props.title}
      </p>
      <div className="caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline">
        <div
          role="region"
          className="box-border caret-transparent flex flex-col justify-center outline-[3px] no-underline w-full"
        >
          {props.questions.map((question, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={question}
                className="border-b-violet-300/10 border-b caret-transparent min-h-[auto] min-w-[auto] outline-[3px] no-underline"
              >
                <h3 className="caret-transparent text-[18.72px] font-bold outline-[3px] no-underline">
                  <button
                    type="button"
                    onClick={() => toggleQuestion(index)}
                    className="items-center bg-transparent caret-transparent hover:text-white transition-colors text-gray-400 gap-x-4 flex text-[15px] font-medium justify-between leading-6 outline-[3px] relative gap-y-4 text-left no-underline w-full pl-3 pr-1 py-4"
                  >
                    {question}
                    <svg
                      className={"w-5 h-5 transition-transform duration-200 " + (isOpen ? 'rotate-180 text-[#ff6a00]' : '')}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </h3>
                {isOpen && (
                  <div className="pl-3 pr-4 pb-5 text-gray-500 text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 duration-200">
                    Detailed information regarding this topic will be provided soon. Our support team is actively working on comprehensive guides.
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
`;

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else {
      if (file === 'FaqItem.tsx') {
        fs.writeFileSync(fullPath, faqItemCode);
      } else if (file === 'FaqCategory.tsx') {
        fs.writeFileSync(fullPath, faqCategoryCode);
      }
    }
  }
}

walkDir(baseDir);
