import { Root } from "../UI/layout";
import { DashboardPage } from "../UI/pages/DashboardPage";
import { ErrorPage } from "./ErrorPage.tsx";
import { MailsPage } from "../UI/pages/MailsPage";
import { StatChartPage } from "../UI/pages/StatChartPage";

export const routes = [
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
        element: <div>Groups</div>,
      },
      {
        path: "/statistics",
        element: <StatChartPage />,
      },
    ],
  },
];
