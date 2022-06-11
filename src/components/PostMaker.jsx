import { useState } from "react";
import { usePostProvider } from "../postProvider";
import "./PostMaker.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuthProvider } from "../authProvider";
export const PostMaker = () => {
  const { state: authState, dispatch: authDispatch } = useAuthProvider();
  const { state, dispatch } = usePostProvider();
  const [newPost, setNewPost] = useState("");
  const postThePost = async () => {
    const token = localStorage.getItem("encodedToken");
    const response = await axios.post(
      "/api/posts",
      {
        postData: {
          content: newPost,
        },
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (response.status === 201) {
      dispatch({ type: "GET_POSTS", payload: response.data.posts });
    }
  };
  return authState.isLoggedIn ? (
    <div>
      <div className="avatar-textarea-container">
        <Link to="/home">
          <div className="duck-avatar-badge duck-avatar-badge-l">
            <img
              src="https://picsum.photos/id/1062/367/267"
              alt=""
              className="duck-avatar-badge-img"
            />
          </div>
        </Link>
        <textarea
          id="createPostHere"
          style={newPost.length > 150 ? { color: "red" } : {}}
          value={newPost}
          className="textarea"
          placeholder="Whats happening?"
          onChange={(e) => {
            setNewPost(e.target.value);
          }}
        ></textarea>
      </div>
      <div className="bottom-container">
        {newPost === "" ? (
          <button
            style={{ backgroundColor: "gray" }}
            className="speak-btn"
            onClick={() => {
              postThePost();
              setNewPost("");
            }}
            disabled
          >
            speak
          </button>
        ) : (
          <button
            className="speak-btn"
            onClick={() => {
              postThePost();
              setNewPost("");
            }}
          >
            speak
          </button>
        )}
      </div>
    </div>
  ) : null;
};
