import axios from "axios";

export const apiClient = axios.create({
  // baseURL: import.meta.env.API_BASE_URL,
  baseURL: "https://nse-work.ru/test/ssb/api",
});
