import { Key } from "lucide-react";
import { NON_PRAYER_NAMES, PRAYER_NAMES } from "../helpers/const";
import { getDays } from "../helpers/helper";
import {
  FormattedPrayerData,
  FullPrayerData,
  PrayerApiResponse,
  PrayerTimes,
} from "../types/prayerApi";
import { GetPrayerResponse } from "../types/prayerApi";

interface PrayerApiErrorResponse extends Response {
  error?: string;
}

const [yesterday, today, tomorrow] = getDays(-1, 3);

export async function getPrayer(
  city: string,
  country: string = "Turkey",
  region: string = "İstanbul",
  date = yesterday,
  days: number = 3,
  timezoneOffset: number = 180
): Promise<GetPrayerResponse> {
  try {
    const baseUrl = "https://vakit.vercel.app/api/timesFromPlace";

    const params = new URLSearchParams({
      country,
      region,
      city,
      date,
      days: days.toString(),
      timezoneOffset: timezoneOffset.toString(),
    });

    const url = `${baseUrl}?${params.toString()}`;

    const response: PrayerApiErrorResponse = await fetch(url, { mode: "cors" });

    if (!response.ok) {
      if (response.error)
        throw new Error(`Error fetching prayer data: ${response.error}`);
      else throw new Error("Unkown error fetching prayer data");
    }

    const data = (await response.json()) as PrayerApiResponse;

    const formattedDays: FormattedPrayerData = formatDaysData(data.times)

  const todayPrayerTimes = formattedDays[today]

    if (!todayPrayerTimes) {
      throw new Error("No prayer times found for today.");
    }

    let currentPrayer: string | null = null;
    let lastPrayer: string | null = null;
    let nextPrayer: string | null = null;

    const prayerNames = PRAYER_NAMES;

    for (let i = 0; i < todayPrayers.length; i++) {
      const prayerTime = todayPrayers[i];
      const [hours, minutes] = prayerTime.split(":").map(Number);

      if (
        currentHour >= hours &&
        currentHour < (i === todayPrayers.length - 1 ? 24 : hours + 1)
      ) {
        currentPrayer = prayerNames[i];
        break;
      }
    }

    console.log(data);

    return {
      days:
      place: data.place,
      currentPrayer,
      lastPrayer,
      nextPrayer,
      todayPrayers,
      days
    };
  } catch (error) {
    console.error("Prayer API error:", error);
    throw error;
  }
}

// keep the day of when the API call was made in cache, if it's expired make a new call
// a call should be made everyday(?) (once a week or month is prolly better)
// times should be put in a storage

export function getCurrentPrayer(prayerData:FullPrayerData): {
  lastPrayer: {name:string; time: string} | null;
  currentPrayer: { name:string; time:string} | null;
  nextPrayer: {name: string; time:string} | null;
} {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const yesterdaysPrayers = prayerData.yesterday.prayers;
  const todayPrayers = prayerData.today.prayers;
  const tomorrowPrayers = prayerData.tomorrow.prayers

  const prayerEntries = Object.entries(todayPrayers.prayers)

  let lastPrayer = null;
  let currentPrayer = null;
  let nextPrayer = null;

  for(let i = 0; i < prayerEntries.length; i++) {
    const [prayerName, prayerTime] = prayerEntries[i]
    const [hours, minutes] = prayerTime.split(":").map(Number)

    if (currentHour > hours || (currentHour === hours && currentMinute >= minutes)) {
      lastPrayer = { name: prayerName, time: prayerTime };
      currentPrayer = prayerEntries[i + 1]
        ? { name: prayerEntries[i + 1][0], time: prayerEntries[i + 1][1] }
        : null;
      nextPrayer = prayerEntries[i + 2]
        ? { name: prayerEntries[i + 2][0], time: prayerEntries[i + 2][1] }
        : null;
    }
  }

  // Handling special cases for Fajr and Isha
  if(currentPrayer?.name === PRAYER_NAMES.FAJR) {
    lastPrayer = {
      name: PRAYER_NAMES.ISHA,
      time: yesterdaysPrayers.prayers[PRAYER_NAMES.ISHA]
    }
    nextPrayer = {
      name: PRAYER_NAMES.DHUHR,
      time: todayPrayers.prayers[PRAYER_NAMES.DHUHR]
    }
  } else if (lastPrayer?.name === PRAYER_NAMES.ISHA && currentHour >= 0) {
    // If we are past midnight but before fajr, lastPrayer is yesterday's Isha
    lastPrayer = {
      name: PRAYER_NAMES.ISHA,
      time: yesterdaysPrayers.prayers[PRAYER_NAMES.ISHA],
    }
    currentPrayer = {
      name: PRAYER_NAMES.FAJR,
      time: todayPrayers.prayers[PRAYER_NAMES.FAJR]
    }
    nextPrayer = {
      name: PRAYER_NAMES.DHUHR,
      time: todayPrayers.prayers[PRAYER_NAMES.DHUHR]
    }
  }

  //If Isha has passed today, next prayer should be tomorrow's fajr
  if (!currentPrayer) {
    lastPrayer = {
      name: PRAYER_NAMES.ISHA,
      time: todayPrayers.prayers[PRAYER_NAMES.ISHA],
    };
    currentPrayer = {
      name: PRAYER_NAMES.FAJR,
      time: tomorrowPrayers.prayers[PRAYER_NAMES.FAJR],
    };
    nextPrayer = {
      name: PRAYER_NAMES.DHUHR,
      time: tomorrowPrayers.prayers[PRAYER_NAMES.DHUHR],
    };
  }

  return {lastPrayer, currentPrayer, nextPrayer}
}

function formatDaysData(data: { [date: string]: string[] }) {
  const formattedData: FormattedPrayerData = {};

  for (const [key, value] of Object.entries(data)) {
    formattedData[key] = {
      prayers: {
        [PRAYER_NAMES.FAJR]: value[0],
        [PRAYER_NAMES.DHUHR]: value[2],
        [PRAYER_NAMES.ASR]: value[3],
        [PRAYER_NAMES.MAGHRIB]: value[4],
        [PRAYER_NAMES.ISHA]: value[5],
      },
      nonPrayerTimes: {
        [NON_PRAYER_NAMES.SUNRISE]: value[1],
      },
    };
  }

  return {};
}
