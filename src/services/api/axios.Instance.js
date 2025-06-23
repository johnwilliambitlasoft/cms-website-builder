import axios from "axios";

export const API_URL = process.env.API_URL
  ? process.env.API_URL
  : "http://localhost:3000";

const getHeaders = () => {
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  if (user) {
    return {
      "auth-token": user["token"],
    };
  } else {
    return {};
  }
};

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  function (request) {
    const headers = getHeaders();
    request.headers = {
      ...request.headers,
      ...headers,
    };

    return request;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosInstance;
