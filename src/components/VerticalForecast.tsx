import { ForecastType, IWeatherData } from "../types";
import { formatTimeLabel } from "../helpers/helper";

export interface IVerticalForecastProps {
  forecast: IWeatherData;
  forecastType: ForecastType;
}

export default function VerticalForecast({
  forecast,
  forecastType,
}: IVerticalForecastProps) {
  const { timeLabel, condition, temperature, chanceOfPrecipitation } = forecast;
  const isCurrentTime = ["Now", "Today"].includes(timeLabel);

  return (
    <div
      className={`content min-w-[60px] min-h-[140px] flex flex-col justify-around border border-gray-500 rounded-4xl py-2 shadow ${
        isCurrentTime ? "bg-solid-blue" : "inactive"
      }`}
    >
      <p>{formatTimeLabel(timeLabel, forecastType)}</p>
      <div>
        <img
          src={`/src/assets/images/icons/small/${condition}.png`}
          alt={condition}
        />
        <div className="text-sm font-normal min-h-[20px] flex items-center justify-center text-blue-300">
          {chanceOfPrecipitation > 0 ? (
            <p>{chanceOfPrecipitation}%</p>
          ) : (
            <p>&nbsp;</p>
          )}
        </div>
      </div>
      <p>{temperature}°C</p>
    </div>
  );
}
