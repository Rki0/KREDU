import React, { useState } from "react";

import { FilesType } from "./PostContent";
import ImgZoomModal from "./ImgZoomModal";
import { imgSize } from "./Carousel";

interface ImgSlidePropsType {
  file: FilesType;
}

function FileImg(props: ImgSlidePropsType) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dynamicImageSize = {
    basic: `w-[${imgSize.basic}px] h-[${imgSize.basic}px]`,
    sm2: `2sm:w-[${imgSize.sm2}px] 2sm:h-[${imgSize.sm2}px]`,
    sm: `sm:w-[${imgSize.sm}px] sm:h-[${imgSize.sm}px]`,
    xl: `xl:w-[${imgSize.xl}px] xl:h-[${imgSize.xl}px]`,
  };

  /**
   * 이미지를 클릭하면 확대해서 보여주는 함수
   */
  const imgZoomHandler = () => {
    // 1024px 이상일 때만 이 기능을 실행한다.
    if (window.innerWidth < 1024) {
      return;
    }

    setIsModalOpen(true);
  };

  /**
   * 확대한 이미지를 제거하는 함수
   */
  const closeHandler = () => {
    document.body.style.overflow = "visible";
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <ImgZoomModal
          alt="첨부 파일 이미지"
          src={`${process.env.REACT_APP_ASSET_URL}/${props.file.path}`}
          closeHandler={closeHandler}
        />
      )}

      <div className="flex items-center justify-center">
        <img
          alt="첨부 파일 이미지"
          src={`${process.env.REACT_APP_ASSET_URL}/${props.file.path}`}
          className={`object-contain lg:hover:cursor-zoom-in ${dynamicImageSize.basic} ${dynamicImageSize.sm2} ${dynamicImageSize.sm} ${dynamicImageSize.xl}`}
          onClick={imgZoomHandler}
        />
      </div>
    </>
  );
}

export default FileImg;
