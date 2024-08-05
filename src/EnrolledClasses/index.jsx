import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEnrollments,
  withdrawFromClass,
} from "../data-source/redux/EnrolledClassesSlice/slice";
import { Link } from "react-router-dom";
import "./style.css";

function EnrolledClasses() {
  const dispatch = useDispatch();
  const { enrollments, loading, error } = useSelector(
    (state) => state.enrollments
  );

  useEffect(() => {
    dispatch(fetchEnrollments());
  }, [dispatch]);

  const handleWithdraw = (classId) => {
    dispatch(withdrawFromClass(classId));
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
    </div>
  );
}

export default EnrolledClasses;
