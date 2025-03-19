import { useTranslation } from "react-i18next";
import { capitalizeFirstLetter } from "../helpers/helper";
import { SinglePrayerTime } from "../types/prayerApi";

export interface IHomeHeaderProps {
  currentPrayer: SinglePrayerTime;
  location: string;
  nextPrayer: SinglePrayerTime | null;
  lastPrayer: SinglePrayerTime | null;
}

export default function HomeHeader({
  currentPrayer,
  location,
  nextPrayer,
  lastPrayer,
}: IHomeHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col max-w-fit mx-auto mb-6 text-xl">
      <h1>{t("greeting", { name: "Tauri User" })}</h1>
      <h2 className="text-4xl font-normal">
        {capitalizeFirstLetter(currentPrayer.name)}
      </h2>
      <h1 className="text-8xl font-light">{currentPrayer.time}</h1>
      <p className=" text-2xl font-light ">{location}</p>
      <div className="flex justify-around">
        <p>
          {capitalizeFirstLetter(lastPrayer?.name)}: {lastPrayer?.time}
        </p>
        <p>
          {capitalizeFirstLetter(nextPrayer?.name)}: {nextPrayer?.time}
        </p>
      </div>
    </div>
  );
}
