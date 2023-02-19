import React, { useState, useEffect, useContext } from "react";

import Layout from "../../layout/Layout";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hoc/http-hook";
import MyPostList from "./MyPostList";

function MyQuestionsPage() {
  const [questions, setQuestions] = useState<any[]>([]);

  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

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
        }
      } catch (err) {}
    };

    fetchQuestions();
  }, []);

  const deleteHandler = (id: string) => {
    const deletedMyQA = questions.filter((lecture: any) => lecture.id !== id);

    setQuestions(deletedMyQA);
  };

  return (
    <Layout>
      <div className="px-2 mt-4 md:px-8 md:pt-8 lg:px-12 lg:pt-12 xl:px-32 xl:pt-20">
        <h1 className="font-bold text-xl border-b-2 border-[#ffa4a2] sm:text-2xl md:text-3xl">
          내 질문
        </h1>

        {questions && (
          <article>
            <MyPostList
              data={questions}
              deleteHandler={deleteHandler}
              purpose="QandA"
            />
          </article>
        )}
      </div>
    </Layout>
  );
}

export default MyQuestionsPage;
