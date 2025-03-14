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
  forecastType: "hourly" | "weekly"
): string {
  if (!timeString) return "";

  if (forecastType === "hourly") {
    const date = parse(timeString, "HH:mm:ss", new Date());
    return format(date, "hh a");
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (forecastType === "weekly") {
    const date = parseISO(timeString);
    return isToday(date) ? "Now" : format(date, "EEE");
  }

  return timeString;
}

/*
  from: how many days from today, can take negative
  to: how many days from "from" date
*/
export function getDays(from = 0, to = 3) {
  const days = [];

  if (!Number.isInteger(from) || !Number.isInteger(to))
    throw new Error("Both 'from' and 'to' parameters must be integers.");

  if (to < 0) throw new Error("'to' parameter must be a non-negative integer.");

  for (let i = 0; i < to; i++) {
    const day = new Date();
    day.setDate(new Date().getDate() + i + from);

    const formattedDay = day.toISOString().split("T")[0];

    days.push(formattedDay);
  }

  return days;
}
