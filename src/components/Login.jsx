import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthProvider } from "../authProvider";
import "./Login.css";
export const Login = () => {
  const { state: authState } = useAuthProvider();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginHandler = async () => {
    const response = await axios.post("/api/auth/login", {
      username: username,
      password: password,
    });
    if (response.status === 200) {
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
          className="login-email"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="login-password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={loginHandler}>
          Login
        </button>

        <p>
          New user?
          <Link to="/signup">Create account</Link>
        </p>
      </div>
    </div>
  );
};
