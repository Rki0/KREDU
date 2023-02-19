import React from "react";

function File({ item, index, onDelete, purpose }: any) {
  if (item.name) {
    return (
      <div className="flex justify-between mt-1  rounded hover:bg-[#ffebee] px-2">
        <p className="truncate w-[250px] sm:w-[400px] md:w-[500px] lg:w-[600px]">
          {index + 1}. {item.name}
        </p>
        <button onClick={() => onDelete(index)}>삭제</button>
      </div>
    );
  }

  // const fileName = item.split("uploads/attachments/")[1];
  const fileName = item.split(
    `uploads/${purpose === "lecture" ? "attachments" : "questions"}/`
  )[1];

  return (
    <div className="flex justify-between mt-1 rounded hover:bg-[#ffebee] px-2">
      <p className="truncate w-[250px] sm:w-[400px] md:w-[500px] lg:w-[600px]">
        {index + 1}. {fileName}
      </p>
      <button onClick={() => onDelete(index)}>삭제</button>
    </div>
  );
}

export default File;
