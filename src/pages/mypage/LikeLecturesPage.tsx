import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hoc/http-hook";
import Layout from "../../layout/Layout";
import LikedLecture from "./LikedLecture";

function LikeLecturesPage() {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  const [likedLecture, setLikedLecture] = useState<any>();

  useEffect(() => {
    const loadLikeLecture = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/users/likeLecture`,
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );

        setLikedLecture(responseData.likedLecture);
      } catch (err) {}
    };

    loadLikeLecture();
  }, []);

  const deleteHandler = (id: string) => {
    const deletedLikedLecture = likedLecture.filter(
      (lecture: any) => lecture.id !== id
    );

    setLikedLecture(deletedLikedLecture);
  };

  return (
    <Layout>
      <div className="px-2 mt-4 md:px-8 md:pt-8 lg:px-12 lg:pt-12 xl:px-32 xl:pt-20">
        <h1 className="font-bold text-xl border-b-2 border-[#ffa4a2] sm:text-2xl md:text-3xl">
          좋아요 표시한 강의
        </h1>

        {likedLecture && (
          <article>
            <LikedLecture
              likedLecture={likedLecture}
              deleteHandler={deleteHandler}
            />
          </article>
        )}
      </div>
    </Layout>
  );
}

export default LikeLecturesPage;
