import React, { useState } from "react";
import Layout from "../../layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import { useAppDispatch } from "../../hooks/reducerhooks";
import { loginUser } from "../../_reducers/userSlice";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPswd, setShowPswd] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      email: email,
      password: password,
    };

    dispatch(loginUser(body))
      .then((res) => {
        if (res.payload?.loginSuccess) {
          navigate("/");
        } else {
          alert("가입되지 않은 정보입니다.");
        }
      })
      .catch((err) => console.log(err));
  };

  const showPswdHandler = () => {
    setShowPswd((prev) => !prev);
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
          <div className="flex flex-col items-start mb-2">
            <label htmlFor="email" className="font-bold">
              이메일
            </label>

            <input
              id="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              maxLength={20}
              value={email}
              onChange={emailHandler}
              required
              className="pl-2 font-semibold w-[250px] h-[40px] border-2 border-[#ffcdd2] rounded focus:border-[#e57373] focus:outline-none sm:w-[400px] md:w-[500px] lg:w-[500px] lg:h-[50px]"
            />
          </div>

          <div className="flex flex-col items-start mb-2 relative lg:text-xl">
            <label htmlFor="password" className="font-bold">
              비밀번호
            </label>

            <input
              id="password"
              type={showPswd ? "text" : "password"}
              placeholder="비밀번호를 입력해주세요"
              maxLength={15}
              value={password}
              onChange={passwordHandler}
              required
              className="pl-2 mb-2 font-semibold w-[250px] h-[40px] border-2 border-[#ffcdd2] rounded focus:border-[#64b5f6] focus:outline-none sm:w-[400px] md:w-[500px] lg:w-[500px] lg:h-[50px]"
            />

            <div
              onClick={showPswdHandler}
              className="absolute top-9 right-3 lg:top-11"
            >
              {showPswd ? <BiHide /> : <BiShow />}
            </div>
          </div>

          <button
            type="submit"
            className="font-bold border-2 border-[#ffcdd2] rounded w-32 hover:bg-[#ffcdd2] hover:text-white sm:w-[150px] lg:text-lg xl:text-xl"
          >
            로그인
          </button>
        </form>

        <Link
          to="/signin"
          className="text-center font-bold border-2 border-[#ffcdd2] rounded w-32 hover:bg-[#ffcdd2] hover:text-white sm:w-[150px] lg:text-lg xl:text-xl"
        >
          회원가입
        </Link>
      </div>

      {/* <a>카카오 로그인</a>
      <a>라인 로그인</a>
      <a>네이버 로그인</a>
      <a>구글 로그인</a> */}
    </Layout>
  );
}

export default LoginPage;
