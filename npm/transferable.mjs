#!/usr/bin/env node
// Lance le binaire de la plateforme, installé par npm comme dépendance optionnelle.
import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const target = `${process.platform}-${process.arch}`;
let binary;
try {
  binary = createRequire(import.meta.url).resolve(`@transferable/cli-${target}/bin/transferable`);
} catch {
  console.error(
    `transferable: no binary for ${target}. Install with Homebrew (brew install transferable-io/tap/transferable) or https://transferable.io/install instead.`,
  );
  process.exit(1);
}

const result = spawnSync(binary, process.argv.slice(2), { stdio: "inherit" });
if (result.error) {
  console.error(`transferable: ${result.error.message}`);
  process.exit(1);
}
process.exit(result.status ?? 1);
