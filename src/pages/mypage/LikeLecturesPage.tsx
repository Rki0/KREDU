import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import MySearchBar from "../../components/MySearchBar";
import EmptyPostAlarm from "../../components/post/EmptyPostAlarm";
import { AuthContext } from "../../context/auth-context";
import { useHttpClient } from "../../hoc/http-hook";
import Layout from "../../layout/Layout";
import MyPostList from "./MyPostList";


function LikeLecturesPage() {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  const [likedLecture, setLikedLecture] = useState<any[]>([]);
  const [filteredLikedLecture, setFilteredLikedLecture] = useState<any[]>([]);

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
        setFilteredLikedLecture(responseData.likedLecture);
      } catch (err) {}
    };

    loadLikeLecture();
  }, []);

  const deleteHandler = (id: string) => {
    const deletedFromLikedLecture = likedLecture.filter(
      (lecture: any) => lecture.id !== id
    );

    const deletedFromFilteredLikedLecture = filteredLikedLecture.filter(
      (lecture: any) => lecture.id !== id
    );

    setLikedLecture(deletedFromLikedLecture);
    setFilteredLikedLecture(deletedFromFilteredLikedLecture);
  };

  const filteringLikedLecture = (keyword: string) => {
    const filterdData = likedLecture.filter((item: any) =>
      item.title.includes(keyword)
    );

    setFilteredLikedLecture(filterdData);
  };

  const { t } = useTranslation();

  return (
    <Layout>
      <div className="px-2 mt-4 md:px-8 md:pt-8 lg:px-12 lg:pt-12 xl:px-32 xl:pt-20">
        <h1 className="font-bold text-xl border-b-2 border-[#ffa4a2] sm:text-2xl md:text-3xl">
          {t("mypageLike.title")}
        </h1>

        <MySearchBar filtering={filteringLikedLecture} />

        {filteredLikedLecture.length !== 0 && (
          <MyPostList
            data={filteredLikedLecture}
            deleteHandler={deleteHandler}
            purpose="lecture"
          />
        )}

        {filteredLikedLecture.length === 0 && <EmptyPostAlarm />}
      </div>
    </Layout>
  );
}

export default LikeLecturesPage;
