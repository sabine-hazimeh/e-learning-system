import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  classes: [],
  error: null,
  isLoading: false,
};

export const fetchClasses = createAsyncThunk(
  "classes/fetchClasses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:3000/api/classes");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch classes");
    }
  }
);

export const enrollClass = createAsyncThunk(
  "classes/enrollClass",
  async (classId, { rejectWithValue, getState }) => {
    const state = getState();
    const token = state.user?.token;

    if (!token) {
      return rejectWithValue("No authentication token found.");
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/enrollment",
        { classId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to enroll in class"
      );
    }
  }
);

const classesSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.classes = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch classes";
      })
      .addCase(enrollClass.pending, (state) => {
        state.error = null;
      })
      .addCase(enrollClass.fulfilled, (state, action) => {
        console.log("Enrollment successful:", action.payload);
      })
      .addCase(enrollClass.rejected, (state, action) => {
        state.error = action.payload || "Failed to enroll in class";
      });
  },
});

export const { clearError } = classesSlice.actions;
export default classesSlice.reducer;
