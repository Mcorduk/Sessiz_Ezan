import { useEffect, useState } from "react";

export function useCountdownTimer(targetTime?: string): string {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (!targetTime) return;

    const updateCountdown = () => {
      const now = new Date();
      const [hours, minutes] = targetTime.split(":").map(Number);
      const target = new Date(now);
      target.setHours(hours, minutes, 0, 0); // Set target time

      const diff = target.getTime() - now.getTime();
      if (diff > 0) {
        const remainingHours = Math.floor(diff / (1000 * 60 * 60))
          .toString()
          .padStart(2, "0");
        const remainingMinutes = Math.floor(
          (diff % (1000 * 60 * 60)) / (1000 * 60)
        )
          .toString()
          .padStart(2, "0");
        const remainingSeconds = Math.floor((diff % (1000 * 60)) / 1000)
          .toString()
          .padStart(2, "0");

        setTimeLeft(
          `${remainingHours}:${remainingMinutes}:${remainingSeconds}`
        );
      } else {
        setTimeLeft("Time's up!");
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [targetTime]);

  return timeLeft;
}
