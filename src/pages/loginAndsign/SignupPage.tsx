import React from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../layout/Layout";
import { useForm } from "../../hoc/useForm";
import Input from "../../components/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_PASSWORD,
  VALIDATOR_REQUIRE,
} from "../../utils/validators";
import Button from "../../components/Button";
import PassToAnotherAuth from "./PassToAnotherAuth";
import { useHttpClient } from "../../hoc/http-hook";

function SignupPage() {
  const { sendRequest } = useHttpClient();
  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(
    {
      nickname: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      passwordCheck: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await sendRequest(
        "http://localhost:8080/api/users/signup",
        // `${process.env.REACT_APP_BASE_URL}/users/signup`,
        "POST",
        JSON.stringify({
          nickname: formState.inputs.nickname.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
          role: 0,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      alert("회원가입에 성공하셨습니다. 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (err) {}
  };

  return (
    <Layout>
      <div className="flex flex-col items-center mt-4 lg:mt-32 xl:mt-52">
        <h1 className="font-extrabold text-2xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#e57373] to-[#64b5f6] md:text-3xl lg:text-5xl lg:h-20 xl:text-6xl">
          Sign Up
        </h1>

        <form
          onSubmit={submitHandler}
          className="flex flex-col items-center mb-4 lg:text-lg xl:text-xl"
        >
          <Input
            id="nickname"
            type="text"
            label="닉네임"
            placeholder="닉네임 입력(최대 10자)"
            value={formState.inputs.nickname.value}
            onInput={inputHandler}
            maxLength={10}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(10)]}
            unValidText="닉네임 형식이 올바르지 않습니다."
            validText="올바른 형식입니다."
          />

          <Input
            id="email"
            type="email"
            label="이메일"
            placeholder="이메일 입력"
            value={formState.inputs.email.value}
            onInput={inputHandler}
            validators={[VALIDATOR_EMAIL()]}
            unValidText="이메일 형식이 올바르지 않습니다."
            validText="올바른 형식입니다."
          />

          <Input
            id="password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호 입력(8 ~ 12자)"
            minLength={8}
            maxLength={12}
            value={formState.inputs.password.value}
            onInput={inputHandler}
            validators={[VALIDATOR_MINLENGTH(8), VALIDATOR_MAXLENGTH(12)]}
            unValidText="비밀번호 형식이 올바르지 않습니다."
            validText="올바른 형식입니다."
          />

          <Input
            id="passwordCheck"
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 확인해주세요"
            minLength={8}
            maxLength={12}
            value={formState.inputs.passwordCheck.value}
            onInput={inputHandler}
            validators={[
              VALIDATOR_MINLENGTH(8),
              VALIDATOR_MAXLENGTH(12),
              VALIDATOR_PASSWORD(formState.inputs.password.value),
            ]}
            unValidText="비밀번호를 다시 확인해주세요."
            validText="비밀번호가 일치합니다."
          />

          <Button isValid={formState.isValid} submitMode={true}>
            회원가입
          </Button>
        </form>

        <PassToAnotherAuth now="회원가입" to="로그인" />
      </div>
    </Layout>
  );
}

export default SignupPage;
