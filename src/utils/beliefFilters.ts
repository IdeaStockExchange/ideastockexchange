/**
 * Utility functions for filtering and sorting beliefs
 */

import { Belief } from '../models/Belief';
import {
  BeliefFilter,
  SortOption,
  SortFunction,
  Dimension,
  PositionRange
} from '../models/types';

/**
 * Filter beliefs based on criteria
 * @param beliefs - Array of beliefs to filter
 * @param filter - Filter configuration
 * @returns Filtered beliefs
 */
export function filterBeliefs(beliefs: Belief[], filter: BeliefFilter): Belief[] {
  return beliefs.filter(belief => {
    // Dimension filter
    if (filter.dimension && filter.dimension !== 'all') {
      if (belief.primaryDimension !== filter.dimension) {
        return false;
      }
    }

    // Position range filter
    if (filter.positionRange && filter.positionRange !== PositionRange.ALL) {
      if (!belief.matchesPositionFilter(filter.positionRange)) {
        return false;
      }
    }

    // Minimum engagement filter
    if (filter.minEngagement !== undefined) {
      if (belief.engagementScore < filter.minEngagement) {
        return false;
      }
    }

    // Tags filter
    if (filter.tags && filter.tags.length > 0) {
      if (!belief.tags || !filter.tags.some(tag => belief.tags!.includes(tag))) {
        return false;
      }
    }

    // Search query filter
    if (filter.searchQuery) {
      const query = filter.searchQuery.toLowerCase();
      const searchableText = [
        belief.title,
        belief.description,
        belief.fullText || '',
        ...(belief.tags || [])
      ].join(' ').toLowerCase();

      if (!searchableText.includes(query)) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Get sort function for beliefs
 * @param sortOption - Sort option
 * @returns Sort function
 */
export function getSortFunction(sortOption: SortOption): SortFunction<Belief> {
  switch (sortOption) {
    case SortOption.ENGAGEMENT:
      return sortByEngagement;

    case SortOption.CONVICTION:
      return sortByConviction;

    case SortOption.INTEREST:
      return sortByInterest;

    case SortOption.RECENCY:
      return sortByRecency;

    case SortOption.CONTROVERSY:
      return sortByControversy;

    default:
      return sortByEngagement;
  }
}

/**
 * Sort beliefs using specified criteria
 * @param beliefs - Beliefs to sort
 * @param sortOption - Sort option
 * @param descending - Sort descending (default true)
 * @returns Sorted beliefs
 */
export function sortBeliefs(
  beliefs: Belief[],
  sortOption: SortOption,
  descending: boolean = true
): Belief[] {
  const sortFn = getSortFunction(sortOption);
  const sorted = [...beliefs].sort(sortFn);

  return descending ? sorted : sorted.reverse();
}

// ============================================================================
// SORT FUNCTIONS
// ============================================================================

/**
 * Sort by engagement score (interest × conviction)
 */
function sortByEngagement(a: Belief, b: Belief): number {
  return b.engagementScore - a.engagementScore;
}

/**
 * Sort by conviction (absolute value of position)
 */
function sortByConviction(a: Belief, b: Belief): number {
  return b.getConviction() - a.getConviction();
}

/**
 * Sort by interest count
 */
function sortByInterest(a: Belief, b: Belief): number {
  return b.interestCount - a.interestCount;
}

/**
 * Sort by recency (most recent first)
 */
function sortByRecency(a: Belief, b: Belief): number {
  return b.createdAt.getTime() - a.createdAt.getTime();
}

/**
 * Sort by controversy score
 */
function sortByControversy(a: Belief, b: Belief): number {
  return b.controversyScore - a.controversyScore;
}

// ============================================================================
// PAGINATION
// ============================================================================

/**
 * Paginate beliefs
 * @param beliefs - Beliefs to paginate
 * @param page - Current page (1-indexed)
 * @param itemsPerPage - Items per page
 * @returns Paginated beliefs and info
 */
export function paginateBeliefs(
  beliefs: Belief[],
  page: number,
  itemsPerPage: number
): {
  beliefs: Belief[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
} {
  const totalItems = beliefs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = Math.max(1, Math.min(page, totalPages));

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedBeliefs = beliefs.slice(startIndex, endIndex);

  return {
    beliefs: paginatedBeliefs,
    pagination: {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage,
      hasNext: currentPage < totalPages,
      hasPrevious: currentPage > 1
    }
  };
}

// ============================================================================
// SEARCH
// ============================================================================

/**
 * Search beliefs by query
 * @param beliefs - Beliefs to search
 * @param query - Search query
 * @param options - Search options
 * @returns Matching beliefs with relevance scores
 */
export function searchBeliefs(
  beliefs: Belief[],
  query: string,
  options: {
    fuzzy?: boolean;
    includeRelevance?: boolean;
  } = {}
): Belief[] | Array<{ belief: Belief; relevance: number }> {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) {
    return beliefs;
  }

  const results = beliefs.map(belief => {
    const relevance = calculateRelevance(belief, normalizedQuery);
    return { belief, relevance };
  });

  const filtered = results.filter(r => r.relevance > 0);
  const sorted = filtered.sort((a, b) => b.relevance - a.relevance);

  if (options.includeRelevance) {
    return sorted;
  }

  return sorted.map(r => r.belief);
}

/**
 * Calculate search relevance score
 */
function calculateRelevance(belief: Belief, query: string): number {
  let score = 0;

  // Title match (highest weight)
  if (belief.title.toLowerCase().includes(query)) {
    score += 10;
    if (belief.title.toLowerCase().startsWith(query)) {
      score += 5; // Bonus for prefix match
    }
  }

  // Description match
  if (belief.description.toLowerCase().includes(query)) {
    score += 5;
  }

  // Full text match
  if (belief.fullText && belief.fullText.toLowerCase().includes(query)) {
    score += 2;
  }

  // Tags match
  if (belief.tags) {
    for (const tag of belief.tags) {
      if (tag.toLowerCase().includes(query)) {
        score += 3;
      }
    }
  }

  return score;
}

// ============================================================================
// GROUPING
// ============================================================================

/**
 * Group beliefs by dimension
 * @param beliefs - Beliefs to group
 * @returns Beliefs grouped by primary dimension
 */
export function groupByDimension(beliefs: Belief[]): Record<Dimension, Belief[]> {
  return {
    [Dimension.PURPOSE]: beliefs.filter(b => b.primaryDimension === Dimension.PURPOSE),
    [Dimension.FUNCTION]: beliefs.filter(b => b.primaryDimension === Dimension.FUNCTION),
    [Dimension.FORM]: beliefs.filter(b => b.primaryDimension === Dimension.FORM)
  };
}

/**
 * Group beliefs by position range
 * @param beliefs - Beliefs to group
 * @param dimension - Optional dimension to use for positioning
 * @returns Beliefs grouped by position range
 */
export function groupByPosition(
  beliefs: Belief[],
  dimension?: Dimension
): Record<string, Belief[]> {
  const groups: Record<string, Belief[]> = {
    highly_beneficial: [],
    moderately_beneficial: [],
    mixed_neutral: [],
    moderately_harmful: [],
    highly_harmful: []
  };

  for (const belief of beliefs) {
    const position = belief.getSpectrumPosition(dimension);

    if (position >= 75) {
      groups.highly_beneficial.push(belief);
    } else if (position >= 25) {
      groups.moderately_beneficial.push(belief);
    } else if (position >= -25) {
      groups.mixed_neutral.push(belief);
    } else if (position >= -75) {
      groups.moderately_harmful.push(belief);
    } else {
      groups.highly_harmful.push(belief);
    }
  }

  return groups;
}
