import React from "react";

function File({ item, index, onDelete }: any) {
  return (
    <div className="flex justify-between mb-1 rounded hover:bg-[#ffebee] px-2">
      <p className="truncate w-[250px] sm:w-[400px] md:w-[500px] lg:w-[600px]">
        {index + 1}. {item.name}
      </p>
      <button onClick={() => onDelete(index)}>삭제</button>
    </div>
  );
}

export default File;
