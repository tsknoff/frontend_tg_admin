import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MenuButtonsPage } from "./UI/pages/MenuButtonsPage";
import { Root } from "./UI/layout";

const router = createBrowserRouter([
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
