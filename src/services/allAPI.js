import axiosConfig from "./axiosConfig";
import { baseURL, googleAPI, pistonAPI } from "./baseURL";

export const registerUser = async (reqBody) => {
  return await axiosConfig("post", `${baseURL}/register`, reqBody);
};

export const loginUser = async (reqBody) => {
  return await axiosConfig("post", `${baseURL}/login`, reqBody);
};

export const googleLoginAPI = async (reqBody) => {
  return await axiosConfig("post", baseURL + "/googleLogin", reqBody);
};

export const executeCode = async (reqBody) => {
  return await axiosConfig("post", `${pistonAPI}/execute`, reqBody);
};

export const getGoogleUserInfo = async (reqHeader) => {
  return await axiosConfig("get", `${googleAPI}`, "", reqHeader);
};
