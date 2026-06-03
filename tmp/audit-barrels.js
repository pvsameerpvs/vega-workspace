const fs = require("fs");
const path = require("path");

// Check barrel exports: are all exported files actually present?
const barrelFiles = [
  "packages/ui/src/index.ts",
  "packages/utils/src/index.ts",
  "packages/db/src/index.ts",
  "packages/db/src/schema/index.ts"
];

for (const barrelFile of barrelFiles) {
  const content = fs.readFileSync(barrelFile, "utf-8");
  const lines = content.split("\n");
  const dir = path.dirname(barrelFile);
  
  for (const line of lines) {
    const match = line.match(/export\s+\*\s+from\s+["\'](\.\/[^"\']+)["\']/);
    if (match) {
      const exportPath = match[1];
      const resolved = path.resolve(dir, exportPath);
      let exists = false;
      const extensions = [".ts", ".tsx", ".js", ".jsx", "/index.ts", "/index.tsx"];
      for (const ext of extensions) {
        if (fs.existsSync(resolved + ext)) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        console.log(`BARREL_MISSING: ${barrelFile} exports from ${exportPath} but file does not exist`);
      }
    }
  }
}

// Check: are all files in a directory exported by the barrel?
const barrelDirs = [
  { dir: "packages/ui/src", barrel: "packages/ui/src/index.ts", exclude: ["index.ts", "utils.ts"] },
  { dir: "packages/utils/src", barrel: "packages/utils/src/index.ts", exclude: ["index.ts"] },
  { dir: "packages/db/src/schema", barrel: "packages/db/src/schema/index.ts", exclude: ["index.ts"] }
];

for (const { dir, barrel, exclude } of barrelDirs) {
  const barrelContent = fs.readFileSync(barrel, "utf-8");
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".ts") || f.endsWith(".tsx"));
  
  for (const file of files) {
    if (exclude.includes(file)) continue;
    const fileBase = file.replace(/\.tsx?$/, "");
    if (!barrelContent.includes(`"./${fileBase}"`)) {
      console.log(`NOT_EXPORTED: ${dir}/${file} is not exported in ${barrel}`);
    }
  }
}
