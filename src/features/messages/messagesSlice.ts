import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiClient } from "../apiClient.ts";

export interface IMessage {
  id: number;
  author: string;
  group_name: string;
  text: string;
  datetime: string;
  button_name: string;
  button_url: string;
  file_url: string;
}

interface MessagesState {
  messages: IMessage[];
  status: "idle" | "loading" | "succeeded" | "failed";
  sendStatus: "idle" | "loading" | "succeeded" | "failed";
  deleteStatus: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MessagesState = {
  messages: [],
  sendStatus: "idle",
  deleteStatus: "idle",
  status: "idle",
  error: null,
};

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/sendMessages.php");

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/sendMessages.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteMessage = createAsyncThunk(
  "messages/deleteMessage",
  async (message_id: number, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete("/sendMessages.php", {
        data: { message_id },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchMessages.fulfilled,
        (state, action: PayloadAction<IMessage[]>) => {
          state.status = "succeeded";
          state.messages = action.payload;
        },
      )
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(sendMessage.pending, (state) => {
        state.status = "loading";
        state.sendStatus = "loading";
      })
      .addCase(
        sendMessage.fulfilled,
        (state, action: PayloadAction<IMessage>) => {
          state.status = "succeeded";
          state.sendStatus = "succeeded";
          state.messages.push(action.payload);
        },
      )
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = "failed";
        state.sendStatus = "failed";
        state.error = action.payload as string;
      })
      .addCase(deleteMessage.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(
        deleteMessage.fulfilled,
        (state, action: PayloadAction<{ message_id: number }>) => {
          state.deleteStatus = "succeeded";
          state.messages = state.messages.filter(
            (message) => message.id !== action.payload.message_id,
          );
        },
      )
      .addCase(deleteMessage.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload as string;
      });
  },
});

export default messagesSlice.reducer;
