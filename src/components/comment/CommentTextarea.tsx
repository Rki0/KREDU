// import React, { useState, useContext } from "react";

// import { AuthContext } from "../../context/auth-context";
// import { useHttpClient } from "../../hoc/http-hook";
// import getDate from "../../utils/getDate";
// import CommentTextareaButton from "./CommentTextareaButton";

// interface CommentTextareaProps {
//   lectureId: string;
//   setCreatedComments: React.Dispatch<React.SetStateAction<any[]>>;
//   createdComments: any;
// }

// function CommentTextarea(props: CommentTextareaProps) {
//   const auth = useContext(AuthContext);
//   const { sendRequest } = useHttpClient();

//   const [comment, setComment] = useState("");

//   const commentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setComment(e.target.value);
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
//         // 이 부분...isSubComment와 관련이 없는 부분인가? 확인 필요.
//         `${process.env.REACT_APP_BASE_URL}/lecture/comments/${props.lectureId}`,
//         "POST",
//         JSON.stringify({
//           text: comment,
//           date,
//         }),
//         {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + auth.token,
//         }
//       );

//       if (responseData) {
//         setComment("");

//         props.setCreatedComments((prev: any) => [responseData, ...prev]);
//         // props.setComments([responseData, ...props.comments]);
//       }
//     } catch (err) {}
//   };

//   return (
//     <div className="flex flex-col">
//       <form className="flex flex-col" onSubmit={commentSubmitHandler}>
//         <textarea
//           placeholder={
//             auth.isLoggedIn
//               ? "댓글 입력(최대 200자)"
//               : "로그인이 필요한 기능입니다."
//           }
//           minLength={1}
//           maxLength={200}
//           value={comment}
//           onChange={commentHandler}
//           disabled={!auth.isLoggedIn}
//           className="resize-y max-h-32 pl-1 border-2 mb-2 border-[rgba(0,0,0,0.5)] outline-none rounded focus:border-[#64b5f6] disabled:cursor-not-allowed"
//         />

//         <div className="flex justify-end">
//           <CommentTextareaButton buttonType="submit">
//             등록
//           </CommentTextareaButton>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default CommentTextarea;

import React, { useState, useContext } from "react";

import { AuthContext } from "../../context/auth-context";
import { PostContext } from "../../context/post-context";
import { useHttpClient } from "../../hoc/http-hook";
import getDate from "../../utils/getDate";
import CommentTextareaButton from "./CommentTextareaButton";
import { useTranslation } from "react-i18next";

interface CommentTextareaProps {
  setCreatedComments: React.Dispatch<React.SetStateAction<any[]>>;
  createdComments: any;
}

function CommentTextarea(props: CommentTextareaProps) {
  const auth = useContext(AuthContext);
  const { postData } = useContext(PostContext);
  const { sendRequest } = useHttpClient();

  const [comment, setComment] = useState("");

  const commentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
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
        // 이 부분...isSubComment와 관련이 없는 부분인가? 확인 필요.
        `${process.env.REACT_APP_BASE_URL}/lecture/comments/${postData._id}`,
        "POST",
        JSON.stringify({
          text: comment,
          date,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      if (responseData) {
        setComment("");

        props.setCreatedComments((prev: any) => [responseData, ...prev]);
        // props.setComments([responseData, ...props.comments]);
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
          minLength={1}
          maxLength={200}
          value={comment}
          onChange={commentHandler}
          disabled={!auth.isLoggedIn}
          className="resize-y max-h-32 pl-1 border-2 mb-2 border-[rgba(0,0,0,0.5)] outline-none rounded focus:border-[#64b5f6] disabled:cursor-not-allowed"
        />

        <div className="flex justify-end">
          <CommentTextareaButton buttonType="submit">
            {t("comment.submit")}
          </CommentTextareaButton>
        </div>
      </form>
    </div>
  );
}

export default CommentTextarea;
