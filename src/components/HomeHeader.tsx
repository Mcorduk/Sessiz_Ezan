import { useTranslation } from "react-i18next";

export interface IHomeHeaderProps {
  prayerName: string;
  prayerTime: string;
  location: string;
  nextPrayerTime: string;
  lastPrayerTime: string;
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
      <h2 className="text-4xl font-normal">{prayerName}</h2>
      <h1 className="text-8xl font-light">{prayerTime}</h1>
      <p className=" text-2xl font-light ">{location}</p>
      <div className="flex justify-around">
        <p>L: {nextPrayerTime}°</p>
        <p>H: {lastPrayerTime}°</p>
      </div>
    </div>
  );
}
