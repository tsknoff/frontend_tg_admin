import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface StatData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

interface StatState {
  data: StatData | null;
  usersData: StatData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: StatState = {
  data: null,
  usersData: null,
  status: "idle",
  error: null,
};

export const fetchStatData = createAsyncThunk(
  "stat/fetchStatData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://nse-work.ru/test/ssb/api/stat.php",
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchUsersStatData = createAsyncThunk(
  "stat/fetchUsersStatData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://nse-work.ru/test/ssb/api/stat.php",
        { params: { type: "users" } },
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const statSlice = createSlice({
  name: "stat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchStatData.fulfilled,
        (state, action: PayloadAction<StatData>) => {
          state.status = "succeeded";
          state.data = action.payload;
        },
      )
      .addCase(fetchStatData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchUsersStatData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUsersStatData.fulfilled,
        (state, action: PayloadAction<StatData>) => {
          state.status = "succeeded";
          state.usersData = action.payload;
        },
      )
      .addCase(fetchUsersStatData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default statSlice.reducer;
