import { Root } from "../UI/layout";
import { MenuButtonsPage } from "../UI/pages/MenuButtonsPage";

export const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/buttons",
        element: <MenuButtonsPage />,
      },
      {
        path: "/email",
        element: <div>Email</div>,
      },
      {
        path: "/groups",
        element: <div>Groups</div>,
      },
      {
        path: "/statistics",
        element: <div>Statistics</div>,
      },
      {
        path: "/greeting",
        element: <div>Greeting</div>,
      },
    ],
  },
];
