import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Layout from "../../layout/Layout";
import { useHttpClient } from "../../hoc/http-hook";
import PostLikeButton from "../../components/post/PostLikeButton";
import PostHandleDiv from "../../components/post/PostHandleDiv";
import { AuthContext } from "../../context/auth-context";
import CommentsDiv from "../../components/comment/CommentsDiv";
import GoToPreviousPage from "../../components/GoToPreviousPage";
import PostContent from "../../components/post/PostContent";

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
          <GoToPreviousPage text="강의 목록으로 돌아가기" to="/lecture" />

          {isLoading && <div>데이터 로딩중...</div>}

          {lecture && (
            <PostContent
              title={lecture.title}
              date={lecture.date}
              link={lecture.link}
              description={lecture.description}
              files={lecture.file}
              purpose="lecture"
            />
          )}

          {lecture && (
            <PostLikeButton
              like={lecture.like}
              postId={lecture._id}
              purpose="lecture"
            />
          )}

          {lecture && auth.isLoggedIn && auth.manager && (
            <PostHandleDiv postId={lecture._id} purpose="lecture" />
          )}
        </article>

        {lecture && (
          <CommentsDiv lectureId={lecture._id} writer={lecture.writer} />
        )}
      </div>
    </Layout>
  );
}

export default OneLecturePage;
