import { useEffect, useState } from "react";

export interface ITagProps {
  maghribTime: string | undefined;
}

export default function Tag({ maghribTime }: ITagProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const updateCountdown = () => {
    if (!maghribTime) return;

    const now = new Date();
    const [hours, minutes] = maghribTime.split(":").map(Number);
    const maghrib = new Date(now);
    maghrib.setHours(hours, minutes, 0, 0); // Set Maghrib time

    const diff = maghrib.getTime() - now.getTime();
    if (diff > 0) {
      const remainingHours = Math.floor(diff / (1000 * 60 * 60))
        .toString()
        .padStart(2, "0"); // Ensure 2-digit format
      const remainingMinutes = Math.floor(
        (diff % (1000 * 60 * 60)) / (1000 * 60)
      )
        .toString()
        .padStart(2, "0");
      const remainingSeconds = Math.floor((diff % (1000 * 60)) / 1000)
        .toString()
        .padStart(2, "0");

      setTimeLeft(`${remainingHours}:${remainingMinutes}:${remainingSeconds}`);
    } else {
      setTimeLeft("İftar Vakti!"); // Show message when time is up
    }
  };
  useEffect(() => {
    updateCountdown(); // Initial call
    const interval = setInterval(updateCountdown, 1000);

    return () => {
      clearInterval(interval);
    }; // Cleanup interval on unmount
  }, [maghribTime]);

  return (
    <div className="relative inline-block">
      <div className="bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded-lg shadow-lg absolute top-0 left-0 transform -translate-y-1/2">
        {timeLeft}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-6px] w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-red-700"></div>
      </div>
    </div>
  );
}
