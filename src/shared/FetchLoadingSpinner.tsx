import React from "react";

function FetchLoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-white">
      <div className="relative flex items-center justify-center">
        <div className="border-2 border-[#FFCDD2] rounded-full w-[50px] h-[50px] animate-spinner1 absolute"></div>
        <div className="border-2 border-[#C8E5FB] rounded-full w-[50px] h-[50px] animate-spinner2 absolute"></div>
      </div>
    </div>
  );
}

export default FetchLoadingSpinner;
