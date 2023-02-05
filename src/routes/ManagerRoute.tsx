import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

// 로그인 유저 중 매니저만 접근 가능
const ManagerRoute = () => {
  const { isLoggedIn, manager } = useContext(AuthContext);

  if (!isLoggedIn && !manager) {
    alert("매니저만 접근 가능합니다.");
  }

  return isLoggedIn && manager ? <Outlet /> : <Navigate to="/login" />;
};

export default ManagerRoute;
