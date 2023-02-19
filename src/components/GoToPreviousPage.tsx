import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";

interface GoToPreviousPageProps {
  text: string;
  to: string;
}

function GoToPreviousPage(props: GoToPreviousPageProps) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(`${props.to}`);
  };

  return (
    <div
      className="flex mb-2 rounded border-2 border-[#ffcdd2] w-full hover:bg-[#ffcdd2] hover:text-white hover:font-semibold hover:cursor-pointer"
      onClick={goBack}
    >
      <button>
        <AiOutlineLeft />
      </button>

      <p>{props.text}</p>
    </div>
  );
}

export default GoToPreviousPage;
