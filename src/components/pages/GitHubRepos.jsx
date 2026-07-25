import React, { useState, useEffect } from 'react';

const GithubIcon = ({ size = 24, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577
      0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755
      -1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07
      1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332
      -5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005
      -.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552
      3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22
      0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015
      3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z"
    />
  </svg>
);

import Spinner from '../github/Spinner';
import ErrorMessage from '../github/ErrorMessage';
import RepoList from '../github/RepoList';

const GITHUB_USERNAME = 'tirthbhanderi2006';
const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=30&sort=updated`;

export default function GitHubRepos() {
  const [data, setData]         = useState(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const fetchRepos = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(API_URL, {
        headers: { Accept: 'application/vnd.github+json' },
      });

      if (!response.ok) {
        const msg =
          response.status === 403
            ? 'GitHub API rate limit exceeded. Please wait a minute and try again.'
            : response.status === 404
            ? `GitHub user "${GITHUB_USERNAME}" was not found.`
            : `GitHub API responded with HTTP ${response.status}.`;
        throw new Error(msg);
      }

      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  const handleRetry = () => {
    fetchRepos();
  };


  return (
    <section className="github-page-section" aria-label="GitHub Repositories">

      {/* Page header */}
      <div className="section-header">
        <div className="github-page-title">
          <GithubIcon size={32} className="github-page-icon" />
          <h2>GitHub Repositories</h2>
        </div>
        <p className="subtitle">
          Live public repositories fetched directly from the GitHub API for&nbsp;
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            @{GITHUB_USERNAME}
          </a>
          .
        </p>
      </div>

      {/*  [loading] -> Spinner  */}
      {loading && <Spinner />}

      {/*  [error] -> ErrorMessage  */}
      {!loading && error && (
        <ErrorMessage message={error} onRetry={handleRetry} />
      )}

      {/*  [success] -> RepoList  */}
      {!loading && !error && data && (
        <RepoList data={data} />
      )}

    </section>
  );
}
