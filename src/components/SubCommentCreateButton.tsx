import React from "react";

interface SubCommentCreateButtonProps {
  subCommentCreateHandler: () => void;
}

function SubCommentCreateButton(props: SubCommentCreateButtonProps) {
  return <button onClick={props.subCommentCreateHandler}>답글</button>;
}

export default SubCommentCreateButton;
