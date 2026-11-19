import { execFileSync } from "node:child_process";
import { readFile, writeFile, access } from "node:fs/promises";
import * as prettier from "prettier";

const changed = execFileSync("git", ["diff", "--name-only", "-z", "HEAD"], {
  encoding: "utf8",
});
const added = execFileSync(
  "git",
  ["ls-files", "--others", "--exclude-standard", "-z"],
  { encoding: "utf8" },
);
const check = process.argv.includes("--check");
let failures = 0;
let count = 0;
for (const file of new Set((changed + added).split("\0").filter(Boolean))) {
  try {
    await access(file);
  } catch {
    continue;
  }
  const info = await prettier.getFileInfo(file, {
    ignorePath: ".prettierignore",
  });
  if (info.ignored || !info.inferredParser) continue;
  const source = await readFile(file, "utf8");
  const formatted = await prettier.format(source, {
    ...(await prettier.resolveConfig(file)),
    filepath: file,
  });
  count++;
  if (source === formatted) continue;
  if (check) {
    console.error(`Needs formatting: ${file}`);
    failures++;
  } else {
    await writeFile(file, formatted);
    console.log(`Formatted ${file}`);
  }
}
console.log(`${count} changed files ${check ? "checked" : "formatted"}.`);
if (failures) process.exitCode = 1;
