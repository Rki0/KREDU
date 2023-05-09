import React from "react";
import { useTranslation } from "react-i18next";

const lang = ["한국어", "日本語"];

function LanguageControl() {
  const { i18n } = useTranslation();

  const langHandler = (item: string) => {
    if (item === "한국어") {
      i18n.changeLanguage("kr");
      return;
    }

    if (item === "日本語") {
      i18n.changeLanguage("jp");
      return;
    }
  };

  return (
    <ul className="flex items-center justify-center w-full text-sm">
      {lang.map((item, index) => (
        <li
          onClick={() => langHandler(item)}
          className="px-2 border-r-2 border-black hover:cursor-pointer last:border-none"
          key={index}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default LanguageControl;
