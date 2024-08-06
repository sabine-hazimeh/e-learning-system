import { createSlice } from "@reduxjs/toolkit";

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState: {
    enrollments: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchEnrollmentsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchEnrollmentsSuccess: (state, action) => {
      state.enrollments = action.payload;
      state.loading = false;
    },
    fetchEnrollmentsFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    withdrawClassSuccess: (state, action) => {
      state.enrollments = state.enrollments.filter(
        (enrollment) => enrollment.classId._id !== action.payload
      );
    },
  },
});

export const {
  fetchEnrollmentsStart,
  fetchEnrollmentsSuccess,
  fetchEnrollmentsFailure,
  withdrawClassSuccess,
} = enrollmentsSlice.actions;

export default enrollmentsSlice.reducer;
