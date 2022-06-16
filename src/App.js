import "./App.css";
import { useEffect } from "react";
import { Edit } from "./components/Edit";
import { User } from "./components/User";
import { Post } from "./components/Post";
import { Login } from "./components/Login";
import { Signup } from "./components/SignUp";
import { Home } from "./components/HomePage";
import { usePostProvider } from "./postProvider";
import { useAuthProvider } from "./authProvider";
import { Routes, Route } from "react-router-dom";
import { PostMaker } from "./components/PostMaker";
import { BookMarked } from "./components/BookMarked";
import { LandingPage } from "./components/LandingPage";
import { getCall } from "./components/ReusableFunctions";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  const { state: authState, dispatch: authDispatch } = useAuthProvider();
  const { dispatch } = usePostProvider();

  useEffect(async () => {
    const token = localStorage.getItem("encodedToken");
    if (token) {
      authDispatch({ type: "LOGIN_STATUS", payload: true });
    } else {
      authDispatch({ type: "LOGIN_STATUS", payload: false });
    }
    let data = await getCall("/api/users/");
    dispatch({ type: "GET_USERS", payload: data.users });
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/user/:username" element={<User />} />
        <Route path="/postmaker" element={<PostMaker />} />
        <Route path="/bookmarked" element={<BookMarked />} />
        <Route element={<PrivateRoute />}>
          <Route path="/post/:id" element={<Post />} />
        </Route>
        {authState.isLoggedIn ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<LandingPage />} />
        )}
        {authState.isLoggedIn ? (
          <Route path="/login" element={<Home />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
