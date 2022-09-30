import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import LecturePage from "./pages/lecture/LecturePage";
import MyPage from "./pages/mypage/MyPage";
import LoginPage from "./pages/loginAndsign/LoginPage";
import SigninPage from "./pages/loginAndsign/SigninPage";
import QuestionPage from "./pages/question/QuestionPage";
import OneLecturePage from "./pages/lecture/OneLecturePage";

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
      <Route path="/lecture/:lectureNum" element={<OneLecturePage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/question" element={<QuestionPage />} />
    </Routes>
  );
}

export default App;
