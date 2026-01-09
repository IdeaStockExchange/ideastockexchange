/**
 * @ideastockexchange/core
 *
 * Core ReasonRank algorithm engine for evidence-based argument evaluation
 */

export * from './types';
export * from './reasonrank';
export * from './semantic-clustering';

// Re-export commonly used items
export {
  ReasonRankCalculator,
  validateScore,
  normalizeScore
} from './reasonrank';

export {
  calculateTextSimilarity,
  areArgumentsSimilar,
  clusterArguments,
  deduplicateArguments
} from './semantic-clustering';
