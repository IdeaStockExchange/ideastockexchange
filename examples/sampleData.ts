/**
 * Sample data demonstrating the belief system with real examples
 */

import {
  Topic,
  Belief as IBelief,
  TopicType,
  Dimension,
  ConfidenceLevel,
  EvidenceType
} from '../src/models/types';

// ============================================================================
// TOPIC: REMOTE WORK
// ============================================================================

export const remoteWorkTopic: Topic = {
  id: 'topic-remote-work',
  title: 'Remote Work',
  description: 'The practice of working from home or locations other than a central office',
  type: TopicType.PRODUCT, // Treating remote work as a "product/system"
  beliefs: [],
  stats: {
    totalBeliefs: 8,
    beliefsByDimension: {
      purpose: 3,
      function: 3,
      form: 2
    },
    beliefsByPosition: {
      highly_beneficial: 2,
      moderately_beneficial: 4,
      mixed_neutral: 1,
      moderately_harmful: 1,
      highly_harmful: 0
    },
    averageScore: {
      purpose: 51,
      function: 32,
      form: 29,
      overall: 37
    },
    totalEngagement: 45800,
    totalControversy: 28
  },
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-12-01'),
  tags: ['work', 'employment', 'productivity', 'technology']
};

// Remote Work Beliefs
export const remoteWorkBeliefs: IBelief[] = [
  {
    id: 'belief-rw-1',
    topicId: 'topic-remote-work',
    title: 'Remote work increases productivity',
    description: 'Studies show remote workers are 5-10% more productive due to fewer distractions and flexible schedules.',
    fullText: 'Meta-analysis of remote work studies from 2020-2024 shows consistent productivity gains of 5-10% across knowledge work sectors. Key factors include reduced commute stress, flexible work hours, and fewer office interruptions.',
    dimensionScores: {
      function: {
        dimension: Dimension.FUNCTION,
        overall: {
          value: 32,
          confidence: ConfidenceLevel.MEDIUM,
          range: { lower: 17, upper: 47 },
          evidence: [
            {
              id: 'ev-1',
              type: EvidenceType.META_ANALYSIS,
              source: 'Stanford Remote Work Study 2023',
              url: 'https://example.com/stanford-remote-work',
              description: 'Meta-analysis of 50+ studies showing 5-10% productivity gain',
              quality: 0.9,
              date: new Date('2023-06-01')
            }
          ]
        },
        indicators: [
          {
            name: 'Effectiveness',
            weight: 0.5,
            score: {
              value: 30,
              confidence: ConfidenceLevel.MEDIUM,
              notes: '5-10% productivity gain validated by meta-analysis'
            }
          },
          {
            name: 'Efficiency',
            weight: 0.3,
            score: {
              value: 40,
              confidence: ConfidenceLevel.MEDIUM,
              notes: 'Reduces office costs and commute time'
            }
          },
          {
            name: 'Reliability',
            weight: 0.2,
            score: {
              value: 20,
              confidence: ConfidenceLevel.LOW,
              notes: 'Varies significantly by role and management quality'
            }
          }
        ]
      }
    },
    primaryDimension: Dimension.FUNCTION,
    interestCount: 450,
    responseCount: 89,
    linkCount: 12,
    engagementScore: 14400,
    controversyScore: 35,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-11-15'),
    tags: ['productivity', 'evidence-based']
  },
  {
    id: 'belief-rw-2',
    topicId: 'topic-remote-work',
    title: 'Remote work respects worker autonomy',
    description: 'Allowing employees to choose their work location and schedule increases self-determination and wellbeing.',
    dimensionScores: {
      purpose: {
        dimension: Dimension.PURPOSE,
        overall: {
          value: 51,
          confidence: ConfidenceLevel.HIGH,
          range: { lower: 46, upper: 56 }
        },
        indicators: [
          {
            name: 'Moral Character',
            weight: 0.3,
            score: {
              value: 40,
              confidence: ConfidenceLevel.HIGH,
              notes: 'Respects autonomy, reduces environmental harm from commuting'
            }
          },
          {
            name: 'Interests Analysis',
            weight: 0.4,
            score: {
              value: 60,
              confidence: ConfidenceLevel.HIGH,
              notes: 'Benefits workers genuinely; some employers also benefit'
            }
          },
          {
            name: 'Values Alignment',
            weight: 0.3,
            score: {
              value: 50,
              confidence: ConfidenceLevel.MEDIUM,
              notes: 'Autonomy +60, Justice +40, Sustainability +70'
            }
          }
        ]
      }
    },
    primaryDimension: Dimension.PURPOSE,
    interestCount: 380,
    responseCount: 67,
    linkCount: 8,
    engagementScore: 19380,
    controversyScore: 22,
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-10-22'),
    tags: ['autonomy', 'ethics', 'wellbeing']
  },
  {
    id: 'belief-rw-3',
    topicId: 'topic-remote-work',
    title: 'Remote work reduces collaboration quality',
    description: 'In-person collaboration leads to better brainstorming, spontaneous problem-solving, and team cohesion.',
    dimensionScores: {
      function: {
        dimension: Dimension.FUNCTION,
        overall: {
          value: -25,
          confidence: ConfidenceLevel.MEDIUM,
          range: { lower: -40, upper: -10 }
        },
        indicators: [
          {
            name: 'Effectiveness',
            weight: 0.5,
            score: {
              value: -30,
              confidence: ConfidenceLevel.MEDIUM,
              notes: 'Reduced spontaneous collaboration and innovation'
            }
          },
          {
            name: 'Efficiency',
            weight: 0.3,
            score: {
              value: -20,
              confidence: ConfidenceLevel.LOW,
              notes: 'More time spent on coordination'
            }
          },
          {
            name: 'Reliability',
            weight: 0.2,
            score: {
              value: -20,
              confidence: ConfidenceLevel.LOW,
              notes: 'Communication gaps and misunderstandings'
            }
          }
        ]
      }
    },
    primaryDimension: Dimension.FUNCTION,
    interestCount: 290,
    responseCount: 78,
    linkCount: 15,
    engagementScore: 7250,
    controversyScore: 48,
    createdAt: new Date('2024-03-12'),
    updatedAt: new Date('2024-11-30'),
    tags: ['collaboration', 'teamwork']
  },
  {
    id: 'belief-rw-4',
    topicId: 'topic-remote-work',
    title: 'Remote work requires discipline and structure',
    description: 'Without office structure, remote work can be chaotic and require significant self-management.',
    dimensionScores: {
      form: {
        dimension: Dimension.FORM,
        overall: {
          value: 10,
          confidence: ConfidenceLevel.MEDIUM,
          range: { lower: -5, upper: 25 }
        },
        indicators: [
          {
            name: 'Order vs. Chaos',
            weight: 0.35,
            score: {
              value: 10,
              confidence: ConfidenceLevel.MEDIUM,
              notes: 'Can be chaotic without structure, needs discipline'
            }
          },
          {
            name: 'Appeal & Presentation',
            weight: 0.35,
            score: {
              value: 45,
              confidence: ConfidenceLevel.HIGH,
              notes: 'Most workers prefer it (4.2/5 rating)'
            }
          },
          {
            name: 'Harmony & Style',
            weight: 0.30,
            score: {
              value: -15,
              confidence: ConfidenceLevel.MEDIUM,
              notes: 'Fits some roles well, less suitable for highly collaborative work'
            }
          }
        ]
      }
    },
    primaryDimension: Dimension.FORM,
    interestCount: 220,
    responseCount: 45,
    linkCount: 7,
    engagementScore: 2200,
    controversyScore: 30,
    createdAt: new Date('2024-04-18'),
    updatedAt: new Date('2024-09-14'),
    tags: ['self-management', 'structure']
  },
  {
    id: 'belief-rw-5',
    topicId: 'topic-remote-work',
    title: 'Remote work enables geographic flexibility',
    description: 'Workers can live anywhere, reducing housing costs and improving quality of life.',
    dimensionScores: {
      purpose: {
        dimension: Dimension.PURPOSE,
        overall: {
          value: 65,
          confidence: ConfidenceLevel.HIGH,
          range: { lower: 55, upper: 75 }
        },
        indicators: [
          {
            name: 'Interests Analysis',
            weight: 0.4,
            score: {
              value: 70,
              confidence: ConfidenceLevel.HIGH,
              notes: 'Directly benefits workers, enables lifestyle choices'
            }
          },
          {
            name: 'Values Alignment',
            weight: 0.3,
            score: {
              value: 65,
              confidence: ConfidenceLevel.HIGH,
              notes: 'Autonomy +80, Justice +50 (access to opportunities)'
            }
          },
          {
            name: 'Moral Character',
            weight: 0.3,
            score: {
              value: 60,
              confidence: ConfidenceLevel.MEDIUM,
              notes: 'Transparent benefit, genuine value'
            }
          }
        ]
      }
    },
    primaryDimension: Dimension.PURPOSE,
    interestCount: 520,
    responseCount: 102,
    linkCount: 18,
    engagementScore: 33800,
    controversyScore: 18,
    createdAt: new Date('2024-05-22'),
    updatedAt: new Date('2024-12-01'),
    tags: ['flexibility', 'lifestyle', 'housing']
  },
  {
    id: 'belief-rw-6',
    topicId: 'topic-remote-work',
    title: 'Remote work saves commute time and costs',
    description: 'Eliminating daily commutes saves workers 2+ hours per day and reduces transportation expenses.',
    dimensionScores: {
      function: {
        dimension: Dimension.FUNCTION,
        overall: {
          value: 75,
          confidence: ConfidenceLevel.HIGH,
          range: { lower: 65, upper: 85 }
        },
        indicators: [
          {
            name: 'Effectiveness',
            weight: 0.5,
            score: {
              value: 80,
              confidence: ConfidenceLevel.HIGH,
              notes: 'Measurable time savings of 2+ hours/day'
            }
          },
          {
            name: 'Efficiency',
            weight: 0.3,
            score: {
              value: 75,
              confidence: ConfidenceLevel.HIGH,
              notes: 'Significant cost savings on gas, transit, vehicle wear'
            }
          },
          {
            name: 'Reliability',
            weight: 0.2,
            score: {
              value: 60,
              confidence: ConfidenceLevel.HIGH,
              notes: 'Consistently achieves goal'
            }
          }
        ]
      }
    },
    primaryDimension: Dimension.FUNCTION,
    interestCount: 610,
    responseCount: 134,
    linkCount: 22,
    engagementScore: 45750,
    controversyScore: 12,
    createdAt: new Date('2024-06-08'),
    updatedAt: new Date('2024-11-28'),
    tags: ['commute', 'efficiency', 'cost-savings']
  },
  {
    id: 'belief-rw-7',
    topicId: 'topic-remote-work',
    title: 'Remote work can isolate workers socially',
    description: 'Lack of in-person interaction can lead to loneliness and reduced social connection.',
    dimensionScores: {
      form: {
        dimension: Dimension.FORM,
        overall: {
          value: -30,
          confidence: ConfidenceLevel.MEDIUM,
          range: { lower: -45, upper: -15 }
        },
        indicators: [
          {
            name: 'Harmony & Style',
            weight: 0.30,
            score: {
              value: -40,
              confidence: ConfidenceLevel.MEDIUM,
              notes: 'Poor fit for social needs'
            }
          },
          {
            name: 'Appeal & Presentation',
            weight: 0.35,
            score: {
              value: -25,
              confidence: ConfidenceLevel.MEDIUM,
              notes: 'Some workers report loneliness'
            }
          },
          {
            name: 'Order vs. Chaos',
            weight: 0.35,
            score: {
              value: -25,
              confidence: ConfidenceLevel.LOW,
              notes: 'Can feel disconnected and unstructured'
            }
          }
        ]
      }
    },
    primaryDimension: Dimension.FORM,
    interestCount: 340,
    responseCount: 91,
    linkCount: 14,
    engagementScore: 10200,
    controversyScore: 42,
    createdAt: new Date('2024-07-14'),
    updatedAt: new Date('2024-10-30'),
    tags: ['isolation', 'social', 'mental-health']
  },
  {
    id: 'belief-rw-8',
    topicId: 'topic-remote-work',
    title: 'Remote work benefits employers through cost reduction',
    description: 'Companies save on office space, utilities, and amenities while maintaining productivity.',
    dimensionScores: {
      purpose: {
        dimension: Dimension.PURPOSE,
        overall: {
          value: 35,
          confidence: ConfidenceLevel.HIGH,
          range: { lower: 25, upper: 45 }
        },
        indicators: [
          {
            name: 'Interests Analysis',
            weight: 0.4,
            score: {
              value: 40,
              confidence: ConfidenceLevel.HIGH,
              notes: 'Mutual benefit: workers and employers both gain'
            }
          },
          {
            name: 'Stakeholder Alignment',
            weight: 0.3,
            score: {
              value: 35,
              confidence: ConfidenceLevel.HIGH,
              notes: 'Reasonably aligned interests'
            }
          },
          {
            name: 'Moral Character',
            weight: 0.3,
            score: {
              value: 30,
              confidence: ConfidenceLevel.MEDIUM,
              notes: 'Transparent cost-benefit for both parties'
            }
          }
        ]
      }
    },
    primaryDimension: Dimension.PURPOSE,
    interestCount: 280,
    responseCount: 56,
    linkCount: 9,
    engagementScore: 9800,
    controversyScore: 25,
    createdAt: new Date('2024-08-19'),
    updatedAt: new Date('2024-11-12'),
    tags: ['employer', 'costs', 'business']
  }
];

// ============================================================================
// TOPIC: UNIVERSAL BASIC INCOME
// ============================================================================

export const ubiTopic: Topic = {
  id: 'topic-ubi',
  title: 'Universal Basic Income',
  description: 'A government program providing regular, unconditional cash payments to all citizens',
  type: TopicType.POLICY,
  beliefs: [],
  stats: {
    totalBeliefs: 6,
    beliefsByDimension: {
      purpose: 2,
      function: 3,
      form: 1
    },
    beliefsByPosition: {
      highly_beneficial: 1,
      moderately_beneficial: 2,
      mixed_neutral: 2,
      moderately_harmful: 1,
      highly_harmful: 0
    },
    averageScore: {
      purpose: 48,
      function: 12,
      form: -15,
      overall: 15
    },
    totalEngagement: 62400,
    totalControversy: 52
  },
  createdAt: new Date('2024-02-01'),
  updatedAt: new Date('2024-12-05'),
  tags: ['policy', 'economics', 'welfare', 'income']
};

export const ubiBeliefs: IBelief[] = [
  {
    id: 'belief-ubi-1',
    topicId: 'topic-ubi',
    title: 'UBI reduces poverty and increases economic security',
    description: 'Guaranteed income provides a safety net and reduces extreme poverty.',
    dimensionScores: {
      purpose: {
        dimension: Dimension.PURPOSE,
        overall: {
          value: 75,
          confidence: ConfidenceLevel.HIGH,
          range: { lower: 65, upper: 85 }
        },
        indicators: [
          {
            name: 'Distributional Justice',
            weight: 0.4,
            score: {
              value: 80,
              confidence: ConfidenceLevel.HIGH,
              notes: 'Directly helps most vulnerable, broadly distributed'
            }
          },
          {
            name: 'Rights Protection',
            weight: 0.3,
            score: {
              value: 70,
              confidence: ConfidenceLevel.HIGH,
              notes: 'Increases economic autonomy and dignity'
            }
          },
          {
            name: 'Values Alignment',
            weight: 0.3,
            score: {
              value: 75,
              confidence: ConfidenceLevel.HIGH,
              notes: 'Justice +85, Dignity +70, Autonomy +70'
            }
          }
        ]
      }
    },
    primaryDimension: Dimension.PURPOSE,
    interestCount: 780,
    responseCount: 234,
    linkCount: 45,
    engagementScore: 58500,
    controversyScore: 38,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-12-01'),
    tags: ['poverty', 'security', 'justice']
  },
  {
    id: 'belief-ubi-2',
    topicId: 'topic-ubi',
    title: 'UBI may reduce work incentives',
    description: 'Unconditional cash payments could discourage people from seeking employment.',
    dimensionScores: {
      function: {
        dimension: Dimension.FUNCTION,
        overall: {
          value: -15,
          confidence: ConfidenceLevel.LOW,
          range: { lower: -35, upper: 5 }
        },
        indicators: [
          {
            name: 'Empirical Effectiveness',
            weight: 0.5,
            score: {
              value: -10,
              confidence: ConfidenceLevel.LOW,
              notes: 'Limited evidence; small pilots show minimal work reduction'
            }
          },
          {
            name: 'Unintended Consequences',
            weight: 0.3,
            score: {
              value: -25,
              confidence: ConfidenceLevel.SPECULATIVE,
              notes: 'Theoretical concern, not strongly validated'
            }
          }
        ]
      }
    },
    primaryDimension: Dimension.FUNCTION,
    interestCount: 520,
    responseCount: 187,
    linkCount: 32,
    engagementScore: 7800,
    controversyScore: 65,
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-11-18'),
    tags: ['work-incentives', 'labor', 'economics']
  }
];

// Export all sample data
export const SAMPLE_TOPICS = [remoteWorkTopic, ubiTopic];
export const SAMPLE_BELIEFS = [...remoteWorkBeliefs, ...ubiBeliefs];

// Add beliefs to topics
remoteWorkTopic.beliefs = remoteWorkBeliefs;
ubiTopic.beliefs = ubiBeliefs;
