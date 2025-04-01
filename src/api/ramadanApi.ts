import { RamadanResponse } from "../types/ramadanApi";

export async function checkRamadan(): Promise<boolean> {
  try {
    const baseUrl = "https://ramadan.munafio.com/api/check";

    const response = await fetch(baseUrl, { mode: "cors" });

    if (!response.ok) {
      throw new Error(`Error fetching ramadan data`);
    }

    const parsedResponse = (await response.json()) as RamadanResponse;

    return parsedResponse.data.isRamadan;
  } catch (error) {
    throw new Error(`Ramadan API Error + ${error}`);
  }
}
