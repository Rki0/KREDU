// import React, { useState } from "react";

// import CommentUserProfileImg from "./CommentUserProfileImg";
// import CommentContent from "./CommentContent";
// import CommentLikeButton from "./CommentLikeButton";
// import SubCommentCreateButton from "./SubCommentCreateButton";
// import SubCommentTextarea from "./SubCommentTextarea";
// import DotDivision from "./DotDivision";

// interface SubCommentProps {
//   subCommentData: any;
//   writer: string;
//   deleteHandler: (id: string) => void;
//   createdSubCommentsDeleteHandler: (id: string) => void;
//   setSubComments: React.Dispatch<any>;
//   setCreatedSubComments: React.Dispatch<any>;
//   mainCommentId: string;
// }

// function SubComment(props: SubCommentProps) {
//   const [isCommentHover, setIsCommentHover] = useState(false);
//   const [commentState, setCommentState] = useState(false);
//   const [wantUpdate, setWantUpdate] = useState(false);
//   const [wantCreateSubComment, setWantCreateSubComment] = useState(false);

//   const commentHoverHandler = () => {
//     setIsCommentHover(true);
//   };

//   const commentHoverOutHandler = () => {
//     setIsCommentHover(false);
//     setCommentState(false);
//   };

//   const commentUpdateHandler = () => {
//     setWantUpdate(true);
//     setCommentState(false);
//   };

//   const subCommentCreateHandler = () => {
//     setWantCreateSubComment((prev) => !prev);
//   };

//   return (
//     <div
//       className="flex flex-col pl-4"
//       onMouseEnter={commentHoverHandler}
//       onMouseLeave={commentHoverOutHandler}
//     >
//       <div className="flex items-center">
//         <CommentUserProfileImg image={props.subCommentData.image} />

//         <CommentContent
//           writer={props.writer}
//           creator={props.subCommentData.creator}
//           date={props.subCommentData.date}
//           nickname={props.subCommentData.nickname}
//           text={props.subCommentData.text}
//           commentId={props.subCommentData._id}
//           wantUpdate={wantUpdate}
//           setWantUpdate={setWantUpdate}
//           isSubComment={true}
//           comment={props.subCommentData}
//           commentState={commentState}
//           setCommentState={setCommentState}
//           setIsCommentHover={setIsCommentHover}
//           isCommentHover={isCommentHover}
//           deleteHandler={props.deleteHandler}
//           commentUpdateHandler={commentUpdateHandler}
//         />
//       </div>

//       <div className="flex ml-12 sm:ml-14">
//         <CommentLikeButton
//           commentId={props.subCommentData._id}
//           likedUser={props.subCommentData.likedUser}
//           isSubComment={true}
//           comment={props.subCommentData}
//         />

//         <DotDivision />

//         <SubCommentCreateButton
//           subCommentCreateHandler={subCommentCreateHandler}
//         />
//       </div>

//       {wantCreateSubComment && (
//         <SubCommentTextarea
//           subCommentCreateHandler={subCommentCreateHandler}
//           mainCommentId={props.mainCommentId}
//           setSubComments={props.setSubComments}
//           setCreatedSubComments={props.setCreatedSubComments}
//         />
//       )}
//     </div>
//   );
// }

// export default SubComment;

import React, { useState, useContext } from "react";

import CommentUserProfileImg from "./CommentUserProfileImg";
import CommentContent from "./CommentContent";
import CommentLikeButton from "./CommentLikeButton";
import SubCommentCreateButton from "./SubCommentCreateButton";
import SubCommentTextarea from "./SubCommentTextarea";
import DotDivision from "./DotDivision";
import { SubCommentContext } from "../../context/subcomment-context";

interface SubCommentProps {
  // subCommentData: any;
  deleteHandler: (id: string) => void;
  createdSubCommentsDeleteHandler: (id: string) => void;
  setSubComments: React.Dispatch<any>;
  setCreatedSubComments: React.Dispatch<any>;
  mainCommentId: string;
}

function SubComment(props: SubCommentProps) {
  const subComment = useContext(SubCommentContext);

  const [isCommentHover, setIsCommentHover] = useState(false);
  const [commentState, setCommentState] = useState(false);
  const [wantUpdate, setWantUpdate] = useState(false);
  const [wantCreateSubComment, setWantCreateSubComment] = useState(false);

  const commentHoverHandler = () => {
    setIsCommentHover(true);
  };

  const commentHoverOutHandler = () => {
    setIsCommentHover(false);
    setCommentState(false);
  };

  const commentUpdateHandler = () => {
    setWantUpdate(true);
    setCommentState(false);
  };

  const subCommentCreateHandler = () => {
    setWantCreateSubComment((prev) => !prev);
  };

  return (
    <div
      className="flex flex-col pl-4"
      onMouseEnter={commentHoverHandler}
      onMouseLeave={commentHoverOutHandler}
    >
      <div className="flex items-center">
        <CommentUserProfileImg image={subComment.image} />

        <CommentContent
          creator={subComment.creator}
          date={subComment.date}
          nickname={subComment.nickname}
          text={subComment.text}
          commentId={subComment._id}
          wantUpdate={wantUpdate}
          setWantUpdate={setWantUpdate}
          isSubComment={true}
          comment={subComment}
          commentState={commentState}
          setCommentState={setCommentState}
          setIsCommentHover={setIsCommentHover}
          isCommentHover={isCommentHover}
          deleteHandler={props.deleteHandler}
          commentUpdateHandler={commentUpdateHandler}
        />
      </div>

      <div className="flex ml-12 sm:ml-14">
        <CommentLikeButton isSubComment={true} />

        <DotDivision />

        <SubCommentCreateButton
          subCommentCreateHandler={subCommentCreateHandler}
        />
      </div>

      {wantCreateSubComment && (
        <SubCommentTextarea
          subCommentCreateHandler={subCommentCreateHandler}
          setSubComments={props.setSubComments}
          setCreatedSubComments={props.setCreatedSubComments}
        />
      )}
    </div>
  );
}

export default SubComment;
