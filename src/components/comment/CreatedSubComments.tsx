// import React from "react";

// import CreatedSubComment from "./CreatedSubComment";

// interface CreatedSubCommentsProps {
//   createdSubComments: any[];
//   writer: string;
//   deleteHandler: (id: string) => void;
//   setSubComments: React.Dispatch<any>;
//   setCreatedSubComments: React.Dispatch<any>;
//   mainCommentId: string;
// }

// function CreatedSubComments(props: CreatedSubCommentsProps) {
//   return (
//     <div className="pl-4">
//       {props.createdSubComments.map((createdSubComment: any) => (
//         <CreatedSubComment
//           comment={createdSubComment}
//           writer={props.writer}
//           deleteHandler={props.deleteHandler}
//           setSubComments={props.setSubComments}
//           setCreatedSubComments={props.setCreatedSubComments}
//           mainCommentId={props.mainCommentId}
//           key={createdSubComment._id}
//         />
//       ))}
//     </div>
//   );
// }

// export default CreatedSubComments;

import React from "react";

import CreatedSubComment from "./CreatedSubComment";

interface CreatedSubCommentsProps {
  createdSubComments: any[];
  deleteHandler: (id: string) => void;
  setSubComments: React.Dispatch<any>;
  setCreatedSubComments: React.Dispatch<any>;
}

function CreatedSubComments(props: CreatedSubCommentsProps) {
  return (
    <div className="pl-4">
      {props.createdSubComments.map((createdSubComment: any) => (
        <CreatedSubComment
          comment={createdSubComment}
          deleteHandler={props.deleteHandler}
          setSubComments={props.setSubComments}
          setCreatedSubComments={props.setCreatedSubComments}
          key={createdSubComment._id}
        />
      ))}
    </div>
  );
}

export default CreatedSubComments;
