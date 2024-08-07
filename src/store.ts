import { configureStore } from "@reduxjs/toolkit";
import buttonsReducer from "./features/buttons/buttonSlice";
import greetingReducer from "./features/greeting/greetingSlice";
import agreementReducer from "./features/agreement/agreementSlice";
import groupsReducer from "./features/groups/groupsSlice";
import statsReducer from "./features/stats/statSlice";
import messagesReducer from "./features/messages/messagesSlice";

const store = configureStore({
  reducer: {
    buttons: buttonsReducer,
    greeting: greetingReducer,
    agreement: agreementReducer,
    groups: groupsReducer,
    stat: statsReducer,
    messages: messagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
