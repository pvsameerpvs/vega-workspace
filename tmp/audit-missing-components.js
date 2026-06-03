const fs = require("fs");
const path = require("path");

// Check 9: Components referenced in pages but don't exist
const dirs = ["apps/vega-frontend/app", "apps/vega-dashboard/app"];

function findFiles(dir, ext) {
  let files = [];
  try {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const full = path.join(dir, item);
      const stat = fs.statSync(full);
      if (stat.isDirectory() && !item.startsWith(".") && item !== "node_modules" && item !== ".next") {
        files = files.concat(findFiles(full, ext));
      } else if (stat.isFile() && ext.some(e => full.endsWith(e))) {
        files.push(full);
      }
    }
  } catch(e) {}
  return files;
}

const allFiles = dirs.flatMap(d => findFiles(d, [".ts", ".tsx"]));

for (const file of allFiles) {
  const content = fs.readFileSync(file, "utf-8");
  const lines = content.split("\n");
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Extract relative imports
    const importMatches = line.matchAll(/from\s+["\'](\.[^"\']+)["\']/g);
    for (const m of importMatches) {
      const importPath = m[1];
      const dir = path.dirname(file);
      const resolved = path.resolve(dir, importPath);
      
      let exists = false;
      const extensions = ["", ".ts", ".tsx", ".js", ".jsx", "/index.ts", "/index.tsx", "/index.js", "/index.jsx"];
      for (const ext of extensions) {
        if (fs.existsSync(resolved + ext)) {
          exists = true;
          break;
        }
      }
      
      if (!exists) {
        console.log(`MISSING_COMPONENT: ${file} imports ${importPath}`);
      }
    }
  }
}
