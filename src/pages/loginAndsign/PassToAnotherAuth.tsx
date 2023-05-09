import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface ToAnotherAuthProps {
  now: string;
  to: string;
}

function PassToAnotherAuth(props: ToAnotherAuthProps) {
  const { t } = useTranslation();

  const destination = (
    <Link
      to={props.now === "회원가입" ? "/login" : "/signup"}
      className="hover:text-[#ef5350] text-[#ef9a9a] font-bold hover:underline"
    >
      {props.to === "로그인" ? t("signin.moveTo") : t("login.moveTo")}
    </Link>
  );

  return (
    <p className="text-center md:text-xl">
      {props.now === "회원가입" ? t("signin.askSignin") : t("login.askSignin")}
      <br />
      {t("auth.then")}
      {destination}
      {t("auth.go")}
    </p>
  );
}

export default PassToAnotherAuth;
