import { Navbar } from "./Navbar";
import { usePostProvider } from "../postProvider";
import "./User.css";
import { NavList } from "./NavList";
import { PeoplesList } from "./PeopleList";
import { Link } from "react-router-dom";
export const User = () => {
  const { state } = usePostProvider();
  return (
    <div className="common-container">
      <Navbar />

      <div className="main-container">
        <div className="left">
          <NavList />
        </div>
        <div className="middle">
          <div className="img-container">
            <img
              className="cover-img"
              src="https://picsum.photos/536/354"
              alt=""
            />
            <img
              className="profile-img"
              src="https://picsum.photos/id/1062/367/267"
              alt=""
            />
          </div>
          <div className="btn-container">
            <button
              className="follow-btn duck-primary-btn-s duck-primary-btn"
              // onClick={() => follow(user._id)}
            >
              Follow
            </button>
          </div>
          <div className="userInfo-container">
            <p className="name-and-userId">
              {/* <strong>{`${user.firstName} ${user.lastName}`}</strong> */}
              {/* <small>{`@${user.username}`}</small> */}
            </p>
            <p>Joined May 2022</p>
            <p>
              <span>{/* <strong>{user.following}</strong>Following */}</span>
              <span>{/* <strong>{user.followers}</strong>Followes */}</span>
            </p>
          </div>
        </div>
        <div className="right">
          <PeoplesList />
        </div>
      </div>
      <div className="mobile-navigation">
        <div>
          <Link to="/home" className="navlist-links">
            <i className="fa-solid fa-house"></i>
          </Link>
        </div>
        <div>
          <Link to="/bookmarked" className="navlist-links">
            <i className="fa-solid fa-bookmark"></i>
          </Link>
        </div>
        <div>
          <Link to="/login" className="navlist-links">
            <i className="fa-solid fa-user"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};
