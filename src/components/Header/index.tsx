import { Link } from "react-router-dom";
import { ROUTES } from "../../constants";
import DarkModeToggle from "../DarkModeToggle";

const Header = () => {
  return (
    <header className="flex h-16 w-full justify-center gap-x-4 text-zinc-700 dark:text-white sm:gap-x-16 lg:gap-x-36">
      <div className="flex">
        <img src="https://via.placeholder.com/64" alt="logo of hao" className="h-16 p-2" />
        <Link to={ROUTES.HOME} className="my-auto text-4xl font-semibold uppercase sm:ml-1 lg:ml-3">
          Hao
        </Link>
      </div>
      <nav>
        <ul className="my-auto flex h-full gap-x-2 lg:gap-x-10">
          <li className="my-auto text-xl">
            <Link to={ROUTES.HOME}>Home</Link>
          </li>
          <li className="my-auto text-xl">
            <Link to={ROUTES.PROJECTS}>Projects</Link>
          </li>
        </ul>
      </nav>
      <DarkModeToggle />
    </header>
  );
};

export default Header;
