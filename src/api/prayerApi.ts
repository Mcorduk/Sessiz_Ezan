import { PRAYER_NAMES } from "../helpers/const";
import {
  getDays,
  getPrayersFromCache,
  updatePrayerCache,
} from "../helpers/helper";
import {
  CityPrayerData,
  FullPrayerData,
  PrayerTimes,
} from "../types/prayerApi";
import { GetPrayerResponse } from "../types/prayerApi";

export async function getPrayer(
  city: string,
  country: string = "Turkey",
  region: string = "İstanbul",
  days: number = 9,
  timezoneOffset: number = 180
): Promise<GetPrayerResponse> {
  try {
    const [yesterday, today, tomorrow] = getDays(-1, 3);

    await updatePrayerCache(city, country, region, days, timezoneOffset);

    const data = await getPrayersFromCache(city);

    if (!data) {
      throw new Error("Unable to get prayers from cache");
    }

    if (!data[yesterday] || !data[today] || !data[tomorrow]) {
      throw new Error("Incomplete prayer data in cache");
    }

    const yesterdayPrayers = {
      date: yesterday,
      prayers: data[yesterday].prayers,
    };

    const todayPrayers = {
      date: today,
      prayers: data[today].prayers,
    };

    const tomorrowPrayers = {
      date: tomorrow,
      prayers: data[tomorrow].prayers,
    };

    const { currentPrayer, lastPrayer, nextPrayer } = getCurrentPrayer({
      yesterday: yesterdayPrayers,
      today: todayPrayers,
      tomorrow: tomorrowPrayers,
    });

    if (!currentPrayer || !lastPrayer || !nextPrayer) {
      throw new Error("No Prayer info");
    }

    return {
      currentPrayer,
      lastPrayer,
      nextPrayer,
      todayPrayers: data[today],
    };
  } catch (error) {
    console.error("Prayer API error:", error);
    throw error;
  }
}

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

  const prayerEntries = Object.entries(todayPrayers);

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

export async function getPrayerData(
  city: string
): Promise<FullPrayerData | null> {
  const cachedData: CityPrayerData | null = await getPrayersFromCache(city);
  if (cachedData === null || !cachedData[city]) {
    console.warn("No cached data available for this city.");
    return null;
  }

  const [yesterday, today, tomorrow] = getDays(-1, 3);

  const cityData = cachedData[city];
  return {
    yesterday: (cityData[yesterday] ?? null) as PrayerTimes,
    today: (cityData[today] ?? null) as PrayerTimes,
    tomorrow: (cityData[tomorrow] ?? null) as PrayerTimes,
  };
}
