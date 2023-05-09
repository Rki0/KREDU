// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";

// const resources = {
//   kr: {
//     translation: {
//       Lecture: "수업",
//       QandA: "질문 게시판",
//       Mypage: "마이 페이지",
//       Auth: "로그인 / 회원가입",
//       Channel: "적당히 한국어",
//     },
//   },
//   jp: {
//     translation: {
//       Lecture: "授業",
//       QandA: "質問掲示板",
//       Mypage: "マイページ",
//       Auth: "ログイン / 会員登録",
//       Channel: "適度に韓国語",
//     },
//   },
// };

// i18n.use(initReactI18next).init({
//   resources,
//   lng: "kr",
//   interpolation: {
//     escapeValue: false,
//   },
// });

// export default i18n;

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationKo from "./locales/translation.ko.json";
import translationJp from "./locales/translation.jp.json";

export const resources = {
  kr: {
    translation: translationKo,
  },
  jp: {
    translation: translationJp,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "kr",
  keySeparator: ".",
  interpolation: {
    escapeValue: false,
  },
  returnNull: false,
});

export default i18n;
