import VerticalForecast from "./HorizontalForecast";

export interface IWeatherWidgetProps {}

export default function WeatherWidget({}: IWeatherWidgetProps) {
  return (
    <div className="flex gap-2 p-4 scrollable-container">
      {/* 1. The past Hour, Now, Next 7 hours */}
      {/* Reverse array because of scroll bar being on top*/}
    </div>
  );
}
