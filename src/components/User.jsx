import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Postcard } from "./PostCard";
import { usePostProvider } from "../postProvider";
import "./User.css";
import { NavList } from "./NavList";
import { PeoplesList } from "./PeopleList";
export const User = () => {
  const { state } = usePostProvider();
  const [user, setUser] = useState([]);
  useEffect(() => {
    const getUser = async (userId) => {
      const token = localStorage.getItem("encodedToken");
      const response = await axios.get(`/api/users/${userId}`, {
        headers: {
          authorization: token,
        },
      });
      console.log("getting", response);
      if (response.status === 200) {
        setUser(response.data.user);
      }
    };
    getUser(state.userID);
  }, []);

  const follow = async (userId) => {
    const token = localStorage.getItem("encodedToken");
    const response = await axios.post(
      `/api/users/follow/${userId}`,
      {},
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (response.status === 200) {
      setUser(response.data.user);
    }
  };

  return (
    <div className="common-container">
      <NavList />
      <div>
        <Navbar style={{ position: "fixed" }} />
        <div>
          <div className="img-container">
            <img
              className="cover-img"
              src="https://picsum.photos/536/354"
              alt=""
            />
            <img
              className="profile-img"
              src="https://picsum.photos/id/1062/367/267"
              alt=""
            />
          </div>
          <div className="btn-container">
            <button
              className="follow-btn duck-primary-btn-s duck-primary-btn"
              onClick={() => follow(state.userID)}
            >
              Follow
            </button>
          </div>
          <div className="userInfo-container">
            <p className="name-and-userId">
              <strong>{`${user.firstName} ${user.lastName}`}</strong>
              <small>{`@${user.username}`}</small>
            </p>
            <p>Joined May 2022</p>
            <p>
              <span>
                <strong>{user.following}</strong>Following
              </span>
              <span>
                <strong>{user.followers}</strong>Followes
              </span>
            </p>
          </div>
        </div>
        {/* <Postcard /> */}
      </div>
      <PeoplesList />
    </div>
  );
};
