import React from "react";
import { useNavigate } from "react-router-dom";

import { AiOutlineLeft } from "react-icons/ai";

function GoToLecturePage() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/lecture");
  };

  return (
    <div
      className="flex mb-2 rounded border-2 border-[#ffcdd2] w-full hover:bg-[#ffcdd2] hover:text-white hover:font-semibold hover:cursor-pointer"
      onClick={goBack}
    >
      <button>
        <AiOutlineLeft />
      </button>

      <p>강의 목록으로 돌아가기</p>
    </div>
  );
}

export default GoToLecturePage;
