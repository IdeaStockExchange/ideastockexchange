/**
 * ReasonRank Algorithm Implementation
 *
 * Core algorithm for calculating argument strength based on:
 * Argument Strength = Truth Score × Linkage Score × Importance Weight
 */

import {
  Argument,
  ArgumentLink,
  ArgumentStrength,
  ContributingFactor,
  DEFAULT_CONFIG,
  Evidence,
  ID,
  ReasonRankConfig,
  ScoreCalculation,
  TruthScore
} from './types';

export class ReasonRankCalculator {
  private config: ReasonRankConfig;
  private argumentCache: Map<ID, Argument>;
  private visitedNodes: Set<ID>; // Prevent infinite recursion

  constructor(config: Partial<ReasonRankConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.argumentCache = new Map();
    this.visitedNodes = new Set();
  }

  /**
   * Calculate the overall score for an argument
   */
  public calculateScore(
    argument: Argument,
    depth: number = 0
  ): ScoreCalculation {
    // Prevent infinite recursion
    if (depth > this.config.maxRecursionDepth) {
      throw new Error('Maximum recursion depth exceeded');
    }

    if (this.visitedNodes.has(argument.id)) {
      // Circular reference detected - return neutral score
      return this.createNeutralScore(argument.id);
    }

    this.visitedNodes.add(argument.id);

    const contributingFactors: ContributingFactor[] = [];
    let evidenceContribution = 0;
    let supportingContribution = 0;
    let opposingContribution = 0;

    // 1. Calculate contribution from direct evidence
    for (const evidence of argument.evidence) {
      const contribution = evidence.truthScore;
      evidenceContribution += contribution;

      contributingFactors.push({
        sourceId: evidence.id,
        sourceType: 'evidence',
        sourceTitle: evidence.description,
        truthScore: evidence.truthScore,
        linkageScore: 1.0, // Evidence directly supports claim
        importanceWeight: 1.0,
        contribution
      });
    }

    // Average evidence score
    const avgEvidenceScore = argument.evidence.length > 0
      ? evidenceContribution / argument.evidence.length
      : 0;

    // 2. Calculate contribution from supporting arguments
    supportingContribution = this.calculateSubArgumentContribution(
      argument.supportingArguments,
      depth,
      contributingFactors,
      true
    );

    // 3. Calculate contribution from opposing arguments
    opposingContribution = this.calculateSubArgumentContribution(
      argument.opposingArguments,
      depth,
      contributingFactors,
      false
    );

    // 4. Combine scores using weighted average
    const truthScore = this.combineScores(
      avgEvidenceScore,
      supportingContribution,
      opposingContribution
    );

    // 5. Calculate final strength
    const finalScore = truthScore;

    this.visitedNodes.delete(argument.id);

    return {
      argumentId: argument.id,
      finalScore,
      truthScore,
      breakdown: {
        fromEvidence: avgEvidenceScore,
        fromSupportingArgs: supportingContribution,
        fromOpposingArgs: opposingContribution
      },
      contributingFactors
    };
  }

  /**
   * Calculate contribution from a set of sub-arguments
   */
  private calculateSubArgumentContribution(
    links: ArgumentLink[],
    depth: number,
    contributingFactors: ContributingFactor[],
    isSupporting: boolean
  ): number {
    if (links.length === 0) return 0;

    let totalContribution = 0;
    let totalWeight = 0;

    for (const link of links) {
      // Skip if importance is below threshold
      if (link.importanceWeight < this.config.minimumImportance) {
        continue;
      }

      // Get sub-argument (from cache or provided)
      const subArgument = this.argumentCache.get(link.subArgumentId);
      if (!subArgument) {
        console.warn(`Sub-argument ${link.subArgumentId} not found`);
        continue;
      }

      // Recursively calculate sub-argument score
      const subScore = this.calculateScore(subArgument, depth + 1);

      // Calculate contribution: Truth × Linkage × Importance
      const contribution =
        subScore.truthScore *
        link.linkageScore *
        link.importanceWeight;

      totalContribution += contribution;
      totalWeight += link.importanceWeight;

      contributingFactors.push({
        sourceId: link.subArgumentId,
        sourceType: 'argument',
        sourceTitle: subArgument.title,
        truthScore: subScore.truthScore,
        linkageScore: link.linkageScore,
        importanceWeight: link.importanceWeight,
        contribution
      });
    }

    // Return weighted average
    return totalWeight > 0 ? totalContribution / totalWeight : 0;
  }

  /**
   * Combine evidence score with sub-argument scores
   */
  private combineScores(
    evidenceScore: number,
    supportingScore: number,
    opposingScore: number
  ): TruthScore {
    const { evidenceWeight } = this.config;
    const subArgumentWeight = 1 - evidenceWeight;

    // Combine supporting and opposing (opposing reduces the score)
    const subArgumentScore = supportingScore - opposingScore;

    // Weighted combination
    const combinedScore =
      (evidenceScore * evidenceWeight) +
      (subArgumentScore * subArgumentWeight);

    // Clamp to [0, 1]
    return Math.max(0, Math.min(1, combinedScore));
  }

  /**
   * Create a neutral score for circular references
   */
  private createNeutralScore(argumentId: ID): ScoreCalculation {
    return {
      argumentId,
      finalScore: 0.5,
      truthScore: 0.5,
      breakdown: {
        fromEvidence: 0,
        fromSupportingArgs: 0,
        fromOpposingArgs: 0
      },
      contributingFactors: []
    };
  }

  /**
   * Register an argument for reference during calculations
   */
  public registerArgument(argument: Argument): void {
    this.argumentCache.set(argument.id, argument);
  }

  /**
   * Clear all caches
   */
  public reset(): void {
    this.argumentCache.clear();
    this.visitedNodes.clear();
  }
}

/**
 * Utility function to validate score ranges
 */
export function validateScore(
  score: number,
  min: number,
  max: number,
  name: string
): void {
  if (score < min || score > max) {
    throw new Error(
      `${name} must be between ${min} and ${max}, got ${score}`
    );
  }
}

/**
 * Utility function to normalize a score to [0, 1]
 */
export function normalizeScore(score: number): number {
  return Math.max(0, Math.min(1, score));
}
