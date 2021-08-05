import axios from "axios";
import { getUserSessionStorageItem } from "../utilities/authentication";

const axiosConfig = {
  timeout: 30000,
  headers: {
    // "X-API-VERSION": "v1",
  }
};

const rolesAPI = axios.create(axiosConfig);

// Add a request interceptor to grab the latest token on each API request and inject it into the header of the request.
rolesAPI.interceptors.request.use(function (config) {
  let token = getUserSessionStorageItem("jwt");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export { rolesAPI };
