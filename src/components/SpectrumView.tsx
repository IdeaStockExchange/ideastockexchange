/**
 * SpectrumView component - visualizes beliefs on -100 to +100 spectrum
 */

import React, { useMemo } from 'react';
import { SpectrumViewProps, SpectrumDot } from '../models/types';
import { Belief } from '../models/Belief';

export const SpectrumView: React.FC<SpectrumViewProps> = ({
  beliefs,
  dimension,
  width,
  height,
  onDotClick
}) => {
  // Calculate dot positions
  const dots: SpectrumDot[] = useMemo(() => {
    return beliefs.map(belief => {
      const position = belief.getSpectrumPosition(dimension);

      // Map -100 to +100 to pixel position
      const x = ((position + 100) / 200) * width;

      // Random vertical jitter to prevent overlap
      const y = height / 2 + (Math.random() * 60 - 30);

      // Dot size based on engagement (min 8, max 24)
      const radius = Math.max(8, Math.min(24, belief.engagementScore / 50));

      // Color based on position
      const color = belief.getColorCode(dimension);

      return {
        belief,
        x,
        y,
        radius,
        color
      };
    });
  }, [beliefs, dimension, width, height]);

  const handleDotClick = (dot: SpectrumDot) => {
    if (onDotClick) {
      onDotClick(dot.belief);
    }
  };

  return (
    <div className="spectrum-view">
      {/* Axis labels */}
      <div className="spectrum-labels">
        <span className="label-harmful">Harmful</span>
        <span className="label-neutral">Neutral</span>
        <span className="label-beneficial">Beneficial</span>
      </div>

      {/* SVG Canvas */}
      <svg
        width={width}
        height={height}
        className="spectrum-canvas"
        role="img"
        aria-label="Spectrum visualization of beliefs"
      >
        {/* Background gradient */}
        <defs>
          <linearGradient id="spectrum-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.1" />
            <stop offset="25%" stopColor="#f59e0b" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#6b7280" stopOpacity="0.1" />
            <stop offset="75%" stopColor="#34d399" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Background */}
        <rect
          x="0"
          y="0"
          width={width}
          height={height}
          fill="url(#spectrum-gradient)"
        />

        {/* Center line */}
        <line
          x1={width / 2}
          y1="0"
          x2={width / 2}
          y2={height}
          stroke="#d1d5db"
          strokeWidth="2"
          strokeDasharray="4 4"
        />

        {/* Axis markers */}
        <g className="axis-markers">
          {[-100, -50, 0, 50, 100].map(value => {
            const x = ((value + 100) / 200) * width;
            return (
              <g key={value}>
                <line
                  x1={x}
                  y1={height - 20}
                  x2={x}
                  y2={height}
                  stroke="#9ca3af"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={height - 5}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#6b7280"
                >
                  {value > 0 ? '+' : ''}{value}
                </text>
              </g>
            );
          })}
        </g>

        {/* Belief dots */}
        {dots.map((dot, index) => (
          <g key={dot.belief.id}>
            <circle
              cx={dot.x}
              cy={dot.y}
              r={dot.radius}
              fill={dot.color}
              opacity="0.8"
              className="spectrum-dot"
              onClick={() => handleDotClick(dot)}
              style={{ cursor: 'pointer' }}
            >
              <title>{`${dot.belief.title}\nScore: ${dot.belief.getFormattedScore(dimension)}`}</title>
            </circle>
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div className="spectrum-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#ef4444' }} />
          <span>Highly Harmful</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#f59e0b' }} />
          <span>Moderately Harmful</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#6b7280' }} />
          <span>Mixed/Neutral</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#34d399' }} />
          <span>Moderately Beneficial</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#10b981' }} />
          <span>Highly Beneficial</span>
        </div>
      </div>
    </div>
  );
};

// CSS
const styles = `
.spectrum-view {
  width: 100%;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.spectrum-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.label-harmful {
  color: #ef4444;
}

.label-neutral {
  color: #6b7280;
}

.label-beneficial {
  color: #10b981;
}

.spectrum-canvas {
  display: block;
  margin: 0 auto;
}

.spectrum-dot {
  transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.spectrum-dot:hover {
  transform: scale(1.3);
}

.spectrum-legend {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #6b7280;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .spectrum-view {
    padding: 0.5rem;
  }

  .spectrum-legend {
    font-size: 0.75rem;
    gap: 0.75rem;
  }
}
`;
