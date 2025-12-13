/**
 * Main entry point for Topics Page Design system
 *
 * Exports all core functionality for organizing and evaluating beliefs
 * across Purpose, Function, and Form dimensions.
 */

// Types
export * from './models/types';

// Models
export { Belief } from './models/Belief';

// Utils
export {
  filterBeliefs,
  sortBeliefs,
  paginateBeliefs,
  searchBeliefs,
  getSortFunction,
  groupByDimension,
  groupByPosition
} from './utils/beliefFilters';

export {
  calculateDimensionScore,
  calculateEngagement,
  calculateControversy,
  calculateEffectiveness,
  calculateEfficiency,
  calculateReliability,
  getEvidenceQualityMultiplier,
  mapStarsToScore,
  determineConfidence,
  normalizeScore,
  clampScore,
  formatScore,
  getScoreDescriptor
} from './utils/scoring';

// Templates
export {
  policyTemplate,
  productTemplate,
  TOPIC_TEMPLATES,
  getTemplate
} from './templates/topicTemplates';

// Components (for React applications)
export { BeliefCard } from './components/BeliefCard';
export { TabGroup } from './components/TabGroup';
export { SpectrumView } from './components/SpectrumView';
