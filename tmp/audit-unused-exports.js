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
const exports = {};
const allContent = {};

for (const file of allFiles) {
  const content = fs.readFileSync(file, "utf-8");
  allContent[file] = content;
  
  const fileExports = [];
  
  // export const/let/var/function/class/interface/type/enum
  const declMatches = content.matchAll(/^\s*export\s+(?:const|let|var|function|class|interface|type|enum)\s+([a-zA-Z0-9_]+)/gm);
  for (const m of declMatches) {
    fileExports.push(m[1]);
  }
  
  // export { a, b }
  const blockMatches = content.matchAll(/export\s+\{([^}]+)\}/g);
  for (const m of blockMatches) {
    const names = m[1].split(",").map(s => s.trim().split(" as ")[0].trim()).filter(s => s);
    fileExports.push(...names);
  }
  
  // export default X
  const defaultMatch = content.match(/export\s+default\s+([a-zA-Z0-9_]+)/);
  if (defaultMatch) {
    fileExports.push("default:" + defaultMatch[1]);
  }
  
  if (fileExports.length > 0) {
    exports[file] = fileExports;
  }
}

// Check if each exported name is imported somewhere
for (const [file, exps] of Object.entries(exports)) {
  for (const exp of exps) {
    let isUsed = false;
    const searchName = exp.startsWith("default:") ? exp.replace("default:", "") : exp;
    
    for (const [otherFile, content] of Object.entries(allContent)) {
      if (otherFile === file) continue;
      
      // Check relative imports referencing this file
      const relativePath = path.relative(path.dirname(otherFile), file).replace(/\\/g, "/").replace(/\.tsx?$/, "");
      // Remove leading ./ if present
      const importPath = relativePath.startsWith(".") ? relativePath : "./" + relativePath;
      
      // Very loose check: does the other file contain this name?
      const generalUse = new RegExp("\\b" + searchName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b");
      if (generalUse.test(content)) {
        isUsed = true;
        break;
      }
    }
    
    if (!isUsed) {
      // Check if its a barrel file or used internally
      const content = allContent[file];
      const regex = new RegExp("\\b" + searchName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "g");
      const matches = content.match(regex);
      const count = matches ? matches.length : 0;
      if (count <= 1) {
        console.log(`POTENTIALLY_UNUSED_EXPORT: ${file} exports ${exp}`);
      }
    }
  }
}
