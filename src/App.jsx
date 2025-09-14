import { useState } from "react";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    about: "",
    education: "",
    skills: "",
    projects: "",
    certifications: "",
    contact: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [status, setStatus] = useState("");
  const [showForm, setShowForm] = useState(false); // 👈 New state

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle profile picture upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Generate Portfolio
  const handleGenerate = () => {
    setStatus("Generating your portfolio. Please wait.");

    setTimeout(() => {
      setPortfolio(formData);
      setStatus("Portfolio generated successfully");
    }, 1500);
  };

  // Download Portfolio as Word
  const handleDownload = async () => {
    if (!portfolio) {
      setStatus("Please generate a portfolio first");
      return;
    }

    setStatus("Downloading your portfolio");

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: portfolio.name,
                  bold: true,
                  size: 40,
                }),
              ],
            }),
            new Paragraph(portfolio.about),
            new Paragraph("Education: " + portfolio.education),
            new Paragraph("Skills: " + portfolio.skills),
            new Paragraph("Projects: " + portfolio.projects),
            new Paragraph("Certifications: " + portfolio.certifications),
            new Paragraph("Contact: " + portfolio.contact),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "portfolio.docx");

    setTimeout(() => {
      setStatus("Portfolio downloaded");
    }, 1500);
  };

  return (
    <div className="container">
      <h1>AI Portfolio Builder</h1>

      {/* Navbar */}
      <nav>
        <a href="#about">About</a>
        <a href="#education">Education</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#certifications">Certifications</a>
        <a href="#contact">Contact</a>
      </nav>

      {/* Fill Form Button */}
      {!showForm && (
        <button onClick={() => setShowForm(true)}>Fill out the Form</button>
      )}

      {/* Form Section */}
      {showForm && (
        <div className="form-section">
          <label>Name</label>
          <input name="name" value={formData.name} onChange={handleChange} />

          <label>Profile Picture</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />

          <label>About</label>
          <textarea name="about" value={formData.about} onChange={handleChange} />

          <label>Education</label>
          <textarea
            name="education"
            value={formData.education}
            onChange={handleChange}
          />

          <label>Skills</label>
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleChange}
          />

          <label>Projects</label>
          <textarea
            name="projects"
            value={formData.projects}
            onChange={handleChange}
          />

          <label>Certifications</label>
          <textarea
            name="certifications"
            value={formData.certifications}
            onChange={handleChange}
          />

          <label>Contact</label>
          <textarea
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />

          <button onClick={handleGenerate}>Generate Portfolio</button>
          <button onClick={handleDownload}>Download Portfolio</button>
        </div>
      )}

      {/* Status Message */}
      {status && <p className="status">{status}</p>}

      {/* Portfolio Preview */}
      {portfolio && (
        <div className="portfolio">
          {profilePic && (
            <img src={profilePic} alt="Profile" className="profile-pic" />
          )}
          <h2>{portfolio.name}</h2>
          <div className="card" id="about">
            <h3>About</h3>
            <p>{portfolio.about}</p>
          </div>
          <div className="card" id="education">
            <h3>Education</h3>
            <p>{portfolio.education}</p>
          </div>
          <div className="card" id="skills">
            <h3>Skills</h3>
            <p>{portfolio.skills}</p>
          </div>
          <div className="card" id="projects">
            <h3>Projects</h3>
            <p>{portfolio.projects}</p>
          </div>
          <div className="card" id="certifications">
            <h3>Certifications</h3>
            <p>{portfolio.certifications}</p>
          </div>
          <div className="card" id="contact">
            <h3>Contact</h3>
            <p>{portfolio.contact}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
