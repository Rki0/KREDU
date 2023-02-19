import React from "react";

import PostHandleButton from "./PostHandleButton";

interface PostHandleDivProps {
  postId: string;
  purpose: string;
}

function PostHandleDiv(props: PostHandleDivProps) {
  return (
    <div className="flex items-center justify-center">
      <PostHandleButton
        text="수정"
        postId={props.postId}
        purpose={props.purpose}
      />
      <PostHandleButton
        text="삭제"
        postId={props.postId}
        purpose={props.purpose}
      />
    </div>
  );
}

export default PostHandleDiv;
