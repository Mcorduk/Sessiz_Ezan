import { useTranslation } from "react-i18next";
import { capitalizeFirstLetter } from "../helpers/helper";

export interface IHomeHeaderProps {
  prayerName: string;
  prayerTime: string;
  location: string;
  nextPrayerTime: string | undefined;
  lastPrayerTime: string | undefined;
}

export default function HomeHeader({
  prayerName,
  prayerTime,
  location,
  nextPrayerTime,
  lastPrayerTime,
}: IHomeHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col max-w-fit mx-auto mb-6 text-xl">
      <h1>{t("greeting", { name: "Tauri User" })}</h1>
      <h2 className="text-4xl font-normal">
        {capitalizeFirstLetter(prayerName)}
      </h2>
      <h1 className="text-8xl font-light">{prayerTime}</h1>
      <p className=" text-2xl font-light ">{location}</p>
      <div className="flex justify-around">
        <p>Last: {lastPrayerTime}</p>
        <p>Next: {nextPrayerTime}</p>
      </div>
    </div>
  );
}
