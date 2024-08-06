import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  classes: [],
  error: null,
  isLoading: false,
};

const classesSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    setClasses: (state, action) => {
      state.classes = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setClasses, setError, setLoading, clearError } =
  classesSlice.actions;
export default classesSlice.reducer;
