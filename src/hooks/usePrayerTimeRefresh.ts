import { useEffect, useRef } from "react";

export function usePrayerTimeRefresh(
  nextUpdateTime: Date | null,
  refreshCallback: () => Promise<void>
) {
  const timerRef = useRef<number>();

  useEffect(() => {
    if (!nextUpdateTime) return;

    const now = new Date();
    const msUntilUpdate = nextUpdateTime.getTime() - now.getTime();

    if (msUntilUpdate > 0) {
      timerRef.current = window.setTimeout(() => {
        void refreshCallback();
      }, msUntilUpdate);
    } else {
      void refreshCallback();
    }

    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [nextUpdateTime, refreshCallback]);
}
