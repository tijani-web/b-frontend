const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../src/generated-pages');

function fixFileImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // 1. Fix FloatingWidget
  content = content.replace(
    /import\s*\{\s*FloatingWidget\s*\}\s*from\s*['"](\.\.\/)*components\/FloatingWidget['"];?/g,
    'import { FloatingWidget } from "@/components/FloatingWidget";'
  );

  // 2. Fix Header / Navbar
  content = content.replace(
    /import\s*\{\s*Header\s*\}\s*from\s*['"](\.\/|\.\.\/)*sections\/Header\/index['"];?/g,
    'import { Navbar as Header } from "@/sections/Navbar";'
  );
  
  // 3. Fix Footer (if it's imported as Footer)
  content = content.replace(
    /import\s*\{\s*Footer\s*\}\s*from\s*['"](\.\/|\.\.\/)*sections\/Footer\/index['"];?/g,
    'import { Footer } from "@/sections/Footer";'
  );

  // 4. Fix FAQ Item
  content = content.replace(
    /import\s*\{\s*FaqItem\s*\}\s*from\s*['"](\.\/|\.\.\/)*components\/FaqItem['"];?/g,
    'import { FaqItem } from "@/sections/Faq/components/FaqItem";'
  );
  
  // Also fix FaqCategory to use the new FaqItem directly instead of duplicating logic
  // Help Center has a FaqCategory that lists questions.
  if (filePath.endsWith('FaqCategory.tsx')) {
    content = `import { FaqItem } from "@/sections/Faq/components/FaqItem";

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
`;
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Unified imports in ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      fixFileImports(fullPath);
    }
  }
}

walkDir(pagesDir);
