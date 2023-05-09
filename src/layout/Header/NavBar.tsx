import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { AuthContext } from "../../context/auth-context";

interface menuArrType {
  title: string;
  key: number;
  to: string;
}

interface PropsType {
  menuArr: Array<menuArrType>;
  logoutHandler: () => void;
}

function NavBar({ menuArr, logoutHandler }: PropsType) {
  const auth = useContext(AuthContext);

  const { t } = useTranslation();

  return (
    <nav className="hidden w-full text-xl text-center lg:block h-1/2">
      <ul className="flex flex-col">
        {menuArr.map((item: any) => (
          <li key={item.key} className={auth.isLoggedIn ? "last:hidden" : ""}>
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

      {auth.isLoggedIn ? (
        <button
          onClick={logoutHandler}
          className="text-center w-full py-3 px-3 active:bg-[#ffa4a2] hover:bg-[#cb9ca1]"
        >
          {t("header.logout")}
        </button>
      ) : null}
    </nav>
  );
}

export default NavBar;
