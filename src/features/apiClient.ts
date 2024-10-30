import axios from "axios";

export const apiClient = axios.create({
  // baseURL: import.meta.env.API_BASE_URL,
  baseURL: "https://games-bot.spasibosb.ru/api",
});
