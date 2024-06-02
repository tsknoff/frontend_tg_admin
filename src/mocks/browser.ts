import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// Настройка service worker
export const worker = setupWorker(...handlers);
