import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../../layout/Layout";
import CommentTextarea from "../../components/CommentTextarea";
import Comments from "../../components/Comments";
import { useHttpClient } from "../../hoc/http-hook";
import GoToLecturePage from "./GoToLecturePage";
import LectureContent from "./LectureContent";
import PostLikeButton from "../../components/PostLikeButton";
import PostHandleDiv from "../../components/PostHandleDiv";
import { AuthContext } from "../../context/auth-context";
import CommentsDiv from "../../components/CommentsDiv";

function OneLecturePage() {
  const [lecture, setLecture] = useState<any>();

  const params = useParams();
  const lectureId = params.lectureId;

  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/lecture/${lectureId}`
        );

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

          {lecture && auth.isLoggedIn && auth.manager && (
            <PostHandleDiv lectureId={lecture._id} />
          )}
        </article>

        {lecture && (
          <CommentsDiv lectureId={lecture._id} writer={lecture.writer} />
        )}

        {/* {lecture && <CommentTextarea lectureId={lecture._id} />}

        <Comments /> */}
      </div>
    </Layout>
  );
}

export default OneLecturePage;
