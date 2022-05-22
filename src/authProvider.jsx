import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const useAuthProvider = () => useContext(AuthContext);

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_STATUS":
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case "SIGN_UP_STATUS":
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  isLoggedIn: false,
  isSignedUp: false,
};
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuthProvider, AuthProvider };
