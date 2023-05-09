import React from "react";
import { useTranslation } from "react-i18next";

function TeacherProfile() {
  const { t } = useTranslation();

  return (
    <div className="flex-col items-center hidden text-xl lg:flex">
      <img
        src={process.env.PUBLIC_URL + "/img/profile.jpg"}
        alt="profile"
        className="w-[180px] h-[180px] mb-4 bg-white rounded-full"
      />

      <span className="text-lg">박기영(パク∙ギヨン)</span>
      <span>{t("header.channel")}</span>
    </div>
  );
}

export default TeacherProfile;
