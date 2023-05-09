import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";

import Layout from "../../layout/Layout";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hoc/http-hook";
import MyPostList from "./MyPostList";
import MySearchBar from "../../components/MySearchBar";
import EmptyPostAlarm from "../../components/post/EmptyPostAlarm";

function MyQuestionsPage() {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  const [questions, setQuestions] = useState<any[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<any[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/users/qas`,
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );

        if (responseData.qas) {
          setQuestions(responseData.qas);
          setFilteredQuestions(responseData.qas);
        }
      } catch (err) {}
    };

    fetchQuestions();
  }, []);

  const deleteHandler = (id: string) => {
    const deletedMyQA = questions.filter((question: any) => question.id !== id);

    const deletedFromFilteredQuestions = filteredQuestions.filter(
      (question: any) => question.id !== id
    );

    setQuestions(deletedMyQA);
    setFilteredQuestions(deletedFromFilteredQuestions);
  };

  const filteringQuestions = (keyword: string) => {
    const filterdData = questions.filter((item: any) =>
      item.title.includes(keyword)
    );

    setFilteredQuestions(filterdData);
  };

  const { t } = useTranslation();

  return (
    <Layout>
      <div className="px-2 mt-4 md:px-8 md:pt-8 lg:px-12 lg:pt-12 xl:px-32 xl:pt-20">
        <h1 className="font-bold text-xl border-b-2 border-[#ffa4a2] sm:text-2xl md:text-3xl">
          {t("mypageQA.title")}
        </h1>

        <MySearchBar filtering={filteringQuestions} />

        {filteredQuestions.length !== 0 && (
          <MyPostList
            data={filteredQuestions}
            deleteHandler={deleteHandler}
            purpose="QandA"
          />
        )}

        {filteredQuestions.length === 0 && <EmptyPostAlarm />}
      </div>
    </Layout>
  );
}

export default MyQuestionsPage;
