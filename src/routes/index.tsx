import { Root } from "../UI/layout";
import { DashboardPage } from "../UI/pages/DashboardPage";
import { ErrorPage } from "./ErrorPage.tsx";
import { MessagesPage } from "../UI/pages/MessagesPage";
import { StatChartPage } from "../UI/pages/StatChartPage";
import { GroupsPage } from "../UI/pages/GroupsPage/GroupsPage.tsx";
import { LoginPage } from "../UI/pages/LoginPage";
import ProtectedRoute from "../UI/pages/ProtectedRoute.tsx";
import { CreateAdminPage } from "../UI/pages/CreateAdminPage";

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
            element: <MessagesPage />,
          },
          {
            path: "/groups",
            element: <GroupsPage />,
          },
          {
            path: "/statistics",
            element: <StatChartPage />,
          },
          {
            path: "/admin",
            element: <CreateAdminPage />,
          },
        ],
      },
    ],
  },
];
