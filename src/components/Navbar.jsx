import { Link } from "react-router-dom";
import { useAuthProvider } from "../authProvider";
export const Navbar = () => {
  const { state: authState } = useAuthProvider();
  return (
    <div className="duck-navbar-container">
      <Link to="/" className="duck-navbar-brand duck-navbar-item">
        speak
      </Link>
      {authState.isLoggedIn ? (
        <a
          href=""
          className="duck-navbar-home duck-navbar-item"
          onClick={() => localStorage.removeItem("encodedToken")}
        >
          logout
        </a>
      ) : (
        <Link to="/login" className="duck-navbar-home duck-navbar-item">
          login
        </Link>
      )}
    </div>
  );
};
