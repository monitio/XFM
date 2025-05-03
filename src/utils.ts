export async function getVersion(): Promise<string> {
  const text = await Deno.readTextFile(new URL("../package.json", import.meta.url));
  const json = JSON.parse(text);
  return json.version;
}

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
