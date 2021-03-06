import { createContext, useContext, useReducer } from "react";
export const PostContext = createContext();
export const usePostProvider = () => useContext(PostContext);
import { GET_BOOKMARKED, GET_POST, GET_POSTS, GET_USERS, GET_USER_ID, GET_REF, REPLYING } from "./components/postActionTypes";

const reducerFunction = (state, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case REPLYING:
      return {
        ...state,
        reply: action.payload,
      };
    case GET_BOOKMARKED:
      return {
        ...state,
        bookmarks: action.payload,
      };
    case GET_USER_ID:
      return {
        ...state,
        userID: action.payload,
      };
    case GET_REF: 
    return {
      ...state,
      postMakerRef: action.payload
    }
    default:
      return state;
  }
};
const initialState = {
  posts: [],
  post: {},
  users: [],
  reply: false,
  bookmarks: [],
  userID: "",
  postMakerRef: {}
};
export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunction, initialState);

  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};
