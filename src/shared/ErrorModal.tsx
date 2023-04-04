import React from "react";
import ReactDOM from "react-dom";

function ErrorModal() {
  const content = (
    <div className="bg-[rgba(0,0,0,0.5)] flex justify-center items-center w-screen h-screen">
      <div className="bg-white">
        <span>모달입니다.</span>
        {/* <button>닫기</button> */}
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("modal") as HTMLElement
  );
}

function ModalOverlay() {
  const closeHandler = () => {};

  return (
    <div>
      <ErrorModal />
    </div>
  );
}

// export default ErrorModal;
