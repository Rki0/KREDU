import React, { useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reducerhooks";
import { writeCommentLecture } from "../_reducers/lectureSlice";

function CommentTextarea() {
  const [comment, setComment] = useState("");
  const dispatch = useAppDispatch();

  const authData = useAppSelector((state) => state.user.authData);
  const lectureData = useAppSelector(
    (state) => state.lecture.oneLecture.lecture
  );

  const date = useMemo(() => {
    return new Date().toLocaleDateString();
  }, []);

  const commentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const commentSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!authData.isAuth) {
      alert("로그인이 필요한 기능입니다.");

      return;
    }

    let commentBody = {
      // outterCommentId는 default로 생성되는 것 활용
      nickname: authData.nickname,
      email: authData.email,
      date: date,
      description: comment,
      comments: [],
    };

    let copyComments = lectureData.comments;

    let body = {
      lectureId: lectureData.lectureId,
      comments: [commentBody, ...copyComments],
    };

    // 데이터 구조 분리해서 사용할 경우
    // let commentBody = {
    //   // outterCommentId는 default로 생성되는 것 활용
    //   nickname: authData.nickname,
    //   email: authData.email,
    //   date: date,
    //   description: comment,
    // };

    // let body = {
    //   lectureId: lectureData.lectureId,
    //   comments: commentBody,
    // };

    dispatch(writeCommentLecture(body))
      .then((res) => res.payload)
      .catch((err) => console.log(err));

    setComment("");
  };

  const resetBtnHandler = () => {
    setComment("");
  };

  return (
    <form className="flex flex-col" onSubmit={commentSubmitHandler}>
      <textarea
        placeholder={
          authData.isAuth
            ? "댓글 입력(최대 200자)"
            : "로그인이 필요한 기능입니다."
        }
        minLength={1}
        maxLength={200}
        value={comment}
        onChange={commentHandler}
        className="resize-y max-h-32 border-2 mb-2 border-[rgba(0,0,0,0.5)] outline-none rounded focus:border-[#64b5f6]"
      />

      <div className="flex justify-end">
        <button
          type="reset"
          onClick={resetBtnHandler}
          className="px-2 mr-2 border-2 rounded border-[rgba(0,0,0,0.5)] hover:border-transparent hover:bg-[#e57373] hover:text-white"
        >
          취소
        </button>
        <button
          type="submit"
          className="px-2 border-2 rounded border-[rgba(0,0,0,0.5)] hover:border-transparent hover:bg-[#64b5f6] hover:text-white"
        >
          등록
        </button>
      </div>
    </form>
  );
}

export default CommentTextarea;
