import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ArgumentList.css';

interface ArgumentSummary {
  id: string;
  title: string;
  description: string;
  calculated_truth_score: number;
  evidence_count: number;
  created_by_username: string;
  created_at: string;
}

const ArgumentList: React.FC = () => {
  const [arguments, setArguments] = useState<ArgumentSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchArguments();
  }, [searchTerm]);

  const fetchArguments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/arguments', {
        params: { search: searchTerm || undefined }
      });
      setArguments(response.data.arguments || []);
    } catch (error) {
      console.error('Error fetching arguments:', error);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number | null): string => {
    if (score === null || score === undefined) return 'neutral';
    if (score >= 0.7) return 'positive';
    if (score <= 0.3) return 'negative';
    return 'neutral';
  };

  const formatScore = (score: number | null): string => {
    if (score === null || score === undefined) return 'Not calculated';
    return `${(score * 100).toFixed(0)}%`;
  };

  return (
    <div className="argument-list">
      <div className="list-header">
        <h2>Arguments & Beliefs</h2>
        <p>Evidence-based argument evaluation using the ReasonRank algorithm</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search arguments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading arguments...</div>
      ) : arguments.length === 0 ? (
        <div className="empty-state">
          <p>No arguments found.</p>
          <Link to="/create" className="create-button">
            Create your first argument
          </Link>
        </div>
      ) : (
        <div className="arguments-grid">
          {arguments.map((arg) => (
            <Link
              key={arg.id}
              to={`/argument/${arg.id}`}
              className="argument-card"
            >
              <h3>{arg.title}</h3>
              <p className="description">
                {arg.description.substring(0, 200)}
                {arg.description.length > 200 ? '...' : ''}
              </p>

              <div className="score-section">
                <div className="score-label">Truth Score</div>
                <div className="score-bar">
                  <div
                    className={`score-fill score-${getScoreColor(arg.calculated_truth_score)}`}
                    style={{ width: `${(arg.calculated_truth_score || 0.5) * 100}%` }}
                  />
                </div>
                <div className="score-value">
                  {formatScore(arg.calculated_truth_score)}
                </div>
              </div>

              <div className="metadata">
                <span>📊 {arg.evidence_count} evidence</span>
                <span>👤 {arg.created_by_username || 'Anonymous'}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArgumentList;
