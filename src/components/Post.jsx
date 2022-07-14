import { Layout } from "./Layout";
import { Postcard } from "./PostCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCall, postCall } from "./ReusableFunctions";

export const Post = () => {
  const [post, setPost] = useState([]);
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [upVote, setUpVote] = useState([]);
  useEffect(async () => {
    let data = await getCall(`/api/posts/${id}`);
    setPost(data.post);
    setComments(data.post.comments);
  }, []);
  return (
    <Layout>
      <Postcard item={post} key={post._id} post={post} />
      <div>
        <div className="avatar-textarea-container">
          <textarea
            value={newComment}
            className="textarea"
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
        </div>
        <div className="sm-postmaker-and-postcard-bottom-container">
          {newComment === "" ? (
            <button
              disabled
              style={{ backgroundColor: "gray" }}
              className="speak-btn"
              onClick={async () => {
                let commentData = await postCall(`/api/comments/add/${id}`, {
                  commentData: { text: newComment },
                });
                setComments(commentData.comments);
                setNewComment("");
              }}
            >
              reply
            </button>
          ) : (
            <button
              className="speak-btn"
              onClick={async () => {
                let commentData = await postCall(`/api/comments/add/${id}`, {
                  commentData: { text: newComment },
                });
                setComments(commentData.comments);
                setNewComment("");
              }}
            >
              reply
            </button>
          )}
        </div>
      </div>
      {comments &&
        comments.map((comment) => {
          return (
            <div className="comment-card " key={comment._id}>
              <img
                src="https://picsum.photos/id/1062/367/267"
                alt=""
                className="duck-avatar-badge-img"
              />
              <p className="comment-card-username">{comment.username}</p>
              <p className="comment-card-comment">{comment.text}</p>
              <div className="comment-card-bottom">
                <span
                  onClick={async () => {
                    let resp = await postCall(
                      `/api/comments/upvote/${id}/${comment._id}`,
                      {}
                    );
                    let result = resp.comments.filter((item) => {
                      if (item._id === comment._id) {
                        return item.votes.upvotedBy;
                      }
                    });
                    setUpVote(result);
                  }}
                >
                  <i className="fa-regular fa-thumbs-up"></i>
                  {upVote && upVote.length}
                </span>
                <span
                  onClick={async () => {
                    let resp = await postCall(
                      `/api/comments/downvote/${id}/${comment._id}`,
                      {}
                    );
                    let result = resp.comments.filter((item) => {
                      if (item._id === comment._id) {
                      }
                    });
                  }}
                >
                  <i className="fa-regular fa-thumbs-down"></i>
                </span>

                <span
                  onClick={() => {
                    setUpdateThisComment(comment);
                    setEditing(true);
                    setTextToUpdateThisCommenet(comment.text);
                  }}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </span>

                <span
                  onClick={async () => {
                    let resp = await postCall(
                      `/api/comments/delete/${id}/${comment._id}`
                    );
                    setComments(resp.comments);
                  }}
                >
                  <i className="fa-solid fa-trash"></i>
                </span>
              </div>
            </div>
          );
        })}
    </Layout>
  );
};
