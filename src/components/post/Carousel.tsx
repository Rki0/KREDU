import React, { useContext, useState, useEffect, useRef } from "react";

import FileImg from "./FileImg";
import { PostContext } from "../../context/post-context";
import { FilesType } from "./PostContent";
import Pagination from "./Pagination";
import SlideButton from "./SlideButton";

export const imgSize = {
  basic: 300,
  sm2: 400,
  sm: 600,
  xl: 800,
};

function Carousel() {
  const { postData } = useContext(PostContext);
  const [slideIndex, setSlideIndex] = useState(1);

  const slideRef = useRef<HTMLDivElement>(null);

  const copiedArr = [
    postData.file[postData.file.length - 1],
    ...postData.file,
    postData.file[0],
  ];

  useEffect(() => {
    // 0번 인데스가 되었을 경우, 더미에서 원본으로 인덱스 교체
    // postData.file.length가 원본 데이터 중 가장 뒤에 있는 이미지 인덱스
    if (slideIndex === 0) {
      setTimeout(() => {
        if (slideRef.current) {
          slideRef.current.style.transition = "";
        }

        setSlideIndex(postData.file.length);

        // slideIndex가 변경되고 50ms 후에 transition을 활성화
        // 0ms로 설정할 시, 비동기 작동은 구현되지만, 너무 짧아서 transition이 다시 적용되는 문제가 있었기 때문.
        setTimeout(() => {
          if (slideRef.current) {
            slideRef.current.style.transition = "all 500ms ease-in-out";
          }
        }, 50);
      }, 500);
    }

    // n번 인데스가 되었을 경우, 더미에서 원본으로 인덱스 교체
    if (slideIndex === postData.file.length + 1) {
      setTimeout(() => {
        if (slideRef.current) {
          slideRef.current.style.transition = "";
        }

        setSlideIndex(1);

        setTimeout(() => {
          if (slideRef.current) {
            slideRef.current.style.transition = "all 500ms ease-in-out";
          }
        }, 50);
      }, 500);
    }
  }, [slideIndex, postData.file]);

  const dynamicCarouselSize = {
    basic: `w-[${imgSize.basic}px] h-[${imgSize.basic}px]`,
    sm2: `2sm:w-[${imgSize.sm2}px] 2sm:h-[${imgSize.sm2}px]`,
    sm: `sm:w-[${imgSize.sm}px] sm:h-[${imgSize.sm}px]`,
    xl: `xl:w-[${imgSize.xl}px] xl:h-[${imgSize.xl}px]`,
    // basic: `w-[300px] h-[300px]`,
    // sm2: `2sm:w-[400px] 2sm:h-[400px]`,
    // sm: `sm:w-[600px] sm:h-[600px]`,
    // xl: `xl:w-[800px] xl:h-[800px]`,
  };

  const dynamicSize = {
    basic: imgSize.basic * copiedArr.length,
    sm2: imgSize.sm2 * copiedArr.length,
    sm: imgSize.sm * copiedArr.length,
    xl: imgSize.xl * copiedArr.length,
    // basic: 1500,
    // sm2: 2000,
    // sm: 3000,
    // xl: 4000,
  };

  const dynamicSlideSize = {
    basic: `w-[${dynamicSize.basic}px]`,
    sm2: `2sm:w-[${dynamicSize.sm2}px]`,
    sm: `sm:w-[${dynamicSize.sm}px]`,
    xl: `xl:w-[${dynamicSize.xl}px]`,
    // basic: `w-[1200px]`,
    // sm2: `2sm:w-[1600px]`,
    // sm: `sm:w-[2400px]`,
    // xl: `xl:w-[3200px]`,
    // basic: `w-[${imgSize.basic * copiedArr.length}px]`,
    // sm2: `2sm:w-[${imgSize.sm2 * copiedArr.length}px]`,
    // sm: `sm:w-[${imgSize.sm * copiedArr.length}px]`,
    // xl: `xl:w-[${imgSize.xl * copiedArr.length}px]`,
  };

  return (
    <div
      className={`mb-8 shadow-xl ${dynamicCarouselSize.basic} overflow-hidden relative ${dynamicCarouselSize.sm2} ${dynamicCarouselSize.sm} ${dynamicCarouselSize.xl}`}
    >
      {postData.file.length > 1 ? (
        <>
          <div
            className={`flex flex-nowrap ${dynamicSlideSize.basic} ${dynamicSlideSize.sm2} ${dynamicSlideSize.sm} ${dynamicSlideSize.xl}`}
            style={{
              transition: "all 500ms ease-in-out",
              transform: `translateX(${
                -1 * ((100 / copiedArr.length) * slideIndex)
              }%)`,
            }}
            ref={slideRef}
          >
            {copiedArr.map((file: FilesType, index: number) => (
              <FileImg file={file} key={index} />
            ))}
          </div>
          <SlideButton setSlideIndex={setSlideIndex} />
          <Pagination
            length={postData.file.length}
            setSlideIndex={setSlideIndex}
            slideIndex={slideIndex}
          />
        </>
      ) : (
        <FileImg file={postData.file[0]} />
      )}
    </div>
  );
}

export default Carousel;
