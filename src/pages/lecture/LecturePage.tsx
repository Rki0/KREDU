import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../layout/Layout";
import { BsSearch } from "react-icons/bs";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/Pagination";

function LecturePage() {
  const [lecture, setLecture] = useState("");

  const [titleSort, setTitleSort] = useState(false);
  const [dateSort, setDateSort] = useState(false);
  const [likeSort, setLikeSort] = useState(false);
  const [commentSort, setCommentSort] = useState(false);

  const navigate = useNavigate();

  // 강의 검색창
  const lectureHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLecture(e.target.value);
  };

  // 강의 검색창 submit
  const lectureSeacrhHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // 제목 정렬
  const titleSortHandler = () => {
    setTitleSort((prev) => !prev);
  };

  // 날짜 정렬
  const dateSortHandler = () => {
    setDateSort((prev) => !prev);
  };

  // 좋아요 정렬
  const likeSortHandler = () => {
    setLikeSort((prev) => !prev);
  };

  // 댓글 정렬
  const commentSortHandler = () => {
    setCommentSort((prev) => !prev);
  };

  // 게시물
  const [lectureList, setLectureList] = useState<any>([]);

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

  // 더미 게시물 데이터
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setLectureList(res.data))
      .catch((e) => console.log(e));
  }, []);

  // 강좌 클릭 시
  const lectureClickHandler = (item: {
    userId: number;
    id: number;
    title: string;
    body: string;
  }) => {
    console.log(`you clicked num.${item.id} lecture`);

    navigate(`/lecture/${item.id}`, { state: item });
  };

  return (
    <Layout>
      <div className="flex flex-col items-center px-2 md:px-4 lg:px-10">
        {/* 제목과 일치하는 글자를 찾아서 모두 나열하는 방식. 파싱 같은게 필요할듯? */}
        <form className="my-4 relative" onSubmit={lectureSeacrhHandler}>
          <input
            placeholder="강의 제목을 검색해보세요"
            value={lecture}
            onChange={lectureHandler}
            className="pl-2 mb-2 font-semibold w-[250px] h-[40px] border-2 border-[#ffcdd2] rounded focus:border-[#e57373] focus:outline-none sm:w-[400px] md:w-[500px] lg:w-[500px] lg:h-[50px]"
          />

          <button
            type="submit"
            className="absolute top-3 right-3 md:text-lg lg:top-4"
          >
            <BsSearch />
          </button>
        </form>

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
                  {titleSort ? <AiFillCaretUp /> : <AiFillCaretDown />}
                </div>
              </th>

              <th
                scope="col"
                className="relative hover:bg-[rgba(0,0,0,0.2)]"
                onClick={dateSortHandler}
              >
                날짜
                <div className="absolute top-1/3 right-2">
                  {dateSort ? <AiFillCaretUp /> : <AiFillCaretDown />}
                </div>
              </th>

              <th
                scope="col"
                className="hidden relative hover:bg-[rgba(0,0,0,0.2)] 2sm:table-cell"
                onClick={likeSortHandler}
              >
                좋아요
                <div className="absolute top-1/3 right-2">
                  {likeSort ? <AiFillCaretUp /> : <AiFillCaretDown />}
                </div>
              </th>

              <th
                scope="col"
                className="hidden relative hover:bg-[rgba(0,0,0,0.2)] sm:table-cell"
                onClick={commentSortHandler}
              >
                댓글
                <div className="absolute top-1/3 right-2">
                  {commentSort ? <AiFillCaretUp /> : <AiFillCaretDown />}
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {lectureList
              .slice(offset, offset + limit)
              .map(
                (item: {
                  userId: number;
                  id: number;
                  title: string;
                  body: string;
                }) => (
                  <tr
                    key={item.id}
                    className="h-[45px] 2sm:h-[50px] odd:bg-[rgba(255,205,210,0.5)] odd:hover:bg-[rgba(255,205,210,0.8)] even:bg-[rgba(187,222,251,0.5)] even:hover:bg-[rgba(187,222,251,0.8)]"
                    onClick={() => lectureClickHandler(item)}
                  >
                    <td className="truncate pl-2">{item.title}</td>
                    <td className="text-center">{item.userId}</td>
                    <td className="text-center hidden 2sm:table-cell">
                      {item.id}
                    </td>
                    <td className="text-center hidden sm:table-cell">
                      {item.id}
                    </td>
                  </tr>
                )
              )}
          </tbody>

          {/* <tbody>
            {lectureList.map((item) => (
              <tr
                key={item.number}
                className="h-[45px] 2sm:h-[50px] odd:bg-[rgba(255,205,210,0.5)] odd:hover:bg-[rgba(255,205,210,0.8)] even:bg-[rgba(187,222,251,0.5)] even:hover:bg-[rgba(187,222,251,0.8)]"
                onClick={() => lectureClickHandler(item.number)}
              >
                <td className="truncate pl-2">{item.title}</td>
                <td className="text-center">{item.date}</td>
                <td className="text-center hidden 2sm:table-cell">
                  {item.like}
                </td>
                <td className="text-center hidden sm:table-cell">
                  {item.comment}
                </td>
              </tr>
            ))}
          </tbody> */}
        </table>

        <Pagination
          total={lectureList.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </div>
    </Layout>
  );
}

export default LecturePage;
