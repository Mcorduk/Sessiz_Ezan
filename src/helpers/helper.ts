import { format, isToday, parse, parseISO } from "date-fns";

export function cityFromAdress(address: string) {
  const commaIndex = address.indexOf(",");
  if (commaIndex === -1) {
    return address;
  }
  const city = address.substring(0, commaIndex);
  return city;
}

export function formatTimeLabel(
  timeString: string,
  forecastType: "hourly" | "weekly" // Literal union type
): string {
  if (!timeString) return "";

  if (forecastType === "hourly") {
    const date = parse(timeString, "HH:mm:ss", new Date());
    return format(date, "hh a");
  }

  if (forecastType === "weekly") {
    const date = parseISO(timeString);
    return isToday(date) ? "Now" : format(date, "EEE");
  }

  return timeString;
}
