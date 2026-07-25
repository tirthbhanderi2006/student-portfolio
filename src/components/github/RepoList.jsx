import React, { useState } from 'react';
import { BookMarked, Star, GitFork, Search, X } from 'lucide-react';


export default function RepoList({ data }) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!data || data.length === 0) {
    return (
      <p className="repo-empty">No public repositories found.</p>
    );
  }

  const filteredRepos = data.filter((repo) =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <div className="repo-section">
      <div className="section-header">
        <h2>GitHub Repositories</h2>
        <p className="subtitle">
          Live data fetched from the GitHub API — {data.length} public repositories.
        </p>
      </div>

      {/* Search Input Filter */}
      <div className="repo-search-container">
        <div className="repo-search-input-wrapper">
          <Search size={18} className="search-icon" aria-hidden="true" />
          <input
            type="text"
            placeholder="Search repositories by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="repo-search-input"
            aria-label="Search repositories by name"
            id="repo-search-input"
          />
          {searchQuery && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {filteredRepos.length === 0 ? (
        <p className="repo-empty">No repositories matching "{searchQuery}".</p>
      ) : (
        <div className="repo-grid">
          {filteredRepos.map((repo) => (
            <article key={repo.id} className="repo-card">
              {/* Top row: icon */}
              <div className="repo-card-header">
                <div className="repo-icon" aria-hidden="true">
                  <BookMarked size={20} strokeWidth={1.75} />
                </div>
              </div>

              {/* Repository name & Star count alongside */}
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
                <span className="repo-name-stars" title={`${repo.stargazers_count} stars`}>
                  <Star size={13} strokeWidth={2} className="star-icon" />
                  <span>{repo.stargazers_count}</span>
                </span>
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
      )}
    </div>
  );
}
