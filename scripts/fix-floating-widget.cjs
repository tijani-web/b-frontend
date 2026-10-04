const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../src/generated-pages');

function fixImports(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replace local FloatingWidget import with global one
  content = content.replace(
    /import\s*\{\s*FloatingWidget\s*\}\s*from\s*['"]\.\/components\/FloatingWidget['"];?/g,
    'import { FloatingWidget } from "@/components/FloatingWidget";'
  );

  // Replace local Navbar/Header imports with global ones if needed
  // For now, let's just do FloatingWidget to solve the immediate issue
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed FloatingWidget import in ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (file === 'App.tsx') {
      fixImports(fullPath);
    }
  }
}

walkDir(pagesDir);
