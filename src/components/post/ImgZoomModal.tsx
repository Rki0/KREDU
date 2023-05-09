import React from "react";
import ReactDOM from "react-dom";

import BackDrop from "../../shared/BackDrop";

interface ImgZoomModalInterface {
  src: string;
  alt: string;
  closeHandler: () => void;
}

interface ImgZoomModalOverlayInterface {
  src: string;
  alt: string;
}

function ImgZoomModalOverlay(props: ImgZoomModalOverlayInterface) {
  document.body.style.overflow = "hidden";

  const content = (
    <div className="z-[60] flex justify-center items-center fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
      <img
        alt={props.alt}
        src={props.src}
        className="object-contain w-[600px] h-[600px] xl:w-[1100px] xl:h-[800px]"
      />
    </div>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("modal") as HTMLElement
  );
}

function ImgZoomModal(props: ImgZoomModalInterface) {
  return (
    <>
      <BackDrop handler={props.closeHandler} />

      <ImgZoomModalOverlay alt={props.alt} src={props.src} />
    </>
  );
}

export default ImgZoomModal;
