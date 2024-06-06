import { configureStore } from "@reduxjs/toolkit";
import buttonsReducer from "./features/buttons/buttonSlice";
import greetingReducer from "./features/greeting/greetingSlice";
import agreementReducer from "./features/agreement/agreementSlice";

const store = configureStore({
  reducer: {
    buttons: buttonsReducer,
    greeting: greetingReducer,
    agreement: agreementReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
