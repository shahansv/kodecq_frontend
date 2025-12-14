import axios from "axios";

const axiosConfig = async (method, url, reqBody) => {
  let configObject = {
    method: method,
    url: url,
    data: reqBody,
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
