import { NON_PRAYER_NAMES, PRAYER_NAMES } from "../helpers/const";

export interface PrayerApiResponse {
  times: {
    [date: string]: string[];
  };
  place: {
    country: string;
    countryCode: string;
    city: string;
    region: string;
    latitude: number;
    longitude: number;
  };
}

export interface GetPrayerResponse {
  currentPrayer: { name: string; time: string };
  lastPrayer: { name: string; time: string };
  nextPrayer: { name: string; time: string };
  todayPrayers: { [x: string]: string };
  place: {
    country: string;
    countryCode: string;
    city: string;
    region: string;
    latitude: number;
    longitude: number;
  };
}

// interface TodayPrayers {
//   fajr: string;
//   sunrise: string;
//   dhuhr: string;
//   asr: string;
//   maghrib: string;
//   ishaa: string;
// }

interface PrayerTimes {
  prayers: {
    [PRAYER_NAMES.FAJR]: string;
    [PRAYER_NAMES.DHUHR]: string;
    [PRAYER_NAMES.ASR]: string;
    [PRAYER_NAMES.MAGHRIB]: string;
    [PRAYER_NAMES.ISHA]: string;
  };
  nonPrayerTimes: {
    [NON_PRAYER_NAMES.SUNRISE]: string;
  };
}

export interface DayPrayerTimes extends PrayerTimes {
  date: string;
}

export interface FormattedPrayerData {
  [date: string]: PrayerTimes;
}

interface DailyPrayerData {
  date: string;
  prayers: PrayerTimes;
}

export interface FullPrayerData {
  yesterday: DailyPrayerData;
  today: DailyPrayerData;
  tomorrow: DailyPrayerData;
}
