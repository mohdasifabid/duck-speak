import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "./Navbar";
import { NavList } from "./NavList";
import { PeoplesList } from "./PeopleList";
import { Postcard } from "./PostCard";
import { getCall } from "./ReusableFunctions";

export const Post = () => {
  const [post, setPost] = useState([]);
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(async () => {
    let data = await getCall(`/api/posts/${id}`);
    setPost(data.post);
    setComments(data.post.comments);
  }, []);

  return (
    <div className="common-container">
      <NavList />
      <div className="main-container">
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
            <div className="comment-card " key={comment._id}>
              <img
                src="https://picsum.photos/id/1062/367/267"
                alt=""
                className="duck-avatar-badge-img"
              />
              <p className="comment-card-username">{comment.username}</p>
              <p className="comment-card-comment">{comment.text}</p>
            </div>
          );
        })}
      </div>
      <PeoplesList />
    </div>
  );
};
