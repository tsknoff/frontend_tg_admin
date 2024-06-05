import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface IMenuButton {
  id: number;
  name: string;
}

interface ButtonsState {
  buttons: IMenuButton[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ButtonsState = {
  buttons: [],
  status: "idle",
};

// Thunks for async actions это
export const fetchButtons = createAsyncThunk(
  "buttons/fetchButtons",
  async () => {
    const response = await axios.get<IMenuButton[]>("/api/button");
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
  async (order: number[], { rejectWithValue }) => {
    try {
      const response = await axios.patch("/api/button", order);
      if (response.data.response === "success") {
        return order; // Возвращаем исходный порядок кнопок
      } else {
        return rejectWithValue("Failed to reorder buttons");
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteButton = createAsyncThunk(
  "buttons/deleteButton",
  async (id: number) => {
    const response = await axios.delete("/api/button", { data: { id } });
    return response.data;
  },
);

// Slice это кусок состояния и набор редьюсеров для этого куска состояния
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
        (state, action: PayloadAction<IMenuButton[]>) => {
          state.status = "succeeded";
          state.buttons = action.payload;
        },
      )
      .addCase(fetchButtons.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(
        addButton.fulfilled,
        (state, action: PayloadAction<IMenuButton>) => {
          // state.buttons.push(action.payload);
          // todo: Разобраться и убрать этот костыль
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
