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
    const data = await readTextFile(PRAYER_CACHE_FILE, {
      baseDir: BaseDirectory.AppData,
    });

    if (!data) return null;

    const parsedData = JSON.parse(data) as PrayerCache;

    const cityData = parsedData[city];

    if (!cityData) return null;

    const isValid = isCacheValid(cityData);

    if (!isValid) return null;

    return cityData;
  } catch (error) {
    console.warn("No cached prayer time found:", error);
    return null;
  }
}

export async function savePrayersToCache(
  city: string,
  data: CityPrayerData
): Promise<void> {
  try {
    let existingData = {};
    try {
      const rawData = await readTextFile(PRAYER_CACHE_FILE, {
        baseDir: BaseDirectory.AppData,
      });

      existingData = JSON.parse(rawData) as PrayerCache;
    } catch {
      existingData = {};
    }

    existingData[city] = data;

    await writeTextFile(
      PRAYER_CACHE_FILE,
      JSON.stringify(existingData, null, 2),
      { baseDir: BaseDirectory.AppData }
    );

    const contents = JSON.stringify({ notifications: true });

    await writeTextFile("config.json", contents, {
      baseDir: BaseDirectory.AppConfig,
    });
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
