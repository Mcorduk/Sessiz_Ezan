import { useEffect, useRef } from "react";

export function usePrayerTimeRefresh(
  nextUpdateTime: Date | null,
  refreshCallback: () => void
) {
  const timerRef = useRef<number>();

  useEffect(() => {
    if (!nextUpdateTime) return;

    const now = new Date();
    const msUntilUpdate = nextUpdateTime.getTime() - now.getTime();

    if (msUntilUpdate > 0) {
      timerRef.current = window.setTimeout(() => {
        refreshCallback();
      }, msUntilUpdate);
    }

    return () => {
      if (timerRef.current !== undefined) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, [nextUpdateTime, refreshCallback]);
}
