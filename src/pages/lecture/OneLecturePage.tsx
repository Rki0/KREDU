import Layout from "../../layout/Layout";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  AiOutlineLeft,
  AiOutlinePaperClip,
  AiFillLike,
  AiOutlineLike,
} from "react-icons/ai";
import CommentTextarea from "../../components/CommentTextarea";
import Comments from "../../components/Comments";
import { useAppDispatch, useAppSelector } from "../../hooks/reducerhooks";
import { useEffect, useState } from "react";
import { loadOneLecture } from "../../_reducers/lectureSlice";
import { lectureLike, lectureDislike } from "../../_reducers/userSlice";

function OneLecturePage() {
  const params = useParams();
  const lectureNum = Number(params.lecturenum);

  const location = useLocation();

  const navigate = useNavigate();

  const goBack = () => {
    navigate("/lecture");
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    let body = {
      lectureNum: lectureNum,
    };

    dispatch(loadOneLecture(body))
      .then((res) => {})
      .catch((err) => console.log(err));
  }, []);

  const [like, setLike] = useState(false);

  const userData = useAppSelector((state) => state.user.userData);
  const authData = useAppSelector((state) => state.user.authData);
  const lectureData = useAppSelector(
    (state) => state.lecture.oneLecture.lecture
  );

  // userData.liked에 해당 강의가 존재한다면
  // like라는 state를 true로 미리 바꿔놓음.
  useEffect(() => {
    // userData가 빈 객체라면 이걸 실행하지 않음
    // 즉, 로그인하지 않은 유저에 대해서는 이미 좋아요를 눌렀는지를 판별하지 않아도 됨.
    if (Object.keys(userData).length === 0) {
      return;
    }

    let liked = userData.liked;

    // liked에 들어있는 데이터를 직접 일일이 비교하는 것
    // 이 부분은 데이터가 많아지면 메모리를 잡아 먹을 가능성이 매우 높음.
    // 서버쪽 코드에서 해결해서 success: true 이런 걸로 판단하는게 좋을지도 모르겠다.
    liked.forEach((item: any) => {
      // 주의할 점.
      // forEach는 맞는 조건을 만나더라도 다음 item을 iteration 함.
      // 즉, 11번 강의가 좋아요가 눌린 것을 확인한 뒤 setLike(true)를 실행했더라도
      // 12번 강의를 확인하면서 false로 돌아가버린다는 뜻
      // item.link === location.pathname ? setLike(true) : setLike(false)
      if (item.link === location.pathname) {
        setLike(true);
      }
    });
  }, []);

  // 강의 좋아요 클릭 시
  const likeHandler = () => {
    if (!authData.isAuth) {
      return alert("로그인이 필요한 기능입니다.");
    }

    setLike(true);

    // likedLectureId 설정
    // userData.liked.length가 0보다 크면 데이터가 존재하는 것이므로, 그 데이터의 likedLectureId + 1
    // 0보다 작거나 같다면 데이터가 없는 것이므로, 0으로 설정
    // 현재 userData의 liked 배열의 첫번째 원소가 가장 최근에 좋아요를 누른 강의임
    // 따라서 그 것의 likedLectureId를 가져와서 1을 증가시킨 것을
    // 현재 좋아요 누른 강의의 likedLectureId로 사용하면 됨.
    // 이러면 서버 단에서 코드를 작성할 필요가 없어짐.
    let likedLectureId =
      userData.liked.length > 0 ? userData.liked[0].likedLectureId + 1 : 0;

    let likeData = {
      thumbnail: `https://img.youtube.com/vi/${lectureData.link}/mqdefault.jpg`,
      link: location.pathname,
      title: lectureData.title,
      date: lectureData.date,
      likedLectureId: likedLectureId,
    };

    let body = {
      lectureId: lectureData.lectureId,
      email: userData.email,
      // 최근에 추가된 것이 마이페이지에서 상단에 보이도록 하기 위해
      // 최신 데이터를 앞쪽에 넣음
      likeList: [likeData, ...userData.liked],
    };

    dispatch(lectureLike(body))
      .then((res) => res.payload)
      .catch((err) => console.log(err));
  };

  // 강의 좋아요 취소 클릭 시
  const dislikeHandler = () => {
    if (!authData.isAuth) {
      return alert("로그인이 필요한 기능입니다.");
    }

    setLike(false);

    // 강의 좋아요 취소 api 통신
    // 전달해야할 데이터
    // 실험1. 유저 이메일, 라우트 경로
    // lectureId만 보내면 userData.liked에서 의미있는 데이터가 아니기 때문
    let body = {
      email: authData.email,
      link: location.pathname,
    };

    dispatch(lectureDislike(body))
      .then((res) => res.payload)
      .catch((err) => console.log(err));
  };

  return (
    <Layout>
      <div className="mt-4 px-2 md:px-4 lg:px-10">
        <article className="mb-4 pb-2 border-b-2 border-[rgba(0,0,0,0.2)]">
          <div
            className="flex mb-2 rounded border-2 border-[#ffcdd2] w-full hover:bg-[#ffcdd2] hover:text-white hover:font-semibold hover:cursor-pointer"
            onClick={goBack}
          >
            <button>
              <AiOutlineLeft />
            </button>

            <p>강의 목록으로 돌아가기</p>
          </div>

          {lectureData ? (
            <div>
              <div className="flex flex-col bg-[rgba(0,0,0,0.1)] rounded px-2 mb-4">
                <h1>강의 제목 : {lectureData.title}</h1>
                <p>업로드 날짜 : {lectureData.date}</p>
                <div>
                  <AiOutlinePaperClip />
                  교안 다운로드
                </div>
              </div>

              <div className="flex justify-center mb-4">
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${lectureData.link}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <section className="mb-10">{lectureData.description}</section>
            </div>
          ) : null}

          {/* <div className="flex flex-col bg-[rgba(0,0,0,0.1)] rounded px-2 mb-4">
            <h1>강의 제목 : {lectureData.title}</h1>
            <p>업로드 날짜 : {lectureData.date}</p>
            <div>
              <AiOutlinePaperClip />
              교안 다운로드
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${lectureData.link}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <section className="mb-10">{lectureData.description}</section> */}

          <div className="flex flex-col items-center mb-4">
            {like ? (
              <div className="flex flex-col items-center">
                <button
                  className="rounded-full border-2 border-[#ffcdd2] text-[#ffcdd2] w-[50px] h-[50px] flex justify-center items-center hover:bg-[rgba(0,0,0,0.2)] mb-2"
                  onClick={dislikeHandler}
                >
                  <AiFillLike size={30} className="" />
                </button>

                <span className="text-[#ffcdd2] font-bold">
                  마이페이지에서 확인할 수 있어요!
                </span>
              </div>
            ) : (
              <button
                className="rounded-full border-2 border-black w-[50px] h-[50px] flex justify-center items-center hover:bg-[rgba(0,0,0,0.2)]"
                onClick={likeHandler}
              >
                <AiOutlineLike size={30} className="" />
              </button>
            )}
          </div>
        </article>

        <CommentTextarea />

        <Comments />
      </div>
    </Layout>
  );
}

export default OneLecturePage;
