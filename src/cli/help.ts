import {
  intro,
  outro,
  select,
  isCancel,
  cancel,
  note,
} from "npm:@clack/prompts";
import color from "npm:picocolors";

export async function help() {
  console.clear();
  console.log();
  intro(color.inverse(" xfm-help "));

  const helpType = await select({
    message: "What do you need?",
    options: [
      { value: "links", label: "Help links"},
      { value: "cli", label: "CLI help"},
    ],
  });

  if (isCancel(helpType)) {
    cancel("Operation cancelled");
    Deno.exit(1);
  }

  if (helpType == "links") {
    const links = `
    Github Issues: ${color.underline(color.cyan('https://github.com/monitio/xfm/issues'))}
    Documentation: ${color.underline(color.cyan('https://github.com/monitio/XFM#documentation'))}
    `;
    note(links, 'Help:')
    outro(`Still having issues? Check if someone has had the same issue:\n ${color.underline(color.cyan('https://github.com/monitio/xfm/issues'))}`);
  } else {
    const clihelp = `
    Try the command 'xfmc' on its own. It should give back a list of
    aliases, commands and other CLI stuff. Or try updating and then
    running 'xfmc' on its own. It might have newer commands that way.
    `;
    note(clihelp, 'Help:')
    outro(`Still having issues? Check if someone has had the same issue:\n ${color.underline(color.cyan('https://github.com/monitio/xfm/issues'))}`);
    Deno.exit(1);
  }
}
