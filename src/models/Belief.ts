/**
 * Belief class implementation
 *
 * Provides methods for working with beliefs, including scoring,
 * filtering, and spectrum positioning.
 */

import {
  Belief as IBelief,
  BeliefMethods,
  Dimension,
  PositionRange,
  DEFAULT_COLOR_MAP,
  POSITION_BOUNDARIES
} from './types';

export class Belief implements IBelief, BeliefMethods {
  id: string;
  topicId: string;
  title: string;
  description: string;
  fullText?: string;
  dimensionScores: IBelief['dimensionScores'];
  primaryDimension: Dimension;
  interestCount: number;
  responseCount: number;
  linkCount: number;
  engagementScore: number;
  controversyScore: number;
  author?: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  sources?: string[];

  constructor(data: IBelief) {
    this.id = data.id;
    this.topicId = data.topicId;
    this.title = data.title;
    this.description = data.description;
    this.fullText = data.fullText;
    this.dimensionScores = data.dimensionScores;
    this.primaryDimension = data.primaryDimension;
    this.interestCount = data.interestCount;
    this.responseCount = data.responseCount;
    this.linkCount = data.linkCount;
    this.engagementScore = data.engagementScore;
    this.controversyScore = data.controversyScore;
    this.author = data.author;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.tags = data.tags;
    this.sources = data.sources;
  }

  /**
   * Get the spectrum position for a specific dimension
   * @param dimension - Optional dimension (defaults to primary)
   * @returns Score from -100 to +100
   */
  getSpectrumPosition(dimension?: Dimension): number {
    const dim = dimension || this.primaryDimension;
    const dimensionScore = this.dimensionScores[dim];

    if (!dimensionScore) {
      return 0; // Neutral if not scored
    }

    return dimensionScore.overall.value;
  }

  /**
   * Calculate engagement score: interest × |conviction|
   * @returns Engagement score
   */
  calculateEngagement(): number {
    const conviction = Math.abs(this.getSpectrumPosition());
    return this.interestCount * conviction;
  }

  /**
   * Get color code for spectrum position
   * @param dimension - Optional dimension
   * @returns Hex color code
   */
  getColorCode(dimension?: Dimension): string {
    const position = this.getSpectrumPosition(dimension);
    return this.getColorForPosition(position);
  }

  /**
   * Get position label (e.g., "Highly Beneficial")
   * @param dimension - Optional dimension
   * @returns Human-readable position label
   */
  getPositionLabel(dimension?: Dimension): string {
    const position = this.getSpectrumPosition(dimension);
    return this.getLabelForPosition(position);
  }

  /**
   * Check if belief matches position filter
   * @param filter - Position range filter
   * @param dimension - Optional dimension
   * @returns True if matches filter
   */
  matchesPositionFilter(filter: PositionRange, dimension?: Dimension): boolean {
    if (filter === PositionRange.ALL) {
      return true;
    }

    const position = this.getSpectrumPosition(dimension);
    const boundaries = POSITION_BOUNDARIES[filter];

    return position >= boundaries.min && position <= boundaries.max;
  }

  /**
   * Get average score across all dimensions
   * @returns Average score
   */
  getAverageScore(): number {
    const scores: number[] = [];

    if (this.dimensionScores.purpose) {
      scores.push(this.dimensionScores.purpose.overall.value);
    }
    if (this.dimensionScores.function) {
      scores.push(this.dimensionScores.function.overall.value);
    }
    if (this.dimensionScores.form) {
      scores.push(this.dimensionScores.form.overall.value);
    }

    if (scores.length === 0) {
      return 0;
    }

    return scores.reduce((sum, score) => sum + score, 0) / scores.length;
  }

  /**
   * Get conviction (absolute value of spectrum position)
   * @param dimension - Optional dimension
   * @returns Conviction score (0-100)
   */
  getConviction(dimension?: Dimension): number {
    return Math.abs(this.getSpectrumPosition(dimension));
  }

  /**
   * Private helper: Get color for a position value
   */
  private getColorForPosition(position: number): string {
    if (position >= 75) {
      return DEFAULT_COLOR_MAP.highly_beneficial;
    } else if (position >= 25) {
      return DEFAULT_COLOR_MAP.moderately_beneficial;
    } else if (position >= -25) {
      return DEFAULT_COLOR_MAP.mixed_neutral;
    } else if (position >= -75) {
      return DEFAULT_COLOR_MAP.moderately_harmful;
    } else {
      return DEFAULT_COLOR_MAP.highly_harmful;
    }
  }

  /**
   * Private helper: Get label for a position value
   */
  private getLabelForPosition(position: number): string {
    if (position >= 75) {
      return 'Highly Beneficial';
    } else if (position >= 25) {
      return 'Moderately Beneficial';
    } else if (position >= -25) {
      return 'Mixed/Neutral';
    } else if (position >= -75) {
      return 'Moderately Harmful';
    } else {
      return 'Highly Harmful';
    }
  }

  /**
   * Get a formatted string of the score with confidence
   * @param dimension - Optional dimension
   * @returns Formatted string (e.g., "+65 ± 15 (Medium Confidence)")
   */
  getFormattedScore(dimension?: Dimension): string {
    const dim = dimension || this.primaryDimension;
    const dimensionScore = this.dimensionScores[dim];

    if (!dimensionScore) {
      return 'No score';
    }

    const score = dimensionScore.overall;
    const value = score.value > 0 ? `+${score.value}` : `${score.value}`;

    if (score.range) {
      const range = Math.abs(score.range.upper - score.range.lower) / 2;
      return `${value} ± ${range.toFixed(0)} (${this.formatConfidence(score.confidence)})`;
    }

    return `${value} (${this.formatConfidence(score.confidence)})`;
  }

  /**
   * Private helper: Format confidence level
   */
  private formatConfidence(confidence: string): string {
    return confidence.charAt(0).toUpperCase() + confidence.slice(1) + ' Confidence';
  }

  /**
   * Convert to plain object for serialization
   */
  toJSON(): IBelief {
    return {
      id: this.id,
      topicId: this.topicId,
      title: this.title,
      description: this.description,
      fullText: this.fullText,
      dimensionScores: this.dimensionScores,
      primaryDimension: this.primaryDimension,
      interestCount: this.interestCount,
      responseCount: this.responseCount,
      linkCount: this.linkCount,
      engagementScore: this.engagementScore,
      controversyScore: this.controversyScore,
      author: this.author,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      tags: this.tags,
      sources: this.sources
    };
  }

  /**
   * Create a Belief instance from plain object
   */
  static fromJSON(data: any): Belief {
    return new Belief({
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt)
    });
  }
}
