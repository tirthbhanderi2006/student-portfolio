import React from 'react';
import { BookMarked, Star, GitFork } from 'lucide-react';


export default function RepoList({ data }) {
  if (!data || data.length === 0) {
    return (
      <p className="repo-empty">No public repositories found.</p>
    );
  }

  return (
    <div className="repo-section">
      <div className="section-header">
        <h2>GitHub Repositories</h2>
        <p className="subtitle">
          Live data fetched from the GitHub API — {data.length} public repositories.
        </p>
      </div>

      <div className="repo-grid">
        {data.map((repo) => (
          <article key={repo.id} className="repo-card">
            {/* Top row: icon + star count */}
            <div className="repo-card-header">
              <div className="repo-icon" aria-hidden="true">
                <BookMarked size={20} strokeWidth={1.75} />
              </div>
              <div className="repo-star-badge">
                <Star size={13} strokeWidth={2} className="star-icon" />
                {repo.stargazers_count}
              </div>
            </div>

            {/* Repository name */}
            <h3 className="repo-name">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="repo-name-link"
                id={`repo-link-${repo.id}`}
              >
                {repo.name}
              </a>
            </h3>

            {/* Description (may be null from API) */}
            <p className="repo-description">
              {repo.description || 'No description provided.'}
            </p>

            {/* Footer: language + fork count + visit button */}
            <div className="repo-card-footer">
              <div className="repo-meta">
                {repo.language && (
                  <span className="repo-lang">
                    <span className="lang-dot" aria-hidden="true"></span>
                    {repo.language}
                  </span>
                )}
                {repo.forks_count > 0 && (
                  <span className="repo-forks">
                    <GitFork size={13} strokeWidth={2} />
                    {repo.forks_count}
                  </span>
                )}
              </div>

              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="repo-visit-btn"
                id={`repo-visit-${repo.id}`}
                aria-label={`Visit ${repo.name} on GitHub`}
              >
                View on GitHub →
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
