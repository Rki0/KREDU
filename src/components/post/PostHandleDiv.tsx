import React from "react";

import PostHandleButton from "./PostHandleButton";

function PostHandleDiv() {
  return (
    <div className="flex items-center justify-center">
      <PostHandleButton text="수정" />

      <PostHandleButton text="삭제" />
    </div>
  );
}

export default PostHandleDiv;
