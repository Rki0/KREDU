import React from "react";
import { useLocation } from "react-router-dom";

import Layout from "../../layout/Layout";
import ChangeProfile from "./ChangeProfile";
import ChangeNickname from "./ChangeNickname";
import ChangePassword from "./ChangePassword";

function ReviseMyInfoPage() {
  const location = useLocation();
  const user = location.state.userInfo;

  return (
    <Layout>
      <div className="px-2 mt-4 md:px-8 md:pt-8 lg:px-12 lg:pt-12 xl:px-32 xl:pt-20">
        <h1 className="font-bold text-xl border-b-2 mb-2 border-[#ffa4a2] sm:text-2xl md:text-3xl">
          개인정보 수정
        </h1>

        <div className="flex flex-col">
          <ChangeProfile userProfile={user.image} />

          <ChangeNickname userNickname={user.nickname} />

          <ChangePassword />
        </div>
      </div>
    </Layout>
  );
}

export default ReviseMyInfoPage;
