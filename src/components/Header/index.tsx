import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants";
import DarkModeToggle from "../DarkModeToggle";

const Header = () => {
  const { pathname } = useLocation();
  return (
    <header className="flex h-16 w-full justify-center gap-x-4 text-zinc-700 dark:text-white sm:gap-x-16 lg:gap-x-36">
      <div className="flex">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="383.000000pt"
          height="384.000000pt"
          viewBox="0 0 383.000000 384.000000"
          preserveAspectRatio="xMidYMid meet"
          className="h-16 w-16 fill-zinc-700 p-2 dark:fill-white"
        >
          <title>Logo of Hao</title>
          <g transform="translate(0.000000,384.000000) scale(0.100000,-0.100000)" stroke="none">
            <path
              d="M656 3824 c-159 -35 -295 -111 -416 -234 -47 -47 -102 -115 -123
-150 -44 -76 -94 -201 -103 -259 l-7 -41 252 0 251 0 19 38 c27 52 101 119
169 150 l57 27 1160 0 1160 0 56 -26 c69 -32 132 -88 166 -146 l25 -43 249 0
c175 0 249 3 249 11 0 27 -34 138 -60 195 -100 221 -280 381 -520 461 l-85 28
-1215 2 c-1047 1 -1225 0 -1284 -13z"
            />
            <path
              d="M0 1900 l0 -940 240 0 240 0 0 360 0 360 1435 0 1435 0 0 -360 0
-360 240 0 240 0 0 940 0 940 -240 0 -240 0 0 -330 0 -330 -1435 0 -1435 0 0
330 0 330 -240 0 -240 0 0 -940z"
            />
            <path
              d="M20 652 c0 -32 37 -127 81 -213 29 -55 68 -108 122 -165 126 -133
259 -210 432 -250 76 -18 146 -19 1260 -19 1105 0 1185 1 1257 18 293 69 523
275 619 556 34 99 54 91 -234 91 l-253 0 -29 -38 c-39 -52 -107 -102 -168
-124 -49 -16 -124 -17 -1193 -18 -1264 0 -1178 -4 -1281 66 -28 19 -63 53 -78
75 l-28 39 -253 0 c-240 0 -254 -1 -254 -18z"
            />
          </g>
        </svg>
        <Link to={ROUTES.HOME} className="my-auto text-4xl font-semibold uppercase sm:ml-1 lg:ml-3">
          Hao
        </Link>
      </div>
      <nav>
        <ul className="my-auto flex h-full gap-x-2 lg:gap-x-10">
          <li
            className={`my-auto text-xl hover:text-zinc-500 ${
              pathname == ROUTES.HOME ? "underline" : ""
            }`}
          >
            <Link to={ROUTES.HOME}>Home</Link>
          </li>
          <li
            className={`my-auto text-xl hover:text-zinc-500 ${
              pathname == ROUTES.PROJECTS ? "underline" : ""
            }`}
          >
            <Link to={ROUTES.PROJECTS}>Projects</Link>
          </li>
        </ul>
      </nav>
      <DarkModeToggle />
    </header>
  );
};

export default Header;
