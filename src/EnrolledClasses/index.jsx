import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { Link } from "react-router-dom";

function EnrolledClasses() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://localhost:3000/api/enrollment",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEnrollments(response.data);
      } catch (error) {
        console.error("Error fetching enrollments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  const handleWithdraw = async (classId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        "http://localhost:3000/api/withdrawals",
        { classId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error withdrawing from class:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

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
