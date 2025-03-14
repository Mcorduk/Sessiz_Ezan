import { NON_PRAYER_NAMES, PRAYER_NAMES } from "./const";

export const dummyPrayerData = {
  yesterday: {
    date: "2025-03-13",
    prayers: {
      [PRAYER_NAMES.FAJR]: "05:48",
      [PRAYER_NAMES.DHUHR]: "13:19",
      [PRAYER_NAMES.ASR]: "16:38",
      [PRAYER_NAMES.MAGHRIB]: "19:16",
      [PRAYER_NAMES.ISHA]: "20:35",
    },
    nonPrayerTimes: {
      [NON_PRAYER_NAMES.SUNRISE]: "07:12",
    },
  },
  today: {
    date: "2025-03-14",
    prayers: {
      [PRAYER_NAMES.FAJR]: "05:46",
      [PRAYER_NAMES.DHUHR]: "13:18",
      [PRAYER_NAMES.ASR]: "16:38",
      [PRAYER_NAMES.MAGHRIB]: "19:17",
      [PRAYER_NAMES.ISHA]: "20:36",
    },
    nonPrayerTimes: {
      [NON_PRAYER_NAMES.SUNRISE]: "07:11",
    },
  },
  tomorrow: {
    date: "2025-03-15",
    prayers: {
      [PRAYER_NAMES.FAJR]: "05:44",
      [PRAYER_NAMES.DHUHR]: "13:18",
      [PRAYER_NAMES.ASR]: "16:39",
      [PRAYER_NAMES.MAGHRIB]: "19:18",
      [PRAYER_NAMES.ISHA]: "20:37",
    },
    nonPrayerTimes: {
      [NON_PRAYER_NAMES.SUNRISE]: "07:09",
    },
  },
  days: {
    "2025-03-13": {
      prayers: {
        [PRAYER_NAMES.FAJR]: "05:48",
        [PRAYER_NAMES.DHUHR]: "13:19",
        [PRAYER_NAMES.ASR]: "16:38",
        [PRAYER_NAMES.MAGHRIB]: "19:16",
        [PRAYER_NAMES.ISHA]: "20:35",
      },
      nonPrayerTimes: {
        [NON_PRAYER_NAMES.SUNRISE]: "07:12",
      },
    },
    "2025-03-14": {
      prayers: {
        [PRAYER_NAMES.FAJR]: "05:46",
        [PRAYER_NAMES.DHUHR]: "13:18",
        [PRAYER_NAMES.ASR]: "16:38",
        [PRAYER_NAMES.MAGHRIB]: "19:17",
        [PRAYER_NAMES.ISHA]: "20:36",
      },
      nonPrayerTimes: {
        [NON_PRAYER_NAMES.SUNRISE]: "07:11",
      },
    },
    "2025-03-15": {
      prayers: {
        [PRAYER_NAMES.FAJR]: "05:44",
        [PRAYER_NAMES.DHUHR]: "13:18",
        [PRAYER_NAMES.ASR]: "16:39",
        [PRAYER_NAMES.MAGHRIB]: "19:18",
        [PRAYER_NAMES.ISHA]: "20:37",
      },
      nonPrayerTimes: {
        [NON_PRAYER_NAMES.SUNRISE]: "07:09",
      },
    },
    "2025-03-16": {
      prayers: {
        [PRAYER_NAMES.FAJR]: "05:42",
        [PRAYER_NAMES.DHUHR]: "13:18",
        [PRAYER_NAMES.ASR]: "16:39",
        [PRAYER_NAMES.MAGHRIB]: "19:19",
        [PRAYER_NAMES.ISHA]: "20:39",
      },
      nonPrayerTimes: {
        [NON_PRAYER_NAMES.SUNRISE]: "07:07",
      },
    },
  },
};
