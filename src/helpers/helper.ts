import {
  BaseDirectory,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/plugin-fs";
import { CityPrayerData, PrayerCache } from "../types/prayerApi";
import { PRAYER_CACHE_FILE } from "./const";

/*
  from: how many days from today, can take negative
  to: how many days from "from" date
*/
export function getDays(from = 0, to = 3) {
  const days = [];

  if (!Number.isInteger(from) || !Number.isInteger(to))
    throw new Error("Both 'from' and 'to' parameters must be integers.");

  if (to < 0) throw new Error("'to' parameter must be a non-negative integer.");

  for (let i = 0; i < to; i++) {
    const day = new Date();
    day.setDate(new Date().getDate() + i + from);

    const formattedDay = day.toISOString().split("T")[0];

    days.push(formattedDay);
  }

  return days;
}

export function capitalizeFirstLetter(str?: string) {
  if (str === undefined) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function getPrayersFromCache(
  city: string
): Promise<CityPrayerData | null> {
  try {
    console.log("Reading prayer cache file...");
    const data = await readTextFile(PRAYER_CACHE_FILE, {
      baseDir: BaseDirectory.AppData,
    });

    if (!data) {
      console.log("No data found in cache.");
      return null;
    }

    console.log("Cache data found, parsing...");
    const parsedData = JSON.parse(data) as PrayerCache;
    const cityData = parsedData[city];

    if (!cityData || Object.keys(cityData).length === 0) {
      console.log(`No valid data found for city: ${city}`);
      return null;
    }

    const isValid = isCacheValid(cityData);

    return isValid ? cityData : null;
  } catch (error) {
    console.warn("Error reading prayer cache:", error);
    return null;
  }
}

export async function savePrayersToCache(
  city: string,
  data: CityPrayerData
): Promise<void> {
  try {
    console.log("Preparing to save prayer cache...");

    let existingData = {};
    try {
      console.log("Reading existing prayer cache...");
      const rawData = await readTextFile(PRAYER_CACHE_FILE, {
        baseDir: BaseDirectory.AppData,
      });

      existingData = JSON.parse(rawData) as PrayerCache;
    } catch (error) {
      console.log("No existing cache found. Creating a new one.", error);
      existingData = {};
    }

    existingData[city] = data;

    console.log("Writing updated data to cache...");
    await writeTextFile(
      PRAYER_CACHE_FILE,
      JSON.stringify(existingData, null, 2),
      { baseDir: BaseDirectory.AppData }
    );
    console.log("Prayer cache file written successfully.");
  } catch (error) {
    console.error("Error saving prayer times to cache:", error);
  }
}

function isCacheValid(data: CityPrayerData): boolean {
  try {
    //Need to have at least tomorrow's date in cache for that city
    const tomorrow = getDays(1, 1)[0];

    if (!data[tomorrow]) return false;

    return true;
  } catch {
    return false;
  }
}
