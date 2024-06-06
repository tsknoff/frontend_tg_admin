import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store.ts";
import {
  fetchGreeting,
  updateGreeting,
} from "../../../../features/greeting/greetingSlice.ts";

export const useGreetingViewModel = () => {
  const dispatch: AppDispatch = useDispatch();

  const message = useSelector((state: RootState) => state.greeting.message);
  const status = useSelector((state: RootState) => state.greeting.status);
  const [draftMessage, setDraftMessage] = useState(message);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchGreeting());
    }
  }, [status, dispatch]);

  useEffect(() => {
    setDraftMessage(message);
  }, [message, status]);

  const handleChange = (value: string) => {
    setDraftMessage(value);
  };

  const handleFetchGreeting = () => {
    dispatch(fetchGreeting());
  };

  const clearFromPTags = (text: string) => {
    if (!text) return text;

    return text.replace(/<p>/g, "").replace(/<\/p>/g, "");
  };

  const handleUpdateGreeting = () => {
    if (draftMessage.trim() && draftMessage !== message) {
      dispatch(updateGreeting(clearFromPTags(draftMessage) as string));
    }
  };

  return {
    message,
    status,
    draftMessage,
    handleChange,
    handleFetchGreeting,
    handleUpdateGreeting,
    clearFromPTags,
  };
};
