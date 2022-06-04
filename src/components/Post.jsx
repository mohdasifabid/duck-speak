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
  const { state, dispatch } = usePostProvider();
  const [post, setPost] = useState([]);
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  console.log(comments);
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
        setComments(response.data.post.comments);
      }
    };
    getPost(id);
  }, []);
  return (
    <div className="common-container">
      <NavList />
      <div className="post-body">
        <Navbar />
        <Postcard item={post} key={post._id} post={post} />
        <div>
          <div className="avatar-textarea-container">
            <textarea className="textarea"></textarea>
          </div>
          <div className="bottom-container">
            <button className="speak-btn">reply</button>
          </div>
        </div>
        {comments.map((comment) => {
          return (
            <div className="avatar-textarea-container " key={comment._id}>
              <img
                src="https://picsum.photos/id/1062/367/267"
                alt=""
                className="duck-avatar-badge-img"
                style={{ width: "2rem", height: "2rem" }}
              />
              <p>{comment.username}</p>
              <p>{comment.text}</p>
            </div>
          );
        })}
      </div>
      <PeoplesList />
    </div>
  );
};
