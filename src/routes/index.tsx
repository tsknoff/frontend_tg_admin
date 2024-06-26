import { Root } from "../UI/layout";
import { DashboardPage } from "../UI/pages/DashboardPage";
import { ErrorPage } from "./ErrorPage.tsx";
import { MailsPage } from "../UI/pages/MailsPage";
import { StatChartPage } from "../UI/pages/StatChartPage";
import { GroupsPage } from "../UI/pages/GroupsPage/GroupsPage.tsx";
import { LoginPage } from "../UI/pages/LoginPage";

export const routes = [
  {
    path: "/login", // Добавьте маршрут для страницы авторизации
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "/email",
        element: <MailsPage />,
      },
      {
        path: "/groups",
        element: <GroupsPage />,
      },
      {
        path: "/statistics",
        element: <StatChartPage />,
      },
    ],
  },
];
