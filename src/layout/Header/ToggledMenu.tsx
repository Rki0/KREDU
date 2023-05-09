import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import { useTranslation } from "react-i18next";

import { AuthContext } from "../../context/auth-context";
import LanguageControl from "./LanguageControl";

interface menuArrType {
  title: string;
  key: number;
  to: string;
}

interface PropsType {
  setIsToggle: React.Dispatch<React.SetStateAction<boolean>>;
  menuArr: Array<menuArrType>;
  logoutHandler: () => void;
}

function ToggledMenu({ setIsToggle, menuArr, logoutHandler }: PropsType) {
  const auth = useContext(AuthContext);

  const toggleBtn = () => {
    setIsToggle(false);
  };

  const { t } = useTranslation();

  return (
    <div className="absolute top-0 left-0 flex w-screen h-screen">
      <div className="bg-[rgba(0,0,0,0.5)] w-1/3" onClick={toggleBtn}></div>

      <nav className="flex flex-col justify-between w-2/3 px-2 pt-1 bg-white">
        <div>
          <div className="flex justify-between mb-4">
            <Link to="/">Ki0. 🇰🇷 📚 🇯🇵</Link>

            <button onClick={toggleBtn} className="lg:hidden">
              <GrClose />
            </button>
          </div>

          <ul>
            {menuArr.map((item) => (
              <li
                key={item.key}
                className={auth.isLoggedIn ? "last:hidden mb-4" : "mb-4"}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? "py-1 border-b-2 border-black" : ""
                  }
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>

          {auth.isLoggedIn ? (
            <button onClick={logoutHandler}>{t("header.logout")}</button>
          ) : null}
        </div>

        <div className="pb-2">
          <LanguageControl />
        </div>
      </nav>
    </div>
  );
}

export default ToggledMenu;
