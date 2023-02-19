import React, { useContext, useState } from "react";

import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hoc/http-hook";
import CommentTextareaButton from "./CommentTextareaButton";

interface CommentUpdateInputProps {
  text: string;
  commentId: string;
  setWantUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  isSubComment: boolean;
  comment: any;
}

function CommentUpdateInput(props: CommentUpdateInputProps) {
  const [newText, setNewText] = useState(props.text);

  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  const changeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewText(e.target.value);
  };

  const cancelHandler = () => {
    props.setWantUpdate(false);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const responseData = await sendRequest(
        // `${process.env.REACT_APP_BASE_URL}/lecture/comments/update/${props.commentId}`,
        `${process.env.REACT_APP_BASE_URL}/lecture/${
          props.isSubComment ? "subcomments" : "comments"
        }/update/${props.commentId}`,
        "PATCH",
        JSON.stringify({
          text: newText,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      if (responseData.updateSuccess) {
        props.comment.text = newText;

        props.setWantUpdate(false);
      }
    } catch (err) {}
  };

  return (
    <form className="flex flex-col" onSubmit={submitHandler}>
      <textarea
        value={newText}
        onChange={changeHandler}
        className="mb-1 resize-none"
        autoFocus
      />

      <div className="flex justify-end">
        <CommentTextareaButton buttonType="reset" clickHandler={cancelHandler}>
          취소
        </CommentTextareaButton>
        <CommentTextareaButton buttonType="submit">저장</CommentTextareaButton>
      </div>
    </form>
  );
}

export default CommentUpdateInput;
