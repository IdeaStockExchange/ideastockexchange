/**
 * Core type definitions for the ReasonRank algorithm
 */

/**
 * Truth Score: Measures how true a claim is based on evidence
 * Range: 0 to 1 (0% to 100%)
 */
export type TruthScore = number;

/**
 * Linkage Score: Measures how well a sub-argument supports or contradicts a parent argument
 * Range: -1 to +1 (-100% to +100%)
 * Positive values indicate support, negative values indicate contradiction
 */
export type LinkageScore = number;

/**
 * Importance Weight: Measures how relevant an argument is to the conclusion
 * Range: 0 to 1 (0.0 to 1.0)
 */
export type ImportanceWeight = number;

/**
 * Overall Argument Strength
 * Calculated as: Truth Score × Linkage Score × Importance Weight
 */
export type ArgumentStrength = number;

/**
 * Unique identifier for arguments, evidence, and other entities
 */
export type ID = string;

/**
 * Evidence quality levels
 */
export enum EvidenceQuality {
  PEER_REVIEWED_STUDY = 'peer_reviewed_study',
  EXPERT_TESTIMONY = 'expert_testimony',
  STATISTICAL_DATA = 'statistical_data',
  CASE_STUDY = 'case_study',
  ANECDOTAL = 'anecdotal',
  OPINION = 'opinion'
}

/**
 * Evidence source with quality rating
 */
export interface Evidence {
  id: ID;
  description: string;
  source: string;
  url?: string;
  quality: EvidenceQuality;
  truthScore: TruthScore;
  date?: Date;
  author?: string;
}

/**
 * An argument or belief in the system
 */
export interface Argument {
  id: ID;
  title: string;
  description: string;

  // Scores
  truthScore?: TruthScore;
  calculatedTruthScore?: TruthScore; // Computed from evidence and sub-arguments

  // Relations
  supportingArguments: ArgumentLink[];
  opposingArguments: ArgumentLink[];
  evidence: Evidence[];

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

/**
 * A link between a parent argument and a supporting/opposing sub-argument
 */
export interface ArgumentLink {
  id: ID;
  subArgumentId: ID;
  linkageScore: LinkageScore;
  importanceWeight: ImportanceWeight;
  explanation?: string; // Why this linkage score?
}

/**
 * Result of a score calculation
 */
export interface ScoreCalculation {
  argumentId: ID;
  finalScore: ArgumentStrength;
  truthScore: TruthScore;
  breakdown: {
    fromEvidence: number;
    fromSupportingArgs: number;
    fromOpposingArgs: number;
  };
  contributingFactors: ContributingFactor[];
}

/**
 * Individual factor contributing to the final score
 */
export interface ContributingFactor {
  sourceId: ID;
  sourceType: 'evidence' | 'argument';
  sourceTitle: string;
  truthScore: TruthScore;
  linkageScore: LinkageScore;
  importanceWeight: ImportanceWeight;
  contribution: number; // Actual impact on final score
}

/**
 * Configuration options for the ReasonRank algorithm
 */
export interface ReasonRankConfig {
  evidenceWeight: number; // Weight of direct evidence vs sub-arguments
  maxRecursionDepth: number; // Prevent infinite loops
  minimumImportance: number; // Filter out trivial arguments
  semanticClusteringThreshold: number; // For duplicate detection
}

/**
 * Default configuration
 */
export const DEFAULT_CONFIG: ReasonRankConfig = {
  evidenceWeight: 0.6, // Direct evidence counts for 60%, sub-arguments 40%
  maxRecursionDepth: 10,
  minimumImportance: 0.05, // 5% minimum to be included
  semanticClusteringThreshold: 0.85 // 85% similarity = duplicate
};
