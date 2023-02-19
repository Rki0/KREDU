import React from "react";

import { AiFillLike, AiOutlineLike } from "react-icons/ai";

interface LikeButtonProps {
  isLike: boolean;
}

function LikeThumb(props: LikeButtonProps) {
  if (!props.isLike) {
    return (
      <div className="w-[50px] h-[50px] flex justify-center items-center">
        <AiOutlineLike size={30} className="" />
      </div>
    );
  }

  return (
    <div className="text-[#ffcdd2] w-[50px] h-[50px] flex justify-center items-center">
      <AiFillLike size={30} className="" />
    </div>
  );
}

export default LikeThumb;
