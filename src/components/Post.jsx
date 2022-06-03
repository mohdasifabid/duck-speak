import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePostProvider } from "../postProvider";
import { Navbar } from "./Navbar";
import { NavList } from "./NavList";
import { PeoplesList } from "./PeopleList";
import { Postcard } from "./PostCard";
import { Reply } from "./Reply";

export const Post = () => {
  const { state } = usePostProvider();
  const [post, setPost] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("encodedToken");
    const getPost = async (id) => {
      const response = await axios.get(`/api/posts/${id}`, {
        headers: {
          authorization: token,
        },
      });
      if (response.status === (200 || 201)) {
        setPost(response.data.post);
      }
    };
    getPost(id);

    const getComments = async (id) => {
      const token = localStorage.getItem("encodedToken");
      const response = await axios.get(`/api/comments/${id}`, {
        headers: {
          authorization: token,
        },
      });
      console.log(response);
    };
    getComments(id);
  }, []);

  return (
    <div className="common-container">
      <NavList />
      <div className="post-body">
        <Navbar />
        <Postcard item={post} key={post._id} post={post} />
        {state.reply && (
          <div className="reply-box">
            <Reply item={post} />
          </div>
        )}
      </div>
      <PeoplesList />
    </div>
  );
};
