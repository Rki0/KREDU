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
import { lectureLike, loadUserData } from "../../_reducers/userSlice";

interface TestType {
  date: string;
  description: string;
  lectureId: number;
  like: number;
  link: string;
  see: number;
  title: string;
  comments: any;
}

interface Type {
  loadOneLectureSuccess: boolean;
  lecture: TestType;
}

function OneLecturePage() {
  const params = useParams();
  const lectureNum = Number(params.lecturenum);

  // useLocation 사용시 이전 페이지에서 넘어오는 것을 거쳐야지 데이터 전송이 됨에 주의
  // 새로고침만 하면 의미없음
  const location = useLocation();
  const data = location.state;

  const navigate = useNavigate();

  const goBack = () => {
    navigate("/lecture");
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    let body = {
      lectureNum: lectureNum,
    };

    // location으로 받아오지 말고 그냥 여기서 스토어에 접근하는게 더 나을듯

    dispatch(loadOneLecture(body))
      .then((res) => {})
      .catch((err) => console.log(err));
  }, []);

  const [like, setLike] = useState(false);

  const userData = useAppSelector((state) => state.user.userData);
  const authData = useAppSelector((state) => state.user.authData);
  const loginData = useAppSelector((state) => state.user.loginData);
  const lectureData = useAppSelector(
    (state) => state.lecture.oneLecture.lecture
  );

  // 좋아요를 눌렀더라도 스토어에 있는 데이터가 업데이트되는 것은 아니므로
  // 강제적으로 api 통신을 통해 userData를 갱신함
  useEffect(() => {
    // isAuth가 false라면 return
    // 즉, 로그인하지 않은 유저라면 데이터를 불러올 필요가 없음.
    if (!authData.isAuth) {
      return;
    }

    let body = {
      email: loginData.email,
    };

    dispatch(loadUserData(body))
      .then((res) => res.payload)
      .catch((err) => console.log(err));
  }, []);

  // userData.liked에 해당 강의가 존재한다면
  // like라는 state를 true로 미리 바꿔놓음.
  useEffect(() => {
    // userData가 빈 객체라면 이걸 실행하지 않음
    // 즉, 두 가지의 경우
    // 1. 로그인하지 않은 유저
    // 2. 로그인은 했지만, 좋아요는 하지않은 유저
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
        return setLike(true);
      }

      // 문제 발견
      // 동작은 하는데, 이상함
      // 좋아요 누르고, 뒤로 갔다가, 다시 들어오면 처리가 안되어있고
      // 다시 한번 뒤로 갔다가 들어와야지 처리가 됨
    });
  }, []);

  const likeHandler = () => {
    if (!authData.isAuth) {
      return alert("로그인이 필요한 기능입니다.");
    }

    setLike(true);

    let likeData = {
      thumbnail: `https://img.youtube.com/vi/${lectureData.link}/mqdefault.jpg`,
      link: location.pathname,
      title: lectureData.title,
      date: lectureData.date,
    };

    let body = {
      lectureId: lectureData.lectureId,
      email: userData.email,
      likeList: [likeData, ...userData.liked],
    };

    // 강의 좋아요 등록 api 통신
    dispatch(lectureLike(body))
      .then((res) => res.payload)
      .catch((err) => console.log(err));
  };

  const dislikeHandler = () => {
    // 로그인이 안되어 있으면 보이지 않을 기능이지만
    // 만일의 사태 대비
    if (!authData.isAuth) {
      return alert("로그인이 필요한 기능입니다.");
    }

    setLike(false);

    // 강의 좋아요 취소 api 통신
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

          <div className="flex flex-col bg-[rgba(0,0,0,0.1)] rounded px-2 mb-4">
            <h1>강의 제목 : {data.title}</h1>
            <p>업로드 날짜 : {data.date}</p>
            <div>
              <AiOutlinePaperClip />
              교안 다운로드
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${data.link}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <section className="mb-10">{data.description}</section>

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
