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

export interface PrayerApiErrorResponse extends Response {
  error?: string;
}

export interface SinglePrayerTime {
  name: string;
  time: string;
}

export interface GetPrayerResponse {
  currentPrayer: SinglePrayerTime;
  lastPrayer: SinglePrayerTime;
  nextPrayer: SinglePrayerTime;
  todayPrayers: PrayerTimes;
  // place: {
  //   country: string;
  //   countryCode: string;
  //   city: string;
  //   region: string;
  //   latitude: number;
  //   longitude: number;
  // };
}

export interface PrayerTimes {
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

export interface FullPrayerData {
  yesterday: PrayerTimes;
  today: PrayerTimes;
  tomorrow: PrayerTimes;
}

export interface CityPrayerData {
  [date: string]: PrayerTimes | null;
}

export interface PrayerCache {
  [city: string]: CityPrayerData | null;
}
