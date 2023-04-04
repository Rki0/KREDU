// import React, { useContext } from "react";

// import { BsThreeDotsVertical } from "react-icons/bs";
// import { useParams } from "react-router-dom";
// import { AuthContext } from "../../context/auth-context";
// import { useHttpClient } from "../../hoc/http-hook";

// interface CommentStateButtonProps {
//   commentState: boolean;
//   setCommentState: React.Dispatch<React.SetStateAction<boolean>>;
//   writer: string;
//   setIsCommentHover: React.Dispatch<React.SetStateAction<boolean>>;
//   isCommentHover: boolean;
//   deleteHandler: (id: string) => void;
//   commentId: string;
//   commentUpdateHandler: () => void;
//   wantUpdate: boolean;
//   isSubComment: boolean;
//   setWantShowSubComment?: React.Dispatch<React.SetStateAction<boolean>>;
//   createdSubCommentsDeleteHandler?: (id: string) => void;
//   isFixed?: boolean;
//   setFixedComment?: React.Dispatch<any>;
//   fixedCommentDeleteHandler?: (id: string) => void;
//   creator: string;
//   setIsDeleteFix?: React.Dispatch<React.SetStateAction<boolean>>;
//   setRawCommentsData?: React.Dispatch<any>;
// }

// function CommentStateButton(props: CommentStateButtonProps) {
//   const auth = useContext(AuthContext);
//   const { sendRequest } = useHttpClient();

//   const params = useParams();
//   const lectureId = params.lectureId;

//   const commentStateHandler = () => {
//     props.setCommentState((prev) => !prev);
//     props.setIsCommentHover(true);
//   };

//   const clickRevise = () => {
//     props.commentUpdateHandler();
//   };

//   const clickDelete = async () => {
//     if (!auth.isLoggedIn) {
//       alert("로그인이 필요한 기능입니다.");
//       return;
//     }

//     // 글쓴이와 댓글 작성자는 허용
//     // 지금은 글쓴이만 허용이 되어있음??
//     if (props.writer !== auth.userId) {
//       return alert("권한이 없습니다.");
//     }

//     const wantDelete = window.confirm("정말 댓글을 삭제하시겠습니까?");

//     if (!wantDelete) {
//       return;
//     }

//     const responseData = await sendRequest(
//       // `${process.env.REACT_APP_BASE_URL}/lecture/comments/delete/${lectureId}`,
//       `${process.env.REACT_APP_BASE_URL}/lecture/${
//         props.isSubComment ? "subcomments" : "comments"
//       }/delete/${lectureId}`,
//       "DELETE",
//       JSON.stringify({
//         commentId: props.commentId,
//       }),
//       {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + auth.token,
//       }
//     );

//     if (responseData.commentDeleteSuccess) {
//       // 일반 댓글(고정 댓글, 생성된 댓글이 아닌 댓글)에서 삭제
//       props.deleteHandler(props.commentId);

//       if (
//         props.isFixed &&
//         props.fixedCommentDeleteHandler &&
//         props.setIsDeleteFix &&
//         props.setRawCommentsData
//       ) {
//         // 고정 댓글 state에서 삭제
//         props.fixedCommentDeleteHandler(props.commentId);

//         props.setRawCommentsData((prev: any) =>
//           prev.filter((comment: any) => comment.id !== props.commentId)
//         );

//         props.setIsDeleteFix(true);
//       }

//       if (!props.isSubComment && props.setWantShowSubComment) {
//         props.setWantShowSubComment(false);
//       }

//       if (props.isSubComment && props.createdSubCommentsDeleteHandler) {
//         // 생성된 답글 state에서 삭제
//         props.createdSubCommentsDeleteHandler(props.commentId);
//       }
//     }
//   };

//   const fixCommentHandler = async () => {
//     if (!auth.isLoggedIn) {
//       alert("로그인이 필요한 기능입니다.");
//       return;
//     }

//     if (props.writer !== auth.userId) {
//       return alert("권한이 없습니다.");
//     }

//     const wantChangeFixedComment = window.confirm(
//       "고정 댓글이 변경될 수 있습니다. 정말 진행하시겠습까?"
//     );

//     if (!wantChangeFixedComment) {
//       return;
//     }

//     try {
//       const responseData = await sendRequest(
//         `${process.env.REACT_APP_BASE_URL}/lecture/fixedComment/${lectureId}`,
//         "PATCH",
//         JSON.stringify({
//           commentId: props.commentId,
//         }),
//         {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + auth.token,
//         }
//       );

//       if (
//         responseData.fixedComment &&
//         props.setFixedComment &&
//         props.setWantShowSubComment
//       ) {
//         props.setFixedComment([responseData.fixedComment]);

//         //
//         props.setWantShowSubComment(false);

//         alert("댓글이 고정되었습니다.");
//       }
//     } catch (err) {}
//   };

//   const deleteFixCommentHandler = async () => {
//     if (!auth.isLoggedIn) {
//       alert("로그인이 필요한 기능입니다.");
//       return;
//     }

//     if (props.writer !== auth.userId) {
//       return alert("권한이 없습니다.");
//     }

//     try {
//       const responseData = await sendRequest(
//         `${process.env.REACT_APP_BASE_URL}/lecture/fixedComment/delete/${lectureId}`,
//         "GET",
//         null,
//         {
//           Authorization: "Bearer " + auth.token,
//         }
//       );

//       if (
//         responseData.deleteSuccess &&
//         props.fixedCommentDeleteHandler &&
//         props.setIsDeleteFix &&
//         props.setWantShowSubComment
//       ) {
//         props.fixedCommentDeleteHandler(props.commentId);

//         props.setIsDeleteFix(false);

//         //
//         props.setWantShowSubComment(false);

//         alert("고정 댓글을 해제했습니다.");
//       }
//     } catch (err) {}
//   };

//   return (
//     <div
//       className={`relative lg:${
//         props.wantUpdate ? "hidden" : props.isCommentHover ? "block" : "hidden"
//       }
//     `}
//     >
//       <button onClick={commentStateHandler}>
//         <BsThreeDotsVertical />
//       </button>

//       {props.commentState ? (
//         <nav className="absolute bg-slate-300 rounded overflow-hidden w-[70px] right-0">
//           <ul className="flex flex-col text-center">
//             {props.creator === auth.userId && (
//               <li
//                 className="hover:bg-slate-500 hover:cursor-pointer hover:text-white"
//                 onClick={clickRevise}
//               >
//                 수정
//               </li>
//             )}

//             <li
//               className="hover:bg-slate-500 hover:cursor-pointer hover:text-white"
//               onClick={clickDelete}
//             >
//               삭제
//             </li>

//             {props.writer === auth.userId && !props.isSubComment ? (
//               props.isFixed ? (
//                 <li
//                   className="hover:bg-slate-500 hover:cursor-pointer hover:text-white"
//                   onClick={deleteFixCommentHandler}
//                 >
//                   고정 해제
//                 </li>
//               ) : (
//                 <li
//                   className="hover:bg-slate-500 hover:cursor-pointer hover:text-white"
//                   onClick={fixCommentHandler}
//                 >
//                   고정
//                 </li>
//               )
//             ) : null}
//           </ul>
//         </nav>
//       ) : null}
//     </div>
//   );
// }

// export default CommentStateButton;

import React, { useContext } from "react";

import { BsThreeDotsVertical } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import { PostContext } from "../../context/post-context";
import { useHttpClient } from "../../hoc/http-hook";

interface CommentStateButtonProps {
  commentState: boolean;
  setCommentState: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCommentHover: React.Dispatch<React.SetStateAction<boolean>>;
  isCommentHover: boolean;
  deleteHandler: (id: string) => void;
  commentId: string;
  commentUpdateHandler: () => void;
  wantUpdate: boolean;
  isSubComment: boolean;
  setWantShowSubComment?: React.Dispatch<React.SetStateAction<boolean>>;
  createdSubCommentsDeleteHandler?: (id: string) => void;
  isFixed?: boolean;
  setFixedComment?: React.Dispatch<any>;
  fixedCommentDeleteHandler?: (id: string) => void;
  creator: string;
  setIsDeleteFix?: React.Dispatch<React.SetStateAction<boolean>>;
  setRawCommentsData?: React.Dispatch<any>;
}

function CommentStateButton(props: CommentStateButtonProps) {
  const auth = useContext(AuthContext);
  const { postData } = useContext(PostContext);

  const { sendRequest } = useHttpClient();

  const params = useParams();
  const lectureId = params.lectureId;

  const commentStateHandler = () => {
    props.setCommentState((prev) => !prev);
    props.setIsCommentHover(true);
  };

  const clickRevise = () => {
    props.commentUpdateHandler();
  };

  const clickDelete = async () => {
    if (!auth.isLoggedIn) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }

    // 글쓴이와 댓글 작성자는 허용
    // 지금은 글쓴이만 허용이 되어있음??
    if (postData.writer !== auth.userId) {
      return alert("권한이 없습니다.");
    }

    const wantDelete = window.confirm("정말 댓글을 삭제하시겠습니까?");

    if (!wantDelete) {
      return;
    }

    const responseData = await sendRequest(
      // `${process.env.REACT_APP_BASE_URL}/lecture/comments/delete/${lectureId}`,
      `${process.env.REACT_APP_BASE_URL}/lecture/${
        props.isSubComment ? "subcomments" : "comments"
      }/delete/${lectureId}`,
      "DELETE",
      JSON.stringify({
        commentId: props.commentId,
      }),
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      }
    );

    if (responseData.commentDeleteSuccess) {
      // 일반 댓글(고정 댓글, 생성된 댓글이 아닌 댓글)에서 삭제
      props.deleteHandler(props.commentId);

      if (
        props.isFixed &&
        props.fixedCommentDeleteHandler &&
        props.setIsDeleteFix &&
        props.setRawCommentsData
      ) {
        // 고정 댓글 state에서 삭제
        props.fixedCommentDeleteHandler(props.commentId);

        props.setRawCommentsData((prev: any) =>
          prev.filter((comment: any) => comment.id !== props.commentId)
        );

        props.setIsDeleteFix(true);
      }

      if (!props.isSubComment && props.setWantShowSubComment) {
        props.setWantShowSubComment(false);
      }

      if (props.isSubComment && props.createdSubCommentsDeleteHandler) {
        // 생성된 답글 state에서 삭제
        props.createdSubCommentsDeleteHandler(props.commentId);
      }
    }
  };

  const fixCommentHandler = async () => {
    if (!auth.isLoggedIn) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }

    if (postData.writer !== auth.userId) {
      return alert("권한이 없습니다.");
    }

    const wantChangeFixedComment = window.confirm(
      "고정 댓글이 변경될 수 있습니다. 정말 진행하시겠습까?"
    );

    if (!wantChangeFixedComment) {
      return;
    }

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BASE_URL}/lecture/fixedComment/${lectureId}`,
        "PATCH",
        JSON.stringify({
          commentId: props.commentId,
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );

      if (
        responseData.fixedComment &&
        props.setFixedComment &&
        props.setWantShowSubComment
      ) {
        props.setFixedComment([responseData.fixedComment]);

        //
        props.setWantShowSubComment(false);

        alert("댓글이 고정되었습니다.");
      }
    } catch (err) {}
  };

  const deleteFixCommentHandler = async () => {
    if (!auth.isLoggedIn) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }

    if (postData.writer !== auth.userId) {
      return alert("권한이 없습니다.");
    }

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BASE_URL}/lecture/fixedComment/delete/${lectureId}`,
        "GET",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );

      if (
        responseData.deleteSuccess &&
        props.fixedCommentDeleteHandler &&
        props.setIsDeleteFix &&
        props.setWantShowSubComment
      ) {
        props.fixedCommentDeleteHandler(props.commentId);

        props.setIsDeleteFix(false);

        //
        props.setWantShowSubComment(false);

        alert("고정 댓글을 해제했습니다.");
      }
    } catch (err) {}
  };

  return (
    <div
      className={`relative lg:${
        props.wantUpdate ? "hidden" : props.isCommentHover ? "block" : "hidden"
      }
    `}
    >
      <button onClick={commentStateHandler}>
        <BsThreeDotsVertical />
      </button>

      {props.commentState ? (
        <nav className="absolute bg-slate-300 rounded overflow-hidden w-[70px] right-0">
          <ul className="flex flex-col text-center">
            {props.creator === auth.userId && (
              <li
                className="hover:bg-slate-500 hover:cursor-pointer hover:text-white"
                onClick={clickRevise}
              >
                수정
              </li>
            )}

            <li
              className="hover:bg-slate-500 hover:cursor-pointer hover:text-white"
              onClick={clickDelete}
            >
              삭제
            </li>

            {postData.writer === auth.userId && !props.isSubComment ? (
              props.isFixed ? (
                <li
                  className="hover:bg-slate-500 hover:cursor-pointer hover:text-white"
                  onClick={deleteFixCommentHandler}
                >
                  고정 해제
                </li>
              ) : (
                <li
                  className="hover:bg-slate-500 hover:cursor-pointer hover:text-white"
                  onClick={fixCommentHandler}
                >
                  고정
                </li>
              )
            ) : null}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}

export default CommentStateButton;
