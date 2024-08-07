import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../apiClient.ts";

export interface IMenuButton {
  id: number;
  name: string;
  buttonUrl: string;
  message?: string;
  image?: File | null;
}

interface ButtonData {
  id: number;
  buttonName: string;
  buttonUrl: string;
  text: string;
  fileUrl: string | null;
}

interface ButtonsState {
  buttons: IMenuButton[];
  buttonInfo: ButtonData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  saveStatus: "idle" | "saving" | "succeeded" | "failed";
}

const initialState: ButtonsState = {
  buttons: [],
  buttonInfo: null,
  status: "idle",
  saveStatus: "idle",
};

export interface ButtonInfo {
  buttonName: string;
  buttonUrl: string;
  fileUrl: string;
  id: string;
  name: string;
  text: string;
}

// Обновленные Thunks для асинхронных действий
export const fetchButtons = createAsyncThunk(
  "buttons/fetchButtons",
  async () => {
    const response = await apiClient.get<IMenuButton[]>("/button.php");
    return response.data;
  },
);

export const fetchButtonInfo = createAsyncThunk(
  "buttons/fetchButtonInfo",
  async (id: number) => {
    const response = await apiClient.get<ButtonInfo>("/actions.php", {
      params: { id },
    });
    return response.data;
  },
);

export const addButton = createAsyncThunk(
  "buttons/addButton",
  async (name: string) => {
    const response = await apiClient.post("/button.php", { name });
    return response.data;
  },
);

export const reorderButtons = createAsyncThunk(
  "buttons/reorderButtons",
  async (newOrder: number[], { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(
        "/button.php",
        {
          order: newOrder,
        },
        { headers: { "Content-Type": "application/json" } },
      );
      if (response.data.response === "success") {
        return newOrder; // Возвращаем исходный порядок кнопок
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
    const response = await apiClient.delete("/button.php", { data: { id } });
    return response.data;
  },
);

export const editButton = createAsyncThunk(
  "buttons/editButton",
  async (formData: FormData) => {
    const response = await apiClient.post(`/actions.php`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
        (state, action: PayloadAction<IMenuButton[]>) => {
          state.status = "succeeded";
          state.buttons = action.payload;
        },
      )
      .addCase(fetchButtons.rejected, (state) => {
        state.status = "failed";
      })
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      .addCase(
        fetchButtonInfo.fulfilled,
        (state, action: PayloadAction<ButtonData>) => {
          state.buttonInfo = action.payload;
        },
      )
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
            (button) => Number(button.id) !== action.payload,
          );
        },
      )
      .addCase(editButton.pending, (state) => {
        state.saveStatus = "saving";
      })
      .addCase(
        editButton.fulfilled,
        (state, action: PayloadAction<IMenuButton>) => {
          state.saveStatus = "succeeded";
          const index = state.buttons.findIndex(
            (button) => button.id === action.payload.id,
          );
          if (index !== -1) {
            state.buttons[index] = action.payload;
          }
        },
      )
      .addCase(editButton.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default buttonsSlice.reducer;
