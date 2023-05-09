import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Layout from "../../layout/Layout";
import Table from "../../components/Table";
import { useHttpClient } from "../../hoc/http-hook";
import { AuthContext } from "../../context/auth-context";
import SearchBar from "../../components/SearchBar";
import FetchLoadingSpinner from "../../shared/FetchLoadingSpinner";
import EmptyPostAlarm from "../../components/post/EmptyPostAlarm";

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

  const [lectureList, setLectureList] = useState<lectureListType[]>();

  const location = useLocation();

  useEffect(() => {
    const keyWord = decodeURI(location.search);

    if (!!keyWord) {
      const fetchLectures = async () => {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BASE_URL}/lecture/search/input${keyWord}`
          );

          setLectureList(responseData.searchedLectures.reverse());
        } catch (err) {}
      };

      fetchLectures();
    } else {
      const fetchLectures = async () => {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BASE_URL}/lecture`
          );

          setLectureList(responseData.lectures.reverse());
        } catch (err) {}
      };

      fetchLectures();
    }
  }, [location]);

  const { t } = useTranslation();

  return (
    <Layout>
      {isLoading && <FetchLoadingSpinner />}

      <div className="flex flex-col items-center px-2 mt-4 md:px-4 lg:px-10">
        <div className="w-full border-b-2 mb-2 pb-1 border-[#ffa4a2] flex justify-between items-center">
          <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
            {t("header.lecture")}
          </h1>

          {auth.manager ? (
            <Link
              to="/lecture/write"
              className="px-2 rounded border-2 border-[#ffcdd2] hover:bg-[#ffcdd2] hover:text-white hover:font-semibold hover:cursor-pointer"
            >
              강의 올리기
            </Link>
          ) : null}
        </div>

        <SearchBar
          placeholder={t("lecture.searchPlaceholder")}
          purpose="lecture"
        />

        {isLoading && <div>강의 불러오는 중</div>}

        {lectureList?.length === 0 && <EmptyPostAlarm />}

        {lectureList?.length !== 0 && <Table dataList={lectureList} />}
      </div>
    </Layout>
  );
}

export default LecturePage;
