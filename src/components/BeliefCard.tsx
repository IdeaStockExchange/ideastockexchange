/**
 * BeliefCard component - displays a single belief in list view
 */

import React from 'react';
import { Belief } from '../models/Belief';
import { BeliefCardProps } from '../models/types';

export const BeliefCard: React.FC<BeliefCardProps> = ({
  belief,
  showDimension = true,
  onClick,
  compact = false
}) => {
  const position = belief.getSpectrumPosition();
  const color = belief.getColorCode();
  const label = belief.getPositionLabel();
  const formattedScore = belief.getFormattedScore();

  const handleClick = () => {
    if (onClick) {
      onClick(belief);
    }
  };

  return (
    <div
      className={`belief-card ${compact ? 'compact' : ''}`}
      onClick={handleClick}
      role="article"
      aria-label="Belief card"
      tabIndex={0}
    >
      {/* Score Badge */}
      <div
        className="score-badge"
        style={{ backgroundColor: color }}
        aria-label={`Spectrum position: ${formattedScore}`}
      >
        {position > 0 ? '+' : ''}{position}
      </div>

      {/* Content */}
      <div className="belief-content">
        <h3 className="belief-title">{belief.title}</h3>

        {/* Metadata */}
        <div className="belief-meta">
          {showDimension && (
            <span className="dimension-badge">
              {belief.primaryDimension.charAt(0).toUpperCase() + belief.primaryDimension.slice(1)}
            </span>
          )}
          <span className="engagement-indicator">
            Engagement: {belief.engagementScore.toLocaleString()}
          </span>
        </div>

        {/* Description */}
        {!compact && (
          <p className="belief-description">
            {belief.description.length > 160
              ? belief.description.substring(0, 157) + '...'
              : belief.description}
          </p>
        )}

        {/* Stats */}
        <div className="belief-stats">
          <span className="stat">
            👥 {belief.interestCount} interested
          </span>
          <span className="stat">
            💬 {belief.responseCount} responses
          </span>
          <span className="stat">
            🔗 {belief.linkCount} links
          </span>
        </div>
      </div>
    </div>
  );
};

// CSS (can be in separate file)
const styles = `
.belief-card {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 150ms ease-out;
}

.belief-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.belief-card.compact {
  padding: 1rem;
}

.score-badge {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  font-size: 18px;
}

.belief-content {
  flex: 1;
  min-width: 0;
}

.belief-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
}

.belief-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.dimension-badge {
  background: #e5e7eb;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-weight: 500;
}

.belief-description {
  margin: 0.5rem 0;
  color: #4b5563;
  line-height: 1.5;
}

.belief-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
`;
