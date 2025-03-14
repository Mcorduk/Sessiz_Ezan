import { useEffect, useState } from "react";
import HomeHeader from "./HomeHeader";
import House from "./House";
import { getPrayer, GetPrayerResponse } from "../api/prayerApi"; // Import your API function

export function MainLayout() {
  // const [prayerData, setPrayerData] = useState<GetPrayerResponse | null>(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // const city = "İstanbul";

  // useEffect(() => {
  //   async function fetchPrayerData() {
  //     try {
  //       const data = await getPrayer(city);
  //       setPrayerData(data);
  //     } catch (err) {
  //       setError("Failed to fetch prayer data.");
  //       console.error(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   void fetchPrayerData();
  // }, [city]);

  // if (isLoading) return <p>Loading prayer times...</p>;
  // if (error || !prayerData)
  //   return <p>{error || "Error loading prayer data."}</p>;

  // // Get prayer times for today
  // const todayPrayerTimes = prayerData.times[Object.keys(prayerData.times)[0]];
  // const [fajr, dhuhr, asr, maghrib, isha] = todayPrayerTimes;

  // console.log(fajr, isha);

  return (
    <div className="bg-[url(/src/assets/images/background.png)] font-serif w-sm h-3/5 min-h-[800px] m-auto flex flex-col justify-start relative py-10 rounded-3xl">
      <HomeHeader
        prayerName={"Asr"}
        prayerTime={"12:34"}
        location={"Istanbul, Turkey"}
        nextPrayerTime={"12:23"}
        lastPrayerTime={"17:56"}
      />
      <House />
      {/* Add other components as needed */}
    </div>
  );
}
