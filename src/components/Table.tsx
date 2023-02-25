import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import Pagination from "./Pagination";
import { PostSort } from "../utils/postSort";

interface TableProps {
  dataList: any;
}

function Table(props: TableProps) {
  const [tableData, setTableData] = useState(props.dataList);

  useEffect(() => {
    setTableData(props.dataList);
  }, [props]);

  // 디폴트는 날짜 순서(게시물 등록 순서)
  // true인 경우 타겟의 ascending인 상태 의미, false인 경우 타겟의 descending인 상태 의미
  const [isTitleSort, setIsTitleSort] = useState(false);
  const [isDateSort, setIsDateSort] = useState(false);
  const [isLikeSort, setIsLikeSort] = useState(false);
  const [isCommentSort, setIsCommentSort] = useState(false);

  const navigate = useNavigate();

  // 제목 정렬
  const titleSortHandler = () => {
    if (isTitleSort) {
      const sortedData = PostSort.titleDescending(tableData);

      setTableData(sortedData);

      setIsTitleSort(false);
    } else {
      const sortedData = PostSort.titleAscending(tableData);

      setTableData(sortedData);

      setIsTitleSort(true);
    }
  };

  // 날짜 정렬
  const dateSortHandler = () => {
    if (isDateSort) {
      const sortedData = PostSort.dateDescending(tableData);

      setTableData(sortedData);

      setIsDateSort(false);
    } else {
      const sortedData = PostSort.dateAscending(tableData);

      setTableData(sortedData);

      setIsDateSort(true);
    }
  };

  // 좋아요 정렬
  const likeSortHandler = () => {
    if (isLikeSort) {
      const sortedData = PostSort.likeDescending(tableData);

      setTableData(sortedData);

      setIsLikeSort(false);
    } else {
      const sortedData = PostSort.likeAscending(tableData);

      setTableData(sortedData);

      setIsLikeSort(true);
    }
  };

  // 댓글 정렬
  const commentSortHandler = () => {
    if (isCommentSort) {
      const sortedData = PostSort.commentDescending(tableData);

      setTableData(sortedData);

      setIsCommentSort(false);
    } else {
      const sortedData = PostSort.commentAscending(tableData);

      setTableData(sortedData);

      setIsCommentSort(true);
    }
  };

  const tableClickHandler = (postId: string) => {
    navigate(`${postId}`);
  };

  // 페이지네이션
  // const [limit, setLimit] = useState(10); // 페이지 당 게시물 수
  // limit는 바꿀 생각이 없기 때문에 useMemo 처리해놓자.
  const limit = useMemo(() => {
    return 10;
  }, []);

  const [page, setPage] = useState(1); // 현재 페이지 번호

  // const offset = (page - 1) * limit; // 첫 게시물의 위치(인덱스)
  // limit를 바꿀 생각이 없으므로, page가 변할 때만 다시 계산되도록 하자.
  const offset = useMemo(() => {
    return (page - 1) * limit;
  }, [page]);

  return (
    <div>
      {tableData ? (
        <div className="flex flex-col items-center">
          <table className="table-fixed w-full border-separate rounded-[20px] overflow-hidden">
            <thead>
              <tr className="bg-[rgba(0,0,0,0.1)] h-[45px] 2sm:h-[50px]">
                <th
                  scope="col"
                  className="relative w-[200px] hover:bg-[rgba(0,0,0,0.2)] 2sm:w-[225px] sm:w-[300px] md:w-[400px] lg:w-[500px]"
                  onClick={titleSortHandler}
                >
                  제목
                  <div className="absolute top-1/3 right-2">
                    {isTitleSort ? <AiFillCaretDown /> : <AiFillCaretUp />}
                  </div>
                </th>

                <th
                  scope="col"
                  className="relative hover:bg-[rgba(0,0,0,0.2)]"
                  onClick={dateSortHandler}
                >
                  날짜
                  <div className="absolute top-1/3 right-2">
                    {isDateSort ? <AiFillCaretDown /> : <AiFillCaretUp />}
                  </div>
                </th>

                <th
                  scope="col"
                  className="hidden relative hover:bg-[rgba(0,0,0,0.2)] 2sm:table-cell"
                  onClick={likeSortHandler}
                >
                  좋아요
                  <div className="absolute top-1/3 right-2">
                    {isLikeSort ? <AiFillCaretDown /> : <AiFillCaretUp />}
                  </div>
                </th>

                <th
                  scope="col"
                  className="hidden relative hover:bg-[rgba(0,0,0,0.2)] sm:table-cell"
                  onClick={commentSortHandler}
                >
                  댓글
                  <div className="absolute top-1/3 right-2">
                    {isCommentSort ? <AiFillCaretDown /> : <AiFillCaretUp />}
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {tableData.slice(offset, offset + limit).map(
                (
                  item: {
                    _id: string;
                    title: string;
                    date: string;
                    like: number;
                    see: number;
                    comments: any;
                  },
                  index: number
                ) => (
                  <tr
                    key={index}
                    className="h-[45px] 2sm:h-[50px] odd:bg-[rgba(255,205,210,0.5)] odd:hover:bg-[rgba(255,205,210,0.8)] even:bg-[rgba(187,222,251,0.5)] even:hover:bg-[rgba(187,222,251,0.8)] hover:cursor-pointer"
                    onClick={() => tableClickHandler(item._id)}
                  >
                    <td className="pl-2 truncate">{item.title}</td>
                    <td className="text-center">{item.date.split(" ")[0]}</td>
                    <td className="hidden text-center 2sm:table-cell">
                      {item.like}
                    </td>
                    <td className="hidden text-center sm:table-cell">
                      {item.comments.length}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          <Pagination
            total={tableData.length}
            limit={limit}
            page={page}
            setPage={setPage}
          />
        </div>
      ) : null}
    </div>
  );
}

export default Table;
