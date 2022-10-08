import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import LecturePage from "./pages/lecture/LecturePage";
import MyPage from "./pages/mypage/MyPage";
import LoginPage from "./pages/loginAndsign/LoginPage";
import SigninPage from "./pages/loginAndsign/SigninPage";
import WishContentsPage from "./pages/wishcontents/WishContentsPage";
import OneLecturePage from "./pages/lecture/OneLecturePage";
import OneWishPage from "./pages/wishcontents/OneWishPage";
import LikeLecturesPage from "./pages/mypage/LikeLecturesPage";
import ReviseMyInfoPage from "./pages/mypage/ReviseMyInfoPage";
import WishWritePage from "./pages/wishcontents/WishWritePage";
import LectureWritePage from "./pages/lecture/LectureWritePage";
import Auth from "./hoc/Auth";

function App() {
  // 누구나 접근 가능
  const AuthenticLandingPage = Auth(LandingPage, null);
  const AuthenticLecturePage = Auth(LecturePage, null);
  const AuthenticWishContentsPage = Auth(WishContentsPage, null);
  const AuthenticOneLecturePage = Auth(OneLecturePage, null);
  const AuthenticOneOneWishPage = Auth(OneWishPage, null);

  // 로그인한 사람만 접근 가능
  const AuthenticMyPage = Auth(MyPage, true);
  const AuthenticLikeLecturesPage = Auth(LikeLecturesPage, true);
  const AuthenticReviseMyInfoPage = Auth(ReviseMyInfoPage, true);
  const AuthenticWishWritePage = Auth(WishWritePage, true);

  // 로그인한 사람은 접근 불가능
  const AuthenticLoginPage = Auth(LoginPage, false);
  const AuthenticSigninPage = Auth(SigninPage, false);

  // 관리자만 접근 가능
  const AuthenticLectureWritePage = Auth(LectureWritePage, true, true);

  return (
    <Routes>
      <Route path="/" element={<AuthenticLandingPage />} />
      <Route path="/lecture" element={<AuthenticLecturePage />} />
      <Route
        path="/lecture/:lecturenum"
        element={<AuthenticOneLecturePage />}
      />
      <Route path="/lecture/write" element={<AuthenticLectureWritePage />} />
      <Route path="/mypage" element={<AuthenticMyPage />} />
      <Route
        path="/mypage/likelectures"
        element={<AuthenticLikeLecturesPage />}
      />
      <Route
        path="/mypage/revisemyinfo"
        element={<AuthenticReviseMyInfoPage />}
      />
      <Route path="/login" element={<AuthenticLoginPage />} />
      <Route path="/signin" element={<AuthenticSigninPage />} />
      <Route path="/wish" element={<AuthenticWishContentsPage />} />
      <Route path="/wish/write" element={<AuthenticWishWritePage />} />
      <Route path="/wish/:wishnum" element={<AuthenticOneOneWishPage />} />
    </Routes>

    // <Routes>
    //   <Route path="/" element={<LandingPage />} />
    //   <Route path="/lecture" element={<LecturePage />} />
    //   <Route path="/lecture/:lecturenum" element={<OneLecturePage />} />
    //   <Route path="/lecture/write" element={<LectureWritePage />} />
    //   <Route path="/mypage" element={<MyPage />} />
    //   <Route path="/mypage/likelectures" element={<LikeLecturesPage />} />
    //   <Route path="/mypage/revisemyinfo" element={<ReviseMyInfoPage />} />
    //   <Route path="/login" element={<LoginPage />} />
    //   <Route path="/signin" element={<SigninPage />} />
    //   <Route path="/wish" element={<WishContentsPage />} />
    //   <Route path="/wish/write" element={<WishWritePage />} />
    //   <Route path="/wish/:wishnum" element={<OneWishPage />} />
    // </Routes>
  );
}

export default App;
