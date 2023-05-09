import React from "react";
import { useTranslation } from "react-i18next";

function EmptyPostAlarm() {
  const { t } = useTranslation();

  return (
    <div className="text-xl text-[rgba(0,0,0,0.5)] font-bold text-center md:text-2xl lg:text-3xl">
      {t("empty")}
    </div>
  );
}

export default EmptyPostAlarm;
