// import React, { useEffect } from "react";

// import SubComment from "./SubComment";
// import { useHttpClient } from "../../hoc/http-hook";
// import sortDateDescending from "../../utils/sortDateDescending";

// interface SubCommentsProps {
//   mainCommentId: string;
//   writer: string;
//   setSubComments: React.Dispatch<React.SetStateAction<any[]>>;
//   subComments: any[];
//   createdSubComments: any[];
//   createdSubCommentsDeleteHandler: (id: string) => void;
//   setCreatedSubComments: React.Dispatch<any>;
// }

// function SubComments(props: SubCommentsProps) {
//   const { sendRequest } = useHttpClient();

//   useEffect(() => {
//     const fetchSubComment = async () => {
//       try {
//         const responseData = await sendRequest(
//           `${process.env.REACT_APP_BASE_URL}/lecture/subcomments/${props.mainCommentId}`
//         );

//         if (responseData.subComments) {
//           const sortedData = sortDateDescending(responseData.subComments);

//           props.setSubComments(sortedData);
//         }
//       } catch (err) {}
//     };

//     fetchSubComment();
//   }, []);

//   const deleteHandler = (commentId: string) => {
//     props.setSubComments((prev: any) =>
//       prev.filter((subComment: any) => subComment.id !== commentId)
//     );
//   };

//   return (
//     <div className="pl-4">
//       {props.subComments &&
//         props.subComments.map((subComment: any, index: number) => (
//           <SubComment
//             subCommentData={subComment}
//             writer={props.writer}
//             deleteHandler={deleteHandler}
//             key={index}
//             createdSubCommentsDeleteHandler={
//               props.createdSubCommentsDeleteHandler
//             }
//             setSubComments={props.setSubComments}
//             setCreatedSubComments={props.setCreatedSubComments}
//             mainCommentId={props.mainCommentId}
//           />
//         ))}
//     </div>
//   );
// }

// export default SubComments;

import React, { useContext, useEffect } from "react";

import SubComment from "./SubComment";
import { useHttpClient } from "../../hoc/http-hook";
import sortDateDescending from "../../utils/sortDateDescending";
import { CommentContext } from "../../context/comment-context";
import { SubCommentContext } from "../../context/subcomment-context";

interface SubCommentsProps {
  // mainCommentId: string;
  setSubComments: React.Dispatch<React.SetStateAction<any[]>>;
  subComments: any[];
  createdSubComments: any[];
  createdSubCommentsDeleteHandler: (id: string) => void;
  setCreatedSubComments: React.Dispatch<any>;
}

function SubComments(props: SubCommentsProps) {
  const comment = useContext(CommentContext);
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchSubComment = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/lecture/subcomments/${comment._id}`
        );

        if (responseData.subComments) {
          const sortedData = sortDateDescending(responseData.subComments);

          props.setSubComments(sortedData);
        }
      } catch (err) {}
    };

    fetchSubComment();
  }, []);

  const deleteHandler = (commentId: string) => {
    props.setSubComments((prev: any) =>
      prev.filter((subComment: any) => subComment.id !== commentId)
    );
  };

  return (
    <div className="pl-4">
      {props.subComments &&
        props.subComments.map((subComment: any, index: number) => (
          <SubCommentContext.Provider
            key={index}
            value={{
              creator: subComment.creator,
              date: subComment.date,
              email: subComment.email,
              id: subComment.id,
              image: subComment.image,
              lecture: subComment.lecture,
              like: subComment.like,
              likedUser: subComment.likedUser,
              mainComment: subComment.mainComment,
              nickname: subComment.nickname,
              processedDate: subComment.processedDate,
              text: subComment.text,
              _id: subComment._id,
            }}
          >
            <SubComment
              // subCommentData={subComment}
              deleteHandler={deleteHandler}
              createdSubCommentsDeleteHandler={
                props.createdSubCommentsDeleteHandler
              }
              setSubComments={props.setSubComments}
              setCreatedSubComments={props.setCreatedSubComments}
              mainCommentId={comment._id}
            />
          </SubCommentContext.Provider>
        ))}
    </div>
  );
}

export default SubComments;
