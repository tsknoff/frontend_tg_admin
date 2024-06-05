import { configureStore } from "@reduxjs/toolkit";
import buttonsReducer from "./features/buttons/buttonSlice";
import greetingReducer from "./features/greeting/greetingSlice";

const store = configureStore({
  reducer: {
    buttons: buttonsReducer,
    greeting: greetingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
