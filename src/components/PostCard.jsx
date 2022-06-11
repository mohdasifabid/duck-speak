import "./PostCard.css";
import { useState } from "react";
import { usePostProvider } from "../postProvider";
import { useAuthProvider } from "../authProvider";
import { Link, useNavigate } from "react-router-dom";
import { deleteCall, getCall, postCall } from "./ReusableFunctions";

export const Postcard = ({ item }) => {
  const { state, dispatch } = usePostProvider();
  const { state: authState } = useAuthProvider();
  const [likes, setLikes] = useState(null);
  const navigate = useNavigate();

  const getPost = async (id) => {
    const data = await getCall(`/api/posts/${id}`);
    dispatch({ type: "GET_POST", payload: data.post });
  };

  const deletePostHandler = async (id) => {
    const data = await deleteCall(`/api/posts/${id}`);
    dispatch({ type: "GET_POSTS", payload: data.posts });
  };

  const postLike = async (id) => {
    const data = await postCall(`/api/posts/like/${id}`, {});
    setLikes(data.post.likes.likeCount);
  };

  const postDislike = async (id) => {
    const data = await postCall(`/api/posts/dislike/${id}`, {});
    setLikes(data.post.likes.likeCount);
  };

  const postBookMark = async (id) => {
    const data = await postCall(`/api/users/bookmark/${id}`, {});
    dispatch({ type: "GET_BOOKMARKED", payload: data.bookmarks });
  };

  const deleteBookMark = async (id) => {
    const data = await postCall(`/api/users/remove-bookmark/${id}`, {});
    dispatch({ type: "GET_BOOKMARKED", payload: data.bookmarks });
  };
  const findUserId = (username) => {
    let clickedUser = state.users.find((user) => user.username === username);
    dispatch({ type: "GET_USER_ID", payload: clickedUser._id });
  };
  const isMarked = state.bookmarks.findIndex((post) => post._id === item._id);
  return (
    <div className="postcard-container">
      <div className="avatar-content-container">
        <Link
          to={`/user/${item.username}`}
          onClick={() => findUserId(item.username)}
        >
          <div className="duck-avatar-badge duck-avatar-badge-m">
            <img
              src="https://picsum.photos/id/1062/367/267"
              alt=""
              className="duck-avatar-badge-img"
            />
          </div>
        </Link>

        <div className="post-content">
          <p>
            <strong>{`${item.username}${" "}`}</strong>
            {new Date(item.createdAt).getHours()} hours ago
          </p>
          <Link
            to={`/post/${item._id}`}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "black",
            }}
          >
            <p
              onClick={() => {
                getPost(item._id);
                dispatch({ type: "REPLYING", payload: false });
              }}
              className="textContent-container"
            >
              {item.content}
            </p>
          </Link>
        </div>
      </div>
      <div className="user-action-icons-container">
        {likes ? (
          <span>
            <i
              className="fa-regular fa-heart"
              onClick={() =>
                authState.isLoggedIn
                  ? postDislike(item._id)
                  : navigate("/login")
              }
            ></i>
            {likes}
          </span>
        ) : (
          <span>
            <i
              className="fa-regular fa-heart"
              onClick={() =>
                authState.isLoggedIn ? postLike(item._id) : navigate("/login")
              }
            ></i>
            {likes}
          </span>
        )}

        <span>
          <i
            className="fa-regular fa-comment reply-icon"
            onClick={() => {
              dispatch({ type: "REPLYING", payload: true });
              navigate(`/post/${item._id}`);
            }}
          ></i>
          {item.comments && item.comments.length}
        </span>
        <span
          onClick={() =>
            authState.isLoggedIn
              ? navigate(`/edit/${item._id}`)
              : navigate("/login")
          }
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </span>

        {isMarked !== -1 ? (
          <span>
            <i
              className="fa-solid fa-bookmark"
              onClick={() => {
                authState.isLoggedIn
                  ? deleteBookMark(item._id)
                  : navigate("/login");
              }}
            ></i>
          </span>
        ) : (
          <span>
            <i
              className="fa-regular fa-bookmark"
              onClick={() => {
                authState.isLoggedIn
                  ? postBookMark(item._id)
                  : navigate("/login");
              }}
            ></i>
          </span>
        )}

        <span
          onClick={() =>
            authState.isLoggedIn
              ? deletePostHandler(item._id) &&
                alert("Are you sure to delete thid post?")
              : navigate("/login")
          }
        >
          <i className="fa-solid fa-trash"></i>
        </span>
      </div>
    </div>
  );
};
