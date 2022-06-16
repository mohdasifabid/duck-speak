import { Layout } from "./Layout";
import { useEffect, useState } from "react";
import { getCall, postCall } from "./ReusableFunctions";
import { useNavigate, useParams } from "react-router-dom";

export const Edit = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();

  useEffect(async () => {
    const data = await getCall(`/api/posts/${id}`);
    setPost(data.post);
  }, []);

  const updatedPostHandler = async (id) => {
    const data = await postCall(`/api/posts/edit/${id}`, {
      postData: post,
    });
    navigate("/home");
  };

  return (
    <Layout>
      <div className="avatar-textarea-container">
        <textarea
          id="createPostHere"
          value={post.content}
          className="textarea"
          placeholder="Whats happening?"
          onChange={(e) => {
            setPost({ ...post, content: e.target.value });
          }}
        ></textarea>
      </div>
      <div className="sm-sm-postmaker-and-postcard-bottom-container">
        <button className="speak-btn" onClick={() => updatedPostHandler(id)}>
          update
        </button>
      </div>
    </Layout>
  );
};
