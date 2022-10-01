import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import Table from "../../components/Table";

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
  const [lectureList, setLectureList] = useState<any>([]);

  // 더미 게시물 데이터
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setLectureList(res.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center px-2 mt-4  md:px-4 lg:px-10">
        <h1 className="font-bold text-xl border-b-2 mb-2 w-full border-[#ffa4a2] sm:text-2xl md:text-3xl lg:hidden">
          강의
        </h1>

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

        <Table dataList={lectureList} />
      </div>
    </Layout>
  );
}

export default LecturePage;
