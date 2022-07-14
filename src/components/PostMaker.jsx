import "./PostMaker.css";
import { useEffect, useRef, useState } from "react";
import { postCall } from "./ReusableFunctions";
import { usePostProvider } from "../postProvider";
import { useAuthProvider } from "../authProvider";
import { GET_POSTS, GET_REF } from "./postActionTypes";

export const PostMaker = () => {
  const { state: authState } = useAuthProvider();
  const { dispatch } = usePostProvider();
  const [newPost, setNewPost] = useState("");
  const postMakerRef = useRef()
  
  const publishPostHandler = async () => {
    const data = await postCall("/api/posts", {
      postData: {
        content: newPost,
      },
    });
    dispatch({ type: GET_POSTS, payload: data.posts });
  };

  useEffect(()=>{
   dispatch({type: GET_REF, payload: postMakerRef})
  },[])

  return authState.isLoggedIn ? (
    <div>
      <div className="sm-postmaker-avatar-and-textarea-container">
        <a className="sm-postmaker-avatar-container">
          <img
            src="https://picsum.photos/id/1062/367/267"
            alt=""
            className="sm-postmaker-avatar"
          />
        </a>
        <textarea 
          ref={postMakerRef}
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
      <div className="sm-postmaker-and-postcard-bottom-container">
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
