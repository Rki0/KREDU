import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";

import Layout from "../../layout/Layout";
import { useHttpClient } from "../../hoc/http-hook";
import { AuthContext } from "../../context/auth-context";
import MyPageStyledLinkTag from "../../components/MyPageStyledLinkTag";

function MyPage() {
  const [userInfo, setUserInfo] = useState<any>();

  const auth = useContext(AuthContext);
  const { isLoading, sendRequest } = useHttpClient();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BASE_URL}/users/info`,
          "GET",
          null,
          {
            Authorization: "Bearer " + auth.token,
          }
        );

        setUserInfo(responseData);
      } catch (err) {}
    };

    getUserInfo();
  }, []);

  const { t } = useTranslation();

  return (
    <Layout>
      {isLoading && <div>Loading for your info..</div>}

      {userInfo && (
        <section className="flex flex-col px-2 mt-4 md:px-8 md:pt-8 lg:px-12 lg:pt-12 xl:px-32 xl:pt-20">
          <div className="flex flex-col items-center mb-4">
            <div>
              <img
                alt="profile"
                src={
                  userInfo.image
                    ? `${process.env.REACT_APP_ASSET_URL}/${userInfo.image}`
                    : process.env.PUBLIC_URL + `/img/profile.jpg`
                }
                className="rounded-full mb-2 w-[200px] md:mb-4 h-[200px]"
              />
            </div>

            <p className="text-lg font-bold 2sm:text-xl sm:text-2xl md:text-3xl">
              {t("mypage.hello")}
              {userInfo.nickname}
              {t("mypage.MrMs")}
            </p>
          </div>

          <div className="flex flex-col">
            <MyPageStyledLinkTag
              to="/mypage/revisemyinfo"
              text={t("mypage.revise")}
              data={userInfo}
            />

            <MyPageStyledLinkTag
              to="/mypage/likelectures"
              text={t("mypage.like")}
            />

            <MyPageStyledLinkTag to="/mypage/questions" text={t("mypage.qa")} />
          </div>
        </section>
      )}
    </Layout>
  );
}

export default MyPage;
