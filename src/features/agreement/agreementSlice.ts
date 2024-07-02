import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiClient } from "../apiClient.ts";

export const fetchAgreement = createAsyncThunk(
  "agreement/fetchAgreement",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/startMessages.php", {
        params: { type: "legal" },
      });

      console.log(response.data.data.text);
      return response.data.data.text;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateAgreement = createAsyncThunk(
  "agreement/updateAgreement",
  async (message: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/startMessages.php", {
        type: "legal",
        text: message,
      });
      if (response.data.response === "success") {
        return response.data.data.text;
      } else {
        return rejectWithValue("Failed to update agreement");
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

interface AgreementState {
  message: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AgreementState = {
  message: "",
  status: "idle",
  error: null,
};

const agreementSlice = createSlice({
  name: "agreement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAgreement.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchAgreement.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.message = action.payload;
        },
      )
      .addCase(fetchAgreement.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(updateAgreement.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAgreement.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload;
      })
      .addCase(updateAgreement.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default agreementSlice.reducer;
