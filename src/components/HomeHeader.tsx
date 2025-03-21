import { useTranslation } from "react-i18next";
import { SinglePrayerTime } from "../types/prayerApi";
import { format } from "date-fns";
import { tr, enUS } from "date-fns/locale";

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
  const { t, i18n } = useTranslation();

  const locale = i18n.language === "tr" ? tr : enUS;
  const today = format(new Date(), "MMMM dd, y", { locale });

  if (!lastPrayer) {
    throw new Error("Last Prayer data not found");
  } else if (!nextPrayer) {
    throw new Error("Next Prayer data not found");
  }

  return (
    <div className="flex flex-col max-w-fit mx-auto mb-4 text-xl">
      {/* <h1>{t("greetings.greeting", { name: "Tauri User" })}</h1> */}
      <p className=" text-xl font-light pb-10">{`${location} · ${today}`}</p>
      <h2 className="text-4xl font-normal">
        {t(`prayers.${currentPrayer.name}`)}
      </h2>
      <h1 className="text-8xl font-light">{currentPrayer.time}</h1>
      <div className="flex justify-between gap-5">
        <div>
          <p>{t("misc.last")}</p>
          <p>
            {t(`prayers.${lastPrayer.name}`)}: {lastPrayer.time}
          </p>
        </div>

        <div>
          <p>{t("misc.next")}</p>
          <p>
            {t(`prayers.${nextPrayer.name}`)}: {nextPrayer.time}
          </p>
        </div>
      </div>
    </div>
  );
}
