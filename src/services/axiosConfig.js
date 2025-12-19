import axios from "axios";

const axiosConfig = async (method, url, reqBody, reqHeader) => {
 let configObject = {
   method: method,
   url: url,
   data: reqBody,
   headers: reqHeader,
 };

  return await axios(configObject)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

export default axiosConfig;
