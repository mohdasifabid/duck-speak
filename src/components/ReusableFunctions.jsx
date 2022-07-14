import axios from "axios";
const token = localStorage.getItem("encodedToken");

async function getCall(endPoint) {
  try {
    const response = await axios.get(endPoint, {
      headers: {
        authorization: token,
      },
    });
    if (response.status === 200 || response.status === 201) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}

const postCall = async (endPoint, rqstBody) => {
  const response = await axios.post(endPoint, rqstBody, {
    headers: {
      authorization: token,
    },
  });
  if (response.status === 200 || response.status === 201) {
    return response.data;
  }
};

const deleteCall = async (endPoint) => {
  const response = await axios.delete(endPoint, {
    headers: {
      authorization: token,
    },
  });
  if (response.status === 200 || response.status === 201) {
    return response.data;
  }
};

export { getCall, postCall, deleteCall };
