import { useTranslation } from "react-i18next";
import { capitalizeFirstLetter, getDays } from "../helpers/helper";
import { SinglePrayerTime } from "../types/prayerApi";
import { format } from "date-fns";

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

  const today = format(new Date(), "MMMM dd, y");

  return (
    <div className="flex flex-col max-w-fit mx-auto mb-6 text-xl">
      <h1>{t("greeting", { name: "Tauri User" })}</h1>
      <h2 className="text-4xl font-normal">
        {capitalizeFirstLetter(currentPrayer.name)}
      </h2>
      <h1 className="text-8xl font-light">{currentPrayer.time}</h1>
      <p className=" text-2xl font-light ">{`${location} · ${today}`}</p>
      <div className="flex justify-around">
        <div>
          <p>Last</p>
          <p>
            {capitalizeFirstLetter(lastPrayer?.name)}: {lastPrayer?.time}
          </p>
        </div>

        <div>
          <p>Next</p>
          <p>
            {capitalizeFirstLetter(nextPrayer?.name)}: {nextPrayer?.time}
          </p>
        </div>
      </div>
    </div>
  );
}
