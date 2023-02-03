import React from "react";
import { Link } from "react-router-dom";

interface ToAnotherAuthProps {
  now: string;
  to: string;
}

function PassToAnotherAuth(props: ToAnotherAuthProps) {
  const destination = (
    <Link
      to={props.now === "회원가입" ? "/login" : "/signup"}
      className="hover:text-[#ef5350] text-[#ef9a9a] font-bold hover:underline"
    >
      {props.to}
    </Link>
  );

  return (
    <p className="text-center md:text-xl">
      {props.now === "회원가입"
        ? `이미 ${props.now}을 하셨나요?`
        : "아직 회원가입을 하지 않으셨나요?"}
      <br />
      그렇다면 {destination}으로 이동해주세요.
    </p>
  );
}

export default PassToAnotherAuth;
