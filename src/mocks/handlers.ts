import { http, HttpResponse, delay } from "msw";

export const handlers = [
  http.all("*", async () => {
    await delay(process.env.NODE_ENV === "development" ? 1000 : 0);
  }),
  //===========================================================================
  // Button handlers
  //===========================================================================

  // Обработчик GET-запроса на получение кнопок
  http.get("/button.php", () => {
    return HttpResponse.json([
      { id: 123, name: "First button" },
      { id: 232, name: "Second button" },
      { id: 312, name: "Third button" },
      { id: 412, name: "Fourth button" },
    ]);
  }),

  // Обработчик POST-запроса на добавление кнопки
  http.post("/button.php", () => {
    return HttpResponse.json({ response: "success" });
  }),

  // Обработчик PATCH-запроса на изменение порядка кнопок
  http.patch("/button.php", () => {
    return HttpResponse.json({ response: "success" });
  }),

  // Обработчик DELETE-запроса на удаление кнопки
  http.delete("/button.php", () => {
    return HttpResponse.json({ response: "success" });
  }),

  // Обработчик PUT-запроса на редактирование кнопки
  http.put("/button.php/:id", () => {
    return HttpResponse.json({ response: "success" });
  }),

  //===========================================================================
  // Group handlers
  //===========================================================================

  // Обработчик GET-запроса на получение групп
  http.get("/groups.php", () => {
    return HttpResponse.json({
      status: "success",
      data: [
        {
          id: "12161168",
          name: "Group of Маджонг",
          author: "0",
          color: "#47BEA3",
        },
        {
          id: "21195238",
          name: "Group of Числомания",
          author: "0",
          color: "#CBA480",
        },
        {
          id: "29738927",
          name: "Group of Морские сокровища",
          author: "0",
          color: "#C6CDB8",
        },
        {
          id: "53571875",
          name: "Group of Моя Ферма",
          author: "0",
          color: "#60A0D6",
        },
        {
          id: "92082294",
          name: "Group of СберПраймСити",
          author: "0",
          color: "#FA4B56",
        },
        {
          id: "92910044",
          name: "Group of Ловлю на слове",
          author: "0",
          color: "#358095",
        },
      ],
    });
  }),

  //===========================================================================
  // Greeting handlers
  //===========================================================================

  // Обработчик GET-запроса на получение приветственного сообщения
  // http.get("/greeting.php", () => {
  //   return HttpResponse.json({
  //     message:
  //       "Привет! Данный чат-бот поможет вам в решении вопросов, связанных с нашим сервисом. Напишите нам, если у вас возникли трудности или вам нужна помощь. Мы всегда рады помочь!",
  //   });
  // }),
  //
  // // Обработчик POST-запроса на изменение приветственного сообщения
  // http.post("/greeting.php", () => {
  //   return HttpResponse.json({ response: "success" });
  // }),

  //===========================================================================
  // Agreement handlers
  //===========================================================================

  // Обработчик GET-запроса на получение согласия
  // http.get("/agreement.php", () => {
  //   return HttpResponse.json({
  //     message:
  //       'Для продолжения работы с сервисом необходимо принять условия соглашения. Нажмите "Принять", чтобы подтвердить свое согласие. Полный текст соглашения доступен по ссылке: <a href="https://sendpulse.com/knowledge-base/chatbot/telegram/format-text" rel="noopener noreferrer" target="_blank">Пользовательское соглашение</a>',
  //   });
  // }),
  //
  // // Обработчик POST-запроса на изменение согласия
  // http.post("/agreement.php", () => {
  //   return HttpResponse.json({ response: "success" });
  // }),

  //===========================================================================
  // Messages handlers
  //===========================================================================

  // Обработчик GET-запроса на получение сообщений
  http.get("/sendMessages.php", () => {
    return HttpResponse.json({
      response: "success",
      data: [
        {
          id: 1,
          author: "Сергей Иванов",
          group_name: "Группа 1",
          text: "Вы давно не заходили на наш сайт. Посмотрите, у нас вышла новая игра. Перейдите по ссылке, чтобы узнать подробности.",
          datetime: "2024-06-22 12:34:56",
          button_name: "Новая игра",
          button_url: "https://example.com",
          file_url:
            "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
        },
        {
          id: 2,
          author: "Анна Петрова",
          group_name: "Группа 2",
          text: "Не пропустите нашу акцию! Только сегодня скидки до 50% на все игры.",
          datetime: "2024-06-21 10:20:00",
          button_name: "Скидки",
          button_url: "https://example.com/discounts",
          file_url:
            "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
        },
        {
          id: 3,
          author: "Иван Сидоров",
          group_name: "Группа 3",
          text: "Новый контент для вашей любимой игры уже доступен! Узнайте больше о новых возможностях.",
          datetime: "2024-06-20 09:15:30",
          button_name: "Новый контент",
          button_url: "https://example.com/new-content",
          file_url:
            "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
        },
        {
          id: 4,
          author: "Мария Кузнецова",
          group_name: "Группа 4",
          text: "Подпишитесь на наш канал и получайте самые свежие новости первыми.",
          datetime: "2024-06-19 08:30:45",
          button_name: "Подписаться",
          button_url: "https://example.com/subscribe",
          file_url:
            "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
        },
        {
          id: 5,
          author: "Дмитрий Смирнов",
          group_name: "Группа 3",
          text: "Мы добавили новый уровень сложности в вашу любимую игру. Проверьте свои навыки!",
          datetime: "2024-06-18 07:40:20",
          button_name: "Новый уровень",
          button_url: "https://example.com/new-level",
          file_url:
            "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
        },
        {
          id: 6,
          author: "Ольга Иванова",
          group_name: "Группа 3",
          text: "Присоединяйтесь к нашему конкурсу и выиграйте ценные призы!",
          datetime: "2024-06-17 12:45:10",
          button_name: "Конкурс",
          button_url: "https://example.com/contest",
          file_url:
            "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
        },
        {
          id: 7,
          author: "Алексей Попов",
          group_name: "Группа 2",
          text: "У нас появился новый раздел на сайте. Заходите и смотрите новые предложения.",
          datetime: "2024-06-16 11:50:05",
          button_name: "Новый раздел",
          button_url: "https://example.com/new-section",
          file_url:
            "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
        },
        {
          id: 8,
          author: "Екатерина Новикова",
          group_name: "Группа 1",
          text: "Специальное предложение для вас! Скидка 20% на следующую покупку.",
          datetime: "2024-06-15 10:55:50",
          button_name: "Специальное предложение",
          button_url: "https://example.com/special-offer",
          file_url:
            "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
        },
        {
          id: 9,
          author: "Павел Васильев",
          group_name: "Группа 3",
          text: "Мы улучшили нашу игру и добавили много нового. Попробуйте прямо сейчас!",
          datetime: "2024-06-14 09:30:35",
          button_name: "Улучшенная игра",
          button_url: "https://example.com/improved-game",
          file_url:
            "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
        },
        {
          id: 10,
          author: "Наталья Федорова",
          group_name: "Группа 1",
          text: "Не пропустите новый турнир! Примите участие и получите награды.",
          datetime: "2024-06-13 08:25:25",
          button_name: "Турнир",
          button_url: "https://example.com/tournament",
          file_url:
            "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
        },
        {
          id: 11,
          author: "Виктор Крылов",
          group_name: "Группа 3",
          text: "Скоро выходит новая игра! Узнайте все подробности первыми.",
          datetime: "2024-06-12 07:20:15",
          button_name: "Новая игра",
          button_url: "https://example.com/new-game",
          file_url:
            "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
        },
        {
          id: 12,
          author: "Елена Гусева",
          group_name: "Группа 2",
          text: "Подарите себе праздник! Купите игры по сниженной цене в нашем магазине.",
          datetime: "2024-06-11 06:15:00",
          button_name: "Магазин",
          button_url: "https://example.com/store",
          file_url:
            "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
        },
        {
          id: 13,
          author: "Максим Борисов",
          group_name: "Группа 2",
          text: "Участвуйте в нашем марафоне и получайте бонусы за активность.",
          datetime: "2024-06-10 05:10:45",
          button_name: "Марафон",
          button_url: "https://example.com/marathon",
          file_url:
            "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
        },
        {
          id: 14,
          author: "Оксана Лебедева",
          group_name: "Группа 2",
          text: "Мы добавили новые достижения в игру. Попробуйте заработать их все!",
          datetime: "2024-06-09 04:05:30",
          button_name: "Достижения",
          button_url: "https://example.com/achievements",
          file_url:
            "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
        },
        {
          id: 15,
          author: "Юрий Зайцев",
          group_name: "Группа 2",
          text: "Примите участие в закрытом бета-тестировании нашей новой игры!",
          datetime: "2024-06-08 03:00:20",
          button_name: "Бета-тестирование",
          button_url: "https://example.com/beta-testing",
          file_url:
            "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
        },
        {
          id: 16,
          author: "Анастасия Воробьева",
          group_name: "Группа 2",
          text: "Получите бесплатные бонусы, посетив наш сайт сегодня.",
          datetime: "2024-06-07 02:55:10",
          button_name: "Бонусы",
          button_url: "https://example.com/bonuses",
          file_url:
            "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
        },
        {
          id: 17,
          author: "Роман Ковальчук",
          group_name: "Группа 2",
          text: "Пригласите друзей и получите вознаграждение за каждого нового игрока.",
          datetime: "2024-06-06 01:50:00",
          button_name: "Пригласить друзей",
          button_url: "https://example.com/invite-friends",
          file_url:
            "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
        },
        {
          id: 18,
          author: "Вера Тихонова",
          group_name: "Группа 4",
          text: "Узнайте больше о нашей новой системе лояльности и начните зарабатывать бонусы.",
          datetime: "2024-06-05 12:45:30",
          button_name: "Система лояльности",
          button_url: "https://example.com/loyalty-system",
          file_url:
            "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
        },
        {
          id: 19,
          author: "Александр Мельников",
          group_name: "Группа 4",
          text: "Мы подготовили для вас много сюрпризов! Зайдите на сайт и узнайте, что нового.",
          datetime: "2024-06-04 11:40:25",
          button_name: "Сюрпризы",
          button_url: "https://example.com/surprises",
          file_url:
            "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
        },
        {
          id: 20,
          author: "Лариса Васильева",
          group_name: "Группа 4",
          text: "Не пропустите наши специальные предложения! Только сегодня скидки до 70%.",
          datetime: "2024-06-03 10:35:15",
          button_name: "Специальные предложения",
          button_url: "https://example.com/special-deals",
          file_url:
            "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?cs=srgb&dl=pexels-souvenirpixels-417074.jpg&fm=jpg",
        },
      ],
    });
  }),

  // Обработчик POST-запроса на добавление сообщения
  http.post("/sendMessages.php", () => {
    // const newMessage = {
    //   id: Math.floor(Math.random() * 1000),
    //   ...req.body,
    //   datetime: new Date().toISOString(),
    // };
    return HttpResponse.json({
      response: "success",
      // message: newMessage,
    });
  }),

  // Обработчик DELETE-запроса на удаление сообщения
  http.delete("/sendMessages.php", () => {
    // const { message_id } = req.body;
    return HttpResponse.json({ response: "success" });
  }),

  //===========================================================================
  // Admin handlers
  //===========================================================================

  // Обработчик POST-запроса на создание администратора
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  http.post("/createAdmin.php", (req, res, ctx) => {
    const { id, pass } = req.body;
    if (id && pass) {
      return res(
        ctx.json({
          status: "success",
          message: `Администратор с id ${id} успешно создан.`,
        }),
      );
    } else {
      return res(
        ctx.status(400),
        ctx.json({
          status: "error",
          message: "Ошибка при создании администратора. Проверьте данные.",
        }),
      );
    }
  }),
];
