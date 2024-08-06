import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import {
  fetchEnrollmentsStart,
  fetchEnrollmentsSuccess,
  fetchEnrollmentsFailure,
  withdrawClassSuccess,
} from "../data-source/redux/EnrolledClassesSlice/slice";
import axios from "axios";
import "./style.css";
import "react-toastify/dist/ReactToastify.css";

function EnrolledClasses() {
  const dispatch = useDispatch();
  const { enrollments, loading, error } = useSelector(
    (state) => state.enrollments
  );
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchEnrollments = async () => {
      dispatch(fetchEnrollmentsStart());
      try {
        const response = await axios.get(
          "http://localhost:3000/api/enrollment",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch(fetchEnrollmentsSuccess(response.data));
      } catch (error) {
        dispatch(fetchEnrollmentsFailure(error.message));
      }
    };

    fetchEnrollments();
  }, [dispatch, token]);

  const handleWithdraw = async (classId) => {
    try {
      await axios.post(
        "http://localhost:3000/api/withdrawals",
        { classId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(withdrawClassSuccess(classId));
    } catch (error) {
      toast.error("Error withdrawing from class.");
      console.error("Error withdrawing from class:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error)
    return (
      <div>
        Error fetching enrollments:{" "}
        {typeof error === "object" ? JSON.stringify(error) : error}
      </div>
    );

  return (
    <div className="classes-container">
      <h1>Enrolled Classes</h1>
      <div className="classes-grid">
        {enrollments.map((enrollment) => (
          <div key={enrollment.classId._id} className="course-card">
            <h2>{enrollment.classId.title}</h2>
            <p>{enrollment.classId.description}</p>
            <p>Instructor: {enrollment.classId.instructor.name}</p>
            <p>
              Start Date:{" "}
              {new Date(
                enrollment.classId.schedule.startDate
              ).toLocaleDateString()}
            </p>
            <p>
              End Date:{" "}
              {new Date(
                enrollment.classId.schedule.endDate
              ).toLocaleDateString()}
            </p>
            <Link to={`/files/${enrollment.classId._id}`}>
              <button className="enroll-button">View Files</button>
            </Link>
            <button
              className="withdraw-button"
              onClick={() => handleWithdraw(enrollment.classId._id)}
            >
              Withdraw
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default EnrolledClasses;
