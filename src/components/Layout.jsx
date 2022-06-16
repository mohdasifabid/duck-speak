import { Navbar } from "./Navbar";
import { NavList } from "./NavList";
import { PeoplesList } from "./PeopleList";
import { useNavigate } from "react-router-dom";

export const Layout = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="sm-layout">
      <div className="sm-layout-navbar-container">
        <Navbar />
      </div>
      <div className="sm-layout-main-container">
        <div className="sm-layout-navlist-container">
          <NavList />
        </div>
        <div className="sm-layout-childs-container">{children}</div>
        <div className="sm-layout-peoplesList-container">
          <PeoplesList />
        </div>
      </div>
      <div className="sm-layout-mobile-navigation">
        <a onClick={() => navigate("/home")}>
          <i className="fa-solid fa-house"></i>
        </a>
        <a onClick={() => navigate("/bookmarked")}>
          <i className="fa-solid fa-bookmark"></i>
        </a>
        <a onClick={() => navigate("/login")}>
          <i className="fa-solid fa-user"></i>
        </a>
      </div>
    </div>
  );
};
