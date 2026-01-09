import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ArgumentDetail.css';

interface Evidence {
  id: string;
  description: string;
  source: string;
  url?: string;
  quality: string;
  truth_score: number;
}

interface ArgumentLink {
  id: string;
  sub_argument_id: string;
  sub_argument_title: string;
  linkage_score: number;
  importance_weight: number;
  calculated_truth_score: number;
}

interface ArgumentData {
  id: string;
  title: string;
  description: string;
  calculated_truth_score: number;
  evidence: Evidence[];
  supportingArguments: ArgumentLink[];
  opposingArguments: ArgumentLink[];
}

const ArgumentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [argument, setArgument] = useState<ArgumentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArgument();
  }, [id]);

  const fetchArgument = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/arguments/${id}`);
      setArgument(response.data);
    } catch (error) {
      console.error('Error fetching argument:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatScore = (score: number): string => {
    return `${(score * 100).toFixed(0)}%`;
  };

  const getQualityBadge = (quality: string): string => {
    const badges: Record<string, string> = {
      peer_reviewed_study: '🔬 Peer Reviewed',
      expert_testimony: '👨‍🔬 Expert',
      statistical_data: '📊 Statistical',
      case_study: '📋 Case Study',
      anecdotal: '💬 Anecdotal',
      opinion: '💭 Opinion'
    };
    return badges[quality] || quality;
  };

  if (loading) {
    return <div className="loading">Loading argument details...</div>;
  }

  if (!argument) {
    return <div className="error">Argument not found</div>;
  }

  return (
    <div className="argument-detail">
      <Link to="/" className="back-link">← Back to Arguments</Link>

      <div className="argument-header">
        <h1>{argument.title}</h1>
        <p className="description">{argument.description}</p>
      </div>

      <div className="score-card">
        <h2>ReasonRank Score</h2>
        <div className="score-display">
          <div className="score-number">
            {formatScore(argument.calculated_truth_score || 0.5)}
          </div>
          <div className="score-bar large">
            <div
              className="score-fill score-positive"
              style={{ width: `${(argument.calculated_truth_score || 0.5) * 100}%` }}
            />
          </div>
        </div>
        <div className="formula-reminder">
          Argument Strength = Truth Score × Linkage Score × Importance Weight
        </div>
      </div>

      {/* Evidence Section */}
      <section className="evidence-section">
        <h2>📚 Evidence ({argument.evidence.length})</h2>
        {argument.evidence.length === 0 ? (
          <p className="empty">No evidence added yet.</p>
        ) : (
          <div className="evidence-list">
            {argument.evidence.map((evidence) => (
              <div key={evidence.id} className="evidence-item">
                <div className="evidence-header">
                  <span className="quality-badge">
                    {getQualityBadge(evidence.quality)}
                  </span>
                  <span className="truth-score">
                    Truth: {formatScore(evidence.truth_score)}
                  </span>
                </div>
                <p className="evidence-description">{evidence.description}</p>
                <div className="evidence-source">
                  Source: {evidence.url ? (
                    <a href={evidence.url} target="_blank" rel="noopener noreferrer">
                      {evidence.source}
                    </a>
                  ) : (
                    <span>{evidence.source}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Supporting Arguments */}
      <section className="arguments-section supporting">
        <h2>✅ Supporting Arguments ({argument.supportingArguments.length})</h2>
        {argument.supportingArguments.length === 0 ? (
          <p className="empty">No supporting arguments.</p>
        ) : (
          <div className="sub-arguments-list">
            {argument.supportingArguments.map((link) => (
              <Link
                key={link.id}
                to={`/argument/${link.sub_argument_id}`}
                className="sub-argument-card"
              >
                <h3>{link.sub_argument_title}</h3>
                <div className="link-scores">
                  <span>Linkage: {formatScore(link.linkage_score)}</span>
                  <span>Importance: {formatScore(link.importance_weight)}</span>
                  <span>Truth: {formatScore(link.calculated_truth_score || 0.5)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Opposing Arguments */}
      <section className="arguments-section opposing">
        <h2>❌ Opposing Arguments ({argument.opposingArguments.length})</h2>
        {argument.opposingArguments.length === 0 ? (
          <p className="empty">No opposing arguments.</p>
        ) : (
          <div className="sub-arguments-list">
            {argument.opposingArguments.map((link) => (
              <Link
                key={link.id}
                to={`/argument/${link.sub_argument_id}`}
                className="sub-argument-card opposing"
              >
                <h3>{link.sub_argument_title}</h3>
                <div className="link-scores">
                  <span>Linkage: {formatScore(Math.abs(link.linkage_score))}</span>
                  <span>Importance: {formatScore(link.importance_weight)}</span>
                  <span>Truth: {formatScore(link.calculated_truth_score || 0.5)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ArgumentDetail;
