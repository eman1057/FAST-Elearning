import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import AssignmentDetail from "./components/AssignmentDetail";
import CommentsPage from "./components/CommentsPage";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Navbar from "./components/Navbar";
import ContactUs from "./components/ContactUs";
import Alumni from "./components/Alumni";
import UploadContent from "./components/UploadContent";
import Quizzes from "./components/Quizzes";
import PastPapers from "./components/PastPapers";
import CourseMaterial from "./components/CourseMaterial";
import Rating from "./components/Rating"; // Import Rating component

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route
            path="/signup"
            element={<Signup onSignupSuccess={() => setToken(true)} />}
          />
          <Route
            path="/courses"
            element={
              token ? (
                <Courses token={token} />
              ) : (
                <div>
                  <h1>Please login first</h1>
                  <Link to="/login">
                    <button>Go to Login</button>
                  </Link>
                </div>
              )
            }
          />
          <Route
            path="/course/:courseId"
            element={
              token ? (
                <CourseDetail token={token} />
              ) : (
                <div>
                  <h1>Please login first</h1>
                  <Link to="/login">
                    <button>Go to Login</button>
                  </Link>
                </div>
              )
            }
          />
          <Route
            path="/course/:courseId/rating"
            element={
              token ? (
                <Rating token={token} />
              ) : (
                <div>
                  <h1>Please login first</h1>
                  <Link to="/login">
                    <button>Go to Login</button>
                  </Link>
                </div>
              )
            }
          />
          <Route
            path="/course/:courseId/assignments"
            element={
              token ? (
                <AssignmentDetail token={token} />
              ) : (
                <div>
                  <h1>Please login first</h1>
                  <Link to="/login">
                    <button>Go to Login</button>
                  </Link>
                </div>
              )
            }
          />
          <Route
            path="/course/:courseId/quizzes"
            element={
              token ? (
                <Quizzes token={token} />
              ) : (
                <div>
                  <h1>Please login first</h1>
                  <Link to="/login">
                    <button>Go to Login</button>
                  </Link>
                </div>
              )
            }
          />
          <Route
            path="/course/:courseId/coursematerials"
            element={
              token ? (
                <CourseMaterial token={token} />
              ) : (
                <div>
                  <h1>Please login first</h1>
                  <Link to="/login">
                    <button>Go to Login</button>
                  </Link>
                </div>
              )
            }
          />
          <Route
            path="/course/:courseId/pastpapers"
            element={
              token ? (
                <PastPapers token={token} />
              ) : (
                <div>
                  <h1>Please login first</h1>
                  <Link to="/login">
                    <button>Go to Login</button>
                  </Link>
                </div>
              )
            }
          />
          <Route
            path="/course/:courseId/upload/:contentType"
            element={
              token ? (
                <UploadContent token={token} />
              ) : (
                <div>
                  <h1>Please login first</h1>
                  <Link to="/login">
                    <button>Go to Login</button>
                  </Link>
                </div>
              )
            }
          />
          <Route
            path="/comments/course/:courseId"
            element={
              token ? (
                <CommentsPage token={token} />
              ) : (
                <div>
                  <h1>Please login first</h1>
                  <Link to="/login">
                    <button>Go to Login</button>
                  </Link>
                </div>
              )
            }
          />

          <Route
            path="/course/:courseId/discussion"
            element={
              token ? (
                <CommentsPage token={token} />
              ) : (
                <div>
                  <h1>Please login first</h1>
                  <Link to="/login">
                    <button>Go to Login</button>
                  </Link>
                </div>
              )
            }
          />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/alumni" element={<Alumni />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
