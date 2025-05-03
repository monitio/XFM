import { parseArgs } from "@std/cli/parse-args";
import color from "picocolors";

import { repl } from "./cli/repl.ts";
import { help } from "./cli/help.ts";
import { getVersion } from "./utils.ts";

const version = await getVersion();

const args = parseArgs(Deno.args, {
  boolean: true,
  stopEarly: true,
});

const [commandRaw] = args._;
const command = String(commandRaw ?? "").toLowerCase();

if (args.help || args.h || command === "-h" || command === "--help" || !command) {
  console.clear();
  console.log();
  console.log(`${color.inverse("XFMC")} - ${color.inverse("XFM Compiler")}

Usage:
  ${color.inverse("xfmc")} <command>

Commands:
  repl        Start the REPLs.
  help        Shows a list of places where you can get help.
  version     Shows version.

Flags:
  -h, --help      Show this help message.
  -v, --version   Show version.`);
  console.log();
  Deno.exit(0);
}

if (args.version || args.v || command === "-v" || command === "--version") {
  console.log(`XFMC ${version}`);
  Deno.exit(0);
}

switch (command) {
  case "repl":
    await repl();
    break;

  case "help":
    await help();
    break;

  case "version":
    console.log(`XFMC ${version}`);
    break;

  default:
    console.error(`Unknown command: ${command}`);
    Deno.exit(1);
}
