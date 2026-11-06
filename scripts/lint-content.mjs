import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("client/src");
const banned = [
  /會員編號/,
  /會員號/,
  /訂位編號/,
  /訂位代號/,
  /預約編號/,
  /確認編號/,
  /予約番号/,
  /\bPNR\b/i,
  /confirmation\s*code/i,
  /booking\s*code/i,
];

async function filesIn(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? filesIn(full) : [full];
    }),
  );
  return nested.flat();
}

const files = (await filesIn(root)).filter((file) => /\.(ts|tsx|css|html)$/.test(file));
const hits = [];

for (const file of files) {
  const text = await readFile(file, "utf8");
  for (const pattern of banned) {
    if (pattern.test(text)) hits.push(`${path.relative(process.cwd(), file)} matched ${pattern}`);
  }
}

if (hits.length) {
  console.error("Refusing to build: itinerary copy contains booking or membership identifiers.");
  hits.forEach((hit) => console.error(`- ${hit}`));
  process.exit(1);
}

console.log(`Checked ${files.length} source files for booking identifiers.`);
