// Assemble the npm packages of a release from its binaries:
//   node scripts/npm-packages.mjs <version> <assets-dir> <out-dir>
// @transferable/cli is a tiny launcher; each platform package carries one binary and is
// installed only where it runs (os, cpu, libc), the esbuild and biome model.
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [version, assets, out] = process.argv.slice(2);
if (!version || !assets || !out) throw new Error("usage: npm-packages.mjs <version> <assets-dir> <out-dir>");

const targets = [
  { name: "darwin-arm64", os: "darwin", cpu: "arm64" },
  { name: "darwin-x64", os: "darwin", cpu: "x64" },
  { name: "linux-x64", os: "linux", cpu: "x64" },
  { name: "linux-arm64", os: "linux", cpu: "arm64" },
];
const common = {
  version,
  license: "UNLICENSED",
  homepage: "https://transferable.io",
  repository: { type: "git", url: "git+https://github.com/transferable-io/cli.git" },
};
const json = (path, value) => writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);

for (const target of targets) {
  const dir = join(out, `cli-${target.name}`);
  mkdirSync(join(dir, "bin"), { recursive: true });
  execFileSync("tar", ["-xzf", join(assets, `transferable-${target.name}.tar.gz`), "-C", join(dir, "bin")]);
  json(join(dir, "package.json"), {
    name: `@transferable/cli-${target.name}`,
    ...common,
    description: `Transferable CLI binary for ${target.name}`,
    os: [target.os],
    cpu: [target.cpu],
    ...(target.os === "linux" ? { libc: ["glibc"] } : {}),
    files: ["bin/transferable"],
  });
}

const main = join(out, "cli");
mkdirSync(join(main, "bin"), { recursive: true });
copyFileSync("npm/transferable.mjs", join(main, "bin", "transferable.mjs"));
copyFileSync("npm/README.md", join(main, "README.md"));
json(join(main, "package.json"), {
  name: "@transferable/cli",
  ...common,
  description: "Upload files and create deliveries on Transferable from the terminal",
  keywords: ["transferable", "file transfer", "delivery", "cli"],
  bin: { transferable: "bin/transferable.mjs" },
  files: ["bin/transferable.mjs", "README.md"],
  engines: { node: ">=18" },
  optionalDependencies: Object.fromEntries(targets.map((t) => [`@transferable/cli-${t.name}`, version])),
});
console.log(`npm packages for ${version} in ${out}`);
