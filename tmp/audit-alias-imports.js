const fs = require("fs");
const path = require("path");

// Check for missing components referenced via @/ path aliases
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

for (const appDir of dirs) {
  const tsConfigPath = path.join(appDir, "tsconfig.json");
  if (!fs.existsSync(tsConfigPath)) continue;
  
  const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, "utf-8"));
  const paths = tsConfig.compilerOptions?.paths || {};
  
  // Build alias map
  const aliasMap = {};
  for (const [alias, targets] of Object.entries(paths)) {
    const cleanAlias = alias.replace(/\/$/, "").replace(/\/\*$/, "");
    const target = targets[0].replace(/\/$/, "").replace(/\/\*$/, "");
    aliasMap[cleanAlias] = path.join(appDir, target);
  }
  
  const files = findFiles(appDir, [".ts", ".tsx"]).filter(f => !f.includes(".next"));
  
  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    const importMatches = content.matchAll(/from\s+["\'](@\/[^"\']+)["\']/g);
    for (const m of importMatches) {
      const importPath = m[1];
      const alias = importPath.split("/")[0]; // @/components -> @
      const subPath = importPath.slice(alias.length); // /components/...
      
      if (aliasMap[alias]) {
        const resolved = path.join(aliasMap[alias], subPath);
        let exists = false;
        const extensions = ["", ".ts", ".tsx", ".js", ".jsx", "/index.ts", "/index.tsx", "/index.js", "/index.jsx"];
        for (const ext of extensions) {
          if (fs.existsSync(resolved + ext)) {
            exists = true;
            break;
          }
        }
        if (!exists) {
          console.log(`MISSING_ALIAS_IMPORT: ${file} imports ${importPath}`);
        }
      }
    }
  }
}
