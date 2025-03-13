import { IWeatherWidgetData } from "../types/weather";

export const dummyWeatherData: IWeatherWidgetData = {
  hourly: [
    {
      timeLabel: "12 AM",
      condition: "cloudy",
      chanceOfPrecipitation: 20,
      temperature: 18,
    },
    {
      timeLabel: "Now",
      condition: "rain",
      chanceOfPrecipitation: 70,
      temperature: 17,
    },
    {
      timeLabel: "2 AM",
      condition: "clear-day",
      chanceOfPrecipitation: 10,
      temperature: 19,
    },
    {
      timeLabel: "3 AM",
      condition: "cloudy",
      chanceOfPrecipitation: 15,
      temperature: 18,
    },
    {
      timeLabel: "4 AM",
      condition: "wind",
      chanceOfPrecipitation: 5,
      temperature: 16,
    },
    { timeLabel: "5 AM", condition: "fog", temperature: 15 },
    {
      timeLabel: "6 AM",
      condition: "clear-day",
      chanceOfPrecipitation: 0,
      temperature: 20,
    },
    {
      timeLabel: "7 AM",
      condition: "rain",
      chanceOfPrecipitation: 60,
      temperature: 17,
    },
    {
      timeLabel: "8 AM",
      condition: "cloudy",
      chanceOfPrecipitation: 30,
      temperature: 18,
    },
  ],
  weekly: [
    {
      timeLabel: "SAT",
      condition: "clear-night",
      chanceOfPrecipitation: 0,
      temperature: 22,
    },
    {
      timeLabel: "Now",
      condition: "rain",
      chanceOfPrecipitation: 70,
      temperature: 17,
    },
    {
      timeLabel: "MON",
      condition: "cloudy",
      chanceOfPrecipitation: 20,
      temperature: 18,
    },
    {
      timeLabel: "TUE",
      condition: "Stormy",
      chanceOfPrecipitation: 80,
      temperature: 15,
    },
    {
      timeLabel: "WED",
      condition: "clear-night",
      chanceOfPrecipitation: 5,
      temperature: 21,
    },
    {
      timeLabel: "THU",
      condition: "wind",
      chanceOfPrecipitation: 10,
      temperature: 19,
    },
    { timeLabel: "FRI", condition: "fog", temperature: 16 },
    {
      timeLabel: "SAT",
      condition: "rain",
      chanceOfPrecipitation: 50,
      temperature: 17,
    },
    {
      timeLabel: "SUN",
      condition: "snow",
      chanceOfPrecipitation: 90,
      temperature: -2,
    },
  ],
};
