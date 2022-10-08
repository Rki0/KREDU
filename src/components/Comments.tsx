import { useAppSelector } from "../hooks/reducerhooks";
import Comment from "./Comment";

interface CommentsDataType {
  email: string;
  nickname: string;
  description: string;
  like: number;
  date: string;
  comments: any | undefined;
  outterCommentsId: number;
}

function Comments() {
  const isSuccess = useAppSelector(
    (state) => state.lecture.oneLecture.loadOneLectureSuccess
  );

  const lectureData = useAppSelector(
    (state) => state.lecture.oneLecture.lecture
  );

  return (
    <article className="my-4">
      {isSuccess ? (
        <>
          <h1 className="border-b-2 border-[rgba(0,0,0,0.15)]">
            댓글수 {lectureData.comments.length}
          </h1>

          {lectureData.comments.map((item: CommentsDataType, index: number) => (
            <Comment item={item} writer={lectureData.writer} key={index} />
          ))}
        </>
      ) : (
        <div>데이터 로딩 중...</div>
      )}
    </article>
  );
}

export default Comments;
