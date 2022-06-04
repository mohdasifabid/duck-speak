import axios from "axios";
import { useEffect } from "react";
import { usePostProvider } from "../postProvider";
import { Navbar } from "./Navbar";
import { Postcard } from "./PostCard";
import { NavList } from "./NavList";
import { PeoplesList } from "./PeopleList";
import { PostMaker } from "./PostMaker";

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
      <NavList />
      <div className="main-container">
        <Navbar />
        {state.bookmarks.length === 0 && <h3>You have no bookmarks</h3>}
        {state.bookmarks.map((item) => {
          return <Postcard item={item} key={item._id} />;
        })}
      </div>

      <PeoplesList />
    </div>
  );
};
