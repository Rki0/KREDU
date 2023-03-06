import React from "react";

function File({ item, index, onDelete, purpose }: any) {
  return (
    <div className="flex justify-between mt-1 rounded hover:bg-[#ffebee] px-2">
      <p className="truncate w-[250px] sm:w-[400px] md:w-[500px] lg:w-[600px]">
        {index + 1}. {item.ext ? `${item.name}.${item.ext}` : `${item.name}`}
      </p>

      <div onClick={() => onDelete(index)} className="hover:cursor-pointer">
        삭제
      </div>
    </div>
  );
}

export default File;
