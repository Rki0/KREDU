import React from "react";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";

interface SlideButtonInterface {
  setSlideIndex: React.Dispatch<React.SetStateAction<number>>;
}

function SlideButton(props: SlideButtonInterface) {
  /**
   * 슬라이드를 왼쪽 방향으로 이동시키는 함수
   */
  const leftHandler = () => {
    props.setSlideIndex((slideIndex) => slideIndex - 1);
  };

  /**
   * 슬라이드를 오른쪽 방향으로 이동시키는 함수
   */
  const rightHandler = () => {
    props.setSlideIndex((slideIndex) => slideIndex + 1);
  };

  return (
    <div className="absolute left-0 flex justify-between w-full px-2 top-1/2">
      <button
        onClick={leftHandler}
        className="rounded-full bg-[rgba(255,255,255,0.5)]"
      >
        <AiOutlineLeftCircle />
      </button>
      <button
        onClick={rightHandler}
        className="rounded-full bg-[rgba(255,255,255,0.5)]"
      >
        <AiOutlineRightCircle />
      </button>
    </div>
  );
}

export default SlideButton;
