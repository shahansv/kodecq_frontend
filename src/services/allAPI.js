import axiosConfig from "./axiosConfig";
import { baseURL } from "./baseURL";

export const registerUser = async (reqBody) => {
  return await axiosConfig("post", `${baseURL}/register`, reqBody);
};

export const loginUser = async (reqBody) => {
  return await axiosConfig("post", `${baseURL}/login`, reqBody);
};

export const googleLoginAPI = async (reqBody) => {
  return await axiosConfig("post", baseURL + "/googleLogin", reqBody);
};
