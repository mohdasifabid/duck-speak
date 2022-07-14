import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuthProvider } from "../authProvider";
import "./SignUp.css";

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
      firstName: name,
      lastName: "",
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
    <div className="signup-container">
      <div className="signup-box">
        <h3>Create new account</h3>
        <input
          type="text"
          className="signup-inputs"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="signup-inputs"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          className="signup-inputs"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="signup-inputs"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="signup-inputs"
          placeholder="confirm password"
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />
        <button className="signup-btn" onClick={signupHandler}>
          Signup
        </button>
        <p>
          Already a user?
          <a className="btn-link" onClick={() => navigate("/login")}>
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};
