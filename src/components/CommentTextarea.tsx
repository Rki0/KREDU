import React, { useState } from "react";

function CommentTextarea() {
  const [comment, setComment] = useState("");

  const commentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const commentSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(comment);
  };

  const resetBtnHandler = () => {
    setComment("");
  };

  return (
    <form className="flex flex-col" onSubmit={commentSubmitHandler}>
      <textarea
        placeholder="댓글 입력"
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
          댓글
        </button>
      </div>
    </form>
  );
}

export default CommentTextarea;
