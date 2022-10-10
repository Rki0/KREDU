import { useState, useMemo } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import ToggledMenu from "./ToggledMenu";
import { useAppSelector, useAppDispatch } from "../../hooks/reducerhooks";
import { logoutUser } from "../../_reducers/userSlice";

function Header() {
  const [isToggle, setIsToggle] = useState(false);

  const toggleBtn = () => {
    setIsToggle(true);
  };

  const authData = useAppSelector((state) => state.user.authData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const menuArr = useMemo(() => {
    return [
      { title: "강의", key: 1, to: "/lecture" },
      { title: "마이페이지", key: 2, to: "/mypage" },
      { title: "컨텐츠 건의", key: 3, to: "/wish" },
      { title: "로그인 / 회원가입", key: 4, to: "/login" },
    ];
  }, []);

  const logoutHandler = () => {
    dispatch(logoutUser(null))
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <header className="z-10 flex justify-between items-center py-1 px-[1%] text-2xl fixed w-screen bg-[#ffcdd2] lg:w-[20%] lg:px-0 lg:col-start-1 lg:col-end-2 lg:flex-col lg:justify-evenly lg:items-center lg:h-screen">
      <div className="lg:h-1/2 lg:flex lg:flex-col items-center justify-around">
        <Link to="/" className="lg:flex lg:justify-center">
          Ki0. 🇰🇷 📚 🇯🇵
        </Link>

        <div className="hidden lg:flex flex-col items-center text-xl">
          <img
            src={process.env.PUBLIC_URL + `/favicon.ico`}
            alt="profile"
            className="rounded-full bg-white w-32 mb-4"
          />

          <span className="text-lg">박기영</span>
          <span>적당히 한국어</span>
        </div>
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

      <nav className="hidden lg:block h-1/2 w-full text-xl text-center">
        <ul className="flex flex-col">
          {menuArr.map((item) => (
            <li key={item.key} className={authData.isAuth ? "last:hidden" : ""}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? "block py-3 px-3 bg-[#ef9a9a]"
                    : "block py-3 px-3 active:bg-[#ffa4a2] hover:bg-[#cb9ca1]"
                }
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>

        {authData.isAuth ? (
          <button
            onClick={logoutHandler}
            className="text-center w-full py-3 px-3 active:bg-[#ffa4a2] hover:bg-[#cb9ca1]"
          >
            로그아웃
          </button>
        ) : null}
      </nav>
    </header>
  );
}

export default Header;
