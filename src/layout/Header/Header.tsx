import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { GiHamburgerMenu } from "react-icons/gi";
import ToggledMenu from "./ToggledMenu";
import TeacherProfile from "./TeacherProfile";
import { AuthContext } from "../../context/auth-context";
import NavBar from "./NavBar";

const menuArr = [
  { title: "강의", key: 1, to: "/lecture" },
  { title: "마이페이지", key: 2, to: "/mypage" },
  { title: "질문 게시판", key: 3, to: "/wish" },
  { title: "로그인 / 회원가입", key: 4, to: "/login" },
];

function Header() {
  const auth = useContext(AuthContext);

  const [isToggle, setIsToggle] = useState(false);

  const toggleBtn = () => {
    setIsToggle(true);
  };

  const navigate = useNavigate();

  const logoutHandler = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <header className="z-10 flex justify-between items-center py-1 px-[1%] text-2xl fixed w-screen bg-[#ffcdd2] lg:w-[20%] lg:px-0 lg:col-start-1 lg:col-end-2 lg:flex-col lg:justify-evenly lg:items-center lg:h-screen">
      <div className="items-center justify-around lg:h-1/2 lg:flex lg:flex-col">
        <Link to="/" className="lg:flex lg:justify-center">
          Ki0. 🇰🇷 📚 🇯🇵
        </Link>

        <TeacherProfile />
      </div>

      <button onClick={toggleBtn} className="lg:hidden">
        <GiHamburgerMenu />
      </button>

      {isToggle ? (
        <ToggledMenu
          setIsToggle={setIsToggle}
          menuArr={menuArr}
          logoutHandler={logoutHandler}
        />
      ) : null}

      <NavBar menuArr={menuArr} logoutHandler={logoutHandler} />
    </header>
  );
}

export default Header;
