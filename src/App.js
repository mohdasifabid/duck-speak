import "./App.css";
import {Routes, Route} from "react-router-dom"
import { Home } from "./components/HomePage";
import { Login } from "./components/Login";
import { useEffect } from "react";
import { useAuthProvider } from "./authProvider";
import { Signup } from "./components/SignUp";
import { Post } from "./components/Post";
import { PrivateRoute } from "./components/PrivateRoute";
import { PostMaker } from "./components/PostMaker";
import { Edit } from "./components/Edit";
import { Reply } from "./components/Reply";
import { User } from "./components/User";
import { BookMarked } from "./components/BookMarked";
import { LandingPage } from "./components/LandingPage";
import axios from "axios";
import { usePostProvider } from "./postProvider";

function App() {
  const {state: authState, dispatch: authDispatch} = useAuthProvider();
  const {dispatch} = usePostProvider()
  
  useEffect(()=>{
   const token = localStorage.getItem("encodedToken")
   if(token){
     authDispatch({type: "LOGIN_STATUS", payload: true})
   }else{
    authDispatch({type: "LOGIN_STATUS", payload: false})
   }
   const getUser = async () => {
     const response = await axios.get(`/api/users/`, {
       headers: {
         authorization: token,
       },
     });
     if(response.status === 200){
       dispatch({type: "GET_USERS", payload: response.data.users})
     }
   };
   getUser();
  
  },[])


  return ( 
    <div>
    <Routes>
      {
     authState.isLoggedIn ? <Route path="/" element={<Home/>}/> : <Route path="/" element={<LandingPage/>}/>
       
      }
      <Route path="/home" element={<Home/>}/>
      <Route path="/signup" element={<Signup/>}/>
      {
        authState.isLoggedIn ?  <Route path="/login" element={<Home/>}/> :<Route path="/login" element={<Login/>}/>
      }
      <Route element={<PrivateRoute/>}>
        <Route path="/post/:id" element={<Post/>}/>
      </Route>
      <Route  path="/user/:username" element={<User/>}/>
      <Route  path="/postmaker" element={<PostMaker/>}/>
      <Route  path="/edit/:id" element={<Edit />}/>
      <Route  path="/reply/:id" element={<Reply/>}/>
      <Route  path="/bookmarked" element={<BookMarked/>}/>
    </Routes>
    </div>

  )
}

export default App;
