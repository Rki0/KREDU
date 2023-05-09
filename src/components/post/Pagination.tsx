import React from "react";

interface PaginationInterface {
  length: number;
  slideIndex: number;
  setSlideIndex: React.Dispatch<React.SetStateAction<number>>;
}

function Pagination(props: PaginationInterface) {
  const paginationArr = new Array(props.length).fill(1);

  const paginationHandler = (index: number) => {
    props.setSlideIndex(index + 1);
  };

  return (
    <div className="absolute z-10 flex justify-center w-full bottom-2">
      <ol className="flex">
        {paginationArr.map((_, index) => (
          <li
            className="w-[15px] h-[15px] rounded-full bg-[rgba(0,0,0,0.3)] mx-1 hover:bg-[rgba(0,0,0,0.6)] hover:cursor-pointer"
            style={{
              backgroundColor: `${
                props.slideIndex === index + 1 ? "rgba(0,0,0,0.6)" : ""
              }`,
            }}
            key={index}
            onClick={() => paginationHandler(index)}
          ></li>
        ))}
      </ol>
    </div>
  );
}

export default Pagination;
