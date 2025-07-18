import React from "react";
import "./ContactUs.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaEnvelope, FaPhone } from "react-icons/fa"; // Import icons

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <Navbar />

      {/* Welcome Section */}
      <section className="contact-header">
        <h1>Get in Touch</h1>
        <p>
          Want to get in touch? We'd love to hear from you. Here's how you can
          reach us.
        </p>
      </section>

      {/* Contact Details Section */}
      <section className="contact-details">
        <div className="contact-box">
          {/* Email Icon */}
          <FaEnvelope className="contact-icon" />
          <h2>Email Us</h2>
          <h3>
            Sometimes you need a little bit of help from your friends or FAST
            eLearning support. Don't worry we are here for you!
          </h3>
          <p>l226854@lhr.nu.edu.pk</p>
          <p>l226584@lhr.nu.edu.pk</p>
          <p>l226582@lhr.nu.edu.pk</p>
        </div>
        <div className="contact-box">
          {/* Phone Icon */}
          <FaPhone className="contact-icon" />
          <h2>Contact Us</h2>
          <h3>
            Interested in FAST eLearning? Just pick up the phone to chat with a
            member of FAST eLearning!
          </h3>
          <p>Mobile: +92 312 3456789</p>
          <p>Telephone: +92 42 1234567</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactUs;
