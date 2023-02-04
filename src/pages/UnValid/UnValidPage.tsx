import React from "react";
import { useNavigate } from "react-router-dom";

function UnValidPage() {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen font-bold bg-red-300">
      <h1 className="mb-4 text-xl md:text-2xl">올바르지 않은 주소입니다.</h1>
      <button
        onClick={onClickHandler}
        className="p-2 text-white border-2 border-white rounded hover:bg-white hover:text-red-300 lg:text-2xl"
      >
        되돌아가기
      </button>
    </div>
  );
}

export default UnValidPage;
