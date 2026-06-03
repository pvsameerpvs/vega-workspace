const fs = require("fs");
const path = require("path");

const dirs = [
  "apps/vega-frontend",
  "apps/vega-dashboard",
  "apps/vega-backend",
  "packages/ui",
  "packages/db",
  "packages/utils"
];

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
    // console.log
    if (line.includes("console.log")) {
      console.log(`CONSOLE_LOG: ${file}:${i+1}: ${line.trim()}`);
    }
    
    // Check for unused const/let/function declarations (simple heuristic)
    // Only check non-exported declarations
    const declMatch = line.match(/^\s*(const|let|var|function)\s+([a-zA-Z0-9_]+)/);
    if (declMatch && !line.includes("export")) {
      const name = declMatch[2];
      const regex = new RegExp("\\b" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "g");
      const matches = content.match(regex);
      if (matches && matches.length === 1) {
        console.log(`POTENTIALLY_UNUSED_VAR: ${file}:${i+1}: ${line.trim()}`);
      }
    }
  }
}
