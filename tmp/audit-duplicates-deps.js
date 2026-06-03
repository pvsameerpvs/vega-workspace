const fs = require("fs");
const path = require("path");

// Check for duplicate imports in the same file
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
  const importLines = [];
  
  for (const line of lines) {
    if (line.trim().startsWith("import ")) {
      importLines.push(line.trim());
    }
  }
  
  const seen = new Set();
  for (const imp of importLines) {
    if (seen.has(imp)) {
      console.log(`DUPLICATE_IMPORT: ${file}: ${imp}`);
    }
    seen.add(imp);
  }
}

// Check for imports from "lucide-react" and other libs that might not be in package.json
const packageDirs = [
  "apps/vega-frontend",
  "apps/vega-dashboard",
  "apps/vega-backend",
  "packages/ui",
  "packages/db",
  "packages/utils"
];

for (const pkgDir of packageDirs) {
  const pkgPath = path.join(pkgDir, "package.json");
  if (!fs.existsSync(pkgPath)) continue;
  
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  
  const files = findFiles(pkgDir, [".ts", ".tsx"]).filter(f => !f.includes(".next"));
  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    const importMatches = content.matchAll(/from\s+["\']([^.\/][^"\']+)["\']/g);
    for (const m of importMatches) {
      const pkgName = m[1];
      // Remove scope if present
      const baseName = pkgName.startsWith("@") ? pkgName.split("/").slice(0, 2).join("/") : pkgName.split("/")[0];
      if (!deps[baseName] && baseName !== "react" && baseName !== "react-dom") {
        console.log(`MISSING_DEPENDENCY: ${file} imports from ${baseName} but not in ${pkgDir}/package.json`);
      }
    }
  }
}
