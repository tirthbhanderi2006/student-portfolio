import React, { useState, useEffect } from 'react';

const GITHUB_API_URL =
  'https://api.github.com/repos/tirthbhanderi2006/certificates/contents/';

// ── Award Icon (header only) ───────────────────────────────────────────────
const AwardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
    viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

// ── Certificate Card — preview only ───────────────────────────────────────
function CertCard({ cert }) {
  const [loaded, setLoaded] = useState(false);

  const previewUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
    cert.download_url
  )}&embedded=true`;

  return (
    <a
      href={cert.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="cert-card"
      id={`cert-${cert.sha.slice(0, 8)}`}
    >
      {/* shimmer while PDF loads */}
      {!loaded && <div className="cert-preview-shimmer" />}

      <iframe
        src={previewUrl}
        title={cert.name}
        className="cert-preview-frame"
        style={{ opacity: loaded ? 1 : 0 }}
        onLoad={() => setLoaded(true)}
        sandbox="allow-scripts allow-same-origin allow-popups"
        loading="lazy"
      />
    </a>
  );
}

// ── Skeleton loader ────────────────────────────────────────────────────────
function CertSkeleton() {
  return <div className="cert-card cert-skeleton-card" />;
}

// ── Page ───────────────────────────────────────────────────────────────────
export default function Certificates() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchCerts() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(GITHUB_API_URL);
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        const data = await res.json();
        if (!cancelled)
          setCerts(data.filter((f) => f.type === 'file' && f.name.toLowerCase().endsWith('.pdf')));
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchCerts();
    return () => { cancelled = true; };
  }, []);

  const handleRetry = () => {
    setCerts([]);
    setLoading(true);
    setError(null);
    fetch(GITHUB_API_URL)
      .then((r) => { if (!r.ok) throw new Error(`GitHub API error: ${r.status}`); return r.json(); })
      .then((data) => setCerts(data.filter((f) => f.type === 'file' && f.name.toLowerCase().endsWith('.pdf'))))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <section className="certs-section">
      {/* Page header */}
      <div className="section-header">
        <h2>
          <span className="certs-header-icon"><AwardIcon /></span>
          My Certificates
        </h2>
        <p className="subtitle">
          Professional certifications &amp; course completions — fetched live from GitHub.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="certs-grid">
          {[1, 2, 3].map((i) => <CertSkeleton key={i} />)}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="error-wrapper">
          <span className="error-icon">⚠️</span>
          <p className="error-title">Could not load certificates</p>
          <p className="error-body">{error}</p>
          <button className="retry-btn" onClick={handleRetry}>Try Again</button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && certs.length === 0 && (
        <p className="cert-empty">No certificates found in the repository.</p>
      )}

      {/* Grid of previews */}
      {!loading && !error && certs.length > 0 && (
        <div className="certs-grid">
          {certs.map((cert) => <CertCard key={cert.sha} cert={cert} />)}
        </div>
      )}
    </section>
  );
}
