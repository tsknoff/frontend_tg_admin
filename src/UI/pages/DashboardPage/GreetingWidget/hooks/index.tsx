import {
  fetchGreeting,
  updateGreeting,
} from "../../../../../features/greeting/greetingSlice.ts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../store.ts";

export const useGreetingState = () => {
  const message = useSelector((state: RootState) => state.greeting.message);
  const status = useSelector((state: RootState) => state.greeting.status);

  return { message, status };
};

export const useGreetingActions = () => {
  const dispatch: AppDispatch = useDispatch();

  const fetchGreetingData = () => {
    dispatch(fetchGreeting());
  };

  const updateGreetingData = async (message: string) => {
    await dispatch(updateGreeting(message));
    fetchGreetingData();
  };

  return { fetchGreetingData, updateGreetingData };
};
