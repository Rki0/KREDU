import Layout from "../../layout/Layout";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineLeft, AiOutlinePaperClip } from "react-icons/ai";
import CommentTextarea from "../../components/CommentTextarea";
import Comments from "../../components/Comments";
import { useAppDispatch, useAppSelector } from "../../hooks/reducerhooks";
import { useEffect, useState } from "react";
import { loadOneLecture } from "../../_reducers/lectureSlice";

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

          <section>{data.description}</section>
        </article>

        <CommentTextarea />

        <Comments />
      </div>
    </Layout>
  );
}

export default OneLecturePage;
