// import React from "react";

// import { CommentsDataType } from "./Comments";
// import Comment from "./Comment";

// interface FixedCommentProps {
//   comment: CommentsDataType[];
//   writer: string;
//   deleteHandler: (id: string) => void;
//   setFixedComment: React.Dispatch<any>;
//   fixedCommentDeleteHandler: (id: string) => void;
//   setIsDeleteFix: React.Dispatch<React.SetStateAction<boolean>>;
//   setRawCommentsData: React.Dispatch<any>;
// }

// function FixedComment(props: FixedCommentProps) {
//   return (
//     <div>
//       {props.comment.map((fixedComment: CommentsDataType, index: number) => (
//         <Comment
//           comment={fixedComment}
//           writer={props.writer}
//           deleteHandler={props.deleteHandler}
//           fixedCommentDeleteHandler={props.fixedCommentDeleteHandler}
//           isFixed={true}
//           setFixedComment={props.setFixedComment}
//           setIsDeleteFix={props.setIsDeleteFix}
//           setRawCommentsData={props.setRawCommentsData}
//           key={index}
//         />
//       ))}
//     </div>
//   );
// }

// export default FixedComment;

import React from "react";

import { CommentsDataType } from "./Comments";
import Comment from "./Comment";

interface FixedCommentProps {
  comment: CommentsDataType[];
  deleteHandler: (id: string) => void;
  setFixedComment: React.Dispatch<any>;
  fixedCommentDeleteHandler: (id: string) => void;
  setIsDeleteFix: React.Dispatch<React.SetStateAction<boolean>>;
  setRawCommentsData: React.Dispatch<any>;
}

function FixedComment(props: FixedCommentProps) {
  return (
    <div>
      {props.comment.map((fixedComment: CommentsDataType, index: number) => (
        <Comment
          comment={fixedComment}
          deleteHandler={props.deleteHandler}
          // setRawCommentsData={props.setRawCommentsData}
          key={index}
        />
      ))}
    </div>
  );
}

export default FixedComment;
