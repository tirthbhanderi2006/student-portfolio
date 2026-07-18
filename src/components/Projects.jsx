import React, { useState } from 'react';

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const projectsList = [
    {
      id: 1,
      title: 'Krushi-Netra',
      category: 'Mobile / AI',
      description: 'Offline AI-powered Android app classifying 12 Indian cattle breeds using a MobileNet-based CNN model – optimized for low-spec devices in rural areas without internet access.',
      tech: ['Android (Java)', 'TensorFlow Lite', 'CNN', 'MobileNet'],
      link: 'https://github.com'
    },
    {
      id: 2,
      title: 'Metis - AI-Powered Recruitment Platform',
      category: 'AI & Web',
      description: 'Automates candidate evaluation via resume parsing (30%) and live contextual AI interviews (70%) with WebSocket-based voice/text support and leaderboard analytics. Includes role-based portals for candidates and HR.',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Flask', 'MongoDB', 'Socket.IO', 'Groq API', 'LangGraph', 'Docker'],
      link: 'https://github.com'
    },
    {
      id: 3,
      title: 'Charaka Vaidya - Ayurvedic AI Assistant',
      category: 'AI / ML',
      description: 'Clinical-grade AI assistant grounded in the Charaka Samhita using RAG with Sthana-weighted semantic reranking and diagnostic structure. Multilingual support (EN, HI, GU) with Safety Filters, Intent Classifiers, and PDF report generation.',
      tech: ['Python', 'Streamlit', 'LangChain', 'ChromaDB', 'Groq API (LLaMA 3 70B)', 'RAG'],
      link: 'https://github.com'
    },
    {
      id: 4,
      title: 'Regulatory Intelligence & Compliance Workspace',
      category: 'AI & Web',
      description: 'Enterprise GenAI workspace automating SFDR RTS reporting. Covers PAI indicators with a Regulatory Consequence Engine mapping penalties. Features layout-aware RAG, What-If Impact Simulator, and reviewer workflows.',
      tech: ['Python', 'FastAPI', 'React 19', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'Groq API', 'PyMuPDF'],
      link: 'https://github.com'
    }
  ];

  const categories = ['All', 'AI & Web', 'AI / ML', 'Mobile / AI'];

  const filteredProjects = filter === 'All'
    ? projectsList
    : projectsList.filter(p => p.category === filter);

  return (
    <section className="projects-section">
      <div className="section-header">
        <h2>My Projects</h2>
        <p className="subtitle">Here are some of the professional and academic projects I have built.</p>
      </div>

      <div className="filter-buttons">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filteredProjects.map(project => (
          <article key={project.id} className="project-card">
            <div className="project-category">{project.category}</div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-tech-tags">
              {project.tech.map((t, i) => (
                <span key={i} className="tech-tag">{t}</span>
              ))}
            </div>
            <div className="project-link-wrapper">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                View Project Repository &rarr;
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
