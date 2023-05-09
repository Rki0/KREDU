// import React, { useState, useContext } from "react";
// import { useParams } from "react-router-dom";

// import { AuthContext } from "../../context/auth-context";
// import { CommentContext } from "../../context/comment-context";
// import { useHttpClient } from "../../hoc/http-hook";
// import getDate from "../../utils/getDate";
// import CommentTextareaButton from "./CommentTextareaButton";

// interface CommentTextareaProps {
//   subCommentCreateHandler: () => void;
//   // mainCommentId: string;
//   setSubComments: React.Dispatch<any>;
//   setCreatedSubComments: React.Dispatch<any>;
// }

// function SubCommentTextarea(props: CommentTextareaProps) {
//   const auth = useContext(AuthContext);
//   const comment = useContext(CommentContext);
//   const { sendRequest } = useHttpClient();

//   const params = useParams();
//   const lectureId = params.lectureId;

//   const [comment, setText] = useState("");

//   const commentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setText(e.target.value);
//   };

//   const commentSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!auth.isLoggedIn) {
//       alert("로그인한 유저만 사용할 수 있습니다.");
//       return;
//     }

//     const date = getDate();

//     try {
//       const responseData = await sendRequest(
//         `${process.env.REACT_APP_BASE_URL}/lecture/subcomments/${props.mainCommentId}`,
//         "POST",
//         JSON.stringify({
//           text: comment,
//           date,
//           lectureId,
//         }),
//         {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + auth.token,
//         }
//       );

//       if (responseData) {
//         setText("");

//         props.setCreatedSubComments((prev: any) => [...prev, responseData]);

//         props.setSubComments((prev: any) => [...prev, responseData]);

//         props.subCommentCreateHandler();
//       }
//     } catch (err) {}
//   };

//   return (
//     <div className="flex flex-col">
//       <form className="flex flex-col" onSubmit={commentSubmitHandler}>
//         <textarea
//           placeholder={
//             auth.isLoggedIn
//               ? "답글 입력(최대 200자)"
//               : "로그인이 필요한 기능입니다."
//           }
//           autoFocus
//           minLength={1}
//           maxLength={200}
//           value={comment}
//           onChange={commentHandler}
//           disabled={!auth.isLoggedIn}
//           className="resize-y max-h-32 pl-1 border-2 mb-2 border-[rgba(0,0,0,0.5)] outline-none rounded focus:border-[#64b5f6] disabled:cursor-not-allowed"
//         />

//         <div className="flex justify-end">
//           <CommentTextareaButton
//             buttonType="reset"
//             clickHandler={props.subCommentCreateHandler}
//           >
//             취소
//           </CommentTextareaButton>
//           <CommentTextareaButton buttonType="submit">
//             등록
//           </CommentTextareaButton>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default SubCommentTextarea;

import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../../context/auth-context";
import { CommentContext } from "../../context/comment-context";
import { useHttpClient } from "../../hoc/http-hook";
import getDate from "../../utils/getDate";
import CommentTextareaButton from "./CommentTextareaButton";
import { useTranslation } from "react-i18next";

interface CommentTextareaProps {
  subCommentCreateHandler: () => void;
  setSubComments: React.Dispatch<any>;
  setCreatedSubComments: React.Dispatch<any>;
}

function SubCommentTextarea(props: CommentTextareaProps) {
  const auth = useContext(AuthContext);
  const comment = useContext(CommentContext);
  const { sendRequest } = useHttpClient();

  const params = useParams();
  const lectureId = params.lectureId;

  const [text, setText] = useState("");

  const commentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const commentSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!auth.isLoggedIn) {
      alert("로그인한 유저만 사용할 수 있습니다.");
      return;
    }

    const date = getDate();

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BASE_URL}/lecture/subcomments/${comment._id}`,
        "POST",
        JSON.stringify({
          text,
          date,
          lectureId,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      if (responseData) {
        setText("");

        props.setCreatedSubComments((prev: any) => [...prev, responseData]);

        props.setSubComments((prev: any) => [...prev, responseData]);

        props.subCommentCreateHandler();
      }
    } catch (err) {}
  };

  const { t } = useTranslation();

  return (
    <div className="flex flex-col">
      <form className="flex flex-col" onSubmit={commentSubmitHandler}>
        <textarea
          placeholder={
            auth.isLoggedIn
              ? t("comment.placeholder")
              : t("comment.pleaseLogin")
          }
          autoFocus
          minLength={1}
          maxLength={200}
          value={text}
          onChange={commentHandler}
          disabled={!auth.isLoggedIn}
          className="resize-y max-h-32 pl-1 border-2 mb-2 border-[rgba(0,0,0,0.5)] outline-none rounded focus:border-[#64b5f6] disabled:cursor-not-allowed"
        />

        <div className="flex justify-end">
          <CommentTextareaButton
            buttonType="reset"
            clickHandler={props.subCommentCreateHandler}
          >
            {t("comment.subcomment.cancel")}
          </CommentTextareaButton>
          <CommentTextareaButton buttonType="submit">
            {t("comment.subcomment.submit")}
          </CommentTextareaButton>
        </div>
      </form>
    </div>
  );
}

export default SubCommentTextarea;
