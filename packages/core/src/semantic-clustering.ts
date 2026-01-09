/**
 * Semantic Clustering for Duplicate Argument Detection
 *
 * Prevents the same argument from being counted multiple times
 * by identifying semantically similar claims.
 */

import { Argument } from './types';

/**
 * Simple text similarity using Jaccard coefficient
 * In production, this should use more sophisticated NLP (embeddings, BERT, etc.)
 */
export function calculateTextSimilarity(text1: string, text2: string): number {
  const words1 = new Set(tokenize(text1));
  const words2 = new Set(tokenize(text2));

  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);

  return intersection.size / union.size;
}

/**
 * Tokenize text into normalized words
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2); // Remove very short words
}

/**
 * Check if two arguments are semantically similar (duplicates)
 */
export function areArgumentsSimilar(
  arg1: Argument,
  arg2: Argument,
  threshold: number = 0.85
): boolean {
  const titleSimilarity = calculateTextSimilarity(arg1.title, arg2.title);
  const descriptionSimilarity = calculateTextSimilarity(
    arg1.description,
    arg2.description
  );

  // Use weighted average (title is more important)
  const overallSimilarity = (titleSimilarity * 0.7) + (descriptionSimilarity * 0.3);

  return overallSimilarity >= threshold;
}

/**
 * Cluster arguments into groups of similar arguments
 */
export function clusterArguments(
  arguments: Argument[],
  threshold: number = 0.85
): Map<string, Argument[]> {
  const clusters = new Map<string, Argument[]>();

  for (const arg of arguments) {
    let foundCluster = false;

    // Check if this argument belongs to an existing cluster
    for (const [clusterId, clusterArgs] of clusters.entries()) {
      const representative = clusterArgs[0];
      if (areArgumentsSimilar(arg, representative, threshold)) {
        clusterArgs.push(arg);
        foundCluster = true;
        break;
      }
    }

    // Create new cluster if no match found
    if (!foundCluster) {
      clusters.set(arg.id, [arg]);
    }
  }

  return clusters;
}

/**
 * Merge duplicate arguments by combining their evidence and sub-arguments
 */
export function mergeDuplicateArguments(duplicates: Argument[]): Argument {
  if (duplicates.length === 0) {
    throw new Error('Cannot merge empty list of arguments');
  }

  if (duplicates.length === 1) {
    return duplicates[0];
  }

  // Use the first argument as the base
  const merged: Argument = {
    ...duplicates[0],
    evidence: [],
    supportingArguments: [],
    opposingArguments: []
  };

  // Collect all unique evidence
  const evidenceIds = new Set<string>();
  for (const arg of duplicates) {
    for (const evidence of arg.evidence) {
      if (!evidenceIds.has(evidence.id)) {
        evidenceIds.add(evidence.id);
        merged.evidence.push(evidence);
      }
    }
  }

  // Collect all unique supporting arguments
  const supportingIds = new Set<string>();
  for (const arg of duplicates) {
    for (const link of arg.supportingArguments) {
      if (!supportingIds.has(link.subArgumentId)) {
        supportingIds.add(link.subArgumentId);
        merged.supportingArguments.push(link);
      }
    }
  }

  // Collect all unique opposing arguments
  const opposingIds = new Set<string>();
  for (const arg of duplicates) {
    for (const link of arg.opposingArguments) {
      if (!opposingIds.has(link.subArgumentId)) {
        opposingIds.add(link.subArgumentId);
        merged.opposingArguments.push(link);
      }
    }
  }

  return merged;
}

/**
 * Find and merge all duplicate arguments in a collection
 */
export function deduplicateArguments(
  arguments: Argument[],
  threshold: number = 0.85
): Argument[] {
  const clusters = clusterArguments(arguments, threshold);
  const deduplicated: Argument[] = [];

  for (const clusterArgs of clusters.values()) {
    deduplicated.push(mergeDuplicateArguments(clusterArgs));
  }

  return deduplicated;
}
