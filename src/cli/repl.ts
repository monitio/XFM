import {
  intro,
  outro,
  confirm,
  select,
  isCancel,
  cancel,
  stream,
  note,
} from "npm:@clack/prompts";
import color from "npm:picocolors";

import { logic_repl } from "../logic/main.ts";
import { sleep } from "../utils.ts";

export async function repl() {
  console.clear();
  console.log();
  intro(color.inverse(" xfm-repls "));

  const projectType = await select({
    message: "Pick a REPL type:",
    options: [
      { value: "logic", label: "logic", hint: ".xfml" },
      { value: "style", label: "style", hint: "Not available." },
      { value: "web", label: "website", hint: ".xfmw" },
    ],
  });

  if (isCancel(projectType)) {
    cancel("Operation cancelled");
    Deno.exit(1);
  }

  const shouldContinue = await confirm({
    message: "Do you want to continue?",
  });

  if (isCancel(shouldContinue)) {
    cancel("Operation cancelled");
    Deno.exit(1);
  }

  const msg = stream.message(
    (function* () {
      yield "Launching...";
    })(),
    { symbol: color.cyan("~") }
  );

  await sleep(1000); // Let stream messages show
  await msg;

  if (projectType === "logic") {
    logic_repl(); // Launch logic REPL
  } else {
    const err = stream.error(
      (function *() {
        yield 'Error! Not available yet.';
      })());
    await err;
    const nextSteps = `Please update to get the latest features.`;
    note(nextSteps, 'Next steps.')
    outro(`Problems? ${color.underline(color.cyan('https://github.com/monitio/xfm/issues'))}`);
    Deno.exit(1);
  }
}
