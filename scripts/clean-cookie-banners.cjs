const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../src/generated-pages');

function removeComponents(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Remove imports
  content = content.replace(/import\s*\{\s*CookieConsent\s*\}\s*from\s*['"][^'"]+['"];?\n?/g, '');
  content = content.replace(/import\s*\{\s*CookieBanner\s*\}\s*from\s*['"][^'"]+['"];?\n?/g, '');
  content = content.replace(/import\s*CookieConsent\s*from\s*['"][^'"]+['"];?\n?/g, '');
  content = content.replace(/import\s*CookieBanner\s*from\s*['"][^'"]+['"];?\n?/g, '');
  
  // Remove JSX tags
  content = content.replace(/<CookieConsent\s*\/>\s*\n?/g, '');
  content = content.replace(/<CookieBanner\s*\/>\s*\n?/g, '');

  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Cleaned ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      removeComponents(fullPath);
    }
  }
}

if (fs.existsSync(pagesDir)) {
  walkDir(pagesDir);
}
console.log('Done!');
