import React from 'react';

export default function AboutMe() {
  const skillCategories = [
    { name: 'Programming Languages', list: ['Java', 'Python', 'Dart', 'JavaScript', 'SQL'] },
    { name: 'Mobile Development', list: ['Flutter', 'Android SDK', 'WebRTC', 'REST API'] },
    { name: 'Backend & Frameworks', list: ['Spring Core', 'Spring Boot', 'FastAPI', 'Flask', 'Microservices Architecture'] },
    { name: 'Databases', list: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'SQLite'] },
    { name: 'AI / ML', list: ['TensorFlow Lite', 'CNN (MobileNet)', 'RAG', 'LangChain', 'LangGraph'] },
    { name: 'Tools & DevOps', list: ['Git', 'GitHub', 'Docker', 'Alembic'] }
  ];

  return (
    <section className="about-section">
      <div className="section-header">
        <h2>About Me</h2>
        <p className="subtitle">AI & ML Student & Android/Flutter Developer</p>
      </div>

      <div className="about-bio">
        <p>
          I am an AI and ML Engineering student and proficient Android and Flutter Developer with experience in Java, Python, and Spring Boot development. I enjoy bridging the gap between design and development, building interactive web/mobile applications and deploying machine learning models.
        </p>
      </div>

      <h3 className="about-subheading">Experience</h3>
      <div className="experience-card">
        <div className="exp-header">
          <div>
            <h4>Android Developer Intern</h4>
            <span className="exp-company">9Brainz, Rajkot, Gujarat</span>
          </div>
          <span className="exp-date">Dec 2024 – Apr 2025</span>
        </div>
        <ul className="exp-bullets">
          <li>Developed and enhanced <strong>Openly</strong>, a full-featured social media app with real-time one-to-one and group video/audio calling using WebRTC, chat with image sharing, and media post interactions.</li>
          <li>Integrated Firebase Authentication, Cloud Firestore, and Cloud Storage; built profile editing, follow/unfollow, user discovery, bookmarking, and push notifications.</li>
        </ul>
        <div className="project-tech-tags" style={{ marginTop: '1rem' }}>
          {['Flutter (Dart)', 'Firebase', 'Cloud Firestore', 'Cloud Storage', 'WebRTC'].map((t, idx) => (
            <span key={idx} className="tech-tag">{t}</span>
          ))}
        </div>
      </div>
      
      <h3 className="about-subheading">Education</h3>
      <div className="education-grid">
        <div className="education-card">
          <span className="edu-date">Expected 2028</span>
          <h4>B.Tech in Artificial Intelligence and Machine Learning</h4>
          <p className="edu-inst">CHARUSAT</p>
          <p className="edu-gpa"><strong>GPA:</strong> 8.23 (till 2nd Year)</p>
        </div>
        <div className="education-card">
          <span className="edu-date">Sep 2023 – Apr 2025</span>
          <h4>Diploma in Computer Engineering</h4>
          <p className="edu-inst">RK University</p>
          <p className="edu-gpa"><strong>GPA:</strong> 9.63</p>
        </div>
      </div>

      <h3 className="about-subheading">Technical Skills</h3>
      <div className="skills-by-category">
        {skillCategories.map((cat, idx) => (
          <div key={idx} className="skill-cat-box">
            <h5>{cat.name}</h5>
            <div className="skills-container">
              {cat.list.map((skill, sIdx) => (
                <span key={sIdx} className="skill-chip">{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
