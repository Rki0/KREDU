import React from "react";
import ReactDOM from "react-dom";

import BackDrop from "./BackDrop";

interface ModalPropsType {
  text: string;
  footer: any;
  closeHandler: () => void;
}

function ModalOverlay(props: ModalPropsType) {
  const content = (
    <div className="w-[250px] h-auto flex flex-col items-center border-[#ffcdd2] border-2 rounded-xl z-[100] fixed bg-pink-100 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] py-2">
      <h1 className="mb-2 text-3xl font-bold">알림</h1>

      <p className="mb-2 font-semibold text-center">{props.text}</p>

      <footer>{props.footer}</footer>
    </div>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("modal") as HTMLElement
  );
}

function Modal(props: ModalPropsType) {
  return (
    <>
      <BackDrop handler={props.closeHandler} />

      <ModalOverlay {...props} />
    </>
  );
}

export default Modal;
