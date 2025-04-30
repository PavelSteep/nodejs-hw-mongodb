import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function printTree(dir, indent = '') {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stats = fs.statSync(fullPath);
    console.log(indent + (stats.isDirectory() ? '📁 ' : '📄 ') + item);
    if (stats.isDirectory()) {
      printTree(fullPath, indent + '  ');
    }
  }
}

printTree(__dirname);
