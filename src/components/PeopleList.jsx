import { useState } from "react";
import { usePostProvider } from "../postProvider";
import "./PeopleList.css";

export const PeoplesList = () => {
  const { state } = usePostProvider();
  const [userInput, setUserInput] = useState("");

  const filterByUsername = (data, searchQuery) => {
    if (searchQuery.length > 0) {
      return data.filter((user) =>
        user.username.includes(userInput.toLowerCase())
      );
    }
    return data;
  };
  let filteredUsers = filterByUsername(state.users, userInput);
  return (
    <div className="pList">
      <div className="pList-input-container">
        <input
          type="text"
          className="pList-input"
          placeholder="search people"
          onChange={(e) => setUserInput(e.target.value)}
        />
      </div>
      <div className="pList-small-container">
        <div className="pList-heading">
          <p>Who to Follow</p>
        </div>
        <div className="pList-users">
          {filteredUsers.map((user) => {
            return (
              <div className="pList-single-user" key={user._id}>
                <div className="pList-name-and-img">
                  <img
                    className="pList-img"
                    src="https://picsum.photos/id/1027/367/267"
                    alt=""
                  />
                  <div className="pList-names">
                    <small>{`${user.firstName} ${user.lastName}`}</small>
                    <small className="pList-username">{`@${user.username}`}</small>
                  </div>
                </div>
                <p className="pList-follow">Follow +</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
