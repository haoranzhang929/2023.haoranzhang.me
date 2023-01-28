import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Projects from "./components/Projects";
import { ROUTES } from "./constants";

const Router = () => (
  <Routes>
    <Route path={ROUTES.HOME} element={<Home />} />
    <Route path={ROUTES.PROJECTS} element={<Projects />} />
  </Routes>
);

export default Router;
