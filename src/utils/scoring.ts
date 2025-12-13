/**
 * Utility functions for calculating belief scores
 */

import {
  DimensionScore,
  IndicatorScore,
  Score,
  ConfidenceLevel,
  Evidence,
  EvidenceType
} from '../models/types';

// ============================================================================
// SCORE CALCULATION
// ============================================================================

/**
 * Calculate dimension score from indicator scores
 * @param indicators - Array of indicator scores
 * @returns Overall score for the dimension
 */
export function calculateDimensionScore(indicators: IndicatorScore[]): Score {
  if (indicators.length === 0) {
    return {
      value: 0,
      confidence: ConfidenceLevel.SPECULATIVE,
      notes: 'No indicators provided'
    };
  }

  // Normalize weights to sum to 1
  const totalWeight = indicators.reduce((sum, ind) => sum + ind.weight, 0);

  if (totalWeight === 0) {
    return {
      value: 0,
      confidence: ConfidenceLevel.SPECULATIVE,
      notes: 'Total weight is zero'
    };
  }

  // Calculate weighted average
  let weightedSum = 0;
  const confidenceLevels: ConfidenceLevel[] = [];
  const allEvidence: Evidence[] = [];

  for (const indicator of indicators) {
    const normalizedWeight = indicator.weight / totalWeight;
    weightedSum += indicator.score.value * normalizedWeight;
    confidenceLevels.push(indicator.score.confidence);

    if (indicator.score.evidence) {
      allEvidence.push(...indicator.score.evidence);
    }
  }

  // Determine overall confidence (take minimum)
  const overallConfidence = getMinimumConfidence(confidenceLevels);

  // Calculate confidence range
  const range = calculateConfidenceRange(weightedSum, overallConfidence);

  return {
    value: Math.round(weightedSum),
    confidence: overallConfidence,
    range,
    evidence: allEvidence
  };
}

/**
 * Calculate engagement score
 * @param interestCount - Number of interested people
 * @param conviction - Absolute spectrum position (0-100)
 * @returns Engagement score
 */
export function calculateEngagement(interestCount: number, conviction: number): number {
  return interestCount * Math.abs(conviction);
}

/**
 * Calculate controversy score from belief positions
 * @param positions - Array of belief spectrum positions
 * @returns Controversy score (higher = more disagreement)
 */
export function calculateControversy(positions: number[]): number {
  if (positions.length < 2) {
    return 0;
  }

  // Calculate standard deviation
  const mean = positions.reduce((sum, pos) => sum + pos, 0) / positions.length;
  const variance = positions.reduce((sum, pos) => sum + Math.pow(pos - mean, 2), 0) / positions.length;
  const stdDev = Math.sqrt(variance);

  // Weight by number of beliefs (more beliefs = more significant controversy)
  return stdDev * Math.log(positions.length + 1);
}

/**
 * Calculate evidence quality multiplier
 * @param evidenceType - Type of evidence
 * @returns Quality multiplier (0.0 to 1.0)
 */
export function getEvidenceQualityMultiplier(evidenceType: EvidenceType): number {
  const multipliers: Record<EvidenceType, number> = {
    [EvidenceType.META_ANALYSIS]: 1.0,
    [EvidenceType.RCT]: 0.9,
    [EvidenceType.STATISTICAL]: 0.7,
    [EvidenceType.OBSERVATIONAL]: 0.5,
    [EvidenceType.SURVEY]: 0.4,
    [EvidenceType.CASE_STUDY]: 0.4,
    [EvidenceType.EXPERT_OPINION]: 0.3,
    [EvidenceType.ANECDOTAL]: 0.2
  };

  return multipliers[evidenceType] || 0.0;
}

/**
 * Calculate effectiveness score with evidence quality adjustment
 * @param actualOutcome - Actual measured outcome
 * @param intendedOutcome - Intended/target outcome
 * @param evidenceType - Type of evidence
 * @returns Effectiveness score (-100 to +100)
 */
export function calculateEffectiveness(
  actualOutcome: number,
  intendedOutcome: number,
  evidenceType: EvidenceType
): number {
  if (intendedOutcome === 0) {
    return 0;
  }

  const rawScore = (actualOutcome / intendedOutcome) * 100;
  const multiplier = getEvidenceQualityMultiplier(evidenceType);

  return Math.round(Math.max(-100, Math.min(100, rawScore * multiplier)));
}

/**
 * Calculate efficiency score based on cost-benefit ratio
 * @param benefit - Total benefit value
 * @param cost - Total cost
 * @param scalingFactor - Factor to scale to -100 to +100 range
 * @returns Efficiency score
 */
export function calculateEfficiency(
  benefit: number,
  cost: number,
  scalingFactor: number = 1
): number {
  if (cost === 0) {
    return benefit > 0 ? 100 : 0;
  }

  const ratio = (benefit - cost) / cost;
  const scaled = ratio * scalingFactor * 100;

  return Math.round(Math.max(-100, Math.min(100, scaled)));
}

/**
 * Calculate reliability score from failure rate
 * @param failureRate - Failure rate as percentage (0-100)
 * @returns Reliability score
 */
export function calculateReliability(failureRate: number): number {
  if (failureRate < 1) {
    return 90; // Very high reliability
  } else if (failureRate < 5) {
    return 50; // Good reliability
  } else if (failureRate < 15) {
    return 15; // Moderate reliability
  } else if (failureRate < 30) {
    return -15; // Poor reliability
  } else {
    return -80; // Very poor reliability
  }
}

/**
 * Map star rating to score
 * @param stars - Star rating (1-5)
 * @returns Score (-100 to +100)
 */
export function mapStarsToScore(stars: number): number {
  return ((stars - 3) / 2) * 100;
}

// ============================================================================
// CONFIDENCE CALCULATION
// ============================================================================

/**
 * Get minimum confidence level from array
 * @param levels - Array of confidence levels
 * @returns Minimum confidence level
 */
function getMinimumConfidence(levels: ConfidenceLevel[]): ConfidenceLevel {
  const order = [
    ConfidenceLevel.SPECULATIVE,
    ConfidenceLevel.LOW,
    ConfidenceLevel.MEDIUM,
    ConfidenceLevel.HIGH
  ];

  let minIndex = order.length - 1;

  for (const level of levels) {
    const index = order.indexOf(level);
    if (index < minIndex) {
      minIndex = index;
    }
  }

  return order[minIndex];
}

/**
 * Calculate confidence range based on confidence level
 * @param value - Central value
 * @param confidence - Confidence level
 * @returns Range object
 */
function calculateConfidenceRange(
  value: number,
  confidence: ConfidenceLevel
): { lower: number; upper: number } {
  const ranges: Record<ConfidenceLevel, number> = {
    [ConfidenceLevel.HIGH]: 5,
    [ConfidenceLevel.MEDIUM]: 15,
    [ConfidenceLevel.LOW]: 30,
    [ConfidenceLevel.SPECULATIVE]: 50
  };

  const range = ranges[confidence];

  return {
    lower: Math.max(-100, value - range),
    upper: Math.min(100, value + range)
  };
}

/**
 * Determine confidence level from evidence quality and quantity
 * @param evidence - Array of evidence
 * @returns Confidence level
 */
export function determineConfidence(evidence: Evidence[]): ConfidenceLevel {
  if (evidence.length === 0) {
    return ConfidenceLevel.SPECULATIVE;
  }

  // Calculate average evidence quality
  const avgQuality = evidence.reduce((sum, e) => sum + e.quality, 0) / evidence.length;

  // Determine confidence based on quality and quantity
  if (evidence.length >= 3 && avgQuality >= 0.8) {
    return ConfidenceLevel.HIGH;
  } else if (evidence.length >= 2 && avgQuality >= 0.5) {
    return ConfidenceLevel.MEDIUM;
  } else if (evidence.length >= 1 && avgQuality >= 0.3) {
    return ConfidenceLevel.LOW;
  } else {
    return ConfidenceLevel.SPECULATIVE;
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Normalize score to -100 to +100 range
 * @param value - Value to normalize
 * @param min - Minimum possible value
 * @param max - Maximum possible value
 * @returns Normalized score
 */
export function normalizeScore(value: number, min: number, max: number): number {
  if (max === min) {
    return 0;
  }

  const normalized = ((value - min) / (max - min)) * 200 - 100;
  return Math.round(Math.max(-100, Math.min(100, normalized)));
}

/**
 * Clamp score to valid range
 * @param score - Score to clamp
 * @returns Clamped score (-100 to +100)
 */
export function clampScore(score: number): number {
  return Math.max(-100, Math.min(100, Math.round(score)));
}

/**
 * Format score for display
 * @param score - Score value
 * @param includeSign - Include + for positive scores
 * @returns Formatted string
 */
export function formatScore(score: number, includeSign: boolean = true): string {
  const rounded = Math.round(score);

  if (includeSign && rounded > 0) {
    return `+${rounded}`;
  }

  return `${rounded}`;
}

/**
 * Get score descriptor
 * @param score - Score value
 * @returns Human-readable descriptor
 */
export function getScoreDescriptor(score: number): string {
  if (score >= 75) {
    return 'Excellent';
  } else if (score >= 50) {
    return 'Very Good';
  } else if (score >= 25) {
    return 'Good';
  } else if (score >= 0) {
    return 'Slightly Positive';
  } else if (score >= -25) {
    return 'Slightly Negative';
  } else if (score >= -50) {
    return 'Poor';
  } else if (score >= -75) {
    return 'Very Poor';
  } else {
    return 'Extremely Poor';
  }
}
