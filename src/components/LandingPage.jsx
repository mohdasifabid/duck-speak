import "./LandingPage.css";
import { Link } from "react-router-dom";
import { useAuthProvider } from "../authProvider";
export const LandingPage = () => {
  const { state: authState } = useAuthProvider();
  return (
    <div className="lpage">
      <div className="lpage-content-container">
        <div className="lpage-leftSide">
          <div>
            {authState.isLoggedIn ? (
              <Link to="/home" className="lpage-heading">
                <h1>Speak</h1>
              </Link>
            ) : (
              <Link to="/login" className="lpage-heading">
                <h1>Speak</h1>
              </Link>
            )}
          </div>
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
          <div className="lpage-btn-container">
            <Link to="/signup">
              <button className="lpage-btn">Join Now</button>
            </Link>
          </div>
          <div>
            <p>
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </div>
        <div className="lpage-rightSide">
          <img src="https://picsum.photos/id/1025/367/267" alt="" />
        </div>
      </div>
    </div>
  );
};
