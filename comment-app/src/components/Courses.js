import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Courses.css";

const Courses = ({ token }) => {
  const [courses, setCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // State to manage error message
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    if (!token) {
      // If no token, show error and do not fetch courses
      setErrorMessage("You must be logged in to access this page.");
    } else {
      // Fetch courses if token is available
      axios
        .get("http://localhost:8000/api/courses/", {
          // Updated endpoint from auth to api
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in the Authorization header
          },
        })
        .then((response) => {
          setCourses(response.data); // Set fetched courses to state
        })
        .catch((error) => {
          setErrorMessage("Failed to fetch courses. Please try again.");
          console.error("Error fetching courses:", error);
        });
    }
  }, [token]); // Dependency array to re-run when token changes

  if (errorMessage) {
    // If there is an error message, show it instead of the courses
    return (
      <div className="error-container">
        <h2>{errorMessage}</h2>
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="courses-title">Available Courses</h1>
      <div className="course-list">
        {courses.map((course) => (
          <div
            className="course-item"
            key={course.id}
            onClick={() => navigate(`/course/${course.id}`)} // Navigate to course details
            style={{
              backgroundImage: `url(${course.image})`, // Use the uploaded image from the backend
            }}
          >
            <div className="course-item-image"></div>
            <h2 className="course-item-title">{course.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
