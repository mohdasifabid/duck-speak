import { useParams } from "react-router-dom";
import { useState } from "react";
import "./Reply.css";
import axios from "axios";
export const Reply = ({ item }) => {
  const [comment, setComment] = useState("");
  const postComment = async (itemId) => {
    const token = localStorage.getItem("encodedToken");
    const response = await axios.post(`/api/comments/add/${itemId}`, [
      {
        commentData: comment,
      },

      {
        headers: {
          authorization: token,
        },
      },
    ]);
    console.log(response);
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
        <button
          className="duck-primary-btn-s duck-primary-btn"
          onClick={() => postComment(item.id)}
        >
          reply
        </button>
      </div>
    </div>
  );
};
