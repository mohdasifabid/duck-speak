import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "../authProvider";
import { usePostProvider } from "../postProvider";
import "./NavList.css";
export const NavList = () => {
  const navigate = useNavigate();
  const { state: authState } = useAuthProvider();
  const {state} = usePostProvider()
  return (
    <div className="navlist">
      <div className="navlist-content-container">
        <a onClick={() => navigate("/")}>
          <i className="fa-solid fa-house"></i>
          Home
        </a>
        <a
          onClick={() =>
            authState.isLoggedIn ? navigate("/bookmarked") : navigate("/login")
          }
        >
          <i className="fa-solid fa-bookmark"></i>
          Bookmarks
        </a>
        <a
          onClick={() =>
            authState.isLoggedIn ? navigate("/login") : navigate("/login")
          }
        >
          <i className="fa-solid fa-user"></i>
          Profile
        </a>
        <button
          className="navlist-btn"
          href="#createPostHere"
          onClick={() =>{
            if(authState.isLoggedIn){
              state.postMakerRef.current.focus()
            }else{
              navigate("/login")
            }
          }
          }
        >
          Create New Post
        </button>
      </div>
    </div>
  );
};
