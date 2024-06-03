import { Root } from "../UI/layout";
import { MenuButtonsPage } from "../UI/pages/MenuButtonsPage";
import { ErrorPage } from "./ErrorPage.tsx";

export const routes = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        index: true,
        element: <MenuButtonsPage />,
      },
      {
        path: "/email",
        element: <div>Рассылка</div>, // Рассылка на английском будеь "Email"
      },
      {
        path: "/groups",
        element: <div>Groups</div>,
      },
      {
        path: "/statistics",
        element: <div>Statistics</div>,
      },
    ],
  },
];
