import "./User.css";
import { Layout } from "./Layout";
import { usePostProvider } from "../postProvider";

export const User = () => {
  const { state } = usePostProvider();
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
        <button
          className="follow-btn duck-primary-btn-s duck-primary-btn"
          // onClick={() => follow(user._id)}
        >
          Follow
        </button>
      </div>
      <div className="userInfo-container">
        <p className="name-and-userId">
          {/* <strong>{`${user.firstName} ${user.lastName}`}</strong> */}
          {/* <small>{`@${user.username}`}</small> */}
        </p>
        <p>Joined May 2022</p>
        <p>
          <span>{/* <strong>{user.following}</strong>Following */}</span>
          <span>{/* <strong>{user.followers}</strong>Followes */}</span>
        </p>
      </div>
    </Layout>
  );
};
