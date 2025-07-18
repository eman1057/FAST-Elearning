import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import "./PastPapers.css";

const PastPapers = ({ token }) => {
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [pastPapers, setPastPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAlumni, setIsAlumni] = useState(false);
  const courseTitle = location.state?.courseTitle || "Course";

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:8000/api/courses/${courseId}/pastpapers/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPastPapers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching past papers!", error);
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

  const handleDelete = async (pastPaperId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/pastpapers/${pastPaperId}/delete/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPastPapers(
        pastPapers.filter((pastPaper) => pastPaper.id !== pastPaperId)
      );
    } catch (error) {
      console.error("Error deleting past paper!", error);
    }
  };

  const isImageFile = (fileUrl) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
    const fileExtension = fileUrl.split(".").pop().toLowerCase();
    return imageExtensions.includes(fileExtension);
  };

  if (loading) {
    return <div>Loading past papers...</div>;
  }

  return (
    <div className="pastpapers-container">
      <h1 className="pastpapers-heading">PAST PAPERS</h1>
      {isAlumni && (
        <Link
          to={`/course/${courseId}/upload/pastpaper`}
          state={{ courseTitle, contentType: "pastpapers" }}
          className="upload-btn"
        >
          +
        </Link>
      )}
      {pastPapers.length > 0 ? (
        <ul className="pastpapers-list">
          {pastPapers.map((pastPaper) => (
            <li key={pastPaper.id} className="pastpaper-box">
              <a
                href={pastPaper.file}
                target="_blank"
                rel="noopener noreferrer"
                className={`pastpaper-file ${
                  isImageFile(pastPaper.file) ? "image-file" : "pdf-file"
                }`}
                style={
                  isImageFile(pastPaper.file)
                    ? { backgroundImage: `url(${pastPaper.file})` }
                    : {}
                }
              ></a>
              <p className="pastpaper-title">{pastPaper.title}</p>
              {isAlumni && (
                <button
                  onClick={() => handleDelete(pastPaper.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No past papers uploaded yet for {courseTitle}.</p>
      )}
    </div>
  );
};

export default PastPapers;
