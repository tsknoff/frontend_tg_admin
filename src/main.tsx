import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import store from "./store.ts";
import { Provider } from "react-redux";
import { theme } from "./UI/theme.ts";
import { ThemeProvider } from "@mui/material/styles";

if (process.env.NODE_ENV === "development") {
  const { worker } = await import("./mocks/browser");

  await worker.start();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
