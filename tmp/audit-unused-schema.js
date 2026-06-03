const fs = require("fs");
const path = require("path");

// Check for unused exports in packages/db/src/schema/*.ts
const schemaFiles = fs.readdirSync("packages/db/src/schema").filter(f => f.endsWith(".ts") && f !== "index.ts");

const dirs = ["apps/vega-frontend", "apps/vega-dashboard", "apps/vega-backend", "packages/ui"];
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

for (const schemaFile of schemaFiles) {
  const content = fs.readFileSync(path.join("packages/db/src/schema", schemaFile), "utf-8");
  const matches = content.matchAll(/export\s+(?:const|let|var|function|class|interface|type|enum)\s+([a-zA-Z0-9_]+)/g);
  for (const m of matches) {
    const name = m[1];
    const regex = new RegExp("\\b" + name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b");
    if (!regex.test(allContent)) {
      console.log(`UNUSED_SCHEMA_EXPORT: packages/db/src/schema/${schemaFile} exports ${name}`);
    }
  }
}
