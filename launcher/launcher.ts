#!/usr/bin/env node
import { platform, arch } from "node:os";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { existsSync } from "node:fs";
import process from "node:process";

import {
  intro,
  spinner,
  stream,
} from "@clack/prompts";
import color from "picocolors";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

console.clear();
console.log();
intro(color.inverse(" xfm-launcher "));

const s = spinner();

// 1. Determine the right binary
let fileName: string;
if (platform() === "win32" && arch() === "x64") {
  fileName = "xfmc-windows-x86_64.exe";
} else if (platform() === "linux" && arch() === "x64") {
  fileName = "xfmc-linux-x86_64";
} else if (platform() === "linux" && arch() === "arm64") {
  fileName = "xfmc-linux-aarch64";
} else {
  stream.error((function* () {
    yield `Unsupported platform: ${platform()}-${arch()}`;
  })());
  process.exit(1);
}

// 2. Path to binary
const binPath = join(__dirname, "..", "exec", fileName);

// 3. Check if binary exists
if (!existsSync(binPath)) {
  stream.error((function* () {
    yield `Executable not found at path: ${binPath}`;
  })());
  process.exit(1);
}

// 4. Launch it
s.start("Launching executable...");
const args = process.argv.slice(2);
try {
  execFileSync(binPath, args, { stdio: "inherit" });
  s.stop("Launched successfully");
  process.exit(0);
} catch (err) {
  s.stop(""); // stop spinner without suffix
  stream.error((function* () {
    yield `Failed to launch executable:`;
    yield (err as Error).message;
  })());
  process.exit(1);
}
