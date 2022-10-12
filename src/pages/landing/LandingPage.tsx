import { useEffect, useMemo, useState } from "react";
import Layout from "../../layout/Layout";
import { useInterval } from "../../hooks/useInterval";
import { useAppDispatch, useAppSelector } from "../../hooks/reducerhooks";
import { loadUserData } from "../../_reducers/userSlice";

function LandingPage() {
  // useMemo가 아니라 일반 변수로 선언하면
  // 타이밍 애니메이션이 발생할 때마다 다시 불려지는 문제 발생(재렌더링 때문에 필연적으로 발생)
  const completedTitle1 = useMemo(() => {
    return "한국어?";
  }, []);

  const completedTitle2 = useMemo(() => {
    return "어떻게 공부해?";
  }, []);

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const [landingTitle1, setLandingTitle1] = useState("");
  const [landingTitle2, setLandingTitle2] = useState("");

  useInterval(() => {
    if (count1 >= completedTitle1.length) {
      return;
    }

    setLandingTitle1((prev) => {
      let result = prev ? prev + completedTitle1[count1] : completedTitle1[0];

      setCount1((prev) => prev + 1);

      return result;
    });
  }, 150);

  useInterval(() => {
    if (count2 >= completedTitle2.length) {
      return;
    }

    if (count1 >= completedTitle1.length) {
      setLandingTitle2((prev) => {
        let result = prev ? prev + completedTitle2[count2] : completedTitle2[0];

        setCount2((prev) => prev + 1);

        return result;
      });
    }
  }, 150);

  const loginData = useAppSelector((state) => state.user.loginData);
  const authData = useAppSelector((state) => state.user.authData);
  const dispatch = useAppDispatch();

  // authData의 isAuth가 변경되면 useEffect 실행
  // 즉, 로그인 전 -> 로그인 후를 감지
  useEffect(() => {
    // isAuth가 false라면 return
    // 즉, 로그인하지 않은 유저라면 데이터를 불러올 필요가 없음.
    if (!authData.isAuth) {
      return;
    }

    let body = {
      email: authData.email,
    };

    dispatch(loadUserData(body))
      .then((res) => res.payload)
      .catch((err) => console.log(err));
  }, [authData.isAuth]);

  return (
    <Layout>
      <div className="mt-2 mb-4 ml-2 flex flex-col items-center justify-center text-3xl sm:text-5xl md:text-6xl lg:text-8xl lg:mb-6">
        <h1 className="text-[#e57373] animate-typingCursor1 mb-2">
          {landingTitle1}
        </h1>

        <h1 className="text-[#90caf9] animate-typingCursor2">
          {landingTitle2}
        </h1>
      </div>

      <p className="text-md text-center mb-4 md:text-xl lg:text-2xl xl:text-3xl lg:mb-6">
        시중에 있는 한국어 교육 책에는
        <br />
        <span className="text-[#e57373] font-bold">
          책에서만 쓰는 말들이 많다.
        </span>
        <br />
        하지만, 사람들은{" "}
        <span className="text-[#e57373] font-bold">드라마나 노래,</span>
        <br />
        <span className="text-[#e57373] font-bold">
          친구와의 대화 등을 통해
        </span>{" "}
        한국말을 접하게 되고
        <br />
        이로 인하여 책에서 배운 한국말을
        <br />
        <span className="text-[#e57373] font-bold">
          제대로 사용하지 못하게된다.
        </span>
        <br />
        그래서 생각했다.
        <br />
        책이 아닌{" "}
        <span className="text-[#64b5f6] font-bold">대화로 가르쳐보자고.</span>
      </p>

      <a
        href="/ch1.pdf"
        download="Ch.0 교안"
        className="flex justify-center my-4 font-bold lg:text-2xl"
      >
        👉🏻 Ch.0 교안 다운로드
      </a>

      <div className="flex justify-center">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/V-MdUgZI9u4"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </Layout>
  );
}

export default LandingPage;
