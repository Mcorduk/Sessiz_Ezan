import { useEffect, useState, useCallback } from "react";
import HomeHeader from "./HomeHeader";
import { getPrayer } from "../api/prayerApi";
import { PrayerTimes, SinglePrayerTime } from "../types/prayerApi";
import { useTranslation } from "react-i18next";
import HorizontalForecast from "./HorizontalForecast";
import Tag from "./Tag";
import { PRAYER_NAMES } from "../helpers/const";
import { usePrayerTimeRefresh } from "../hooks/usePrayerTimeRefresh";
import { sendPrayerNotification } from "../helpers/notification";

export function MainLayout() {
  const { t } = useTranslation();

  const [city, setCity] = useState("İstanbul");
  const [currentPrayer, setCurrentPrayer] = useState<SinglePrayerTime | null>(
    null
  );
  const [nextPrayer, setNextPrayer] = useState<SinglePrayerTime | null>(null);
  const [lastPrayer, setLastPrayer] = useState<SinglePrayerTime | null>(null);
  const [todayPrayers, setTodayPrayers] = useState<PrayerTimes | null>(null);
  const [nextUpdateTime, setNextUpdateTime] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshPrayerData = useCallback(async () => {
    try {
      const data = await getPrayer("İstanbul"); //FIXME make me dynamic without infinite render loop

      setLastPrayer((prev) =>
        prev?.name !== data.lastPrayer.name ? data.lastPrayer : prev
      );

      // Update all states
      setCurrentPrayer((prev) =>
        prev?.name !== data.currentPrayer.name ? data.currentPrayer : prev
      );
      setNextPrayer(data.nextPrayer);
      setTodayPrayers(data.todayPrayers);

      // Set next update time
      const [hours, minutes] = data.nextPrayer.time.split(":").map(Number);
      const nextUpdate = new Date();
      nextUpdate.setHours(hours, minutes, 0, 0);

      if (nextUpdate < new Date()) {
        nextUpdate.setDate(nextUpdate.getDate() + 1);
      }

      setNextUpdateTime(nextUpdate);
    } catch (err) {
      setError("Failed to fetch prayer data.");
      console.error(err);
    }
  }, []);

  usePrayerTimeRefresh(nextUpdateTime, refreshPrayerData);

  useEffect(() => {
    const initialize = async () => {
      try {
        await sendPrayerNotification(currentPrayer?.name);
        await refreshPrayerData();
      } catch (err) {
        setError("Initialization failed.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    void initialize();
  }, [refreshPrayerData, currentPrayer]);

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
