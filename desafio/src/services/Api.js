
import axios from "axios";

const Api = axios.create({
  baseURL: "/api/1"
});

Api.interceptors.request.use(async config => {
    config.headers.Authorization = `123456789`;
  return config;
});

export default Api;