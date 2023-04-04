import React from "react";
import ReactDOM from "react-dom";

interface BackDropPropsType {
  handler: () => void;
}

function BackDrop(props: BackDropPropsType) {
  return ReactDOM.createPortal(
    <div
      className="w-screen h-screen z-[50] fixed top-0 left-0 bg-[rgba(0,0,0,0.2)]"
      onClick={props.handler}
    ></div>,
    document.getElementById("backdrop") as HTMLElement
  );
}

export default BackDrop;
