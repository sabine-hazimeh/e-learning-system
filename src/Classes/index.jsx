import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  setClasses,
  setError,
  setLoading,
  clearError,
} from "../data-source/redux/ClassesSlice/slice";
import "./style.css";

function Classes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classes, error, isLoading } = useSelector((state) => state.classes);
  const token = useSelector((state) => state.user?.token);

  useEffect(() => {
    const fetchClasses = async () => {
      dispatch(setLoading());
      try {
        const response = await axios.get("http://localhost:3000/api/classes");
        dispatch(setClasses(response.data));
      } catch (error) {
        dispatch(setError(error.response?.data || "Failed to fetch classes"));
      }
    };

    fetchClasses();
  }, [dispatch]);

  const handleEnroll = async (classId) => {
    if (!token) {
      toast.error("No authentication token found.");
      return;
    }

    console.log("Class ID:", classId);
    console.log("Token:", token);

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
      console.log("Response:", response);
      navigate("/enrolled");
    } catch (err) {
      console.error("Enrollment Error:", err.response);
      toast.error(err.response?.data?.message || "Enrollment failed.");
    }
  };
  return (
    <div className="classes-container">
      <h1>Classes</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>
          Error: {typeof error === "object" ? JSON.stringify(error) : error}
        </p>
      ) : (
        <div className="classes-grid">
          {classes.map((course) => (
            <div key={course._id} className="course-card">
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <p>Instructor: {course.instructor.name}</p>
              <p>
                Start Date:{" "}
                {new Date(course.schedule.startDate).toLocaleDateString()}
              </p>
              <p>
                End Date:{" "}
                {new Date(course.schedule.endDate).toLocaleDateString()}
              </p>
              <button
                className="enroll-button"
                onClick={() => handleEnroll(course._id)}
              >
                Enroll
              </button>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Classes;
