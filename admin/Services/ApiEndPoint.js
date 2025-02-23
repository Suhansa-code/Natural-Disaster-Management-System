import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000",
  Headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const get = (url, params) => instance.get(url, { params });
export const post = (url, data) => instance.post(url, data);
export const put = (url, data) => instance.put(url, data);
export const delet = (url) => instance.delete(url);

export const updateUser = async (userId = "", formData) => {
  if (userId === "") {
    throw new Error("User ID is required to update user data");
  }
  const response = await instance.put(`/api/auth/update/${userId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Set the content type for form data
    },
  });
  return response.data; // Return the response data
};

export const updateAdmin = async (userId = "", formData) => {
  console.log(userId);
  const response = await instance.put(`/api/admin/update/${userId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Set the content type for form data
    },
  });
  return response.data; // Return the response data
};

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    console.log("Intecpert Respond", response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
