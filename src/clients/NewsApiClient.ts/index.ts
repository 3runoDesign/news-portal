import axios, { AxiosInstance } from "axios";

const baseURL = "https://api.my-domain.com/";

const newsPostApi: AxiosInstance = axios.create({
  baseURL,
});

export default newsPostApi;
