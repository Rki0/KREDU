import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import Pagination from "./Pagination";
import {
  titleSortFunc,
  dateSortFunc,
  likeSortFunc,
  commentSortFunc,
} from "../function/Sort";

function Table(props: any) {
  const [titleSort, setTitleSort] = useState(false);
  const [dateSort, setDateSort] = useState(false);
  const [likeSort, setLikeSort] = useState(false);
  const [commentSort, setCommentSort] = useState(false);

  const navigate = useNavigate();

  // // 제목 정렬
  // const titleSortHandler = () => {
  //   setTitleSort((prev) => !prev);

  //   titleSortFunc(dataList, titleSort);
  // };

  // // 날짜 정렬
  // const dateSortHandler = () => {
  //   setDateSort((prev) => !prev);

  //   dateSortFunc(dataList, dateSort);
  // };

  // // 좋아요 정렬
  // const likeSortHandler = () => {
  //   setLikeSort((prev) => !prev);

  //   likeSortFunc(dataList, likeSort);
  // };

  // // 댓글 정렬
  // const commentSortHandler = () => {
  //   setCommentSort((prev) => !prev);

  //   commentSortFunc(dataList, commentSort);
  // };

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
      {props.dataList ? (
        <div className="flex flex-col items-center">
          <table className="table-fixed w-full border-separate rounded-[20px] overflow-hidden">
            <thead>
              <tr className="bg-[rgba(0,0,0,0.1)] h-[45px] 2sm:h-[50px]">
                <th
                  scope="col"
                  className="relative w-[200px] hover:bg-[rgba(0,0,0,0.2)] 2sm:w-[225px] sm:w-[300px] md:w-[400px] lg:w-[500px]"
                  // onClick={titleSortHandler}
                  // onClick={() => titleSortHandler(dataList)}
                >
                  제목
                  <div className="absolute top-1/3 right-2">
                    {titleSort ? <AiFillCaretDown /> : <AiFillCaretUp />}
                  </div>
                </th>

                <th
                  scope="col"
                  className="relative hover:bg-[rgba(0,0,0,0.2)]"
                  // onClick={dateSortHandler}
                >
                  날짜
                  <div className="absolute top-1/3 right-2">
                    {dateSort ? <AiFillCaretDown /> : <AiFillCaretUp />}
                  </div>
                </th>

                <th
                  scope="col"
                  className="hidden relative hover:bg-[rgba(0,0,0,0.2)] 2sm:table-cell"
                  // onClick={likeSortHandler}
                >
                  좋아요
                  <div className="absolute top-1/3 right-2">
                    {likeSort ? <AiFillCaretDown /> : <AiFillCaretUp />}
                  </div>
                </th>

                <th
                  scope="col"
                  className="hidden relative hover:bg-[rgba(0,0,0,0.2)] sm:table-cell"
                  // onClick={commentSortHandler}
                >
                  댓글
                  <div className="absolute top-1/3 right-2">
                    {commentSort ? <AiFillCaretDown /> : <AiFillCaretUp />}
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              {props.dataList?.slice(offset, offset + limit).map(
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
            total={props.dataList.length}
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
