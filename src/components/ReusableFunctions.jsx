import axios from "axios";

export async function getCall(endPoint) {
  try {
    const token = localStorage.getItem("encodedToken");
    const response = await axios.get(endPoint, {
      headers: {
        authorization: token,
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export const postCall = async (endPoint, rqstBody) => {
  const token = localStorage.getItem("encodedToken");
  const response = await axios.post(endPoint, rqstBody, {
    headers: {
      authorization: token,
    },
  });
  if (response.status === 201) {
    return response.data;
  }
};
