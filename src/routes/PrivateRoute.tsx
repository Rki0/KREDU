import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

// 로그인 유저만 접근 가능
// 비로그인 유저 접근 불가
const PrivateRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);

  // Mypage에서 새로고침하면 잠시 isLoggedIn이 false가 되는데,
  // 이 때, Navigate가 login으로 갔다가 isLoggedIn이 true가 되면서 랜딩 페이지로 가버린다.
  // isLoggedIn이 업데이트되는 속도를 빠르게 하는 수 밖에 없다. 아니면 await를 사용해서 동기적으로 진행하거나.
  // 설마, useCallback으로 login 함수를 감싸놔서 false인 경우에 메모이제이션 된 함수가 실행되는 거 때문에 그런가? -- 이건 아니었다.
  // 그냥, alert 실행 후 login이 실행되서 그런 것일 뿐이다.
  // 유저 인증 방식을 바꾸거나 해야하지 않을까?

  if (!isLoggedIn) {
    alert("로그인이 필요한 기능입니다.");
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
