// import React from "react";
// import Comment from "./Comment";

// interface CreatedCommentsProps {
//   createdComments: any;
//   writer: string;
//   deleteHandler: (id: string) => void;
//   setFixedComment: React.Dispatch<any>;
// }

// function CreatedComments(props: CreatedCommentsProps) {
//   return (
//     <>
//       {props.createdComments.map((createdComment: any, index: number) => (
//         <Comment
//           comment={createdComment}
//           writer={props.writer}
//           deleteHandler={props.deleteHandler}
//           setFixedComment={props.setFixedComment}
//           key={index}
//         />
//       ))}
//     </>
//   );
// }

// export default CreatedComments;

import React from "react";
import Comment from "./Comment";

interface CreatedCommentsProps {
  createdComments: any;
  deleteHandler: (id: string) => void;
}

function CreatedComments(props: CreatedCommentsProps) {
  return (
    <>
      {props.createdComments.map((createdComment: any, index: number) => (
        <Comment
          comment={createdComment}
          deleteHandler={props.deleteHandler}
          key={index}
        />
      ))}
    </>
  );
}

export default CreatedComments;
