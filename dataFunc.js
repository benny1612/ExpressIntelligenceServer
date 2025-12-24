import { readFile } from "fs";
import fs from "fs/promises";

export async function readData(path) {
  try {
    const file = await fs.readFile(`./data/${path}.json`, "utf8");

    const js_file = !file ? [] : JSON.parse(file);
    return js_file;
  } catch (error) {
    return error;
  }
}

export async function writhData(path) {
  try {
    const file = await fs.writeFile(`./data/${path}.json`, "utf8");
    const js_file = !file ? [] : JSON.parse(file);
    return js_file;
  } catch (error) {
    return error;
  }
}
