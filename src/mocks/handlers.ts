import { http, HttpResponse, delay } from "msw";

export const handlers = [
  http.all("*", async () => {
    console.log(process.env.NODE_ENV);
    await delay(process.env.NODE_ENV === "development" ? 500 : 0);
  }),

  // Обработчик GET-запроса на получение кнопок
  http.get("/api/button", () => {
    return HttpResponse.json([
      { id: 123, name: "First button" },
      { id: 232, name: "Second button" },
      { id: 312, name: "Third button" },
      { id: 412, name: "Fourth button" },
    ]);
  }),

  // Обработчик POST-запроса на добавление кнопки
  http.post("/api/button", () => {
    return HttpResponse.json({ response: "success" });
  }),

  // Обработчик PATCH-запроса на изменение порядка кнопок
  http.patch("/api/button", () => {
    return HttpResponse.json({ response: "success" });
  }),

  // Обработчик DELETE-запроса на удаление кнопки
  http.delete("/api/button", () => {
    return HttpResponse.json({ response: "success" });
  }),
];
