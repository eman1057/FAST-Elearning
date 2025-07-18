import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Rating.css";

const Rating = ({ token }) => {
  const { courseId } = useParams();
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(null);
  const [numRatings, setNumRatings] = useState(0);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to fetch course details
  const fetchCourseDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/course/${courseId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { average_rating = 0, number_of_ratings = 0 } = response.data;
      setAverageRating(average_rating);
      setNumRatings(number_of_ratings);
      setMessage("");
    } catch (error) {
      console.error("Error fetching course ratings:", error.response || error);
      setMessage(
        error.response?.data?.message || "Failed to fetch course ratings."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails();
    } else {
      setMessage("Invalid course ID.");
      console.error("Invalid course ID:", courseId);
    }
  }, [courseId, token]);

  // Handle rating submission
  const handleRatingSubmit = async () => {
    if (!rating) {
      setMessage("Please select a rating.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/course/${courseId}/rate/`,
        { rating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Fetch updated course details after rating submission
      fetchCourseDetails(); // Refresh ratings

      setMessage("Rating submitted successfully!");
    } catch (error) {
      console.error("Error submitting rating:", error.response || error);
      setMessage(
        error.response?.data?.message ||
          "Failed to submit rating. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rating-page">
      <h1>Rate the Course</h1>
      {message && (
        <p
          className={`message ${
            message.includes("successfully") ? "success" : "error"
          }`}
        >
          {message}
        </p>
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="current-ratings">
            <p>
              Average Rating:{" "}
              {averageRating !== null && averageRating !== undefined
                ? averageRating.toFixed(1)
                : "N/A"}{" "}
              / 5
            </p>
            <p>Number of Ratings: {numRatings}</p>
          </div>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${rating >= star ? "filled" : ""}`}
                onClick={() => setRating(star)}
                role="button"
                aria-label={`Rate ${star} stars`}
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
          <button
            onClick={handleRatingSubmit}
            className="submit-rating"
            disabled={isLoading}
          >
            Submit Rating
          </button>
        </>
      )}
    </div>
  );
};

export default Rating;
