import axios from "axios";
import { useEffect } from "react";
import { usePostProvider } from "../postProvider";
import { Navbar } from "./Navbar";
import { Postcard } from "./PostCard";
import { NavList } from "./NavList";
import { PeoplesList } from "./PeopleList";
import { PostMaker } from "./PostMaker";
import { Link } from "react-router-dom";

export const BookMarked = () => {
  const { state, dispatch } = usePostProvider();
  useEffect(() => {
    const getBookMark = async () => {
      const token = localStorage.getItem("encodedToken");
      const response = await axios.get(`/api/users/bookmark`, {
        headers: {
          authorization: token,
        },
      });
      if (response.status === 200) {
        dispatch({ type: "GET_BOOKMARKED", payload: response.data.bookmarks });
      }
    };
    getBookMark();
  }, []);
  return (
    <div className="common-container">
      <Navbar />
      <div className="main-container">
        <div className="left">
          <NavList />
        </div>
        <div className="middle">
          {state.bookmarks.length === 0 && <h3>You have no bookmarks</h3>}
          {state.bookmarks.map((item) => {
            return <Postcard item={item} key={item._id} />;
          })}
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
