import React, { useMemo } from "react";

interface PropsType {
  total: number;
  limit: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

function Pagination({ total, limit, page, setPage }: PropsType) {
  // 필요한 페이지 개수
  // 게시물 총 개수(total)이 100개라면 10개씩 보여주기로(limit) 했으니 100/10 = 10 페이지 생성
  // 만약 103개라면 103/10 = 10.3 이므로 ceil을 통해 11 페이지로 만들어준다.
  // limit는 바꿀 생각이 없기 때문에 놔두고, total은 관리자가 게시물을 올릴 때마다 달라지니까 주의.
  // page가 변할 때마다 여기도 재랜더링이 될테니 useMemo를 사용하고, total이 변할 때만 다시 계산되도록 하자.
  // const numPages = Math.ceil(total / limit);

  const numPages = useMemo(() => {
    return Math.ceil(total / limit);
  }, [total]);

  // numpages가 변할 때만 다시 만들어주면 된다.
  // const showedLecture = Array(numPages).fill(0);
  const showedLecture = useMemo(() => {
    return new Array(numPages).fill(0);
  }, [numPages]);

  return (
    <nav className="my-4">
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className="cursor-pointer border-2 bg-[rgba(0,0,0,0.1)] border-r-white w-6 rounded-tl-md rounded-bl-md hover:bg-[rgba(0,0,0,0.15)]"
      >
        &lt;
      </button>
      {showedLecture.map((item, index) => (
        <button
          key={index + 1}
          // setPage를 통해 offset을 조정
          onClick={() => setPage(index + 1)}
          className={
            index + 1 === page
              ? "border-2 bg-[rgba(0,0,0,0.3)] w-6 border-r-white"
              : "border-2 bg-[rgba(0,0,0,0.1)] w-6 border-r-white hover:bg-[rgba(0,0,0,0.15)]"
          }
        >
          {index + 1}
        </button>
      ))}
      <button
        onClick={() => setPage(page + 1)}
        disabled={page === numPages}
        className="border-2 bg-[rgba(0,0,0,0.1)] w-6 rounded-tr-md rounded-br-md hover:bg-[rgba(0,0,0,0.15)]"
      >
        &gt;
      </button>
    </nav>
  );
}

export default Pagination;
