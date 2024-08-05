import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchClasses,
  enrollClass,
} from "../data-source/redux/ClassesSlice/slice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./style.css";
function Classes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { classes, error, isLoading } = useSelector((state) => state.classes);

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  const handleEnroll = (classId) => {
    dispatch(enrollClass(classId))
      .unwrap()
      .then(() => {
        navigate("/enrolled");
      })
      .catch((err) => {
        toast.error(err.message || "Enrollment failed.");
      });
  };

  return (
    <div className="classes-container">
      <h1>Classes</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
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
