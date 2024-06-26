import { Root } from "../UI/layout";
import { DashboardPage } from "../UI/pages/DashboardPage";
import { ErrorPage } from "./ErrorPage.tsx";
import { MailsPage } from "../UI/pages/MailsPage";
import { StatChartPage } from "../UI/pages/StatChartPage";
import { GroupsPage } from "../UI/pages/GroupsPage/GroupsPage.tsx";
import { LoginPage } from "../UI/pages/LoginPage";
import ProtectedRoute from "../UI/pages/ProtectedRoute.tsx";

export const routes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute />,
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
    ],
  },
];
