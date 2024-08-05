import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

export const fetchEnrollments = () => async (dispatch) => {
  dispatch(fetchEnrollmentsStart());
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.get("http://localhost:3000/api/enrollment", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(fetchEnrollmentsSuccess(response.data));
  } catch (error) {
    dispatch(fetchEnrollmentsFailure(error.message));
  }
};

export const withdrawFromClass = (classId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("authToken");
    await axios.post(
      "http://localhost:3000/api/withdrawals",
      { classId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(withdrawClassSuccess(classId));
  } catch (error) {
    console.error("Error withdrawing from class:", error);
  }
};
