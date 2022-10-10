import Layout from "../../layout/Layout";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/reducerhooks";
import { useEffect } from "react";
import { loadUserData } from "../../_reducers/userSlice";

function MyPage() {
  // 각각 Link에 알맞은 데이터 송신해주기
  const userData = useAppSelector((state) => state.user.userData);
  const loginData = useAppSelector((state) => state.user.loginData);

  const dispatch = useAppDispatch();

  // userData 불러오기
  // 굳이 마이페이지에서 유저 데이터를 불러오는 이유는
  // 강의 좋아요 등 기능을 하고 왔을 때
  // 데이터를 다시 불러오는게 아니라면 스토어에 업데이트가 되지 않기 때문이다.
  useEffect(() => {
    let body = {
      email: loginData.email,
    };

    dispatch(loadUserData(body))
      .then((res) => res.payload)
      .catch((err) => console.log(err));
  }, []);

  return (
    <Layout>
      <section className="flex flex-col px-2 mt-4 md:px-8 md:pt-8 lg:px-12 lg:pt-12 xl:px-32 xl:pt-20">
        <div className="flex flex-col items-center mb-4">
          <div>
            <img
              alt="profile"
              src={process.env.PUBLIC_URL + `/favicon.ico`}
              className="rounded-full mb-2 2sm:w-[100px] md:mb-4 lg:w-[150px]"
            />
          </div>

          <p className="font-bold text-lg 2sm:text-xl sm:text-2xl md:text-3xl">
            {userData.nickname}
          </p>
        </div>

        <div className="flex flex-col">
          <Link
            to="/mypage/revisemyinfo"
            className="text-lg hover:bg-[#ffa4a2] hover:text-white py-2 px-2 border-t-2 border-[#ffa4a2]"
          >
            <div className="flex justify-between">
              <span>개인정보 수정하기</span>

              <div>&gt;</div>
            </div>
          </Link>
          <Link
            to="/mypage/likelectures"
            className="text-lg hover:bg-[#ffa4a2] hover:text-white py-2 px-2 border-y-2 border-[#ffa4a2]"
          >
            <div className="flex justify-between">
              <span>좋아요 표시한 강의</span>

              <div>&gt;</div>
            </div>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

export default MyPage;
