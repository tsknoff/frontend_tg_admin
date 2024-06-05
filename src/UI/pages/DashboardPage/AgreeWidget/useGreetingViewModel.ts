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
  const error = useSelector((state: RootState) => state.greeting.error);

  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchGreeting());
    }
  }, [status, dispatch]);

  const handleUpdateGreeting = () => {
    if (newMessage.trim()) {
      dispatch(updateGreeting(newMessage));
      dispatch(fetchGreeting());
    }
  };

  const handleFetchGreeting = () => {
    dispatch(fetchGreeting());
  };

  return {
    message,
    status,
    error,
    newMessage,
    setNewMessage,
    handleUpdateGreeting,
    handleFetchGreeting,
  };
};
