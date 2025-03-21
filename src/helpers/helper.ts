import { BaseDirectory, readTextFile } from "@tauri-apps/plugin-fs";
import { GetPrayerResponse } from "../types/prayerApi";
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

async function getPrayersFromCache(
  city: string
): Promise<GetPrayerResponse | null> {
  try {
    const data = await readTextFile(PRAYER_CACHE_FILE, {
      baseDir: BaseDirectory.AppData,
    });

    if (!data) return null;
  } catch {}
}

async function savePrayersToCache(
  city: string,
  data: GetPrayerResponse
): Promise<void> {
  try {
  } catch (err) {}
}
