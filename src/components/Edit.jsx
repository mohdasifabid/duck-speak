import axios from "axios";
import { Layout } from "./Layout";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Edit = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const getPost = async (id) => {
      const token = localStorage.getItem("encodedToken");
      const response = await axios.get(`/api/posts/${id}`, {
        headers: {
          authorization: token,
        },
      });
      if (response.status === 200) {
        setPost(response.data.post);
      }
    };
    getPost(id);
  }, []);

  const postEditedPost = async (id) => {
    const token = localStorage.getItem("encodedToken");
    const response = await axios.post(
      `/api/posts/edit/${id}`,
      {
        postData: post,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (response.status === 201) {
      navigate("/home");
    }
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
      <div className="bottom-container">
        <button className="speak-btn" onClick={() => postEditedPost(id)}>
          update
        </button>
      </div>
    </Layout>
  );
};
