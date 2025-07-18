import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./CourseDetail.css";

const CourseDetail = ({ token }) => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!courseId) {
      setErrorMessage("Course ID is missing or invalid.");
      return;
    }

    if (!token) {
      setErrorMessage("You must be logged in to view course details.");
      return;
    }

    axios
      .get(`http://localhost:8000/api/course/${courseId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCourse(response.data);
      })
      .catch((error) => {
        setErrorMessage("Failed to fetch course details. Please try again.");
        console.error("Error fetching course details:", error);
      });
  }, [courseId, token]);

  if (errorMessage) {
    return <div className="error-container">{errorMessage}</div>;
  }

  return (
    <div className="course-details-page">
      {course ? (
        <>
          <h1>{course.title}</h1>
          <div className="course-options-grid">
            <Link
              to={`/course/${courseId}/assignments`}
              className="course-option-box"
            >
              <div className="inner-box"></div>
              <div className="outer-box">
                <h3 className="option-label">Assignments</h3>
                <p className="polaroid-footer">Help with assignments</p>
              </div>
            </Link>

            <Link
              to={`/course/${courseId}/quizzes`}
              className="course-option-box"
            >
              <div className="inner-box"></div>
              <div className="outer-box">
                <h3 className="option-label">Quizzes</h3>
                <p className="polaroid-footer">
                  Practice quizzes to test your knowledge
                </p>
              </div>
            </Link>

            <Link
              to={`/course/${courseId}/pastpapers`}
              className="course-option-box"
            >
              <div className="inner-box"></div>
              <div className="outer-box">
                <h3 className="option-label">Past Papers</h3>
                <p className="polaroid-footer">
                  Access and review past exam papers
                </p>
              </div>
            </Link>

            <Link
              to={`/course/${courseId}/coursematerials`}
              className="course-option-box"
            >
              <div className="inner-box"></div>
              <div className="outer-box">
                <h3 className="option-label">Course Material</h3>
                <p className="polaroid-footer">Download study materials</p>
              </div>
            </Link>

            <Link
              to={`/course/${courseId}/discussion`}
              className="course-option-box"
            >
              <div className="inner-box"></div>
              <div className="outer-box">
                <h3 className="option-label">Discussion Forum</h3>
                <p className="polaroid-footer">
                  Engage in discussion with peers
                </p>
              </div>
            </Link>

            <Link
              to={`/course/${courseId}/rating`}
              className="course-option-box"
            >
              <div className="inner-box"></div>
              <div className="outer-box">
                <h3 className="option-label">Rating</h3>
                <p className="polaroid-footer">
                  Rate this course and share feedback
                </p>
              </div>
            </Link>
          </div>
        </>
      ) : (
        <p>Loading course details...</p>
      )}
    </div>
  );
};

export default CourseDetail;
