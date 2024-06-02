import { http, HttpResponse, delay } from "msw";

export const handlers = [
  http.all("*", async () => {
    await delay(process.env.NODE_ENV === "development" ? 500 : 0);
  }),

  // Обработчик GET-запроса на получение кнопок
  http.get("/api/button", () => {
    return HttpResponse.json([
      { id: 1, name: "First button" },
      { id: 2, name: "Second button" },
    ]);
  }),

  // Обработчик POST-запроса на добавление кнопки
  http.post("/api/button", (req, res, ctx) => {
    const { name } = req.body as { name: string };
    return res(ctx.status(200), ctx.json({ id: Date.now(), name }));
  }),

  // Обработчик PATCH-запроса на изменение порядка кнопок
  http.patch("/api/button", (req, res, ctx) => {
    const order = req.body as number[];
    return res(ctx.status(200), ctx.json(order));
  }),

  // Обработчик DELETE-запроса на удаление кнопки
  http.delete("/api/button", (req, res, ctx) => {
    const { id } = req.body as { id: number };
    return res(ctx.status(200), ctx.json(id));
  }),
];
