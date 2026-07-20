import React from 'react';

export default function Spinner() {
  return (
    <div className="spinner-wrapper" role="status" aria-label="Loading repositories">
      <div className="spinner-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p className="spinner-text">Fetching GitHub repositories…</p>
    </div>
  );
}
