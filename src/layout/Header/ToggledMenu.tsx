import { GrClose } from "react-icons/gr";
import { Link, NavLink } from "react-router-dom";

interface menuArrType {
  title: string;
  key: number;
  to: string;
}

interface PropsType {
  setIsToggle: React.Dispatch<React.SetStateAction<boolean>>;
  menuArr: Array<menuArrType>;
}

function ToggledMenu({ setIsToggle, menuArr }: PropsType) {
  const toggleBtn = () => {
    setIsToggle(false);
  };

  return (
    <div className="flex absolute top-0 left-0 w-screen h-screen">
      <div className="bg-[rgba(0,0,0,0.5)] w-1/3" onClick={toggleBtn}></div>

      <div className="w-2/3 bg-white pt-1 px-2">
        <div className="flex justify-between mb-4">
          <Link to="/">Ki0. 🇰🇷 📚 🇯🇵</Link>

          <button onClick={toggleBtn} className="lg:hidden">
            <GrClose />
          </button>
        </div>

        <ul>
          {menuArr.map((item) => (
            <li key={item.key} className="mb-4">
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
      </div>
    </div>
  );
}

export default ToggledMenu;