import axios from "axios";
import { useEffect } from "react";
import { usePostProvider } from "../postProvider";
import { Navbar } from "./Navbar";
import { NavList } from "./NavList";
import { PeoplesList } from "./PeopleList";
import { Postcard } from "./PostCard";
import { PostMaker } from "./PostMaker";
export const Home = () => {
  const { state, dispatch } = usePostProvider();
  useEffect(() => {
    const token = localStorage.getItem("encodedToken");
    const getPosts = async () => {
      const response = await axios.get("/api/posts", {
        headers: {
          authorization: token,
        },
      });
      if (response.status === 200) {
        dispatch({ type: "GET_POSTS", payload: response.data.posts });
      }
    };
    getPosts();
  }, []);
  return (
    <div className="common-container">
      <NavList />
      <div className="main-container">
        <Navbar />
        <PostMaker />
        {state.posts.map((post) => {
          return <Postcard item={post} key={post._id} />;
        })}
      </div>
      <PeoplesList />
    </div>
  );
};
