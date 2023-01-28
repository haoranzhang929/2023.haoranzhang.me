import { Link } from "react-router-dom";
import { ROUTES } from "../../constants";
import DarkModeToggle from "../DarkModeToggle";

const Header = () => {
  return (
    <header className="flex h-14 w-full justify-center bg-indigo-500 dark:bg-indigo-900 ">
      <img src="https://via.placeholder.com/48" alt="logo of hao" />
      <Link to={ROUTES.HOME} className="my-auto px-4 text-4xl font-semibold uppercase text-white">
        Hao
      </Link>
      <nav className="ml-6">
        <ul className="my-auto flex h-full">
          <li className="my-auto px-2 text-xl text-white">
            <Link to={ROUTES.HOME}>Home</Link>
          </li>
          <li className="my-auto px-2 text-xl text-white">
            <Link to={ROUTES.PROJECTS}>Projects</Link>
          </li>
        </ul>
      </nav>
      <DarkModeToggle />
    </header>
  );
};

export default Header;
