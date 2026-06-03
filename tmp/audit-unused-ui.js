const fs = require("fs");
const path = require("path");

// Check if any UI component exported from packages/ui/src/index.ts is unused
const uiIndex = fs.readFileSync("packages/ui/src/index.ts", "utf-8");
const uiFiles = fs.readdirSync("packages/ui/src").filter(f => f.endsWith(".tsx") || f.endsWith(".ts"));

// Extract all exported names from each UI file
const uiExports = {};
for (const file of uiFiles) {
  if (file === "index.ts" || file === "utils.ts") continue;
  const content = fs.readFileSync(path.join("packages/ui/src", file), "utf-8");
  const matches = content.matchAll(/export\s+(?:const|let|var|function|class|interface|type)\s+([a-zA-Z0-9_]+)/g);
  for (const m of matches) {
    uiExports[m[1]] = file;
  }
  const blockMatches = content.matchAll(/export\s+\{([^}]+)\}/g);
  for (const m of blockMatches) {
    const names = m[1].split(",").map(s => s.trim().split(" as ")[0].trim()).filter(s => s);
    for (const n of names) {
      uiExports[n] = file;
    }
  }
}

// Check usage across all apps and packages
const dirs = ["apps/vega-frontend", "apps/vega-dashboard", "apps/vega-backend", "packages/db"];
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
let allContent = "";
for (const file of allFiles) {
  allContent += fs.readFileSync(file, "utf-8") + "\n";
}

for (const [name, file] of Object.entries(uiExports)) {
  const regex = new RegExp("\\b" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b");
  if (!regex.test(allContent)) {
    console.log(`UNUSED_UI_EXPORT: packages/ui/src/${file} exports ${name}`);
  }
}
