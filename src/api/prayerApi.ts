import { Key } from "lucide-react";
import { NON_PRAYER_NAMES, PRAYER_NAMES } from "../helpers/const";
import { getDays } from "../helpers/helper";
import {
  FormattedPrayerData,
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
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();

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

    const todayPrayerTimes = data.times[today];

    const todayPrayers = {}


    const days = formatDaysData(data.times)

    if (!todayPrayers) {
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
// sunrise should be seperated
// times should be put in a storage
function getCurrentPrayer() {}
// return an array of name of current Prayer and it's time
// if current Prayer is fajr, last prayer is going to be taken from yesterday
// if current Prayer is ishaa, but time hours is not between ishaa time and 24:00
//    last prayer and current prayer will be taken from yesterday
//    next prayer will be taken from today
// if current Prayer is ishaa, but time hours is between ishaa time and 24:00
//
//

// data.times

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
export interface GetPrayerResponse {
  yesterday: DayPrayerTimes;
  today: DayPrayerTimes;
  tomorrow: DayPrayerTimes;
  days: FormattedPrayerData;

  place: {
    country: string;
    countryCode: string;
    city: string;
    region: string;
    latitude: number;
    longitude: number;
  };
}