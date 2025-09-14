import React, { useState } from "react";
import { saveAs } from "file-saver";
import "./App.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [portfolioData, setPortfolioData] = useState(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    setStatusMessage("Generating your portfolio. Please wait!");

    setTimeout(() => {
      const form = e.target;
      const data = {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        role: form.role.value,
        degree: form.degree.value,
        major: form.major.value,
        university: form.university.value,
        contact: form.contact.value,
        email: form.email.value,
        skills: form.skills.value.split(","),
        projects: form.projects.value.split("\n"),
        certifications: form.certifications.value.split("\n"),
      };
      setPortfolioData(data);
      setStatusMessage("");
    }, 2000);
  };

  const handleDownload = () => {
    setStatusMessage("Downloading your portfolio. Please wait...");
    setTimeout(() => {
      const content = document.getElementById("portfolio").innerText;
      const blob = new Blob([content], { type: "application/msword" });
      saveAs(blob, "MyPortfolio.doc");
      setStatusMessage("");
    }, 2000);
  };

  return (
    <div className="container">
      <h1>AI Portfolio Builder</h1>

      {/* Show/Hide Form */}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Fill the Form"}
      </button>

      {/* Portfolio Form */}
      {showForm && (
        <form onSubmit={handleGenerate} className="form-section">
          <h2>Fill Your Details</h2>

          <label>First Name:</label>
          <input type="text" name="firstName" required />

          <label>Last Name:</label>
          <input type="text" name="lastName" required />

          <label>Role/Title:</label>
          <input type="text" name="role" required />

          <label>Degree:</label>
          <input type="text" name="degree" required />

          <label>Major:</label>
          <input type="text" name="major" required />

          <label>University:</label>
          <input type="text" name="university" required />

          <label>Contact Number:</label>
          <input type="text" name="contact" required />

          <label>Email:</label>
          <input type="email" name="email" required />

          <label>Skills (comma separated):</label>
          <textarea name="skills" rows="2" required></textarea>

          <label>Projects:</label>
          <textarea name="projects" rows="3"></textarea>

          <label>Certifications:</label>
          <textarea name="certifications" rows="2"></textarea>

          <button type="submit">Generate Portfolio</button>
        </form>
      )}

      {/* Status Message */}
      {statusMessage && <p className="status">{statusMessage}</p>}

      {/* Portfolio Display */}
      {portfolioData && (
        <>
          <div id="portfolio" className="portfolio">
            <nav>
              <a href="#about">About</a>
              <a href="#education">Education</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#certifications">Certifications</a>
              <a href="#contact">Contact</a>
            </nav>

            <section id="about">
              <h2>About Me</h2>
              <p>
                <strong>
                  {portfolioData.firstName} {portfolioData.lastName}
                </strong>{" "}
                - {portfolioData.role}
              </p>
            </section>

            <section id="education">
              <h2>Education</h2>
              <p>
                {portfolioData.degree} in {portfolioData.major},{" "}
                {portfolioData.university}
              </p>
            </section>

            <section id="skills">
              <h2>Skills</h2>
              <ul>
                {portfolioData.skills.map((s, i) => (
                  <li key={i}>{s.trim()}</li>
                ))}
              </ul>
            </section>

            <section id="projects">
              <h2>Projects</h2>
              <ul>
                {portfolioData.projects.map((p, i) => (
                  <li key={i}>{p.trim()}</li>
                ))}
              </ul>
            </section>

            <section id="certifications">
              <h2>Certifications</h2>
              <ul>
                {portfolioData.certifications.map((c, i) => (
                  <li key={i}>{c.trim()}</li>
                ))}
              </ul>
            </section>

            <section id="contact">
              <h2>Contact</h2>
              <p>Email: {portfolioData.email}</p>
              <p>Phone: {portfolioData.contact}</p>
            </section>
          </div>

          {/* Download Button */}
          <button onClick={handleDownload}>Download Portfolio</button>
        </>
      )}
    </div>
  );
}

export default App;
