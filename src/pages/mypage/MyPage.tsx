import Layout from "../../layout/Layout";
import { Link } from "react-router-dom";

function MyPage() {
  // 유저 정보 가져오기 api 통신
  // 각각 Link에 알맞은 데이터 송신해주기

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
            닉네임
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
