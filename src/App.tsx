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
const QAPage = React.lazy(() => import("./pages/QandAPage/QAPage"));
const OneLecturePage = React.lazy(
  () => import("./pages/lecture/OneLecturePage")
);
const OneQAPage = React.lazy(() => import("./pages/QandAPage/OneQAPage"));
const LikeLecturesPage = React.lazy(
  () => import("./pages/mypage/LikeLecturesPage")
);
const ReviseMyInfoPage = React.lazy(
  () => import("./pages/mypage/ReviseMyInfoPage")
);
const QAWritePage = React.lazy(() => import("./pages/QandAPage/QAWritePage"));
const LectureWritePage = React.lazy(
  () => import("./pages/lecture/LectureWritePage")
);
const LectureUpdatePage = React.lazy(
  () => import("./pages/lecture/LectureUpdatePage")
);
const QAUpdatePage = React.lazy(() => import("./pages/QandAPage/QAUpdatePage"));
const MyQuestionPage = React.lazy(
  () => import("./pages/mypage/MyQuestionsPage")
);

function App() {
  const { token, login, logout, userId, manager, nickname } = useAuth();

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token,
          userId,
          login,
          logout,
          manager,
          nickname,
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route element={<AnyRoute />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/lecture" element={<LecturePage />} />
              <Route path="/lecture/:lectureId" element={<OneLecturePage />} />
              <Route path="/qa" element={<QAPage />} />
              <Route path="/qa/:qaId" element={<OneQAPage />} />
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
              <Route path="/qa/write" element={<QAWritePage />} />
              <Route path="/qa/update/:qaId" element={<QAUpdatePage />} />
              <Route path="/mypage/questions" element={<MyQuestionPage />} />
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
