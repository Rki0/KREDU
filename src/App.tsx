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

function App() {
  return (
    // <Routes>
    //   <Route path="/" element={<LandingPage />} />
    //   <Route path="/lecture" element={<LecturePage />} />
    //   <Route path="/mypage" element={<MyPage />} />
    //   <Route path="/login" element={<LoginPage />} />
    //   <Route path="/signin" element={<SigninPage />} />
    //   <Route path="/question" element={<QuestionPage />} />
    // </Routes>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/lecture" element={<LecturePage />} />
      <Route path="/lecture/:lecturenum" element={<OneLecturePage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/mypage/likelectures" element={<LikeLecturesPage />} />
      <Route path="/mypage/revisemyinfo" element={<ReviseMyInfoPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/wish" element={<WishContentsPage />} />
      <Route path="/wish/:wishnum" element={<OneWishPage />} />
    </Routes>
  );
}

export default App;
