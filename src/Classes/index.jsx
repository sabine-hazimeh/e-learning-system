import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

function Classes() {
  const [classes, setClasses] = useState([]);

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
            <button className="enroll-button">Enroll</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Classes;
