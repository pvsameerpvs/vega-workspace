const fs = require("fs");
const path = require("path");

// Check for missing assets referenced in TS/TSX/CSS files
const dirs = ["apps/vega-frontend", "apps/vega-dashboard"];

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

const allFiles = dirs.flatMap(d => findFiles(d, [".ts", ".tsx", ".css"]));

for (const file of allFiles) {
  const content = fs.readFileSync(file, "utf-8");
  const lines = content.split("\n");
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Match src="/..." or href="/..." or url('/...') or import ... from '/...'
    const matches = line.matchAll(/(?:src|href|url\s*\(\s*["']|from\s+["'])(\/[^"'\s)]+\.(?:png|jpg|jpeg|gif|svg|webp|ico|pdf|mp4|webm))/g);
    for (const m of matches) {
      const assetPath = m[1];
      // Check if exists in public directory
      const fullPath = path.join("apps/vega-frontend/public", assetPath);
      const fullPath2 = path.join("apps/vega-dashboard/public", assetPath);
      if (!fs.existsSync(fullPath) && !fs.existsSync(fullPath2)) {
        console.log(`MISSING_ASSET: ${file}:${i+1}: ${assetPath}`);
      }
    }
    
    // Match relative image imports like import logo from "./logo.png"
    const relMatches = line.matchAll(/import\s+\w+\s+from\s+["'](\.[^"']+\.(?:png|jpg|jpeg|gif|svg|webp|ico|pdf|mp4|webm))["']/g);
    for (const m of relMatches) {
      const importPath = m[1];
      const dir = path.dirname(file);
      const resolved = path.resolve(dir, importPath);
      if (!fs.existsSync(resolved)) {
        console.log(`MISSING_ASSET: ${file}:${i+1}: ${importPath}`);
      }
    }
  }
}
