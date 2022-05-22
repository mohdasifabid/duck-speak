import { Link } from "react-router-dom";
import "./NavList.css";
export const NavList = () => {
  return (
    <div className="navlist">
      <div className="navlist-content-container">
        <div>
          <Link to="/home" className="navlist-links">
            <i className="fa-solid fa-house"></i>
            Home
          </Link>
        </div>
        <div>
          <Link to="/bookmarked" className="navlist-links">
            <i className="fa-solid fa-bookmark"></i>
            Bookmarks
          </Link>
        </div>
        <div>
          <Link to="/login" className="navlist-links">
            <i className="fa-solid fa-user"></i>
            Profile
          </Link>
        </div>
        <div>
          <a className="navlist-btn" href="#createPostHere">
            Create New Post
          </a>
        </div>
      </div>
    </div>
  );
};
