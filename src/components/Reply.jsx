import "./Reply.css";
import { useState } from "react";
import { postCall } from "./ReusableFunctions";

export const Reply = ({ item }) => {
  const [comment, setComment] = useState("");
  const postComment = async (itemId) => {
    const data = await postCall(`/api/comments/add/${itemId}`, {
      commentData: comment,
    });
  };

  return (
    <div>
      <div className="avatar-textarea-container">
        <textarea
          className="textarea"
          placeholder="type your comment"
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <div className="bottom-container">
        <button className="speak-btn" onClick={() => postComment(item.id)}>
          reply
        </button>
      </div>
    </div>
  );
};
