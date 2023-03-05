import React from "react";

import { FilesType } from "./PostContent";

interface ImgSlidePropsType {
  file: FilesType;
}

function FileImg(props: ImgSlidePropsType) {
  return (
    <div className="flex items-center justify-center w-full h-auto mb-8 shadow-xl">
      <img
        alt="첨부 파일 이미지"
        src={`${process.env.REACT_APP_ASSET_URL}/${props.file.path}`}
        className="rounded"
      />
    </div>
  );
}

export default FileImg;
