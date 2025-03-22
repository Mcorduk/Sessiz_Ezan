import { NON_PRAYER_NAMES, PRAYER_NAMES } from "../helpers/const";
import { getDays } from "../helpers/helper";
import {
  DayPrayerTimes,
  FormattedPrayerData,
  FullPrayerData,
  PrayerApiResponse,
} from "../types/prayerApi";
import { GetPrayerResponse } from "../types/prayerApi";
import { PrayerApiErrorResponse } from "../types/prayerApi";

export async function getPrayer(
  city: string,
  country: string = "Turkey",
  region: string = "İstanbul",
  days: number = 7,
  timezoneOffset: number = 180
): Promise<GetPrayerResponse> {
  try {
    const [yesterday, today, tomorrow] = getDays(-1, 3);

    const baseUrl = "https://vakit.vercel.app/api/timesFromPlace";

    const date = yesterday;
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
      throw new Error(
        response.error
          ? `Error fetching prayer data: ${response.error}`
          : "Unknown error fetching prayer data"
      );
    }

    const data = (await response.json()) as PrayerApiResponse;
    const formattedDays: FormattedPrayerData = formatDaysData(data.times);
    const todayPrayerTimes = formattedDays[today];

    // if (!todayPrayerTimes) {
    //   throw new Error("No prayer times found for today.");
    // }

    const yesterdayPrayers = {
      date: yesterday,
      prayers: formattedDays[yesterday],
    };
    const todayPrayers = {
      date: today,
      prayers: formattedDays[today],
      nonPrayerTimes: undefined,
    };
    const tomorrowPrayers = {
      date: tomorrow,
      prayers: formattedDays[tomorrow],
    };
    // Get current prayer details from helper function
    const { currentPrayer, lastPrayer, nextPrayer } = getCurrentPrayer({
      yesterday: yesterdayPrayers,
      today: todayPrayers,
      tomorrow: tomorrowPrayers,
    });

    if (!currentPrayer || !lastPrayer || !nextPrayer) {
      throw new Error("No Prayer info");
    }

    return {
      place: data.place,
      currentPrayer,
      lastPrayer,
      nextPrayer,
      todayPrayers: todayPrayerTimes,
    };
  } catch (error) {
    console.error("Prayer API error:", error);
    throw error;
  }
}

// keep the day of when the API call was made in cache, if it's expired make a new call
// a call should be made everyday(?) (once a week or month is prolly better)
// times should be put in a storage

export function getCurrentPrayer(prayerData: FullPrayerData): {
  lastPrayer: { name: string; time: string } | null;
  currentPrayer: { name: string; time: string } | null;
  nextPrayer: { name: string; time: string } | null;
} {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const yesterdaysPrayers = prayerData.yesterday.prayers;
  const todayPrayers = prayerData.today.prayers;
  const tomorrowPrayers = prayerData.tomorrow.prayers;

  const prayerEntries = Object.entries(todayPrayers.prayers);

  let lastPrayer = null;
  let currentPrayer = null;
  let nextPrayer = null;

  for (let i = 0; i < prayerEntries.length; i++) {
    const [prayerName, prayerTime]: [string, string] = prayerEntries[i];
    const [hours, minutes] = prayerTime.split(":").map(Number);

    if (
      currentHour > hours ||
      (currentHour === hours && currentMinute >= minutes)
    ) {
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
  if (currentPrayer?.name === PRAYER_NAMES.FAJR) {
    lastPrayer = {
      name: PRAYER_NAMES.ISHA,
      time: yesterdaysPrayers.prayers[PRAYER_NAMES.ISHA] as string,
    };
    nextPrayer = {
      name: PRAYER_NAMES.DHUHR,
      time: todayPrayers.prayers[PRAYER_NAMES.DHUHR] as string,
    };
  } else if (lastPrayer?.name === PRAYER_NAMES.ISHA && currentHour >= 0) {
    // If we are past midnight but before fajr, lastPrayer is yesterday's Isha
    lastPrayer = {
      name: PRAYER_NAMES.ISHA,
      time: yesterdaysPrayers.prayers[PRAYER_NAMES.ISHA] as string,
    };
    currentPrayer = {
      name: PRAYER_NAMES.FAJR,
      time: todayPrayers.prayers[PRAYER_NAMES.FAJR] as string,
    };
    nextPrayer = {
      name: PRAYER_NAMES.DHUHR,
      time: todayPrayers.prayers[PRAYER_NAMES.DHUHR] as string,
    };
  }

  //If Isha has passed today, next prayer should be tomorrow's fajr
  if (!currentPrayer) {
    lastPrayer = {
      name: PRAYER_NAMES.ISHA,
      time: todayPrayers.prayers[PRAYER_NAMES.ISHA] as string,
    };
    currentPrayer = {
      name: PRAYER_NAMES.FAJR,
      time: tomorrowPrayers.prayers[PRAYER_NAMES.FAJR] as string,
    };
    nextPrayer = {
      name: PRAYER_NAMES.DHUHR,
      time: tomorrowPrayers.prayers[PRAYER_NAMES.DHUHR] as string,
    };
  }

  return { lastPrayer, currentPrayer, nextPrayer };
}

function formatDaysData(
  times: PrayerApiResponse["times"]
): Record<string, DayPrayerTimes> {
  const formattedData: Record<string, DayPrayerTimes> = {};

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
