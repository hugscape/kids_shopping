import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Copy .nojekyll file to dist folder
const nojekyllContent = '# This file tells GitHub Pages not to use Jekyll\n';
fs.writeFileSync(path.join(__dirname, 'dist', '.nojekyll'), nojekyllContent);

// Copy CNAME file if it exists in root
const cnamePath = path.join(__dirname, '..', 'CNAME');
if (fs.existsSync(cnamePath)) {
  const cnameContent = fs.readFileSync(cnamePath, 'utf8');
  fs.writeFileSync(path.join(__dirname, 'dist', 'CNAME'), cnameContent);
}

console.log('✅ Copied .nojekyll and CNAME files to dist folder');
