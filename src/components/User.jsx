import "./User.css";
import { Layout } from "./Layout";
import { usePostProvider } from "../postProvider";
import { useParams } from "react-router-dom";
import { postCall } from "./ReusableFunctions";
import { useState } from "react";

export const User = () => {
  const { username } = useParams();
  const { state, dispatch } = usePostProvider();
  const foundUser = state.users.find((user) => user.username === username);
  const [selectedUser, setSelectedUser] = useState(foundUser);
  const [followed, setFollowed] = useState(false);

  const followHandler = async (userId) => {
    const data = await postCall(`/api/users/follow/${userId}`, {});
    setSelectedUser(data.followUser);
    setFollowed(true);
  };
  const unfollowHandler = async (userId) => {
    const data = await postCall(`/api/users/unfollow/${userId}`, {});
    setSelectedUser(data.followUser);
    setFollowed(false);
  };
  return (
    <Layout>
      <div className="img-container">
        <img className="cover-img" src="https://picsum.photos/536/354" alt="" />
        <img
          className="profile-img"
          src="https://picsum.photos/id/1062/367/267"
          alt=""
        />
      </div>
      <div className="btn-container">
        {followed ? (
          <button
            className="follow-btn duck-primary-btn-s duck-primary-btn"
            onClick={() => unfollowHandler(selectedUser._id)}
          >
            Unfollow
          </button>
        ) : (
          <button
            className="follow-btn duck-primary-btn-s duck-primary-btn"
            onClick={() => followHandler(selectedUser._id)}
          >
            Follow
          </button>
        )}
      </div>
      <div className="userInfo-container">
        <p className="name-and-userId">
          <strong>{`${selectedUser.firstName} ${selectedUser.lastName}`}</strong>
          <small>{`@${selectedUser.username}`}</small>
        </p>
        <p>Joined May 2022</p>
        <p>
          <span>
            <strong>{selectedUser.following.length}</strong>Following
          </span>
          <span>
            <strong>{selectedUser.followers.length}</strong>Followers
          </span>
        </p>
      </div>
    </Layout>
  );
};
