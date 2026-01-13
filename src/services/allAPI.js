import axiosConfig from "./axiosConfig";
import { baseURL, googleAPI, pistonAPI } from "./baseURL";

export const registerUser = async (reqBody) => {
  return await axiosConfig("post", `${baseURL}/register`, reqBody);
};

export const loginUser = async (reqBody) => {
  return await axiosConfig("post", `${baseURL}/login`, reqBody);
};

export const googleLoginAPI = async (reqBody) => {
  return await axiosConfig("post", `${baseURL}/googleLogin`, reqBody);
};

export const executeCode = async (reqBody) => {
  return await axiosConfig("post", `${pistonAPI}/execute`, reqBody);
};

export const getGoogleUserInfo = async (reqHeader) => {
  return await axiosConfig("get", `${googleAPI}`, "", reqHeader);
};

export const createWorkspace = async (reqHeader) => {
  return await axiosConfig("post", `${baseURL}/createWorkspace`, "", reqHeader);
};

export const checkWorkspaceExist = async (code, reqHeader) => {
  return await axiosConfig(
    "get",
    `${baseURL}/checkWorkspaceExist/${code}`,
    "",
    reqHeader
  );
};

export const getUserDetails = async (reqHeader) => {
  return await axiosConfig("get", `${baseURL}/userDetails`, "", reqHeader);
};

export const editProfile = async (id, reqBody, reqHeader) => {
  return await axiosConfig(
    "patch",
    `${baseURL}/editProfile/${id}`,
    reqBody,
    reqHeader
  );
};

export const changePassword = async (id, reqBody, reqHeader) => {
  return await axiosConfig(
    "patch",
    `${baseURL}/changePassword/${id}`,
    reqBody,
    reqHeader
  );
};

export const removeProfilePhoto = async (id, reqHeader) => {
  return await axiosConfig(
    "patch",
    `${baseURL}/removeProfilePhoto/${id}`,
    "",
    reqHeader
  );
};

export const changeProfilePhoto = async (id, reqBody, reqHeader) => {
  return await axiosConfig(
    "patch",
    `${baseURL}/changeProfilePhoto/${id}`,
    reqBody,
    reqHeader
  );
};

export const addQuestion = async (reqBody, reqHeader) => {
  return await axiosConfig(
    "post",
    `${baseURL}/addQuestion`,
    reqBody,
    reqHeader
  );
};

export const getQuestions = async (reqHeader, searchKey) => {
  return await axiosConfig(
    "get",
    `${baseURL}/getQuestions/?search=${searchKey}`,
    "",
    reqHeader
  );
};

export const viewQuestion = async (id, reqHeader) => {
  return await axiosConfig(
    "get",
    `${baseURL}/viewQuestion/${id}`,
    "",
    reqHeader
  );
};

export const addAnswer = async (id, reqBody, reqHeader) => {
  return await axiosConfig(
    "post",
    `${baseURL}/addAnswer/${id}`,
    reqBody,
    reqHeader
  );
};

export const getMyQuestions = async (id, reqHeader) => {
  return await axiosConfig(
    "get",
    `${baseURL}/getMyQuestions/${id}`,
    "",
    reqHeader
  );
};

export const deleteQuestion = async (id, reqHeader) => {
  return await axiosConfig(
    "delete",
    `${baseURL}/deleteQuestion/${id}`,
    "",
    reqHeader
  );
};

export const editQuestion = async (id, reqBody, reqHeader) => {
  return await axiosConfig(
    "patch",
    `${baseURL}/editQuestion/${id}`,
    reqBody,
    reqHeader
  );
};

export const deleteAnswer = async (id, reqHeader) => {
  return await axiosConfig(
    "delete",
    `${baseURL}/deleteAnswer/${id}`,
    "",
    reqHeader
  );
};
