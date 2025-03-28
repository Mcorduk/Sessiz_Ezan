import { useEffect, useState } from "react";
import HomeHeader from "./HomeHeader";
import { getPrayer } from "../api/prayerApi"; // Import your API function
import { PrayerTimes, SinglePrayerTime } from "../types/prayerApi";
import { useTranslation } from "react-i18next";
import HorizontalForecast from "./HorizontalForecast";
import Tag from "./Tag";
import { PRAYER_NAMES } from "../helpers/const";

export function MainLayout() {
  const { t } = useTranslation();

  const [city, setCity] = useState("İstanbul");
  const [currentPrayer, setCurrentPrayer] = useState<SinglePrayerTime | null>(
    null
  );
  const [nextPrayer, setNextPrayer] = useState<SinglePrayerTime | null>(null);
  const [lastPrayer, setLastPrayer] = useState<SinglePrayerTime | null>(null);
  const [todayPrayers, setTodayPrayers] = useState<PrayerTimes | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPrayerData() {
      try {
        const data = await getPrayer(city);
        setCity("İstanbul");

        setCurrentPrayer(data.currentPrayer);
        setTodayPrayers(data.todayPrayers);
        setLastPrayer(data.lastPrayer);
        setNextPrayer(data.nextPrayer);
        setTodayPrayers(data.todayPrayers);
      } catch (err) {
        setError("Failed to fetch prayer data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    void fetchPrayerData();
  }, [city]);

  const timeLeftToFast = "02:12";
  if (isLoading) return <p>{t("homeLoading")}</p>;
  if (error || !currentPrayer)
    return <p>{error || "Error loading prayer data."}</p>;

  return (
    <div className="bg-[url(/src/assets/images/background.png)] font-serif w-sm h-3/5 min-h-[800px] m-auto flex flex-col justify-start relative py-6 rounded-3xl">
      <Tag
        variant="popup"
        targetTime={todayPrayers?.prayers[PRAYER_NAMES.MAGHRIB]}
      >{`${t("misc.endOfFast")}: ${timeLeftToFast}`}</Tag>
      <HomeHeader
        currentPrayer={currentPrayer}
        location={city}
        nextPrayer={nextPrayer}
        lastPrayer={lastPrayer}
      />
      <HorizontalForecast todayPrayers={todayPrayers} />
    </div>
  );
}
