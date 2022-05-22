import { useParams } from "react-router-dom";
import "./Reply.css";
export const Reply = ({ item }) => {
  const { id } = useParams();
  return (
    <div>
      <div className="avatar-textarea-container">
        <textarea
          className="textarea"
          placeholder="Whats happening?"
        ></textarea>
      </div>
      <div className="bottom-container">
        <button className="duck-primary-btn-s duck-primary-btn">reply</button>
      </div>
    </div>
  );
};
