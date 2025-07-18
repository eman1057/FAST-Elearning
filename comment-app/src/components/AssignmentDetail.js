import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import "./Assignment.css";

const AssignmentDetail = ({ token }) => {
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAlumni, setIsAlumni] = useState(false);
  const courseTitle = location.state?.courseTitle || "Course";

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:8000/api/courses/${courseId}/assignments/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAssignments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching assignments!", error);
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

  const handleDelete = async (assignmentId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/assignments/${assignmentId}/delete/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAssignments(
        assignments.filter((assignment) => assignment.id !== assignmentId)
      );
    } catch (error) {
      console.error("Error deleting assignment!", error);
    }
  };

  const isImageFile = (fileUrl) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
    const fileExtension = fileUrl.split(".").pop().toLowerCase();
    return imageExtensions.includes(fileExtension);
  };

  if (loading) {
    return <div>Loading assignments...</div>;
  }

  return (
    <div className="assignment-container">
      <h1 className="assignment-heading">ASSIGNMENTS</h1>
      {isAlumni && (
        <Link
          to={`/course/${courseId}/upload/assignment`}
          state={{ courseTitle, contentType: "assignments" }}
          className="upload-btn"
        >
          +
        </Link>
      )}
      {assignments.length > 0 ? (
        <ul className="assignment-list">
          {assignments.map((assignment) => (
            <li key={assignment.id} className="assignment-box">
              <a
                href={assignment.file}
                target="_blank"
                rel="noopener noreferrer"
                className={`assignment-file ${
                  isImageFile(assignment.file) ? "image-file" : "pdf-file"
                }`}
                style={
                  isImageFile(assignment.file)
                    ? { backgroundImage: `url(${assignment.file})` }
                    : {}
                }
              ></a>
              <p className="assignment-title">{assignment.title}</p>
              {isAlumni && (
                <button
                  onClick={() => handleDelete(assignment.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No assignments uploaded yet for {courseTitle}.</p>
      )}
    </div>
  );
};

export default AssignmentDetail;
