import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import Layout from "../../layout/Layout";
import Table from "../../components/Table";
import { useHttpClient } from "../../hoc/http-hook";
import { AuthContext } from "../../context/auth-context";

interface QAListType {
  _id: string | undefined;
  title: string | undefined;
  date: string | undefined;
  like: number | undefined;
  see: number | undefined;
  comments: Array<any> | undefined;
}

function QAPage() {
  const [qaList, setQaList] = useState<QAListType[]>([]);

  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchQA = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/qa`
        );

        if (responseData.qas) {
          setQaList(responseData.qas);
        }
      } catch (err) {}
    };

    fetchQA();
  }, []);

  return (
    <Layout>
      <div className="px-2 mt-4 md:px-8 md:pt-8 lg:px-12 lg:pt-12 xl:px-32 xl:pt-20">
        <div className="border-b-2 mb-2 pb-1 border-[#ffa4a2] flex justify-between items-center">
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

        {qaList && <Table dataList={qaList} />}
      </div>
    </Layout>
  );
}

export default QAPage;
