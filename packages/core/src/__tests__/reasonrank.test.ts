/**
 * Tests for ReasonRank algorithm
 */

import { ReasonRankCalculator } from '../reasonrank';
import { Argument, Evidence, EvidenceQuality } from '../types';

describe('ReasonRankCalculator', () => {
  let calculator: ReasonRankCalculator;

  beforeEach(() => {
    calculator = new ReasonRankCalculator();
  });

  describe('Basic scoring', () => {
    test('should calculate score from evidence only', () => {
      const evidence: Evidence = {
        id: 'e1',
        description: 'Peer-reviewed study shows 90% reduction',
        source: 'Journal of Safety',
        quality: EvidenceQuality.PEER_REVIEWED_STUDY,
        truthScore: 0.95
      };

      const argument: Argument = {
        id: 'a1',
        title: 'Roundabouts reduce accidents',
        description: 'Roundabouts significantly reduce fatal accidents',
        supportingArguments: [],
        opposingArguments: [],
        evidence: [evidence],
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'user1'
      };

      calculator.registerArgument(argument);
      const result = calculator.calculateScore(argument);

      expect(result.truthScore).toBeGreaterThan(0.5);
      expect(result.breakdown.fromEvidence).toBe(0.95);
    });

    test('should combine supporting and opposing arguments', () => {
      const supportingArg: Argument = {
        id: 'a2',
        title: 'Studies show safety improvement',
        description: 'Multiple studies confirm safety benefits',
        supportingArguments: [],
        opposingArguments: [],
        evidence: [
          {
            id: 'e2',
            description: 'Study A',
            source: 'Source A',
            quality: EvidenceQuality.PEER_REVIEWED_STUDY,
            truthScore: 0.9
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'user1'
      };

      const opposingArg: Argument = {
        id: 'a3',
        title: 'Confusing for elderly drivers',
        description: 'Some drivers find roundabouts confusing',
        supportingArguments: [],
        opposingArguments: [],
        evidence: [
          {
            id: 'e3',
            description: 'Anecdotal evidence',
            source: 'Survey',
            quality: EvidenceQuality.ANECDOTAL,
            truthScore: 0.6
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'user2'
      };

      const mainArgument: Argument = {
        id: 'a1',
        title: 'Should build roundabouts',
        description: 'City should replace stop signs with roundabouts',
        supportingArguments: [
          {
            id: 'l1',
            subArgumentId: 'a2',
            linkageScore: 1.0, // Strongly supports
            importanceWeight: 1.0 // Critical safety factor
          }
        ],
        opposingArguments: [
          {
            id: 'l2',
            subArgumentId: 'a3',
            linkageScore: -0.8, // Moderately opposes
            importanceWeight: 0.6 // Somewhat important
          }
        ],
        evidence: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'user1'
      };

      calculator.registerArgument(supportingArg);
      calculator.registerArgument(opposingArg);
      calculator.registerArgument(mainArgument);

      const result = calculator.calculateScore(mainArgument);

      // Should favor building roundabouts (strong support outweighs weak opposition)
      expect(result.truthScore).toBeGreaterThan(0.5);
      expect(result.contributingFactors.length).toBe(2);
    });

    test('should filter out low-importance arguments', () => {
      const trivialArg: Argument = {
        id: 'a2',
        title: 'Construction causes temporary delays',
        description: 'There will be delays during construction',
        supportingArguments: [],
        opposingArguments: [],
        evidence: [
          {
            id: 'e2',
            description: 'Obviously true',
            source: 'Common sense',
            quality: EvidenceQuality.OPINION,
            truthScore: 1.0
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'user1'
      };

      const mainArgument: Argument = {
        id: 'a1',
        title: 'Should build roundabouts',
        description: 'City should replace stop signs with roundabouts',
        supportingArguments: [],
        opposingArguments: [
          {
            id: 'l1',
            subArgumentId: 'a2',
            linkageScore: -1.0,
            importanceWeight: 0.01 // Very low importance - below 5% threshold
          }
        ],
        evidence: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'user1'
      };

      calculator.registerArgument(trivialArg);
      calculator.registerArgument(mainArgument);

      const result = calculator.calculateScore(mainArgument);

      // Trivial argument should be filtered out
      expect(result.contributingFactors.length).toBe(0);
    });
  });

  describe('Recursive scoring', () => {
    test('should handle multi-level argument chains', () => {
      // Level 3: Base evidence
      const study: Argument = {
        id: 'a3',
        title: 'IIHS Study 2020',
        description: 'Study confirms 90% reduction in fatal crashes',
        supportingArguments: [],
        opposingArguments: [],
        evidence: [
          {
            id: 'e1',
            description: 'Peer-reviewed data',
            source: 'IIHS',
            quality: EvidenceQuality.PEER_REVIEWED_STUDY,
            truthScore: 0.95
          }
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'user1'
      };

      // Level 2: Safety argument
      const safetyArg: Argument = {
        id: 'a2',
        title: 'Roundabouts are safer',
        description: 'Roundabouts significantly reduce accidents',
        supportingArguments: [
          {
            id: 'l2',
            subArgumentId: 'a3',
            linkageScore: 1.0,
            importanceWeight: 1.0
          }
        ],
        opposingArguments: [],
        evidence: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'user1'
      };

      // Level 1: Policy decision
      const policyArg: Argument = {
        id: 'a1',
        title: 'Should build roundabouts',
        description: 'City should implement roundabout policy',
        supportingArguments: [
          {
            id: 'l1',
            subArgumentId: 'a2',
            linkageScore: 0.9,
            importanceWeight: 1.0
          }
        ],
        opposingArguments: [],
        evidence: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'user1'
      };

      calculator.registerArgument(study);
      calculator.registerArgument(safetyArg);
      calculator.registerArgument(policyArg);

      const result = calculator.calculateScore(policyArg);

      // Score should propagate through all levels
      expect(result.truthScore).toBeGreaterThan(0.3);
      expect(result.truthScore).toBeLessThan(1.0);
    });

    test('should prevent infinite recursion on circular references', () => {
      const arg1: Argument = {
        id: 'a1',
        title: 'Argument 1',
        description: 'First argument',
        supportingArguments: [
          {
            id: 'l1',
            subArgumentId: 'a2',
            linkageScore: 1.0,
            importanceWeight: 1.0
          }
        ],
        opposingArguments: [],
        evidence: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'user1'
      };

      const arg2: Argument = {
        id: 'a2',
        title: 'Argument 2',
        description: 'Second argument',
        supportingArguments: [
          {
            id: 'l2',
            subArgumentId: 'a1', // Circular reference!
            linkageScore: 1.0,
            importanceWeight: 1.0
          }
        ],
        opposingArguments: [],
        evidence: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'user1'
      };

      calculator.registerArgument(arg1);
      calculator.registerArgument(arg2);

      // Should not throw error or hang
      const result = calculator.calculateScore(arg1);
      expect(result).toBeDefined();
      expect(result.truthScore).toBe(0.5); // Neutral score for circular ref
    });
  });
});
