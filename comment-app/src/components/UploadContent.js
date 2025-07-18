import React, { useState } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./uploadContent.css";

const UploadContent = ({ token }) => {
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null); // Generic file input state
  const courseTitle = location.state?.courseTitle || "Course";
  const contentType = location.state?.contentType || "assignment"; // Default to assignment

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You must be logged in to upload content.");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file); // Handles any file type (image, PDF, etc.)
    formData.append("course", courseId);
    formData.append("content_type", contentType); // Specify the type of content

    try {
      // Dynamically post to the correct API endpoint based on contentType
      await axios.post(
        `http://localhost:8000/api/courses/${courseId}/${contentType}/create/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate(-1); // Navigate to the previous page directly
    } catch (error) {
      console.error(
        `Error uploading the ${contentType}:`,
        error.response?.data
      );
      alert(`Failed to upload the ${contentType}.`);
    }
  };

  return (
    <div className="upload-content-page">
      <h1 className="upload-heading">
        Upload {contentType.charAt(0).toUpperCase() + contentType.slice(1)} for{" "}
        {courseTitle}
      </h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">File (Image, PDF, Word, etc.):</label>
          <input
            id="file"
            type="file"
            accept="image/*,.pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit" className="upload-button">
            Upload
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadContent;
