import React from "react";
import Comment from "./Comment";

interface CreatedCommentsProps {
  createdComments: any;
  writer: string;
  deleteHandler: (id: string) => void;
  setFixedComment: React.Dispatch<any>;
}

function CreatedComments(props: CreatedCommentsProps) {
  return (
    <>
      {props.createdComments.map((createdComment: any, index: number) => (
        <Comment
          comment={createdComment}
          writer={props.writer}
          deleteHandler={props.deleteHandler}
          setFixedComment={props.setFixedComment}
          key={index}
        />
      ))}
    </>
  );
}

export default CreatedComments;
