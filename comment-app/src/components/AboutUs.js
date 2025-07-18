import React from "react";
import "./AboutUs.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <Navbar />

      {/* Welcome Section */}
      <section className="about-us-section">
        <h1>About Us</h1>
        <p>
          "Empowering students, connecting knowledge, and fostering success —
          FAST E-Learning, your academic companion."
        </p>
      </section>

      {/* Description Section */}
      <section className="about-description">
        <div className="left-column">
          <h2>Vision & Mission</h2>
          <p>
            At FAST E-Learning, our vision is to transform education by creating
            a platform where students can access resources, collaborate, and
            learn flexibly. Our mission is to provide a user-friendly space that
            bridges learning gaps, enhances peer-to-peer knowledge sharing, and
            ensures academic success for every student. We aim to make learning
            more accessible, personalized, and interactive, while supporting
            both junior and senior students in their educational journeys.
          </p>
        </div>

        <div className="right-column">
          <h2>Services & Benefits</h2>
          <p>
            FAST E-Learning offers a comprehensive range of services including
            course materials, past exams, study notes, quizzes, and assignments.
            Senior students can create and share tutorials or study aids,
            helping juniors succeed academically. The heart of our platform lies
            in our vibrant discussion forums and study groups, where students
            can engage with peers, collaborate on solving problems, and share
            valuable insights. By promoting active interaction and teamwork, we
            ensure that students have the resources and support they need to
            thrive.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
