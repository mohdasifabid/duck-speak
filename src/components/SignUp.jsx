import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Navbar } from "./Navbar";
import { useAuthProvider } from "../authProvider";

export const Signup = () => {
  const { dispatch: authDispatch } = useAuthProvider();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const navigate = useNavigate();

  const signupHandler = async () => {
    const response = await axios.post("/api/auth/signup", {
      name: name,
      email: email,
      username: username,
      password: password,
    });
    if (response.status === 201) {
      localStorage.setItem("encodedToken", response.data.encodedToken);
      authDispatch({ type: "SIGN_UP_STATUS", payload: true });
      navigate("/login");
    }
  };
  return (
    <div className="login">
      {/* <Navbar /> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          border: "3px solid var(--secondary-color)",
          padding: "2rem",
          margin: "2rem",
        }}
      >
        <h2>Create a new account</h2>
        <input
          type="text"
          className="login-name"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="login-email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          className="login-name"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="login-password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="login-password"
          placeholder="confirm password"
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />
        <button className="login-btn" onClick={signupHandler}>
          Signup
        </button>
        <p>
          Already a user?
          <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};
