import React from "react";

import PostHandleButton from "./PostHandleButton";

interface PostHandleDivProps {
  lectureId: string;
}

function PostHandleDiv(props: PostHandleDivProps) {
  return (
    <div className="flex items-center justify-center">
      <PostHandleButton text="수정" lectureId={props.lectureId} />
      <PostHandleButton text="삭제" lectureId={props.lectureId} />
    </div>
  );
}

export default PostHandleDiv;
