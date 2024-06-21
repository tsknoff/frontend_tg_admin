import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAgreement = createAsyncThunk(
  "agreement/fetchAgreement",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://nse-work.ru/test/ssb/api/startMessages.php",
        { params: { type: "legal" } },
      );

      return response.data.data.text;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateAgreement = createAsyncThunk(
  "agreement/updateAgreement",
  async (message: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://nse-work.ru/test/ssb/api/startMessages.php",
        { type: "legal", text: message },
      );
      if (response.data.response === "success") {
        await dispatch(fetchAgreement());

        return message;
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
      .addCase(updateAgreement.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateAgreement.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export default agreementSlice.reducer;
