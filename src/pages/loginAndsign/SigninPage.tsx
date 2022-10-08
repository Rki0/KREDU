import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import { BiShow, BiHide } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reducerhooks";
import { registerUser } from "../../_reducers/userSlice";

function SigninPage() {
  // 닉네임
  const [nickname, setNickname] = useState("");

  // 이메일
  const [email, setEmail] = useState("");

  // 이메일 확인 유효성 검사
  const [emailMessage, setEmailMessage] = useState("");
  const [isEmail, setIsEmail] = useState(false);

  // 비밀번호
  const [password, setPassword] = useState("");

  // 비밀번호 확인 유효성 검사
  const [pswdMessage, setPswdMessage] = useState("");
  const [isPswd, setIsPswd] = useState(false);

  // 비밀번호 확인
  const [checkPassword, setCheckPassword] = useState("");

  // 비밀번호 확인 유효성 검사
  const [pswdCheckMessage, setPswdCheckMessage] = useState("");
  const [isSamePswd, setIsSamePswd] = useState(false);

  // 비밀번호 보이기 / 숨기기
  const [showPswd, setShowPswd] = useState(false);

  // 비밀번호 확인 보이기 / 숨기기
  const [showCheckPswd, setShowCheckPswd] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // 닉네임
  const nicknameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  // 이메일
  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // 이메일 유효성 검사
  useEffect(() => {
    if (email.length > 0) {
      setEmail((currentValue) => currentValue);

      const emailRegEx = /^([a-z0-9_\.-]+)@([\da-z-]+)\.([a-z\.]{2,6})$/;

      if (!emailRegEx.test(email)) {
        setEmailMessage("이메일 형식이 틀렸습니다.");
        setIsEmail(false);
      } else {
        setEmailMessage("이메일이 정상적으로 입력되었습니다.");
        setIsEmail(true);
      }
    }
  }, [email]);

  // 비밀번호
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // 비밀번호 유효성 검사
  useEffect(() => {
    if (password.length > 0) {
      setPassword((curr) => curr);

      const pswdRegEx = /^(?=.*[a-zA-Z])(?=.*[!@#$%^])(?=.*[0-9]).{8,25}$/;

      if (!pswdRegEx.test(password)) {
        setPswdMessage(
          "숫자, 영문, 특수문자(!,@,#,$,%,^) 조합으로 입력해주세요."
        );
        setIsPswd(false);
      } else {
        setPswdMessage("비밀번호가 정상적으로 입력되었습니다.");
        setIsPswd(true);
      }
    }
  }, [password]);

  // 비밀번호 확인
  const checkPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(e.target.value);
  };

  // 비밀번호 확인 유효성 검사
  useEffect(() => {
    if (checkPassword.length > 0) {
      setCheckPassword((currentValue) => currentValue);

      if (password !== checkPassword) {
        setPswdCheckMessage("맞게 입력했는지 다시 확인해주세요.");
        setIsSamePswd(false);
      } else {
        setPswdCheckMessage("비밀번호 확인이 완료되었습니다.");
        setIsSamePswd(true);
      }
    }
  }, [checkPassword]);

  // 제출
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEmail || !isPswd || !isSamePswd) {
      return alert("올바르지 않은 정보를 입력하셨습니다.");
    }

    let body = {
      nickname: nickname,
      email: email,
      password: password,
      // profile: ""
    };

    dispatch(registerUser(body))
      .then((res) => {
        if (res.payload?.success) {
          alert("회원가입 성공. 로그인 화면으로 이동합니다.");
          navigate("/login");
        } else {
          alert("회원가입 실패");
          alert(res.payload?.message);
        }
      })
      .catch((err) => console.log("회원가입 에러", err));

    setNickname("");
    setEmail("");
    setPassword("");
    setCheckPassword("");
  };

  // 비밀번호 보이기 / 숨기기
  const showPswdHandler = () => {
    setShowPswd((prev) => !prev);
  };

  // 비밀번호 확인 보이기 / 숨기기
  const showCheckPswdHandler = () => {
    setShowCheckPswd((prev) => !prev);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center mt-4 lg:mt-32 xl:mt-52">
        <h1 className="font-extrabold text-2xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#e57373] to-[#64b5f6] md:text-3xl lg:text-5xl lg:h-20 xl:text-6xl">
          Sign In
        </h1>

        <form
          onSubmit={submitHandler}
          className="flex flex-col items-center mb-4 lg:text-lg xl:text-xl"
        >
          <div className="flex flex-col items-start mb-2">
            <label htmlFor="nickname" className="font-bold">
              닉네임
            </label>

            <input
              id="nickname"
              type="text"
              placeholder="닉네임 입력(최대 10자)"
              maxLength={10}
              value={nickname}
              onChange={nicknameHandler}
              required
              className="pl-2 font-semibold w-[250px] h-[40px] border-2 border-[#ffcdd2] rounded focus:border-[#e57373] focus:outline-none sm:w-[400px] md:w-[500px] lg:w-[500px]"
            />
          </div>

          <div className="flex flex-col items-start mb-2">
            <label htmlFor="email" className="font-bold">
              이메일
            </label>

            <input
              id="email"
              type="email"
              placeholder="이메일 입력"
              maxLength={30}
              value={email}
              onChange={emailHandler}
              required
              className="pl-2 font-semibold w-[250px] h-[40px] border-2 border-[#ffcdd2] rounded focus:border-[#e57373] focus:outline-none sm:w-[400px] md:w-[500px] lg:w-[500px]"
            />

            <span
              className={
                isEmail
                  ? "text-green-500 font-bold w-[250px] text-center sm:w-[400px] md:w-[500px] lg:w-[500px]"
                  : "text-red-500 font-bold w-[250px] text-center sm:w-[400px] md:w-[500px] lg:w-[500px]"
              }
            >
              {emailMessage}
            </span>
          </div>

          <div className="flex flex-col items-start mb-2 relative">
            <label htmlFor="password" className="font-bold">
              비밀번호
            </label>

            <input
              id="password"
              type={showPswd ? "text" : "password"}
              placeholder="비밀번호 입력(8 ~ 15자)"
              minLength={8}
              maxLength={15}
              value={password}
              onChange={passwordHandler}
              required
              className="pl-2 font-semibold w-[250px] h-[40px] border-2 border-[#ffcdd2] rounded focus:border-[#64b5f6] focus:outline-none sm:w-[400px] md:w-[500px] lg:w-[500px]"
            />

            <div
              onClick={showPswdHandler}
              className="absolute top-9 right-3 lg:top-10"
            >
              {showPswd ? <BiHide /> : <BiShow />}
            </div>

            <span
              className={
                isPswd
                  ? "text-green-500 font-bold w-[250px] text-center sm:w-[400px] md:w-[500px] lg:w-[500px]"
                  : "text-red-500 font-bold w-[250px] text-center sm:w-[400px] md:w-[500px] lg:w-[500px]"
              }
            >
              {pswdMessage}
            </span>
          </div>

          <div className="flex flex-col items-start mb-2 relative lg:mb-4">
            <label htmlFor="checkPassword" className="font-bold">
              비밀번호 확인
            </label>

            <input
              id="checkPassword"
              type={showCheckPswd ? "text" : "password"}
              placeholder="비밀번호를 다시 확인해주세요"
              minLength={8}
              maxLength={15}
              value={checkPassword}
              onChange={checkPasswordHandler}
              required
              className="pl-2 mb-2 font-semibold w-[250px] h-[40px] border-2 border-[#ffcdd2] rounded focus:border-[#42a5f5] focus:outline-none sm:w-[400px] md:w-[500px] lg:w-[500px]"
            />

            <div
              onClick={showCheckPswdHandler}
              className="absolute top-9 right-3 lg:top-10"
            >
              {showCheckPswd ? <BiHide /> : <BiShow />}
            </div>

            <span
              className={
                isSamePswd
                  ? "text-green-500 font-bold w-[250px] text-center sm:w-[400px] md:w-[500px] lg:w-[500px]"
                  : "text-red-500 font-bold w-[250px] text-center sm:w-[400px] md:w-[500px] lg:w-[500px]"
              }
            >
              {pswdCheckMessage}
            </span>
          </div>

          <button
            type="submit"
            className="font-bold border-2 border-[#ffcdd2] rounded w-32 hover:bg-[#ffcdd2] hover:text-white sm:w-[150px] lg:text-lg xl:text-xl"
          >
            가입하기
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default SigninPage;
