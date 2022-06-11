import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthProvider } from "../authProvider";
import "./Login.css";
import { postCall } from "./ReusableFunctions";
export const Login = () => {
  const { state: authState, dispatch: authDispatch } = useAuthProvider();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginHandler = async () => {
    const response = await axios.post("/api/auth/login", {
      username: username,
      password: password,
    });
    if (response.status === 200) {
      authDispatch({ type: "LOGIN_STATUS", payload: true });
      localStorage.setItem("encodedToken", response.data.encodedToken);
      navigate("/home");
    }
  };
  const guestLoginHandler = async () => {
    const response = await axios.post("/api/auth/login", {
      username: "duckspeak",
      password: "duckSpeak123",
    });
    if (response.status === 200) {
      authDispatch({ type: "LOGIN_STATUS", payload: true });
      localStorage.setItem("encodedToken", response.data.encodedToken);
      navigate("/home");
    }
  };
  return (
    <div className="login">
      <div className="login-container">
        <h2>Login to Speak</h2>
        <input
          type="text"
          className="login-inputs"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="login-inputs"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={loginHandler}>
          Login
        </button>
        <button className="login-btn" onClick={guestLoginHandler}>
          Login as guest
        </button>
        <p>
          New user?
          <Link to="/signup">Create account</Link>
        </p>
      </div>
    </div>
  );
};
