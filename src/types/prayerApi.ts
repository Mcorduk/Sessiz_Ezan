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

export interface GetPrayerResponse extends PrayerApiResponse {
  currentPrayer: [string, string];
  lastPrayer: [string, string];
  nextPrayer: [string, string];
  todayPrayers: TodayPrayers;
}

interface TodayPrayers {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  ishaa: string;
}
