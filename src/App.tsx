import { createHashRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";

const router = createHashRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
