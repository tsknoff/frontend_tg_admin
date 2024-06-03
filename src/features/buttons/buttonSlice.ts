import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface TGMenuButton {
  id: number;
  name: string;
}

interface ButtonsState {
  buttons: TGMenuButton[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ButtonsState = {
  buttons: [],
  status: "idle",
};

// Thunks for async actions
export const fetchButtons = createAsyncThunk(
  "buttons/fetchButtons",
  async () => {
    const response = await axios.get<TGMenuButton[]>("/api/button");
    return response.data;
  },
);

export const addButton = createAsyncThunk(
  "buttons/addButton",
  async (name: string) => {
    const response = await axios.post("/api/button", { name });
    return response.data;
  },
);

export const reorderButtons = createAsyncThunk(
  "buttons/reorderButtons",
  async (order: number[]) => {
    const response = await axios.patch("/api/button", order);
    return response.data;
  },
);

export const deleteButton = createAsyncThunk(
  "buttons/deleteButton",
  async (id: number) => {
    const response = await axios.delete("/api/button", { data: { id } });
    return response.data;
  },
);

const buttonsSlice = createSlice({
  name: "buttons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchButtons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchButtons.fulfilled,
        (state, action: PayloadAction<TGMenuButton[]>) => {
          state.status = "succeeded";
          state.buttons = action.payload;
        },
      )
      .addCase(fetchButtons.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(
        addButton.fulfilled,
        (state, action: PayloadAction<TGMenuButton>) => {
          state.buttons.push(action.payload);
        },
      )
      .addCase(
        reorderButtons.fulfilled,
        (state, action: PayloadAction<number[]>) => {
          state.buttons = action.payload.map(
            (id) => state.buttons.find((button) => button.id === id)!,
          );
        },
      )
      .addCase(
        deleteButton.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.buttons = state.buttons.filter(
            (button) => button.id !== action.payload,
          );
        },
      );
  },
});

export default buttonsSlice.reducer;
