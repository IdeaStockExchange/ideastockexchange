/**
 * Pre-configured templates for different topic types
 *
 * These templates define the specific indicators and weights for scoring
 * policies, products, people, and concepts.
 */

import {
  TopicTemplate,
  TopicType,
  Dimension
} from '../models/types';

// ============================================================================
// POLICY TEMPLATE
// ============================================================================

export const policyTemplate: TopicTemplate = {
  type: TopicType.POLICY,
  dimensions: {
    purpose: {
      dimension: Dimension.PURPOSE,
      indicators: [
        {
          name: 'Distributional Justice',
          weight: 0.4,
          description: 'Who benefits? Who bears costs? Is burden fairly shared?',
          scoringRubric: {
            ranges: [
              {
                min: 80,
                max: 100,
                label: 'Highly Progressive',
                description: 'Strongly helps most vulnerable, fairly distributed',
                examples: ['Universal basic income', 'Progressive taxation']
              },
              {
                min: 30,
                max: 60,
                label: 'Broadly Beneficial',
                description: 'Benefits majority of population',
                examples: ['Public education', 'Healthcare expansion']
              },
              {
                min: -10,
                max: 20,
                label: 'Neutral',
                description: 'Mixed or unclear distributional effects',
                examples: ['Administrative reforms']
              },
              {
                min: -60,
                max: -30,
                label: 'Regressive',
                description: 'Concentrates benefits upward',
                examples: ['Flat tax proposals', 'Corporate subsidies without conditions']
              },
              {
                min: -100,
                max: -80,
                label: 'Exploitative',
                description: 'Directly harms vulnerable populations',
                examples: ['Predatory lending schemes', 'Extreme austerity']
              }
            ]
          }
        },
        {
          name: 'Rights Protection',
          weight: 0.3,
          description: 'Does it protect or violate fundamental rights?',
          scoringRubric: {
            ranges: [
              {
                min: 80,
                max: 100,
                label: 'Rights Expanding',
                description: 'Significantly expands fundamental rights',
                examples: ['Voting rights expansion', 'Anti-discrimination laws']
              },
              {
                min: 30,
                max: 60,
                label: 'Rights Protecting',
                description: 'Maintains or moderately improves rights',
                examples: ['Privacy protections', 'Due process reforms']
              },
              {
                min: -10,
                max: 20,
                label: 'Minor Trade-offs',
                description: 'Small rights trade-offs for other benefits',
                examples: ['Security screening procedures']
              },
              {
                min: -60,
                max: -30,
                label: 'Significant Infringement',
                description: 'Notable violations of rights',
                examples: ['Mass surveillance', 'Restrictive assembly laws']
              },
              {
                min: -100,
                max: -80,
                label: 'Authoritarian',
                description: 'Severe rights violations',
                examples: ['Political censorship', 'Discriminatory laws']
              }
            ]
          }
        },
        {
          name: 'Democratic Legitimacy',
          weight: 0.2,
          description: 'How was it created? Does it reflect public will?',
          scoringRubric: {
            ranges: [
              {
                min: 80,
                max: 100,
                label: 'Highly Democratic',
                description: 'Strong public support, transparent process',
                examples: ['Ballot initiatives with >60% support']
              },
              {
                min: 30,
                max: 60,
                label: 'Adequate Legitimacy',
                description: 'Moderate public support, standard process',
                examples: ['Legislation with bipartisan support']
              },
              {
                min: -10,
                max: 20,
                label: 'Weak Legitimacy',
                description: 'Limited consultation or support',
                examples: ['Executive orders', 'Narrow majority votes']
              },
              {
                min: -60,
                max: -30,
                label: 'Illegitimate',
                description: 'Opposed by majority, opaque process',
                examples: ['Unpopular mandates', 'Hidden provisions']
              }
            ]
          }
        },
        {
          name: 'Moral Hazards',
          weight: 0.1,
          description: 'Does it create perverse incentives?',
          scoringRubric: {
            ranges: [
              {
                min: 60,
                max: 100,
                label: 'Positive Incentives',
                description: 'Aligns incentives well',
                examples: ['Pay-for-performance', 'Green tax credits']
              },
              {
                min: -20,
                max: 40,
                label: 'Neutral',
                description: 'No major perverse incentives',
                examples: ['Most standard regulations']
              },
              {
                min: -100,
                max: -40,
                label: 'Significant Hazards',
                description: 'Creates problematic incentives',
                examples: ['Poorly designed subsidies', 'Unintended consequences']
              }
            ]
          }
        }
      ]
    },
    function: {
      dimension: Dimension.FUNCTION,
      indicators: [
        {
          name: 'Empirical Effectiveness',
          weight: 0.5,
          description: 'Does it solve the stated problem? What does evidence show?',
          scoringRubric: {
            ranges: [
              {
                min: 80,
                max: 100,
                label: 'Highly Effective',
                description: 'Strong RCT evidence of large effects',
                examples: ['Proven interventions with >80% success rate']
              },
              {
                min: 30,
                max: 60,
                label: 'Moderately Effective',
                description: 'Good evidence of moderate effects',
                examples: ['Observational studies showing 30-50% improvement']
              },
              {
                min: -10,
                max: 20,
                label: 'Uncertain',
                description: 'Mixed or limited evidence',
                examples: ['New policies without track record']
              },
              {
                min: -60,
                max: -30,
                label: 'Ineffective',
                description: 'Evidence shows minimal impact',
                examples: ['Failed pilot programs']
              },
              {
                min: -100,
                max: -80,
                label: 'Counterproductive',
                description: 'Makes problem worse',
                examples: ['Interventions with documented negative effects']
              }
            ]
          }
        },
        {
          name: 'Cost-Effectiveness',
          weight: 0.3,
          description: 'Is it the most efficient solution? What are opportunity costs?',
          scoringRubric: {
            ranges: [
              {
                min: 80,
                max: 100,
                label: 'Highly Efficient',
                description: '2x better than best alternative',
                examples: ['Prevention vs. treatment', 'Targeted interventions']
              },
              {
                min: 30,
                max: 60,
                label: 'Cost-Effective',
                description: 'Better than available alternatives',
                examples: ['Standard cost-benefit positive']
              },
              {
                min: -10,
                max: 20,
                label: 'Similar to Alternatives',
                description: 'Comparable efficiency',
                examples: ['Different approaches with similar ROI']
              },
              {
                min: -60,
                max: -30,
                label: 'Wasteful',
                description: 'Worse than alternatives',
                examples: ['High cost, low return']
              }
            ]
          }
        },
        {
          name: 'Implementation Feasibility',
          weight: 0.2,
          description: 'Can it be administered reliably? Historical track record?',
          scoringRubric: {
            ranges: [
              {
                min: 80,
                max: 100,
                label: 'Highly Feasible',
                description: 'Proven track record, simple administration',
                examples: ['Well-established systems']
              },
              {
                min: 30,
                max: 60,
                label: 'Feasible',
                description: 'Reasonable implementation requirements',
                examples: ['Moderate complexity, manageable']
              },
              {
                min: -10,
                max: 20,
                label: 'Challenging',
                description: 'Significant implementation barriers',
                examples: ['Requires major system changes']
              },
              {
                min: -60,
                max: -30,
                label: 'Difficult',
                description: 'High failure risk in implementation',
                examples: ['Complex coordination, untested']
              }
            ]
          }
        }
      ]
    },
    form: {
      dimension: Dimension.FORM,
      indicators: [
        {
          name: 'Policy Design Quality',
          weight: 0.4,
          description: 'Clear, comprehensive, internally consistent?',
          scoringRubric: {
            ranges: [
              {
                min: 80,
                max: 100,
                label: 'Excellent Design',
                description: 'Clear, comprehensive, well-crafted',
                examples: ['Model legislation', 'Award-winning policy design']
              },
              {
                min: 30,
                max: 60,
                label: 'Good Design',
                description: 'Generally clear and consistent',
                examples: ['Standard professional drafting']
              },
              {
                min: -10,
                max: 20,
                label: 'Adequate',
                description: 'Functional but has gaps',
                examples: ['Workable but could be clearer']
              },
              {
                min: -60,
                max: -30,
                label: 'Poor Design',
                description: 'Confusing, inconsistent, loopholes',
                examples: ['Hastily drafted', 'Internal contradictions']
              }
            ]
          }
        },
        {
          name: 'Political Viability',
          weight: 0.35,
          description: 'Can it pass? Does it have public support?',
          scoringRubric: {
            formula: 'Map polling support directly to score',
            ranges: [
              {
                min: 60,
                max: 80,
                label: 'High Support',
                description: '>60% public approval',
                examples: ['Popular initiatives']
              },
              {
                min: 20,
                max: 40,
                label: 'Moderate Support',
                description: '40-60% approval',
                examples: ['Partisan divide issues']
              },
              {
                min: 0,
                max: 20,
                label: 'Low Support',
                description: '30-40% approval',
                examples: ['Controversial measures']
              },
              {
                min: -40,
                max: 0,
                label: 'Unpopular',
                description: '<30% approval',
                examples: ['Opposed by majority']
              }
            ]
          }
        },
        {
          name: 'Communication/Framing',
          weight: 0.25,
          description: 'Well-explained? Persuasive messaging?',
          scoringRubric: {
            ranges: [
              {
                min: 80,
                max: 100,
                label: 'Excellent Communication',
                description: 'Clear, compelling, accessible',
                examples: ['Simple concepts, effective messaging']
              },
              {
                min: 30,
                max: 60,
                label: 'Good Communication',
                description: 'Understandable, reasonably persuasive',
                examples: ['Standard policy communication']
              },
              {
                min: -10,
                max: 20,
                label: 'Unclear',
                description: 'Complex or confusing messaging',
                examples: ['Technical jargon', 'Unclear benefits']
              },
              {
                min: -60,
                max: -30,
                label: 'Poor Communication',
                description: 'Incomprehensible or misleading',
                examples: ['Obfuscated language', 'Deceptive framing']
              }
            ]
          }
        }
      ]
    }
  }
};

// ============================================================================
// PRODUCT TEMPLATE
// ============================================================================

export const productTemplate: TopicTemplate = {
  type: TopicType.PRODUCT,
  dimensions: {
    purpose: {
      dimension: Dimension.PURPOSE,
      indicators: [
        {
          name: 'User Value vs. Extraction',
          weight: 0.5,
          description: 'Does it genuinely help users or exploit them?',
          scoringRubric: {
            ranges: [
              {
                min: 80,
                max: 100,
                label: 'High User Value',
                description: 'Solves real problem, minimal manipulation',
                examples: ['Productivity tools', 'Essential services']
              },
              {
                min: 30,
                max: 60,
                label: 'Useful',
                description: 'Genuine value but some monetization tactics',
                examples: ['Freemium apps with fair limits']
              },
              {
                min: -10,
                max: 20,
                label: 'Marginal Value',
                description: 'Questionable necessity, aggressive monetization',
                examples: ['Games with heavy microtransactions']
              },
              {
                min: -60,
                max: -30,
                label: 'Exploitative',
                description: 'Preys on vulnerabilities',
                examples: ['Dark pattern heavy apps', 'Addictive designs']
              },
              {
                min: -100,
                max: -80,
                label: 'Actively Harmful',
                description: 'Causes user harm',
                examples: ['Predatory apps', 'Scam products']
              }
            ]
          }
        },
        {
          name: 'Ethical Design',
          weight: 0.3,
          description: 'Transparent? Respects privacy? Addictive?',
          scoringRubric: {
            ranges: [
              {
                min: 80,
                max: 100,
                label: 'Highly Ethical',
                description: 'Privacy-respecting, transparent, accessible',
                examples: ['Open source tools', 'Privacy-first services']
              },
              {
                min: 30,
                max: 60,
                label: 'Generally Ethical',
                description: 'Mostly transparent, some concerns',
                examples: ['Standard commercial apps']
              },
              {
                min: -10,
                max: 20,
                label: 'Some Issues',
                description: 'Privacy concerns, minor dark patterns',
                examples: ['Apps with excessive tracking']
              },
              {
                min: -60,
                max: -30,
                label: 'Unethical',
                description: 'Major privacy violations, manipulative',
                examples: ['Data harvesting apps', 'Dark pattern heavy']
              }
            ]
          }
        },
        {
          name: 'Stakeholder Alignment',
          weight: 0.2,
          description: 'Are business incentives aligned with user benefit?',
          scoringRubric: {
            ranges: [
              {
                min: 80,
                max: 100,
                label: 'Fully Aligned',
                description: 'Company succeeds when users succeed',
                examples: ['One-time purchase software', 'User-funded services']
              },
              {
                min: 20,
                max: 60,
                label: 'Partially Aligned',
                description: 'Some tension but manageable',
                examples: ['Ad-supported but useful']
              },
              {
                min: -40,
                max: 0,
                label: 'Misaligned',
                description: 'Profits from user attention/data',
                examples: ['Engagement-optimized social media']
              },
              {
                min: -100,
                max: -60,
                label: 'Opposed',
                description: 'Profits from user harm',
                examples: ['Predatory business models']
              }
            ]
          }
        }
      ]
    },
    function: {
      dimension: Dimension.FUNCTION,
      indicators: [
        {
          name: 'Core Functionality',
          weight: 0.4,
          description: 'Does it do what it claims? Performance metrics?',
          scoringRubric: {
            formula: 'Feature completion × Performance benchmarks',
            ranges: [
              {
                min: 80,
                max: 100,
                label: 'Excellent',
                description: 'All features work, top performance',
                examples: ['Industry-leading products']
              },
              {
                min: 50,
                max: 70,
                label: 'Good',
                description: 'Most features work, good performance',
                examples: ['Solid commercial products']
              },
              {
                min: 20,
                max: 40,
                label: 'Adequate',
                description: 'Core features work, acceptable performance',
                examples: ['Budget alternatives']
              },
              {
                min: -20,
                max: 10,
                label: 'Poor',
                description: 'Missing features, slow performance',
                examples: ['Incomplete or buggy products']
              },
              {
                min: -100,
                max: -40,
                label: 'Broken',
                description: 'Doesn\'t work as advertised',
                examples: ['Vaporware', 'Non-functional']
              }
            ]
          }
        },
        {
          name: 'Reliability',
          weight: 0.3,
          description: 'Uptime, bug rate, consistency?',
          scoringRubric: {
            formula: 'Based on uptime percentage and bug severity',
            ranges: [
              {
                min: 80,
                max: 100,
                label: 'Very Reliable',
                description: '>99.9% uptime, minimal bugs',
                examples: ['Enterprise-grade services']
              },
              {
                min: 50,
                max: 70,
                label: 'Reliable',
                description: '99-99.9% uptime, few bugs',
                examples: ['Standard consumer products']
              },
              {
                min: 20,
                max: 40,
                label: 'Somewhat Reliable',
                description: '95-99% uptime, some bugs',
                examples: ['Beta products']
              },
              {
                min: -50,
                max: 10,
                label: 'Unreliable',
                description: '<95% uptime, frequent bugs',
                examples: ['Unstable products']
              }
            ]
          }
        },
        {
          name: 'Value for Money',
          weight: 0.3,
          description: 'Price vs. alternatives? TCO?',
          scoringRubric: {
            ranges: [
              {
                min: 80,
                max: 100,
                label: 'Excellent Value',
                description: 'Significantly better than alternatives',
                examples: ['Best price/performance ratio']
              },
              {
                min: 40,
                max: 70,
                label: 'Good Value',
                description: 'Competitive pricing',
                examples: ['Fair market price']
              },
              {
                min: 0,
                max: 30,
                label: 'Fair Value',
                description: 'Premium but justified',
                examples: ['Higher price, better quality']
              },
              {
                min: -60,
                max: -10,
                label: 'Poor Value',
                description: 'Overpriced',
                examples: ['Expensive for features']
              }
            ]
          }
        }
      ]
    },
    form: {
      dimension: Dimension.FORM,
      indicators: [
        {
          name: 'User Experience (UX)',
          weight: 0.45,
          description: 'Intuitive? Delightful? Frustrating?',
          scoringRubric: {
            formula: 'System Usability Scale (SUS) mapped to -100 to +100',
            ranges: [
              {
                min: 80,
                max: 100,
                label: 'Exceptional UX',
                description: 'Delightful, intuitive, effortless',
                examples: ['Award-winning interfaces']
              },
              {
                min: 50,
                max: 70,
                label: 'Good UX',
                description: 'Easy to use, pleasant',
                examples: ['Well-designed consumer apps']
              },
              {
                min: 20,
                max: 40,
                label: 'Adequate UX',
                description: 'Usable but requires learning',
                examples: ['Professional software']
              },
              {
                min: -20,
                max: 10,
                label: 'Poor UX',
                description: 'Confusing, frustrating',
                examples: ['Poorly designed interfaces']
              }
            ]
          }
        },
        {
          name: 'Aesthetic Design',
          weight: 0.30,
          description: 'Beautiful? Attention to detail?',
          scoringRubric: {
            formula: 'User aesthetic ratings (1-5 stars → -100 to +100)',
            ranges: [
              {
                min: 80,
                max: 100,
                label: 'Beautiful',
                description: 'Stunning design, industry-leading',
                examples: ['Design award winners']
              },
              {
                min: 40,
                max: 70,
                label: 'Attractive',
                description: 'Pleasing, professional',
                examples: ['Modern, polished']
              },
              {
                min: 0,
                max: 30,
                label: 'Functional',
                description: 'Plain but acceptable',
                examples: ['Utilitarian design']
              },
              {
                min: -50,
                max: -10,
                label: 'Unattractive',
                description: 'Dated, ugly',
                examples: ['Poor visual design']
              }
            ]
          }
        },
        {
          name: 'Fit for Purpose',
          weight: 0.25,
          description: 'Appropriate for target user and context?',
          scoringRubric: {
            ranges: [
              {
                min: 80,
                max: 100,
                label: 'Perfect Fit',
                description: 'Ideal for target audience',
                examples: ['Specialized tools for professionals']
              },
              {
                min: 40,
                max: 70,
                label: 'Good Fit',
                description: 'Suits most target users',
                examples: ['General consumer products']
              },
              {
                min: 0,
                max: 30,
                label: 'Acceptable',
                description: 'Works but not optimized',
                examples: ['Generic solutions']
              },
              {
                min: -50,
                max: -10,
                label: 'Poor Fit',
                description: 'Mismatched to audience',
                examples: ['Overcomplicated or too simple']
              }
            ]
          }
        }
      ]
    }
  }
};

// ============================================================================
// TEMPLATE REGISTRY
// ============================================================================

export const TOPIC_TEMPLATES: Record<TopicType, TopicTemplate> = {
  [TopicType.POLICY]: policyTemplate,
  [TopicType.PRODUCT]: productTemplate,
  [TopicType.PERSON]: {
    type: TopicType.PERSON,
    dimensions: {
      purpose: { dimension: Dimension.PURPOSE, indicators: [] },
      function: { dimension: Dimension.FUNCTION, indicators: [] },
      form: { dimension: Dimension.FORM, indicators: [] }
    }
  }, // Simplified for brevity
  [TopicType.CONCEPT]: {
    type: TopicType.CONCEPT,
    dimensions: {
      purpose: { dimension: Dimension.PURPOSE, indicators: [] },
      function: { dimension: Dimension.FUNCTION, indicators: [] },
      form: { dimension: Dimension.FORM, indicators: [] }
    }
  } // Simplified for brevity
};

/**
 * Get template for a topic type
 */
export function getTemplate(type: TopicType): TopicTemplate {
  return TOPIC_TEMPLATES[type];
}
