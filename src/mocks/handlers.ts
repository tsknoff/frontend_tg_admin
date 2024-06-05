import { http, HttpResponse, delay } from "msw";

export const handlers = [
  http.all("*", async () => {
    await delay(process.env.NODE_ENV === "development" ? 1000 : 0);
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

  // Обработчик GET-запроса на получение приветственного сообщения
  http.get("/api/greeting", () => {
    return HttpResponse.json({
      message:
        '<p><b>раз</b> <i>два</i> <u>три</u> <s>четыре</s> <a href="https://sendpulse.com/knowledge-base/chatbot/telegram/format-text" rel="noopener noreferrer" target="_blank">пять</a></p>',
    });
  }),

  // Обработчик POST-запроса на изменение приветственного сообщения
  http.post("/api/greeting", () => {
    return HttpResponse.json({ response: "success" });
  }),
];
