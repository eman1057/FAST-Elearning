import React from "react";
import "./Alumni.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Alumni = () => {
  return (
    <div className="alumni-container">
      <Navbar />

      {/* Header Section */}
      <section className="alumni-header">
        <h1>Alumni's of FAST</h1>
        <p>"Leaders of Tomorrow, Mentors of Today"</p>
      </section>

      {/* Alumni Description Section */}
      <section className="alumni-description">
        <p>
          The journey of our alumni toppers is nothing short of inspiring. From
          mastering complex algorithms to solving real-world problems, they have
          proven their brilliance time and again. By contributing to the FAST
          E-Learning platform, they are becoming invaluable mentors, ensuring
          that their juniors have access to the best resources to excel in their
          own academic journeys.
        </p>
      </section>

      {/* Alumni Content Section */}
      <section className="alumni-content">
        <div className="alumni-row">
          <div className="alumni-box">
            <div className="alumni-image small-circle"></div>
            <h3>1. Sarah Ahmed</h3>
            <p>
              Graduating with a GPA of 3.98, Sarah's exceptional problem-solving
              skills and leadership in hackathons set her apart. Now, as an
              alumna, she continues to help others by sharing her comprehensive
              course materials, notes, and assignments, ensuring juniors have
              everything they need to succeed academically.
            </p>
          </div>

          <div className="alumni-box">
            <div className="alumni-image small-circle"></div>
            <h3>2. Ali Raza</h3>
            <p>
              With a remarkable GPA of 3.95, Ali was known for his deep
              understanding of subjects like AI and Machine Learning. His peers
              often sought his guidance for complex topics. Ali's contributions
              to the FAST E-Learning platform include well-organized lecture
              notes and assignments that provide invaluable support to students
              aspiring to follow in his footsteps.
            </p>
          </div>

          <div className="alumni-box">
            <div className="alumni-image small-circle"></div>
            <h3>3. Maria Khan</h3>
            <p>
              Maria Khan graduated with a rare 4.0 GPA, excelling in programming
              competitions like Procom and ACM ICPC. Her deep knowledge in
              algorithm design and problem-solving, combined with her generosity
              in sharing notes and assignments, has made her an inspiring figure
              for juniors striving for academic excellence.
            </p>
          </div>
        </div>

        <div className="alumni-row">
          <div className="alumni-box">
            <div className="alumni-image small-circle"></div>
            <h3>4. Ayesha Iqbal</h3>
            <p>
              Ayesha Iqbal's exceptional GPA of 3.99 reflects her proficiency in
              web development and database management. Known for her innovative
              solutions in senior projects, Ayesha continues to support the FAST
              community by sharing detailed coursework, projects, and insights,
              ensuring that juniors are well-equipped to tackle their own
              academic challenges.
            </p>
          </div>

          <div className="alumni-box">
            <div className="alumni-image small-circle"></div>
            <h3>5. Ahmed Siddiqui</h3>
            <p>
              With a GPA of 3.96, Ahmed's expertise in computer networks and
              system design earned him accolades during his time at FAST. He
              continues to mentor students by uploading carefully curated
              materials and providing valuable insights, helping juniors
              navigate the complexities of their academic and professional
              journeys.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Alumni;
