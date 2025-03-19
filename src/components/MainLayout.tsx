import { useEffect, useState } from "react";
import HomeHeader from "./HomeHeader";
import House from "./House";
import { getPrayer } from "../api/prayerApi"; // Import your API function
import { SinglePrayerTime } from "../types/prayerApi";

export function MainLayout() {
  const [currentPrayer, setCurrentPrayer] = useState<SinglePrayerTime | null>(
    null
  );
  const [nextPrayer, setNextPrayer] = useState<SinglePrayerTime | null>(null);
  const [lastPrayer, setLastPrayer] = useState<SinglePrayerTime | null>(null);
  const [todayPrayers, setTodayPrayers] = useState<{
    [x: string]: string; //fix me
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const city = "İstanbul";

  useEffect(() => {
    async function fetchPrayerData() {
      try {
        const data = await getPrayer(city);
        setCurrentPrayer(data.currentPrayer);
        setTodayPrayers(data.todayPrayers);
        setLastPrayer(data.lastPrayer);
        setNextPrayer(data.nextPrayer);
      } catch (err) {
        setError("Failed to fetch prayer data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    void fetchPrayerData();
  }, [city]);

  if (isLoading) return <p>Loading prayer times...</p>;
  if (error || !currentPrayer)
    return <p>{error || "Error loading prayer data."}</p>;

  // Get prayer times for today

  return (
    <div className="bg-[url(/src/assets/images/background.png)] font-serif w-sm h-3/5 min-h-[800px] m-auto flex flex-col justify-start relative py-10 rounded-3xl">
      <HomeHeader
        currentPrayer={currentPrayer}
        location={"Istanbul"}
        nextPrayer={nextPrayer}
        lastPrayer={lastPrayer}
      />
    </div>
  );
}
