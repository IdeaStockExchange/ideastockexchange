/**
 * TabGroup component - displays dimension tabs
 */

import React from 'react';
import { TabGroupProps } from '../models/types';

export const TabGroup: React.FC<TabGroupProps> = ({
  tabs,
  activeTab,
  onTabChange
}) => {
  return (
    <nav className="tab-group" aria-label="Belief dimensions">
      {tabs.map(tab => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`${tab.id}-panel`}
          className={`tab ${activeTab === tab.id ? 'active' : ''} ${tab.disabled ? 'disabled' : ''}`}
          onClick={() => !tab.disabled && onTabChange(tab.id)}
          disabled={tab.disabled}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className="tab-count">({tab.count})</span>
          )}
        </button>
      ))}
    </nav>
  );
};

// CSS
const styles = `
.tab-group {
  display: flex;
  gap: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
  margin-bottom: 1.5rem;
}

.tab {
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  font-size: 1rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 150ms ease;
  position: relative;
  bottom: -2px;
}

.tab:hover:not(.disabled) {
  color: #667eea;
  background: #f3f4f6;
}

.tab.active {
  color: #667eea;
  border-bottom-color: #667eea;
  font-weight: 600;
}

.tab.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.tab-count {
  margin-left: 0.5rem;
  font-size: 0.875rem;
  color: inherit;
  opacity: 0.7;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .tab-group {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .tab {
    white-space: nowrap;
  }
}
`;
