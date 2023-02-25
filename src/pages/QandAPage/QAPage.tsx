import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import Layout from "../../layout/Layout";
import Table from "../../components/Table";
import { useHttpClient } from "../../hoc/http-hook";
import { AuthContext } from "../../context/auth-context";
import SearchBar from "../../components/SearchBar";
import EmptyPostAlarm from "../../components/post/EmptyPostAlarm";

interface QAListType {
  _id: string | undefined;
  title: string | undefined;
  date: string | undefined;
  like: number | undefined;
  see: number | undefined;
  comments: Array<any> | undefined;
}

function QAPage() {
  const [qaList, setQaList] = useState<QAListType[]>();

  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  // useEffect(() => {
  //   const fetchQA = async () => {
  //     try {
  //       const responseData = await sendRequest(
  //         `${process.env.REACT_APP_BASE_URL}/qa`
  //       );

  //       if (responseData.qas) {
  //         setQaList(responseData.qas.reverse());
  //       }
  //     } catch (err) {}
  //   };

  //   fetchQA();
  // }, []);

  const location = useLocation();

  useEffect(() => {
    const keyWord = decodeURI(location.search).split("search=")[1];

    if (!!keyWord) {
      const fetchQA = async () => {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BASE_URL}/qa/search/${keyWord}`
          );

          if (responseData.searchedQAs) {
            setQaList(responseData.searchedQAs.reverse());
          }
        } catch (err) {}
      };

      fetchQA();
    } else {
      const fetchQA = async () => {
        try {
          const responseData = await sendRequest(
            `${process.env.REACT_APP_BASE_URL}/qa`
          );

          if (responseData.qas) {
            setQaList(responseData.qas.reverse());
          }
        } catch (err) {}
      };

      fetchQA();
    }
  }, [location]);

  return (
    <Layout>
      <div className="flex flex-col items-center px-2 mt-4 md:px-4 lg:px-10">
        <div className="w-full border-b-2 mb-2 pb-1 border-[#ffa4a2] flex justify-between items-center">
          <h1 className="text-xl font-bold sm:text-2xl md:text-3xl">
            질문 게시판
          </h1>

          {auth.isLoggedIn && (
            <Link
              to="/qa/write"
              className="px-2 rounded border-2 border-[#ffcdd2] hover:bg-[#ffcdd2] hover:text-white hover:font-semibold hover:cursor-pointer"
            >
              작성하기
            </Link>
          )}
        </div>

        <SearchBar placeholder="키워드를 입력해주세요." purpose="QandA" />

        {qaList?.length === 0 && <EmptyPostAlarm />}

        {qaList?.length !== 0 && <Table dataList={qaList} />}
      </div>
    </Layout>
  );
}

export default QAPage;
