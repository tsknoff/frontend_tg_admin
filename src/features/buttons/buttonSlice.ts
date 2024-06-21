import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface IMenuButton {
  id: number;
  name: string;
  message?: string;
  image?: string | null;
}

interface ButtonsState {
  buttons: IMenuButton[];
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: ButtonsState = {
  buttons: [],
  status: "idle",
};

// Обновленные Thunks для асинхронных действий
export const fetchButtons = createAsyncThunk(
  "buttons/fetchButtons",
  async () => {
    const response = await axios.get<IMenuButton[]>(
      "https://nse-work.ru/test/ssb/api/button.php",
    );

    return response.data;
  },
);

export const addButton = createAsyncThunk(
  "buttons/addButton",
  async (name: string) => {
    const response = await axios.post(
      "https://nse-work.ru/test/ssb/api/button.php",
      { name },
    );

    return response.data;
  },
);

export const reorderButtons = createAsyncThunk(
  "buttons/reorderButtons",
  async (order: number[], { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        "https://nse-work.ru/test/ssb/api/button.php",
        order,
      );
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
    const response = await axios.delete(
      "https://nse-work.ru/test/ssb/api/button.php",
      { data: { id } },
    );

    return response.data;
  },
);

export const editButton = createAsyncThunk(
  "buttons/editButton",
  async (button: IMenuButton) => {
    const response = await axios.put(
      `https://nse-work.ru/test/ssb/api/button.php/${button.id}`,
      button,
    );
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
      .addCase(addButton.fulfilled, (state) => {
        state.status = "succeeded";
      })
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
      )
      .addCase(
        editButton.fulfilled,
        (state, action: PayloadAction<IMenuButton>) => {
          state.status = "succeeded";
          const index = state.buttons.findIndex(
            (button) => button.id === action.payload.id,
          );
          if (index !== -1) {
            state.buttons[index] = action.payload;
          }
        },
      )
      .addCase(editButton.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editButton.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default buttonsSlice.reducer;
