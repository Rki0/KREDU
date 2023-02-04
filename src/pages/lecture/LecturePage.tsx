import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Layout from "../../layout/Layout";
import Table from "../../components/Table";
import { useHttpClient } from "../../hoc/http-hook";
import { AuthContext } from "../../context/auth-context";
import SearchBar from "../../components/SearchBar";

interface lectureListType {
  _id: string | undefined;
  title: string | undefined;
  date: string | undefined;
  like: number | undefined;
  see: number | undefined;
  comments: Array<any> | undefined;
}

function LecturePage() {
  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();

  const [lectureList, setLectureList] = useState<lectureListType[]>([]);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/lecture`
        );

        setLectureList(responseData.lectures.reverse());
      } catch (err) {}
    };

    fetchLectures();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col items-center px-2 mt-4 md:px-4 lg:px-10">
        <div className="w-full border-b-2 mb-2 pb-1 border-[#ffa4a2] flex justify-between items-center">
          <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">강의</h1>

          {auth.manager ? (
            <Link
              to="/lecture/write"
              className="px-2 rounded border-2 border-[#ffcdd2] hover:bg-[#ffcdd2] hover:text-white hover:font-semibold hover:cursor-pointer"
            >
              강의 올리기
            </Link>
          ) : null}
        </div>

        <SearchBar />

        {isLoading && <div>강의 불러오는 중</div>}

        {lectureList && <Table lectureList={lectureList} />}
      </div>
    </Layout>
  );
}

export default LecturePage;
