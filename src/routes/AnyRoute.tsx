import React from "react";
import { Outlet } from "react-router-dom";

// 비로그인, 로그인 유저 전부 접근 가능
function AnyRoute() {
  return <Outlet />;
}

export default AnyRoute;
