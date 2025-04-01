export interface HijriDate {
  date: string; // "03-10-1446"
  format: string; // "DD-MM-YYYY"
  day: {
    title: string; // "Al Thalaata"
    number: number; // 3
  };
  month: {
    number: number; // 10
    title: string; // "Shawwāl"
  };
  year: string; // "1446"
}

export interface NextRamadan {
  date: string; // "18-02-2026"
  timeLeft: string; // "10mo 23d left"
}

export interface RamadanResponse {
  status: string; // "success"
  message: string; // "No, it is not Ramadan."
  data: {
    isRamadan: boolean; // false
    hijriDate: HijriDate;
    nextRamadan: NextRamadan;
  };
}
