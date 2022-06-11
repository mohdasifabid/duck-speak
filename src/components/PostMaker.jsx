import "./PostMaker.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { usePostProvider } from "../postProvider";
import { useAuthProvider } from "../authProvider";
import { postCall } from "./ReusableFunctions";

export const PostMaker = () => {
  const { state: authState } = useAuthProvider();
  const { dispatch } = usePostProvider();
  const [newPost, setNewPost] = useState("");

  const publishPostHandler = async () => {
    const data = await postCall("/api/posts", {
      postData: {
        content: newPost,
      },
    });
    dispatch({ type: "GET_POSTS", payload: data.posts });
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
              publishPostHandler();
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
              publishPostHandler();
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
