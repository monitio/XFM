import {
  dirname,
  join,
  basename,
  fromFileUrl,
} from "jsr:@std/path";

// Where this script lives
const __dirname = dirname(fromFileUrl(import.meta.url));

// Files & folders to copy
const rootFiles = [
  "../README.md",
  "../TODO.md",
  "../LICENSE",
  "../CREDITS.md",
  "../COMMENTS.md",
  "../package.json",
];
const launcherFiles = [
  "../launcher/launcher.js",
  "../launcher/launcher.d.ts",
];
const execBinaries = [
  "xfmc-linux-aarch64",
  "xfmc-linux-x86_64",
  "xfmc-windows-x86_64",
];
const foldersToCopy = [
  { src: "../examples", dest: "examples" },
  { src: "../formats",  dest: "formats"  },
];

// Destination directories
const packageDir = join(__dirname, "..", "package");
const srcDir     = join(packageDir, "src");
const execDir    = join(packageDir, "exec");

async function copyFile(src: string, dst: string) {
  await Deno.copyFile(src, dst);
  console.log(`✔ Copied file ${src} → ${dst}`);
}

async function copyDir(srcDir: string, dstDir: string) {
  await Deno.mkdir(dstDir, { recursive: true });
  for await (const entry of Deno.readDir(srcDir)) {
    const srcPath = join(srcDir, entry.name);
    const dstPath = join(dstDir, entry.name);
    if (entry.isDirectory) {
      await copyDir(srcPath, dstPath);
    } else if (entry.isFile) {
      await Deno.copyFile(srcPath, dstPath);
      console.log(`✔ Copied file ${srcPath} → ${dstPath}`);
    }
  }
}

async function exists(path: string): Promise<boolean> {
  try {
    await Deno.stat(path);
    return true;
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return false;
    }
    throw err; // rethrow if it's some other error
  }
}

async function main() {
  // 1. Create package/, src/, and exec/
  await Deno.mkdir(srcDir, { recursive: true });
  await Deno.mkdir(execDir, { recursive: true });

  // 2. Copy root-level files
  for (const rel of rootFiles) {
    const src = join(__dirname, rel);
    const dst = join(packageDir, basename(rel));
    try {
      await copyFile(src, dst);
    } catch (err) {
      console.error(`✖ Failed to copy ${rel}: ${(err as Error).message}`);
      Deno.exit(1);
    }
  }

  // 3. Copy launcher files to src/
  for (const rel of launcherFiles) {
    const src = join(__dirname, rel);
    const dst = join(srcDir, basename(rel));
    try {
      await copyFile(src, dst);
    } catch (err) {
      console.error(`✖ Failed to copy ${rel}: ${(err as Error).message}`);
      Deno.exit(1);
    }
  }

  // 4. Copy binaries to exec/
  for (const rel of execBinaries) {
    const src = join(__dirname, rel);
    const dst = join(execDir, basename(rel));

    if (!(await exists(src))) {
      console.warn(`⚠ Skipped missing binary/ went over already copied binary: ${rel}`);
      console.info("Ignore this but, check if the file copied correctly to the package/exec folder.")
      continue;
    }

    try {
      await copyFile(src, dst);
    } catch (err) {
      console.error(`✖ Failed to copy binary ${rel}: ${(err as Error).message}`);
      Deno.exit(1);
    }
  }


  // 5. Recursively copy folders (examples, formats)
  for (const { src: folderRel, dest: folderName } of foldersToCopy) {
    const srcFolder = join(__dirname, folderRel);
    const dstFolder = join(packageDir, folderName);
    try {
      await copyDir(srcFolder, dstFolder);
      console.log(`✔ Copied folder ${folderRel} → package/${folderName}`);
    } catch (err) {
      console.error(`✖ Failed to copy folder ${folderRel}: ${(err as Error).message}`);
      Deno.exit(1);
    }
  }

  console.log("\n🎉 All files, folders, and executables copied to package/");
}

main();
