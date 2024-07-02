import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiClient } from "../apiClient.ts";

export const fetchGreeting = createAsyncThunk(
  "greeting/fetchGreeting",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/startMessages.php", {
        params: { type: "start" },
      });

      return response.data.data.text;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateGreeting = createAsyncThunk(
  "greeting/updateGreeting",
  async (message: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await apiClient.post("/startMessages.php", {
        type: "start",
        text: message,
      });
      if (response.data.response === "success") {
        await dispatch(fetchGreeting());

        return message;
      } else {
        return rejectWithValue("Failed to update greeting");
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

interface GreetingState {
  message: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: GreetingState = {
  message: "",
  status: "idle",
  error: null,
};

const greetingSlice = createSlice({
  name: "greeting",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGreeting.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchGreeting.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.message = action.payload;
        },
      )
      .addCase(fetchGreeting.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updateGreeting.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateGreeting.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.message = action.payload;
        },
      )
      .addCase(updateGreeting.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default greetingSlice.reducer;
