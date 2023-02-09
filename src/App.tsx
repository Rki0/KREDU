import React, { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { AuthContext } from "./context/auth-context";
import { useAuth } from "./hoc/auth-hook";
import AnyRoute from "./routes/AnyRoute";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import UnValidPage from "./pages/UnValid/UnValidPage";
import ManagerRoute from "./routes/ManagerRoute";

const LandingPage = React.lazy(() => import("./pages/landing/LandingPage"));
const LecturePage = React.lazy(() => import("./pages/lecture/LecturePage"));
const MyPage = React.lazy(() => import("./pages/mypage/MyPage"));
const LoginPage = React.lazy(() => import("./pages/loginAndsign/LoginPage"));
const SignupPage = React.lazy(() => import("./pages/loginAndsign/SignupPage"));
const WishContentsPage = React.lazy(
  () => import("./pages/wishcontents/WishContentsPage")
);
const OneLecturePage = React.lazy(
  () => import("./pages/lecture/OneLecturePage")
);
const OneWishPage = React.lazy(
  () => import("./pages/wishcontents/OneWishPage")
);
const LikeLecturesPage = React.lazy(
  () => import("./pages/mypage/LikeLecturesPage")
);
const ReviseMyInfoPage = React.lazy(
  () => import("./pages/mypage/ReviseMyInfoPage")
);
const WishWritePage = React.lazy(
  () => import("./pages/wishcontents/WishWritePage")
);
const LectureWritePage = React.lazy(
  () => import("./pages/lecture/LectureWritePage")
);
const LectureUpdatePage = React.lazy(
  () => import("./pages/lecture/LectureUpdatePage")
);

function App() {
  const { token, login, logout, userId, manager } = useAuth();

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AuthContext.Provider
        value={{ isLoggedIn: !!token, token, userId, login, logout, manager }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<AnyRoute />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/lecture" element={<LecturePage />} />
              <Route path="/lecture/:lectureId" element={<OneLecturePage />} />
              <Route path="/wish" element={<WishContentsPage />} />
              <Route path="/wish/:wishnum" element={<OneWishPage />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path="/mypage" element={<MyPage />} />
              <Route
                path="/mypage/likelectures"
                element={<LikeLecturesPage />}
              />
              <Route
                path="/mypage/revisemyinfo"
                element={<ReviseMyInfoPage />}
              />
              <Route path="/wish/write" element={<WishWritePage />} />
            </Route>

            <Route element={<PublicRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Route>

            <Route element={<ManagerRoute />}>
              <Route path="/lecture/write" element={<LectureWritePage />} />
              <Route
                path="/lecture/update/:lectureId"
                element={<LectureUpdatePage />}
              />
            </Route>

            <Route path="/*" element={<UnValidPage />} />
          </Routes>
        </Suspense>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
