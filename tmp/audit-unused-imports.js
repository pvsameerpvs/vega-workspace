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

const files = dirs.flatMap(d => findFiles(d, [".ts", ".tsx"]));

for (const file of files) {
  const content = fs.readFileSync(file, "utf-8");
  const lines = content.split("\n");
  
  for (const line of lines) {
    // Match import { a, b, c } from "..."
    const match = line.match(/^\s*import\s+\{([^}]+)\}\s+from\s+["\']([^"\']+)["\']/);
    if (match) {
      const imports = match[1].split(",").map(s => s.trim().split(" as ")[0].trim()).filter(s => s);
      const source = match[2];
      for (const imp of imports) {
        if (imp === "React" || imp === "type") continue;
        // Check if used elsewhere in file (not just the import line)
        const regex = new RegExp("\\b" + imp.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "g");
        const matches = content.match(regex);
        const count = matches ? matches.length : 0;
        if (count <= 1) {
          console.log(`UNUSED_IMPORT: ${file} imports { ${imp} } from ${source}`);
        }
      }
    }
    
    // Match import X from "..."
    const defaultMatch = line.match(/^\s*import\s+([a-zA-Z0-9_]+)\s+from\s+["\']([^"\']+)["\']/);
    if (defaultMatch) {
      const imp = defaultMatch[1];
      const source = defaultMatch[2];
      if (imp !== "React" && !imp.startsWith("_")) {
        const regex = new RegExp("\\b" + imp.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "g");
        const matches = content.match(regex);
        const count = matches ? matches.length : 0;
        if (count <= 1) {
          console.log(`UNUSED_IMPORT: ${file} imports ${imp} from ${source}`);
        }
      }
    }
  }
}
