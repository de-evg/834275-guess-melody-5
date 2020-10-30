import axios from "axios";

const BACKEND_URL = `https://5.react.pages.academy/guess-melody`;
const REQUST_TIMEOUT = 5000;

const HttpCode = {
  UNAUTHORIZED: 401
};

const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUST_TIMEOUT,
    withCredentials: true
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const {response} = err;

    if (response.status === HttpCode.UNAUTHORIZED) {
      onUnauthorized();
      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};

export default createAPI;
