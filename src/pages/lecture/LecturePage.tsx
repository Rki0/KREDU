import React, { useEffect, useState } from "react";
import Layout from "../../layout/Layout";
import { BsSearch } from "react-icons/bs";
import Table from "../../components/Table";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/reducerhooks";
import { loadAllLecture } from "../../_reducers/lectureSlice";
import { loadUserData } from "../../_reducers/userSlice";

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

  const authData = useAppSelector((state) => state.user.authData);
  const userData = useAppSelector((state) => state.user.userData);
  const successData = useAppSelector((state) => state.user.successData);
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

  // 새로고침 등으로 인해 userData가 초기화되버렸다면 다시 불러오기
  if (Object.keys(userData).length === 0) {
    let body = {
      email: authData.email,
    };

    dispatch(loadUserData(body))
      .then((res) => res.payload)
      .catch((err) => console.log(err));
  }

  // 특정 강의에서 좋아요, 댓글 등의 기능을 수행하더라도
  // 스토어에는 변화가 없기 때문에
  // 다시 들어갔을 때 적용이 안되어있는 문제 발생.
  // successData의 변화를 감지해서 데이터 갱신
  useEffect(() => {
    console.log("successData is Changed");

    let body = {
      email: authData.email,
    };

    dispatch(loadUserData(body))
      .then((res) => res.payload)
      .catch((err) => console.log(err));
  }, [successData]);

  return (
    <Layout>
      <div className="flex flex-col items-center px-2 mt-4  md:px-4 lg:px-10">
        <div className="w-full border-b-2 mb-2 pb-1 border-[#ffa4a2] flex justify-between items-center">
          <h1 className="font-bold text-xl sm:text-2xl md:text-3xl">강의</h1>

          {authData.isAdmin ? (
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
