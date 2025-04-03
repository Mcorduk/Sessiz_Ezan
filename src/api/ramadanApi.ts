import { RamadanResponse } from "../types/ramadanApi";
import { fetch } from "@tauri-apps/plugin-http";

export async function checkRamadan(): Promise<boolean> {
  try {
    const baseUrl = "https://ramadan.munafio.com/api/check";

    const response = await fetch(baseUrl, { mode: "cors" });

    if (!response.ok) {
      throw new Error(`Error fetching ramadan data`);
    }

    const parsedResponse = (await response.json()) as RamadanResponse;

    const isRamadan = parsedResponse.data.isRamadan;
    console.log("Is it Ramadan?: ", isRamadan);

    return isRamadan;
  } catch (error) {
    throw new Error(`Ramadan API Error + ${error}`);
  }
}
