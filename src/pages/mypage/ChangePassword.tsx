import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "../../hoc/useForm";
import Input from "../../components/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_PASSWORD,
} from "../../utils/validators";
import { useHttpClient } from "../../hoc/http-hook";
import { AuthContext } from "../../context/auth-context";

function ChangePassword() {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const navigate = useNavigate();

  const [formState, inputHandler] = useForm(
    {
      currPassword: {
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

  const [isPswdRevise, setIsPswdRevise] = useState(false);

  const pswdReviseHandler = () => {
    setIsPswdRevise((prev) => !prev);
  };

  const revisedPswdSubmitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      !formState.inputs.currPassword.isValid ||
      !formState.inputs.password.isValid ||
      !formState.inputs.passwordCheck.isValid
    ) {
      alert("유효하지 않은 작업입니다. 입력을 확인해주세요.");
      return;
    }

    if (
      formState.inputs.currPassword.value === formState.inputs.password.value
    ) {
      alert("이전 비밀번호와 동일합니다. 다시 확인해주세요.");
      return;
    }

    if (
      formState.inputs.passwordCheck.value !== formState.inputs.password.value
    ) {
      alert("변경할 비밀번호를 다시 한번 확인해주세요.");
      return;
    }

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BASE_URL}/users/change/password`,
        "PATCH",
        JSON.stringify({
          currentPassword: formState.inputs.currPassword.value,
          newPassword: formState.inputs.password.value,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      if (responseData.changeSuccess) {
        alert("비밀번호 변경 성공! 다시 로그인해주세요.");
        setIsPswdRevise(false);

        auth.logout();
        navigate("/login");
      }
    } catch (err) {}
  };

  return (
    <>
      <div>
        <h2 className="mb-2 font-semibold">비밀번호 변경</h2>
        {isPswdRevise ? (
          <form className="flex flex-col" onSubmit={revisedPswdSubmitHandler}>
            <Input
              id="currPassword"
              label="현재 비밀번호"
              type="password"
              placeholder="현재 비밀번호를 입력해주세요"
              minLength={8}
              maxLength={12}
              value={formState.inputs.currPassword.value}
              onInput={inputHandler}
              validators={[VALIDATOR_MINLENGTH(8), VALIDATOR_MAXLENGTH(12)]}
              unValidText="비밀번호 형식이 올바르지 않습니다."
              validText="올바른 형식입니다."
            />

            <Input
              id="password"
              label="새로운 비밀번호"
              type="password"
              placeholder="새로운 비밀번호 입력(8 ~ 12자)"
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

            <div>
              <button
                type="button"
                onClick={pswdReviseHandler}
                className="border-2 p-1 mr-2 text-sm rounded-md border-[#ffa4a2] hover:bg-[#ffa4a2] hover:text-white"
              >
                취소
              </button>
              <button
                type="submit"
                className="border-2 p-1 mr-2 text-sm rounded-md border-[#ffa4a2] hover:bg-[#ffa4a2] hover:text-white"
              >
                변경
              </button>
            </div>
          </form>
        ) : (
          <button
            type="button"
            onClick={pswdReviseHandler}
            className="border-2 p-1 mr-2 text-sm rounded-md border-[#ffa4a2] hover:bg-[#ffa4a2] hover:text-white"
          >
            비밀번호 변경하기
          </button>
        )}
      </div>
    </>
  );
}

export default ChangePassword;
