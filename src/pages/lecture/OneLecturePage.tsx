import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../../layout/Layout";
import CommentTextarea from "../../components/CommentTextarea";
import Comments from "../../components/Comments";
import { useHttpClient } from "../../hoc/http-hook";
import GoToLecturePage from "./GoToLecturePage";
import LectureContent from "./LectureContent";
import PostLikeButton from "../../components/PostLikeButton";

function OneLecturePage() {
  const [lecture, setLecture] = useState<any>();

  const params = useParams();
  const lectureId = params.lectureId;

  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/lecture/${lectureId}`
        );

        console.log(responseData.lecture);
        setLecture(responseData.lecture);
      } catch (err) {}
    };

    fetchLecture();
  }, []);

  return (
    <Layout>
      <div className="px-2 mt-4 md:px-4 lg:px-10">
        <article className="mb-4 pb-2 border-b-2 border-[rgba(0,0,0,0.2)]">
          <GoToLecturePage />

          {isLoading && <div>데이터 로딩중...</div>}

          {lecture && (
            <LectureContent
              title={lecture.title}
              date={lecture.date}
              link={lecture.link}
              description={lecture.description}
              files={lecture.file}
            />
          )}

          {lecture && (
            <PostLikeButton like={lecture.like} lectureId={lecture._id} />
          )}
        </article>

        <CommentTextarea />

        <Comments />
      </div>
    </Layout>
  );
}

export default OneLecturePage;
