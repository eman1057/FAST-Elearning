import React from "react";
import "./Home.css";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="home-container">
      {/* Welcome Section */}
      <section className="welcome-section">
        <h1>Welcome to FAST E-Learning</h1>
        <p>
          Access resources, notes, and assignments uploaded by alumni to help
          you succeed!
        </p>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Our Features</h2>
        <div className="features-container">
          {/* Assignment Feature Card */}
          <div className="feature-card-assignments">
            <div className="feature-image"></div>
            <div className="feature-text">
              <h3>Assignments</h3>
              <p>Help with assignments and past papers.</p>
            </div>
          </div>

          {/* Alumni Feature Card */}
          <div className="feature-card-alumni">
            <div className="feature-image"></div>
            <div className="feature-text">
              <h3>Alumni</h3>
              <p>Get guidance and mentorship from alumni.</p>
            </div>
          </div>

          {/* Study Material Feature Card */}
          <div className="feature-card-study-material">
            <div className="feature-image"></div>
            <div className="feature-text">
              <h3>Study Material</h3>
              <p>Access study materials uploaded by seniors.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="courses-section">
        <h2>Popular Courses</h2>
        <div className="courses-container">
          <div className="course-card-1">
            <div className="course-image"></div>
            <div className="course-name">Data Structures</div>
          </div>
          <div className="course-card-2">
            <div className="course-image"></div>
            <div className="course-name">Algorithms</div>
          </div>
          <div className="course-card-3">
            <div className="course-image"></div>
            <div className="course-name">Database Systems</div>
          </div>
          <div className="course-card-4">
            <div className="course-image"></div>
            <div className="course-name">Operating Systems</div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us-section">
        <h2>Why Choose FAST E-Learning?</h2>
        <div className="benefit">
          <span className="benefit-icon">🎓</span>
          <div>
            <h3>Experienced Alumni</h3>
            <p>
              Learn from the experience of those who have succeeded before you.
            </p>
          </div>
        </div>
        <div className="benefit">
          <span className="benefit-icon">📚</span>
          <div>
            <h3>Rich Study Material</h3>
            <p>Access notes, past papers, and assignments from alumni.</p>
          </div>
        </div>
        <div className="benefit">
          <span className="benefit-icon">📈</span>
          <div>
            <h3>Career Guidance</h3>
            <p>Get career insights and guidance to shape your future.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
