# XFM
E***x***pandable ***F***unctional ***M***arkup

---

Currently in development. Please do not use yet as it may cause issues with certain things not working as expected.

---

Coded in [TypeScript](https://www.typescriptlang.org/) using [Deno](https://deno.land).

---

## Idea:
XFM tries to bridge the gap between:

- Existing programming langauges (like JavaScript Typescript, C and Python)
- Making websites simpler to make (without html so things like coding the website in the backend at the same time as coding the backend)
- Styling (like tailwindcss and markdown)

## How it works:
XFM uses multiple different file-types for different things (like JavaScript does with ESModules and CommonJS being seperate). These file-types are:

- Style (`.xfms` - Compiles to CSS, Markdown or HTML and the user can choose which one to compile to)
- Logic (`.xfml` - Compiles to JavaScript)
- Website (`.xfmw` - Compiles to HTML with a mix of CSS and JS as well)

Each different file-type has:

- The same compiler and CLI tool called XFMC.
- A similar but different syntax that should be decently easy to use for experienced people.
- Compatibility between different file-types so people can use one type in a different type.
- Semi-compatibility with existing programming languages: Python, JS ESModules, TS and CSS.
- Ability to be used on their own with external things like XFM - style compiled to CSS with HTML or XFM - logic to runnable JS code using NodeJS or Deno to run it.

> [!NOTE]
> No file-types have been implemented yet. Please wait until further commits for any use at all.

## Documentation:
Because of the different file-types for different things, you will need a specific file-type for the specific documentation you want to read.

- If you want the Style documentation then go to [the formats/STYLE.md file](formats/STYLE.md).

- If you want the Logic documentation then go to [the formats/LOGIC.md file](formats/LOGIC.md).

- If you want the Website documentation then go to [the formats/WEBSITE.md file](formats/WEBSITE.md).

> [!NOTE]
> Not all documentation has been written yet. At the moment (25th of April 2025), only progress on logic has been made.

## Syntax examples:

- If you want the Logic syntax examples then go to [the logic.xfml file](examples/syntax-guide/logic/logic.xfml).

> [!NOTE]
> Not all syntax examples have been written yet. At the moment (25th of April 2025), only progress on logic has been made.
