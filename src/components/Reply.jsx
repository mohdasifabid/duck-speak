import { useParams } from "react-router-dom";
import { useState } from "react";
import "./Reply.css";
import axios from "axios";
export const Reply = ({ item }) => {
  const { id } = useParams();

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
          onClick={() => postComment(id)}
        >
          reply
        </button>
      </div>
    </div>
  );
};
