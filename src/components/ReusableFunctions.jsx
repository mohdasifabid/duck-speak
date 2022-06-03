import axios from "axios";
import { usePostProvider } from "../postProvider";
// const { dispatch } = usePostProvider();

export async function getCall(endPoint, getType) {
  const token = localStorage.getItem("encodedToken");
  const response = await axios.get(`${endPoint}`, {
    headers: {
      authorization: token,
    },
  });
  if (response.status === 201 || response.status === 200) {
    dispatch({ type: `${getType}`, payload: response.data });
  }
}
