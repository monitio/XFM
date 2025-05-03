import color from "picocolors";

import { getVersion } from "../utils.ts";
import Parser from "./frontend/parser.ts";

const version = await getVersion();
const coloredversion = color.bold(version);

export function logic_repl() {
  const parser = new Parser();

  console.clear();
  console.log();
  console.log(color.inverse(" xfm-logic " + coloredversion + " "));
  console.log();

  // Continue Repl Until User Stops Or Types `exit`
  while (true) {
    const input = prompt(">");

    // Exit commands
    if (!input || input.trim() === "exit" || input.trim() === "quit") {
      Deno.exit(0);
    }

    // Clear screen commands
    if (input.trim() === "clear" || input.trim() === "cls") {
      console.clear();
      continue; // Skip parsing
    }

    // Parse + output AST
    const program = parser.produceAST(input);
    console.log(program);
  }
}
