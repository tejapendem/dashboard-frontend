// // src/api/axios.js
// import axios from "axios"; 

// const instance = axios.create({
//   baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8000",
// });

// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default instance;



/// local host axios instance

// // src/utils/axiosInstance.js
// import axios from "axios";

// // Create instance
// const instance = axios.create({
//   baseURL: "http://localhost:8000/api/",
// });

// // Request interceptor to attach access token
// instance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("access");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor to handle token expiration and refresh
// instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       localStorage.getItem("refresh")
//     ) {
//       originalRequest._retry = true;
//       try {
//         const res = await axios.post("http://localhost:8000/api/token/refresh/", {
//           refresh: localStorage.getItem("refresh"),
//         });

//         localStorage.setItem("access", res.data.access);

//         originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
//         return instance(originalRequest);
//       } catch (refreshError) {
//         localStorage.removeItem("access");
//         localStorage.removeItem("refresh");
//         window.location.href = "/login"; // Redirect to login if refresh fails
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default instance;

// src/utils/axiosInstance.js
import axios from "axios";

// Normalize baseURL by removing trailing slash from env variable
const baseURL = `${process.env.REACT_APP_API_URL.replace(/\/$/, "")}/api/`;

const instance = axios.create({ baseURL });

// Attach access token to each request
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token refresh on 401
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refresh")
    ) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axios.post(`${baseURL}token/refresh/`, {
          refresh: localStorage.getItem("refresh"),
        });

        const newAccess = refreshResponse.data.access;
        localStorage.setItem("access", newAccess);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return instance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;

