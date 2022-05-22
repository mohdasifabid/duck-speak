import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { PostProvider } from "./postProvider";
import { AuthProvider } from "./authProvider";
import {BrowserRouter} from "react-router-dom"

// Call make Server
makeServer();
import { Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
    <PostProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PostProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
