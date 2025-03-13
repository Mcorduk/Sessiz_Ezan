import { useState } from "react";
import WeatherWidget from "./WeatherWidget";
import Button from "./Button";

export interface IHomeModalProps {}

export default function HomeModal() {
  const [forecastType, setForecastType] = useState("hourly");

  return (
    <div className="home-modal w-full h-3/8 absolute z-3 bg-gray-50 overflow-hidden">
      <div className="tab-container flex justify-around w-full px-6">
        <Button
          className={` ${forecastType === "hourly" ? "active" : ""}`}
          onClick={() => {
            setForecastType("hourly");
          }}
        >
          Hourly Forecast
        </Button>

        <Button
          className={forecastType === "weekly" ? "active" : ""}
          onClick={() => {
            setForecastType("weekly");
          }}
        >
          Weekly Forecast
        </Button>

        <div className="notch"></div>
      </div>

      <WeatherWidget />
    </div>
  );
}
