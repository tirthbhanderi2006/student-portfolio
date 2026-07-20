import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-wrapper" role="alert">
      <div className="error-icon" aria-hidden="true">
        <AlertTriangle size={40} strokeWidth={1.5} />
      </div>
      <h3 className="error-title">Failed to load repositories</h3>
      <p className="error-body">{message}</p>
      {onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          <RefreshCw size={15} strokeWidth={2} />
          Try again
        </button>
      )}
    </div>
  );
}
