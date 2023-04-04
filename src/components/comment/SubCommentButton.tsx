// import React from "react";
// import { BsChatLeftText } from "react-icons/bs";
// import { BiUpArrow, BiDownArrow } from "react-icons/bi";
// import { CommentContext } from "../../context/comment-context";

// interface SubCommentButtonProps {
//   subCommentsNum: any;
//   setWantShowSubComment: React.Dispatch<React.SetStateAction<boolean>>;
//   wantShowSubComment: boolean;
// }

// function SubCommentButton(props: SubCommentButtonProps) {
//   const comment = useContext(CommentContext);

//   const clickHandler = () => {
//     props.setWantShowSubComment((prev) => !prev);
//   };

//   return (
//     <button className="flex items-center" onClick={clickHandler}>
//       <BsChatLeftText className="mr-1" />

//       <span className="mr-1">
//         {props.subCommentsNum}개 {props.wantShowSubComment ? "접기" : "보기"}
//       </span>

//       {props.wantShowSubComment ? (
//         <BiUpArrow size={15} />
//       ) : (
//         <BiDownArrow size={15} />
//       )}
//     </button>
//   );
// }

// export default SubCommentButton;

import React, { useContext } from "react";
import { BsChatLeftText } from "react-icons/bs";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import { CommentContext } from "../../context/comment-context";

interface SubCommentButtonProps {
  setWantShowSubComment: React.Dispatch<React.SetStateAction<boolean>>;
  wantShowSubComment: boolean;
}

function SubCommentButton(props: SubCommentButtonProps) {
  const comment = useContext(CommentContext);

  const clickHandler = () => {
    props.setWantShowSubComment((prev) => !prev);
  };

  return (
    <button className="flex items-center" onClick={clickHandler}>
      <BsChatLeftText className="mr-1" />

      <span className="mr-1">
        {comment.subComments.length}개{" "}
        {props.wantShowSubComment ? "접기" : "보기"}
      </span>

      {props.wantShowSubComment ? (
        <BiUpArrow size={15} />
      ) : (
        <BiDownArrow size={15} />
      )}
    </button>
  );
}

export default SubCommentButton;
