import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CommentSection.css";

const CommentSection = ({ token }) => {
  const { courseId } = useParams(); // Get the course ID from the URL
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Fetch comments when the component mounts or when courseId or token changes
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/comments/course/${courseId}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        // Ensure that response.data is always an array
        setComments(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]); // Set to empty array in case of error
      }
    };

    fetchComments();
  }, [courseId, token]);

  // Handle new comment text change
  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  // Handle adding an emoji to the comment
  const handleAddEmoji = (emoji) => {
    setNewComment((prev) => prev + emoji);
  };

  // Handle comment submission
  const handleSubmitComment = async () => {
    if (newComment.trim() !== "") {
      try {
        // Post the new comment
        await axios.post(
          `http://127.0.0.1:8000/api/comments/course/${courseId}/`,
          { text: newComment },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNewComment(""); // Clear input after posting

        // Refresh comments after posting
        const response = await axios.get(
          `http://127.0.0.1:8000/api/comments/course/${courseId}/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setComments(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    }
  };

  return (
    <div className="comment-section">
      <div className="comments-area">
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="user-email">
                {comment.user_email.split("@")[0]}{" "}
                {/* Extract and display email before "@" */}
              </div>
              <p>{comment.text}</p>
              <span className="timestamp">{comment.timestamp}</span>{" "}
              {/* Timestamp at bottom right */}
            </div>
          ))
        )}
      </div>

      <div className="comment-form">
        <div className="emoji-bar">
          <span onClick={() => handleAddEmoji("❤️")}>❤️</span>
          <span onClick={() => handleAddEmoji("🙌")}>🙌</span>
          <span onClick={() => handleAddEmoji("🔥")}>🔥</span>
          <span onClick={() => handleAddEmoji("👏")}>👏</span>
          <span onClick={() => handleAddEmoji("😢")}>😢</span>
          <span onClick={() => handleAddEmoji("😍")}>😍</span>
          <span onClick={() => handleAddEmoji("😂")}>😂</span>
        </div>
        <textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={handleCommentChange}
          required
        />
        <button
          onClick={handleSubmitComment}
          disabled={newComment.trim() === ""}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CommentSection;
