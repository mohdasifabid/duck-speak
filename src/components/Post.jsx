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
  const [commId, setCommId] = useState("");
  const [userName, setUserName] = useState("");
  const [updateThisComment, setUpdateThisComment] = useState({});
  const [editing, setEditing] = useState(false);
  const [textToUpdateThisCommenet, setTextToUpdateThisCommenet] = useState("");

  useEffect(async () => {
    const data = await getCall(`/api/posts/${id}`);
    setPost(data.post);
    setComments(data.post.comments);
  }, [commId, userName]);

  const upVoteHandler = async (id, commentId) => {
    const resp = await postCall(`/api/comments/upvote/${id}/${commentId}`, {});
    setCommId(commentId);
  };
  const downVoteHandler = async (id, commentId) => {
    const resp = await postCall(
      `/api/comments/downvote/${id}/${commentId}`,
      {}
    );
    const foundVotedComment = resp.comments.find(
      (item) => item._id === commentId
    );
    setUserName(foundVotedComment.username);
  };
  return (
    <Layout>
      <Postcard item={post} key={post._id} post={post} />
      {editing ? (
        <div>
          <div className="avatar-textarea-container">
            <textarea
              value={textToUpdateThisCommenet}
              className="textarea"
              onChange={(e) => setTextToUpdateThisCommenet(e.target.value)}
            ></textarea>
          </div>
          <div className="sm-postmaker-and-postcard-bottom-container">
            <button
              disabled={textToUpdateThisCommenet.length === 0}
              style={textToUpdateThisCommenet.length === 0 ? { backgroundColor: "gray" } : {}}
              className="speak-btn"
              onClick={async () => {
                let commentData = await postCall(`/api/comments/edit/${id}/${updateThisComment._id}`, {
                  commentData: { text: textToUpdateThisCommenet },
                });
                setComments(commentData.comments);
                setTextToUpdateThisCommenet("");
                setEditing(false)
              }}
            >
              update
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="avatar-textarea-container">
            <textarea
              value={newComment}
              className="textarea"
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
          </div>
          <div className="sm-postmaker-and-postcard-bottom-container">
            <button
              disabled={newComment.length === 0}
              style={newComment.length === 0 ? { backgroundColor: "gray" } : {}}
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
          </div>
        </div>
      )}
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
                <span onClick={() => upVoteHandler(id, comment._id)}>
                  <i className="fa-regular fa-thumbs-up"></i>
                  {comment.votes.upvotedBy.length > 0 &&
                    comment.votes.upvotedBy.length}
                </span>

                <span onClick={() => downVoteHandler(id, comment._id)}>
                  <i className="fa-regular fa-thumbs-down"></i>
                  {comment.votes.downvotedBy.length > 0 &&
                    comment.votes.downvotedBy.length}
                </span>

                <span
                  onClick={() => {
                    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
                    if(comment.username !== currentUser.username){
                      return setEditing(false)
                    }
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
