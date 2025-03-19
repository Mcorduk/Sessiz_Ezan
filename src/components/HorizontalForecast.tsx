import { useTranslation } from "react-i18next";
import { NON_PRAYER_NAMES, PRAYER_NAMES } from "../helpers/const";
import { PrayerTimes } from "../types/prayerApi";

export interface IHorizontalForecastProps {
  todayPrayers: PrayerTimes | null;
}

export default function HorizontalForecast({
  todayPrayers,
}: IHorizontalForecastProps) {
  const { t } = useTranslation();

  if (!todayPrayers) {
    throw new Error("Today Prayers could not be found");
  }
  const { prayers, nonPrayerTimes } = todayPrayers;

  // Define the order of the prayers and the non-prayer times
  const prayerOrder = [
    PRAYER_NAMES.FAJR,
    NON_PRAYER_NAMES.SUNRISE,
    PRAYER_NAMES.DHUHR,
    PRAYER_NAMES.ASR,
    PRAYER_NAMES.MAGHRIB,
    PRAYER_NAMES.ISHA,
  ];

  return (
    <div className="flex space-x-4">
      {prayerOrder.map((prayer) => (
        <div
          key={prayer}
          className={`content min-w-[60px] min-h-max flex flex-col justify-start rounded-4xl py-2 shadow`}
        >
          <p>
            {/* Translate the prayer name based on the type (prayer or non-prayer) */}
            {prayer === NON_PRAYER_NAMES.SUNRISE
              ? t(`nonPrayers.${prayer}`)
              : t(`prayers.${prayer}`)}
          </p>
          <p>
            {/* Display the time for prayer or non-prayer */}
            {prayer === NON_PRAYER_NAMES.SUNRISE
              ? nonPrayerTimes[prayer]
              : prayers[prayer]}
          </p>
        </div>
      ))}
    </div>
  );
}
