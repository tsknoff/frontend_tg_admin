import { http, HttpResponse, delay } from "msw";

export const handlers = [
  http.all("*", async () => {
    await delay(process.env.NODE_ENV === "development" ? 1000 : 0);
  }),
  //===========================================================================
  // Button handlers
  //===========================================================================

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

  // Обработчик PUT-запроса на редактирование кнопки
  http.put("/api/button/:id", () => {
    return HttpResponse.json({ response: "success" });
  }),

  //===========================================================================
  // Greeting handlers
  //===========================================================================

  // Обработчик GET-запроса на получение приветственного сообщения
  http.get("/api/greeting", () => {
    return HttpResponse.json({
      message:
        "Привет! Данный чат-бот поможет вам в решении вопросов, связанных с нашим сервисом. Напишите нам, если у вас возникли трудности или вам нужна помощь. Мы всегда рады помочь!",
    });
  }),

  // Обработчик POST-запроса на изменение приветственного сообщения
  http.post("/api/greeting", () => {
    return HttpResponse.json({ response: "success" });
  }),

  //===========================================================================
  // Agreement handlers
  //===========================================================================

  // Обработчик GET-запроса на получение согласия
  http.get("/api/agreement", () => {
    return HttpResponse.json({
      message:
        'Для продолжения работы с сервисом необходимо принять условия соглашения. Нажмите "Принять", чтобы подтвердить свое согласие. Полный текст соглашения доступен по ссылке: <a href="https://sendpulse.com/knowledge-base/chatbot/telegram/format-text" rel="noopener noreferrer" target="_blank">Пользовательское соглашение</a>',
    });
  }),

  // Обработчик POST-запроса на изменение согласия
  http.post("/api/agreement", () => {
    return HttpResponse.json({ response: "success" });
  }),
];
