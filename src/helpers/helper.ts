import { PrayerApiResponse, PrayerTimes } from "../types/prayerApi";
import { NON_PRAYER_NAMES, PRAYER_NAMES } from "./const";

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

export function formatDaysData(
  times: PrayerApiResponse["times"]
): Record<string, PrayerTimes> {
  const formattedData: Record<string, PrayerTimes> = {};

  for (const [date, prayers] of Object.entries(times)) {
    formattedData[date] = {
      date,
      prayers: {
        [PRAYER_NAMES.FAJR]: prayers[0],
        [PRAYER_NAMES.DHUHR]: prayers[2],
        [PRAYER_NAMES.ASR]: prayers[3],
        [PRAYER_NAMES.MAGHRIB]: prayers[4],
        [PRAYER_NAMES.ISHA]: prayers[5],
      },
      nonPrayerTimes: {
        [NON_PRAYER_NAMES.SUNRISE]: prayers[1],
      },
    };
  }

  return formattedData;
}
