import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { BsSearch } from "react-icons/bs";
import Table from "../../components/Table";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/reducerhooks";
import { loadAllLecture } from "../../_reducers/lectureSlice";

interface lectureListType {
  _id: string | undefined;
  title: string | undefined;
  date: string | undefined;
  description: string | undefined;
  link: string | undefined;
  like: number | undefined;
  see: number | undefined;
  writer: string | undefined;
  comments: Array<any> | undefined;
}

function LecturePage() {
  const [lecture, setLecture] = useState("");

  // 강의 검색창
  const lectureHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLecture(e.target.value);
  };

  // 강의 검색창 submit
  const lectureSeacrhHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  // 게시물
  const [lectureList, setLectureList] = useState<lectureListType[]>([]);
  // 게시물 뒤집기
  const [reversedLectureList, setReversedLectureList] = useState<
    lectureListType[]
  >([]);

  const userData = useAppSelector((state) => state.user.userData);
  const lectureData = useAppSelector((state) => state.lecture.lectureData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAllLecture(null))
      .then((res) => {
        if (res.payload?.lectureList) {
          setLectureList(res.payload.lectureList);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let arr = [...lectureList];

    arr.reverse();

    setReversedLectureList(arr);
  }, [lectureList]);

  return (
    <Layout>
      <div className="flex flex-col items-center px-2 mt-4  md:px-4 lg:px-10">
        <div className="w-full border-b-2 mb-2 pb-1 border-[#ffa4a2] flex justify-between items-center">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">강의</h1>

          {userData.isAdmin ? (
            <Link
              to="/lecture/write"
              className="px-2 rounded border-2 border-[#ffcdd2] hover:bg-[#ffcdd2] hover:text-white hover:font-semibold hover:cursor-pointer"
            >
              강의 올리기
            </Link>
          ) : null}
        </div>

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

        {lectureData?.loadLectureSuccess ? (
          <Table dataList={reversedLectureList} />
        ) : (
          <div>데이터 불러오는 중...</div>
        )}
      </div>
    </Layout>
  );
}

export default LecturePage;
