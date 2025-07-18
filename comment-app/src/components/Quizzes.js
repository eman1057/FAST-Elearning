import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import "./Quizzes.css";

const QuizzesDetail = ({ token }) => {
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAlumni, setIsAlumni] = useState(false);
  const courseTitle = location.state?.courseTitle || "Course";

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:8000/api/courses/${courseId}/quizzes/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setQuizzes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quizzes!", error);
        setLoading(false);
      });

    axios
      .get("http://localhost:8000/api/user/status/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setIsAlumni(response.data.is_alumni);
      })
      .catch((error) => {
        console.error("Error checking user status", error);
      });
  }, [courseId, token, navigate]);

  const handleDelete = async (quizId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/quizzes/${quizId}/delete/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
    } catch (error) {
      console.error("Error deleting quiz!", error);
    }
  };

  const isImageFile = (fileUrl) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
    const fileExtension = fileUrl.split(".").pop().toLowerCase();
    return imageExtensions.includes(fileExtension);
  };

  if (loading) {
    return <div>Loading quizzes...</div>;
  }

  return (
    <div className="quiz-container">
      <h1 className="quiz-heading">QUIZZES</h1>
      {isAlumni && (
        <Link
          to={`/course/${courseId}/upload/quiz`}
          state={{ courseTitle, contentType: "quizzes" }}
          className="upload-btn"
        >
          +
        </Link>
      )}
      {quizzes.length > 0 ? (
        <ul className="quiz-list">
          {quizzes.map((quiz) => (
            <li key={quiz.id} className="quiz-box">
              <a
                href={quiz.file}
                target="_blank"
                rel="noopener noreferrer"
                className={`quiz-file ${
                  isImageFile(quiz.file) ? "image-file" : "pdf-file"
                }`}
                style={
                  isImageFile(quiz.file)
                    ? { backgroundImage: `url(${quiz.file})` }
                    : {}
                }
              ></a>
              <p className="quiz-title">{quiz.title}</p>
              {isAlumni && (
                <button
                  onClick={() => handleDelete(quiz.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No quizzes uploaded yet for {courseTitle}.</p>
      )}
    </div>
  );
};

export default QuizzesDetail;
