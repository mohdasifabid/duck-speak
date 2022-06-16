import "./LandingPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthProvider } from "../authProvider";
export const LandingPage = () => {
  const navigate = useNavigate();
  const { state: authState } = useAuthProvider();
  return (
    <div className="sm-lpage-background">
      <div className="sm-lpage">
        <div className="sm-lpage-content-container">
          <div className="lpage-leftSide">
            <a
              className="sm-lpage-heading"
              onClick={() => {
                authState.isLoggedIn ? navigate("/home") : navigate("/login");
              }}
            >
              Speak
            </a>
            <div>
              <p>
                <strong>FOLLOW</strong>
                <small className="small">PEOPLE AROUND THE GLOBE</small>
              </p>
              <p>
                <strong>CONNECT</strong>
                <small className="small">WITH YOUR FRIENDS</small>
              </p>
              <p>
                <strong>SHARE</strong>
                <small className="small">WHAT YOU THINKING</small>
              </p>
            </div>
            <button
              className="sm-lpage-btn"
              onClick={() => navigate("/signup")}
            >
              Join Now
            </button>
            {/* <div> */}
            <p className="sm-login-here-container">
              Already have an account?{" "}
              <a
                className="sm-lpage-login-link"
                onClick={() => navigate("/login")}
              >
                Login here
              </a>
            </p>
            {/* </div> */}
          </div>
          <div className="lpage-rightSide">
            <img src="https://picsum.photos/id/1025/367/267" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
