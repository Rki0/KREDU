import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../layout/Layout";
import PassToAnotherAuth from "./PassToAnotherAuth";
import { useHttpClient } from "../../hoc/http-hook";
import { useForm } from "../../hoc/useForm";
import Input from "../../components/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
} from "../../utils/validators";
import Button from "../../components/Button";
import { AuthContext } from "../../context/auth-context";

function LoginPage() {
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const responseData = await sendRequest(
        // "http://localhost:8080/api/users/login",
        `${process.env.REACT_APP_BASE_URL}/users/login`,
        "POST",
        JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      auth.login(
        responseData.userId,
        responseData.token,
        null,
        responseData.manager
      );

      alert("로그인에 성공했습니다. 메인 페이지로 이동합니다.");
      navigate("/");
    } catch (err) {}
  };

  return (
    <Layout>
      <div className="flex flex-col items-center mt-4 lg:mt-32 xl:mt-52">
        <h1 className="font-extrabold text-2xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#e57373] to-[#64b5f6] md:text-3xl lg:text-5xl lg:h-20 xl:text-6xl">
          Log In
        </h1>

        <form
          onSubmit={submitHandler}
          className="flex flex-col items-center mb-4 lg:text-lg xl:text-xl"
        >
          <Input
            id="email"
            type="email"
            label="이메일"
            placeholder="이메일을 입력해주세요."
            value={formState.inputs.email.value}
            onInput={inputHandler}
            validators={[VALIDATOR_EMAIL()]}
          />

          <Input
            id="password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            minLength={8}
            maxLength={12}
            value={formState.inputs.password.value}
            onInput={inputHandler}
            validators={[VALIDATOR_MINLENGTH(8), VALIDATOR_MAXLENGTH(12)]}
          />

          <Button isValid={formState.isValid} submitMode={true}>
            로그인
          </Button>
        </form>

        <PassToAnotherAuth now="로그인" to="회원가입" />
      </div>
    </Layout>
  );
}

export default LoginPage;
