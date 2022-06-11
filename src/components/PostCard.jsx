import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usePostProvider } from "../postProvider";
import { useAuthProvider } from "../authProvider";
import "./PostCard.css";

export const Postcard = ({ item }) => {
  const { state, dispatch } = usePostProvider();
  const { state: authState, dispatch: authDispatch } = useAuthProvider();
  const [likes, setLikes] = useState(null);
  const navigate = useNavigate();

  const getPost = async (id) => {
    const token = localStorage.getItem("encodedToken");
    const response = await axios.get(`/api/posts/${id}`, {
      headers: {
        authorization: token,
      },
    });
    if (response.status === 200) {
      dispatch({ type: "GET_POST", payload: response.data.post });
    }
  };
  const deletePostHandler = async (id) => {
    const token = localStorage.getItem("encodedToken");
    const response = await axios.delete(`/api/posts/${id}`, {
      headers: {
        authorization: token,
      },
    });
    if (response.status === 201) {
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
    }
  };
  const postLike = async (id) => {
    const token = localStorage.getItem("encodedToken");
    const response = await axios.post(
      `/api/posts/like/${id}`,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (response.status === 201) {
      const getPost = async (id) => {
        const response = await axios.get(`/api/posts/${id}`, {
          headers: {
            authorization: token,
          },
        });
        if (response.status === 200) {
          setLikes(response.data.post.likes.likeCount);
        }
      };
      getPost(id);
    }
  };

  const postDislike = async (id) => {
    const token = localStorage.getItem("encodedToken");
    const response = await axios.post(
      `/api/posts/dislike/${id}`,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (response.status === 201) {
      const getPost = async (id) => {
        const response = await axios.get(`/api/posts/${id}`, {
          headers: {
            authorization: token,
          },
        });
        if (response.status === 200) {
          setLikes(response.data.post.likes.likeCount);
        }
      };
      getPost(id);
    }
  };

  const postBookMark = async (id) => {
    const token = localStorage.getItem("encodedToken");
    const response = await axios.post(
      `/api/users/bookmark/${id}`,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (response.status === 200) {
      dispatch({ type: "GET_BOOKMARKED", payload: response.data.bookmarks });
    }
  };

  const deleteBookMark = async (id) => {
    const token = localStorage.getItem("encodedToken");
    const response = await axios.post(
      `/api/users/remove-bookmark/${id}`,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (response.status === 200) {
      dispatch({
        type: "GET_BOOKMARKED",
        payload: response.data.bookmarks,
      });
    }
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
