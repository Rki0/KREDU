// import React, { useState, useEffect } from "react";

// import { useHttpClient } from "../../hoc/http-hook";
// import sortDateAscending from "../../utils/sortDateAscending";
// import Comments from "./Comments";
// import CommentTextarea from "./CommentTextarea";

// interface CommentsDivProps {
//   lectureId: string;
//   writer: string;
// }

// function CommentsDiv(props: CommentsDivProps) {
//   const [comments, setComments] = useState<any>([]);
//   const [createdComments, setCreatedComments] = useState<any>([]);
//   const [fixedComment, setFixedComment] = useState<any>([]);
//   const [rawCommentsData, setRawCommentsData] = useState<any>([]);
//   const [isDeleteFix, setIsDeleteFix] = useState(false);
//   const [nowFixedComment, setNowFixedComment] = useState<any>([]);

//   const { sendRequest } = useHttpClient();

//   useEffect(() => {
//     const fetchFixedComment = async () => {
//       try {
//         const fixedCommentData = await sendRequest(
//           `${process.env.REACT_APP_BASE_URL}/lecture/fixedComment/${props.lectureId}`
//         );

//         if (fixedCommentData.fixedComment) {
//           setFixedComment(fixedCommentData.fixedComment);

//           setNowFixedComment(fixedCommentData.fixedComment);
//         }
//       } catch (err) {}
//     };

//     fetchFixedComment();
//   }, []);

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const responseData = await sendRequest(
//           `${process.env.REACT_APP_BASE_URL}/lecture/comments/${props.lectureId}`
//         );

//         if (responseData.commentsData) {
//           const sortedData = sortDateAscending(responseData.commentsData);

//           setRawCommentsData(sortedData);
//         }
//       } catch (err) {}
//     };

//     fetchComments();
//   }, []);

//   useEffect(() => {
//     // 고정 코멘트 생성, 변경 시
//     if (rawCommentsData.length !== 0 && fixedComment.length !== 0) {
//       const filteredData = rawCommentsData.filter(
//         (comment: any) => comment._id !== fixedComment[0]._id
//       );

//       return setComments(filteredData);
//     }

//     // 고정 코멘트 해제 시
//     if (!isDeleteFix) {
//       return setComments(rawCommentsData);
//     }

//     // 고정 코멘트 삭제 시
//     if (isDeleteFix) {
//       const filteredData = comments.filter(
//         (comment: any) => comment._id !== nowFixedComment[0]._id
//       );

//       setComments(filteredData);
//     }
//   }, [fixedComment, rawCommentsData, isDeleteFix]);

//   // useEffect(() => {
//   //   let isCreatedComment = false;

//   //   for (let i = 0; i < createdComments.length; i++) {
//   //     if (createdComments[i]._id === nowFixedComment[0]._id) {
//   //       isCreatedComment = true;
//   //       break;
//   //     }
//   //   }

//   //   if (isCreatedComment) {
//   //     // 고정 코멘트 생성, 변경 시
//   //     if (createdComments.length !== 0 && fixedComment.length !== 0) {
//   //       const filteredData = createdComments.filter(
//   //         (comment: any) => comment._id !== fixedComment[0]._id
//   //       );

//   //       return setCreatedComments(filteredData);
//   //     }

//   //     // 고정 코멘트 해제 시
//   //     if (!isDeleteFix) {
//   //       // 생성된 코멘트는 원본 배열 자체가 없는 애라서 해제 시 받아올 데이터가 없다.
//   //       // 고정 코멘트 자체를 다시 보내줘야하는데, 이게 말이 안됨.
//   //       // 구현을 하면 할 수록 특정 동작시 fetch를 진행하는게 훨씬 나아보임.
//   //       return setCreatedComments(rawCommentsData);
//   //     }

//   //     // 고정 코멘트 삭제 시
//   //     if (isDeleteFix) {
//   //       const filteredData = comments.filter(
//   //         (comment: any) => comment._id !== nowFixedComment[0]._id
//   //       );

//   //       setCreatedComments(filteredData);
//   //     }
//   //   }

//   //   if (!isCreatedComment) {
//   //     // 고정 코멘트 생성, 변경 시
//   //     if (rawCommentsData.length !== 0 && fixedComment.length !== 0) {
//   //       const filteredData = rawCommentsData.filter(
//   //         (comment: any) => comment._id !== fixedComment[0]._id
//   //       );

//   //       return setComments(filteredData);
//   //     }

//   //     // 고정 코멘트 해제 시
//   //     if (!isDeleteFix) {
//   //       return setComments(rawCommentsData);
//   //     }

//   //     // 고정 코멘트 삭제 시
//   //     if (isDeleteFix) {
//   //       const filteredData = comments.filter(
//   //         (comment: any) => comment._id !== nowFixedComment[0]._id
//   //       );

//   //       setComments(filteredData);
//   //     }
//   //   }
//   // }, [fixedComment, rawCommentsData, isDeleteFix]);

//   useEffect(() => {
//     setNowFixedComment(fixedComment);
//   }, [fixedComment]);

//   // 아래 3개의 deleteHandler들...setState 부분만 빼고 동일한데
//   // 재사용 가능하게 만들 수는 없을까?
//   const deleteHandler = (commentId: string) => {
//     setComments((prev: any) =>
//       prev.filter((comment: any) => comment._id !== commentId)
//     );
//   };

//   const createdDeleteHandler = (commentId: string) => {
//     setCreatedComments((prev: any) =>
//       prev.filter((comment: any) => comment._id !== commentId)
//     );
//   };

//   const fixedCommentDeleteHandler = (commentId: string) => {
//     setFixedComment((prev: any) =>
//       prev.filter((comment: any) => comment._id !== commentId)
//     );
//   };

//   return (
//     <>
//       <CommentTextarea
//         lectureId={props.lectureId}
//         setCreatedComments={setCreatedComments}
//         createdComments={createdComments}
//       />

//       {comments && fixedComment && (
//         <Comments
//           commentsData={comments}
//           writer={props.writer}
//           deleteHandler={deleteHandler}
//           createdComments={createdComments}
//           createdDeleteHandler={createdDeleteHandler}
//           fixedComment={fixedComment}
//           fixedCommentDeleteHandler={fixedCommentDeleteHandler}
//           setFixedComment={setFixedComment}
//           setIsDeleteFix={setIsDeleteFix}
//           setRawCommentsData={setRawCommentsData}
//         />
//       )}
//     </>
//   );
// }

// export default CommentsDiv;

import React, { useState, useEffect, useContext } from "react";
import { PostContext } from "../../context/post-context";

import { useHttpClient } from "../../hoc/http-hook";
import sortDateAscending from "../../utils/sortDateAscending";
import Comments from "./Comments";
import CommentTextarea from "./CommentTextarea";

function CommentsDiv() {
  const [comments, setComments] = useState<any>([]);
  const [createdComments, setCreatedComments] = useState<any>([]);

  const { postData } = useContext(PostContext);

  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/lecture/comments/${postData._id}`
        );

        if (responseData.commentsData) {
          const sortedData = sortDateAscending(responseData.commentsData);

          setComments(sortedData);
        }
      } catch (err) {}
    };

    fetchComments();
  }, [postData]);

  // 아래 3개의 deleteHandler들...setState 부분만 빼고 동일한데
  // 재사용 가능하게 만들 수는 없을까?
  const deleteHandler = (commentId: string) => {
    setComments((prev: any) =>
      prev.filter((comment: any) => comment._id !== commentId)
    );
  };

  const createdDeleteHandler = (commentId: string) => {
    setCreatedComments((prev: any) =>
      prev.filter((comment: any) => comment._id !== commentId)
    );
  };

  return (
    <>
      <CommentTextarea
        setCreatedComments={setCreatedComments}
        createdComments={createdComments}
      />

      {comments && (
        <Comments
          commentsData={comments}
          deleteHandler={deleteHandler}
          createdComments={createdComments}
          createdDeleteHandler={createdDeleteHandler}
        />
      )}
    </>
  );
}

export default CommentsDiv;
