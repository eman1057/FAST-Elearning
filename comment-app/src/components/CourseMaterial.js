import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import "./CourseMaterial.css";

const CourseMaterialDetail = ({ token }) => {
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAlumni, setIsAlumni] = useState(false);
  const courseTitle = location.state?.courseTitle || "Course";

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:8000/api/courses/${courseId}/coursematerials/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMaterials(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching course materials!", error);
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

  const handleDelete = async (materialId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/coursematerials/${materialId}/delete/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMaterials(materials.filter((material) => material.id !== materialId));
    } catch (error) {
      console.error("Error deleting course material!", error);
    }
  };

  const isImageFile = (fileUrl) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
    const fileExtension = fileUrl.split(".").pop().toLowerCase();
    return imageExtensions.includes(fileExtension);
  };

  if (loading) {
    return <div>Loading course materials...</div>;
  }

  return (
    <div className="coursematerial-container">
      <h1 className="coursematerial-heading">COURSE MATERIALS</h1>
      {isAlumni && (
        <Link
          to={`/course/${courseId}/upload/coursematerial`}
          state={{ courseTitle, contentType: "coursematerials" }}
          className="upload-btn"
        >
          +
        </Link>
      )}
      {materials.length > 0 ? (
        <ul className="coursematerial-list">
          {materials.map((material) => (
            <li key={material.id} className="coursematerial-box">
              <a
                href={material.file}
                target="_blank"
                rel="noopener noreferrer"
                className={`coursematerial-file ${
                  isImageFile(material.file) ? "image-file" : "pdf-file"
                }`}
                style={
                  isImageFile(material.file)
                    ? { backgroundImage: `url(${material.file})` }
                    : {}
                }
              ></a>
              <p className="coursematerial-title">{material.title}</p>
              {isAlumni && (
                <button
                  onClick={() => handleDelete(material.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No course materials uploaded yet for {courseTitle}.</p>
      )}
    </div>
  );
};

export default CourseMaterialDetail;
