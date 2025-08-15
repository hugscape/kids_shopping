const fs = require('fs');
const path = require('path');

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
