import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Classes() {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/classes");
        setClasses(response.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const handleEnroll = async (classId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://localhost:3000/api/enrollment",
        { classId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Enrollment successful:", response.data);
      navigate("/enrolled");
    } catch (error) {
      console.error("Error enrolling:", error);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <div className="classes-container">
      <h1>Classes</h1>
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
              End Date: {new Date(course.schedule.endDate).toLocaleDateString()}
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
      <ToastContainer />
    </div>
  );
}

export default Classes;
