/**
 * Core TypeScript type definitions for the Topics Page belief system
 *
 * This file contains all type definitions for beliefs, dimensions, scoring,
 * and topic management following the Purpose/Function/Form framework.
 */

// ============================================================================
// ENUMS AND CONSTANTS
// ============================================================================

/**
 * The three core dimensions for evaluating beliefs
 */
export enum Dimension {
  PURPOSE = 'purpose',
  FUNCTION = 'function',
  FORM = 'form'
}

/**
 * Topic types that can be evaluated
 */
export enum TopicType {
  POLICY = 'policy',
  PRODUCT = 'product',
  PERSON = 'person',
  CONCEPT = 'concept'
}

/**
 * Confidence levels for belief scores
 */
export enum ConfidenceLevel {
  HIGH = 'high',           // 90-100% confident
  MEDIUM = 'medium',       // 60-89% confident
  LOW = 'low',            // 30-59% confident
  SPECULATIVE = 'speculative' // <30% confident
}

/**
 * Sort options for beliefs
 */
export enum SortOption {
  ENGAGEMENT = 'engagement',
  CONVICTION = 'conviction',
  INTEREST = 'interest',
  RECENCY = 'recency',
  CONTROVERSY = 'controversy'
}

/**
 * View modes for displaying beliefs
 */
export enum ViewMode {
  LIST = 'list',
  SPECTRUM = 'spectrum'
}

/**
 * Position ranges on the spectrum
 */
export enum PositionRange {
  ALL = 'all',
  HIGHLY_BENEFICIAL = 'highly_beneficial',      // +75 to +100
  MODERATELY_BENEFICIAL = 'moderately_beneficial', // +25 to +75
  MIXED_NEUTRAL = 'mixed_neutral',               // -25 to +25
  MODERATELY_HARMFUL = 'moderately_harmful',     // -75 to -25
  HIGHLY_HARMFUL = 'highly_harmful'              // -100 to -75
}

// ============================================================================
// SCORE INTERFACES
// ============================================================================

/**
 * Represents a score with confidence interval
 */
export interface Score {
  value: number;              // -100 to +100
  confidence: ConfidenceLevel;
  range?: {                   // Confidence interval
    lower: number;
    upper: number;
  };
  evidence?: Evidence[];      // Supporting evidence
  notes?: string;             // Additional context
}

/**
 * Evidence supporting a score
 */
export interface Evidence {
  id: string;
  type: EvidenceType;
  source: string;
  url?: string;
  description: string;
  quality: number;            // 0.0 to 1.0
  date?: Date;
}

export enum EvidenceType {
  RCT = 'rct',                        // Randomized Controlled Trial
  META_ANALYSIS = 'meta_analysis',
  OBSERVATIONAL = 'observational',
  EXPERT_OPINION = 'expert_opinion',
  CASE_STUDY = 'case_study',
  ANECDOTAL = 'anecdotal',
  SURVEY = 'survey',
  STATISTICAL = 'statistical'
}

/**
 * Dimension-specific score with breakdown
 */
export interface DimensionScore {
  dimension: Dimension;
  overall: Score;
  indicators: IndicatorScore[];
}

/**
 * Score for a specific indicator within a dimension
 */
export interface IndicatorScore {
  name: string;
  weight: number;             // 0.0 to 1.0
  score: Score;
  description?: string;
}

// ============================================================================
// BELIEF INTERFACES
// ============================================================================

/**
 * Core belief model representing a position on a topic
 */
export interface Belief {
  id: string;
  topicId: string;

  // Content
  title: string;
  description: string;
  fullText?: string;

  // Scoring
  dimensionScores: {
    purpose?: DimensionScore;
    function?: DimensionScore;
    form?: DimensionScore;
  };

  // Primary dimension (which dimension is this belief primarily about)
  primaryDimension: Dimension;

  // Engagement metrics
  interestCount: number;      // How many people care about this
  responseCount: number;      // Number of responses/discussions
  linkCount: number;          // Number of supporting links

  // Derived scores
  engagementScore: number;    // interestCount × |conviction|
  controversyScore: number;   // Measure of disagreement

  // Metadata
  author?: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  sources?: string[];
}

/**
 * Extension methods for Belief
 */
export interface BeliefMethods {
  /**
   * Get the spectrum position for a specific dimension
   */
  getSpectrumPosition(dimension?: Dimension): number;

  /**
   * Calculate engagement score
   */
  calculateEngagement(): number;

  /**
   * Get color code for spectrum position
   */
  getColorCode(dimension?: Dimension): string;

  /**
   * Get position label (e.g., "Highly Beneficial")
   */
  getPositionLabel(dimension?: Dimension): string;

  /**
   * Check if belief matches position filter
   */
  matchesPositionFilter(filter: PositionRange, dimension?: Dimension): boolean;
}

// ============================================================================
// TOPIC INTERFACES
// ============================================================================

/**
 * Topic containing multiple beliefs
 */
export interface Topic {
  id: string;

  // Content
  title: string;
  description: string;
  type: TopicType;

  // Beliefs
  beliefs: Belief[];

  // Statistics
  stats: TopicStats;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  relatedTopics?: string[];   // Topic IDs
}

/**
 * Statistics for a topic
 */
export interface TopicStats {
  totalBeliefs: number;
  beliefsByDimension: {
    purpose: number;
    function: number;
    form: number;
  };
  beliefsByPosition: {
    highly_beneficial: number;
    moderately_beneficial: number;
    mixed_neutral: number;
    moderately_harmful: number;
    highly_harmful: number;
  };
  averageScore: {
    purpose?: number;
    function?: number;
    form?: number;
    overall?: number;
  };
  totalEngagement: number;
  totalControversy: number;
}

// ============================================================================
// TEMPLATE INTERFACES
// ============================================================================

/**
 * Template configuration for scoring a topic type
 */
export interface TopicTemplate {
  type: TopicType;
  dimensions: {
    purpose: DimensionTemplate;
    function: DimensionTemplate;
    form: DimensionTemplate;
  };
}

/**
 * Template for a specific dimension
 */
export interface DimensionTemplate {
  dimension: Dimension;
  indicators: IndicatorTemplate[];
}

/**
 * Template for an indicator
 */
export interface IndicatorTemplate {
  name: string;
  weight: number;
  description: string;
  scoringRubric: ScoringRubric;
}

/**
 * Rubric for scoring an indicator
 */
export interface ScoringRubric {
  ranges: ScoreRange[];
  formula?: string;           // Optional formula for calculation
  benchmarks?: Benchmark[];   // Reference points
}

/**
 * A range in a scoring rubric
 */
export interface ScoreRange {
  min: number;
  max: number;
  label: string;
  description: string;
  examples?: string[];
}

/**
 * Benchmark for comparison
 */
export interface Benchmark {
  name: string;
  value: number;
  description: string;
}

// ============================================================================
// FILTER AND VIEW INTERFACES
// ============================================================================

/**
 * Filter configuration for beliefs
 */
export interface BeliefFilter {
  dimension?: Dimension | 'all';
  positionRange?: PositionRange;
  minEngagement?: number;
  tags?: string[];
  searchQuery?: string;
}

/**
 * View configuration for displaying beliefs
 */
export interface ViewConfig {
  mode: ViewMode;
  sort: SortOption;
  sortDescending: boolean;
  itemsPerPage: number;
  currentPage: number;
}

/**
 * Complete page state
 */
export interface PageState {
  topic: Topic;
  filter: BeliefFilter;
  view: ViewConfig;
  filteredBeliefs: Belief[];
}

// ============================================================================
// UI COMPONENT INTERFACES
// ============================================================================

/**
 * Props for belief card component
 */
export interface BeliefCardProps {
  belief: Belief;
  showDimension?: boolean;
  onClick?: (belief: Belief) => void;
  compact?: boolean;
}

/**
 * Props for spectrum visualization component
 */
export interface SpectrumViewProps {
  beliefs: Belief[];
  dimension: Dimension;
  width: number;
  height: number;
  onDotClick?: (belief: Belief) => void;
}

/**
 * Spectrum dot data
 */
export interface SpectrumDot {
  belief: Belief;
  x: number;                  // Horizontal position (spectrum)
  y: number;                  // Vertical position (jittered)
  radius: number;             // Dot size (based on engagement)
  color: string;              // Color based on position
}

/**
 * Props for tab group component
 */
export interface TabGroupProps {
  tabs: TabConfig[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

/**
 * Tab configuration
 */
export interface TabConfig {
  id: string;
  label: string;
  count?: number;
  disabled?: boolean;
}

/**
 * Props for filter dropdown component
 */
export interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}

/**
 * Filter option
 */
export interface FilterOption {
  value: string;
  label: string;
  count?: number;
  color?: string;
}

/**
 * Props for score badge component
 */
export interface ScoreBadgeProps {
  score: number;              // -100 to +100
  dimension?: Dimension;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * Pagination info
 */
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Sort function type
 */
export type SortFunction<T> = (a: T, b: T) => number;

/**
 * Color map for spectrum positions
 */
export interface ColorMap {
  highly_beneficial: string;      // +75 to +100
  moderately_beneficial: string;  // +25 to +75
  mixed_neutral: string;          // -25 to +25
  moderately_harmful: string;     // -75 to -25
  highly_harmful: string;         // -100 to -75
}

/**
 * URL state for shareable links
 */
export interface URLState {
  topicId: string;
  dimension?: string;
  sort?: string;
  position?: string;
  view?: string;
  page?: string;
  search?: string;
}

// ============================================================================
// API INTERFACES
// ============================================================================

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    timestamp: Date;
    version: string;
  };
}

/**
 * Request for creating/updating a belief
 */
export interface BeliefRequest {
  topicId: string;
  title: string;
  description: string;
  fullText?: string;
  primaryDimension: Dimension;
  dimensionScores: {
    purpose?: DimensionScoreRequest;
    function?: DimensionScoreRequest;
    form?: DimensionScoreRequest;
  };
  tags?: string[];
  sources?: string[];
}

/**
 * Request for dimension score
 */
export interface DimensionScoreRequest {
  dimension: Dimension;
  indicators: IndicatorScoreRequest[];
}

/**
 * Request for indicator score
 */
export interface IndicatorScoreRequest {
  name: string;
  weight: number;
  value: number;
  confidence: ConfidenceLevel;
  evidence?: Evidence[];
  notes?: string;
}

/**
 * Query parameters for getting beliefs
 */
export interface GetBeliefsQuery {
  topicId: string;
  dimension?: Dimension | 'all';
  position?: PositionRange;
  sort?: SortOption;
  page?: number;
  limit?: number;
  search?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Default color map for spectrum positions
 */
export const DEFAULT_COLOR_MAP: ColorMap = {
  highly_beneficial: '#10b981',      // Dark green
  moderately_beneficial: '#34d399',  // Light green
  mixed_neutral: '#6b7280',          // Gray
  moderately_harmful: '#f59e0b',     // Orange
  highly_harmful: '#ef4444'          // Red
};

/**
 * Position range boundaries
 */
export const POSITION_BOUNDARIES = {
  highly_beneficial: { min: 75, max: 100 },
  moderately_beneficial: { min: 25, max: 75 },
  mixed_neutral: { min: -25, max: 25 },
  moderately_harmful: { min: -75, max: -25 },
  highly_harmful: { min: -100, max: -75 }
};

/**
 * Default view configuration
 */
export const DEFAULT_VIEW_CONFIG: ViewConfig = {
  mode: ViewMode.LIST,
  sort: SortOption.ENGAGEMENT,
  sortDescending: true,
  itemsPerPage: 20,
  currentPage: 1
};

/**
 * Default filter configuration
 */
export const DEFAULT_FILTER: BeliefFilter = {
  dimension: 'all',
  positionRange: PositionRange.ALL
};
