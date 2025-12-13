# Topics Page Design Implementation

A comprehensive system for organizing and evaluating beliefs across three dimensions: **Purpose** (why it exists), **Function** (how well it works), and **Form** (how it feels).

## Overview

This repository contains the complete implementation of the Topics Page Design framework, including:

- **Documentation** - Detailed specifications for UI, scoring, and templates
- **TypeScript Models** - Type-safe data structures for beliefs and topics
- **Utilities** - Filtering, sorting, and scoring calculations
- **Components** - React UI components for displaying beliefs
- **Templates** - Pre-configured scoring templates for different topic types
- **Examples** - Sample data demonstrating the system

---

## Quick Start

### Installation

```bash
npm install
```

### Basic Usage

```typescript
import { Belief } from './src/models/Belief';
import { filterBeliefs, sortBeliefs } from './src/utils/beliefFilters';
import { SAMPLE_TOPICS } from './examples/sampleData';

// Get a topic
const topic = SAMPLE_TOPICS[0]; // Remote Work

// Filter beliefs by dimension
const purposeBeliefs = filterBeliefs(topic.beliefs, {
  dimension: 'purpose'
});

// Sort by engagement
const sortedBeliefs = sortBeliefs(purposeBeliefs, 'engagement');

// Display
sortedBeliefs.forEach(belief => {
  console.log(`${belief.title}: ${belief.getFormattedScore()}`);
});
```

---

## Project Structure

```
ideastockexchange/
├── docs/
│   ├── UI_IMPLEMENTATION_RULES.md    # Complete UI specification
│   ├── SCORING_CRITERIA.md           # Objective scoring framework
│   └── TOPIC_TEMPLATES.md            # Templates for different topic types
│
├── src/
│   ├── models/
│   │   ├── types.ts                  # TypeScript type definitions
│   │   └── Belief.ts                 # Belief class implementation
│   │
│   ├── utils/
│   │   ├── beliefFilters.ts          # Filtering and sorting utilities
│   │   └── scoring.ts                # Score calculation functions
│   │
│   ├── templates/
│   │   └── topicTemplates.ts         # Pre-configured templates
│   │
│   └── components/
│       ├── BeliefCard.tsx            # Belief card component
│       ├── TabGroup.tsx              # Dimension tabs component
│       └── SpectrumView.tsx          # Spectrum visualization
│
├── examples/
│   └── sampleData.ts                 # Sample topics and beliefs
│
└── tests/
    └── (unit tests)
```

---

## Core Concepts

### Three Dimensions

Every belief is evaluated along three independent dimensions:

| Dimension | Question | Focus |
|-----------|----------|-------|
| **Purpose** | Is it right? | Goals, morality, intent, values alignment |
| **Function** | Does it work? | Effectiveness, efficiency, reliability |
| **Form** | Is it pleasant? | UX, aesthetics, appropriateness |

### Spectrum Positioning

All beliefs are scored on a -100 to +100 spectrum:

- **+75 to +100**: Highly beneficial/effective/excellent
- **+25 to +75**: Moderately beneficial/adequate/good
- **-25 to +25**: Mixed/neutral/contextual
- **-75 to -25**: Moderately harmful/poor/problematic
- **-100 to -75**: Highly harmful/broken/severely poor

### Engagement Score

Measures how much people care about a belief:

```
Engagement = Interest Count × |Conviction|

Where:
- Interest Count = Number of people who care
- Conviction = Absolute value of spectrum position
```

Higher engagement = more important to discuss.

---

## Documentation

### 1. UI Implementation Rules

**File:** `docs/UI_IMPLEMENTATION_RULES.md`

Defines the complete user interface specification including:

- Page structure and layout
- Tab system for dimensions
- Filter and sort options
- List and spectrum view modes
- Responsive design breakpoints
- Accessibility requirements
- Animation specifications

**Key Features:**
- Default view: All beliefs, sorted by engagement
- Tab switching between All/Purpose/Function/Form
- Position filters (highly beneficial → highly harmful)
- Dual view modes (list cards or spectrum visualization)

### 2. Scoring Criteria

**File:** `docs/SCORING_CRITERIA.md`

Provides operationalized scoring criteria for each dimension:

**Purpose Dimension (40% weight):**
- Moral Character (30%)
- Interests Analysis (40%) - Who actually benefits?
- Values Alignment (30%) - Autonomy, justice, dignity

**Function Dimension (most operationalizable):**
- Effectiveness (50%) - Evidence-based outcome measurement
- Efficiency (30%) - Cost-benefit analysis
- Reliability (20%) - Consistency and failure rates

**Form Dimension:**
- Appeal & Presentation (35%) - User ratings and aesthetics
- Order vs. Chaos (35%) - Usability and cognitive load
- Harmony & Style (30%) - Contextual fit

### 3. Topic Templates

**File:** `docs/TOPIC_TEMPLATES.md`

Pre-configured templates for four topic types:

1. **Policies** - Government actions, regulations
   - Focus: Distributional justice, empirical evidence, political viability

2. **Products** - Commercial offerings, services
   - Focus: User value vs. extraction, functionality, UX

3. **People** - Public figures, leaders
   - Focus: Integrity, track record, communication skills

4. **Concepts** - Abstract ideas, philosophies
   - Focus: Intrinsic value, logical coherence, elegance

---

## TypeScript Models

### Core Types

```typescript
import { Belief, Topic, Dimension, Score } from './src/models/types';

// Dimensions
enum Dimension {
  PURPOSE = 'purpose',
  FUNCTION = 'function',
  FORM = 'form'
}

// Score with confidence
interface Score {
  value: number;              // -100 to +100
  confidence: ConfidenceLevel;
  range?: { lower: number; upper: number };
  evidence?: Evidence[];
}

// Belief structure
interface Belief {
  id: string;
  title: string;
  description: string;
  dimensionScores: {
    purpose?: DimensionScore;
    function?: DimensionScore;
    form?: DimensionScore;
  };
  primaryDimension: Dimension;
  interestCount: number;
  engagementScore: number;
}
```

### Belief Class

```typescript
import { Belief } from './src/models/Belief';

const belief = new Belief(beliefData);

// Get spectrum position
belief.getSpectrumPosition(); // Returns -100 to +100

// Get color for visualization
belief.getColorCode(); // Returns hex color

// Get position label
belief.getPositionLabel(); // "Moderately Beneficial"

// Check if matches filter
belief.matchesPositionFilter(PositionRange.HIGHLY_BENEFICIAL);

// Get formatted score
belief.getFormattedScore(); // "+65 ± 15 (Medium Confidence)"
```

---

## Utilities

### Filtering

```typescript
import { filterBeliefs } from './src/utils/beliefFilters';

const filtered = filterBeliefs(beliefs, {
  dimension: 'function',
  positionRange: PositionRange.MODERATELY_BENEFICIAL,
  minEngagement: 1000,
  tags: ['evidence-based'],
  searchQuery: 'productivity'
});
```

### Sorting

```typescript
import { sortBeliefs, SortOption } from './src/utils/beliefFilters';

const sorted = sortBeliefs(
  beliefs,
  SortOption.ENGAGEMENT,  // or CONVICTION, INTEREST, RECENCY, CONTROVERSY
  true                     // descending
);
```

### Scoring

```typescript
import { calculateDimensionScore, calculateEngagement } from './src/utils/scoring';

// Calculate dimension score from indicators
const score = calculateDimensionScore(indicators);

// Calculate engagement
const engagement = calculateEngagement(interestCount, conviction);

// Calculate effectiveness with evidence quality
const effectiveness = calculateEffectiveness(
  actualOutcome,
  intendedOutcome,
  EvidenceType.RCT
);
```

---

## Components

### BeliefCard

```tsx
import { BeliefCard } from './src/components/BeliefCard';

<BeliefCard
  belief={belief}
  showDimension={true}
  onClick={(belief) => navigateToDetail(belief)}
  compact={false}
/>
```

### TabGroup

```tsx
import { TabGroup } from './src/components/TabGroup';

<TabGroup
  tabs={[
    { id: 'all', label: 'All', count: 247 },
    { id: 'purpose', label: 'Purpose', count: 89 },
    { id: 'function', label: 'Function', count: 121 },
    { id: 'form', label: 'Form', count: 37 }
  ]}
  activeTab="all"
  onTabChange={(tabId) => setActiveDimension(tabId)}
/>
```

### SpectrumView

```tsx
import { SpectrumView } from './src/components/SpectrumView';

<SpectrumView
  beliefs={beliefs}
  dimension={Dimension.FUNCTION}
  width={800}
  height={400}
  onDotClick={(belief) => navigateToDetail(belief)}
/>
```

---

## Example Data

Sample topics included:

1. **Remote Work** (8 beliefs)
   - Average Purpose: +51
   - Average Function: +32
   - Average Form: +29
   - Demonstrates range from highly beneficial to moderately harmful

2. **Universal Basic Income** (6 beliefs)
   - Average Purpose: +48
   - Average Function: +12
   - Average Form: -15
   - Shows controversial policy with mixed evidence

```typescript
import { SAMPLE_TOPICS, SAMPLE_BELIEFS } from './examples/sampleData';

// Use sample data
const remoteWorkTopic = SAMPLE_TOPICS[0];
console.log(remoteWorkTopic.stats);
```

---

## Development Workflow

### Creating a New Topic

1. Choose topic type (policy/product/person/concept)
2. Load appropriate template
3. Gather beliefs from stakeholders
4. Score each belief using template indicators
5. Calculate engagement and controversy metrics

### Scoring a Belief

1. **Identify dimension** - Is this about purpose, function, or form?
2. **Gather evidence** - Collect supporting data
3. **Score indicators** - Use rubrics from templates
4. **Calculate weighted average** - Combine indicator scores
5. **Assess confidence** - Based on evidence quality
6. **Document** - Record evidence and rationale

### Example Scoring Workflow

```typescript
import { calculateDimensionScore } from './src/utils/scoring';

const indicators = [
  {
    name: 'Effectiveness',
    weight: 0.5,
    score: {
      value: 65,
      confidence: ConfidenceLevel.MEDIUM,
      evidence: [/* RCT data */]
    }
  },
  // ... more indicators
];

const dimensionScore = calculateDimensionScore(indicators);
// Result: { value: 58, confidence: 'medium', range: { lower: 43, upper: 73 } }
```

---

## Best Practices

### Scoring

1. **Always cite evidence** - Link to sources for all claims
2. **Use appropriate evidence types** - RCTs > observational > anecdotal
3. **Be conservative with confidence** - When uncertain, lower confidence level
4. **Document assumptions** - Note any interpretations or judgments

### UI/UX

1. **Default to engagement sort** - Most important beliefs first
2. **Show confidence ranges** - Display ± range visually
3. **Provide context** - Explain what each dimension measures
4. **Enable comparison** - Make it easy to see opposing views

### Templates

1. **Adapt weights** - Adjust indicator weights for domain specifics
2. **Add domain indicators** - Include specialized measures when needed
3. **Test with examples** - Validate template with 5-10 sample beliefs
4. **Iterate based on feedback** - Refine based on user understanding

---

## API Design (Future)

Suggested REST API endpoints:

```
GET    /topics                    # List all topics
GET    /topics/:id                # Get topic details
GET    /topics/:id/beliefs        # Get beliefs for topic
POST   /topics/:id/beliefs        # Create new belief
PUT    /beliefs/:id               # Update belief
DELETE /beliefs/:id               # Delete belief

Query parameters:
?dimension=purpose|function|form|all
?position=highly_beneficial|moderately_beneficial|...
?sort=engagement|conviction|interest|recency|controversy
?page=1&limit=20
?search=query
```

---

## Contributing

When adding new features:

1. Update TypeScript types in `src/models/types.ts`
2. Add utilities in `src/utils/`
3. Create components in `src/components/`
4. Update documentation in `docs/`
5. Add examples in `examples/`
6. Write tests in `tests/`

---

## License

MIT

---

## Contact

For questions or feedback, open an issue in this repository.

---

## Appendix: Key Design Decisions

### Why Three Dimensions?

- **Completeness** - Covers moral, functional, and experiential aspects
- **Independence** - Each dimension measures distinct value types
- **Operationalizable** - Especially Function, which has clear metrics
- **Intuitive** - Maps to natural human evaluation (right/works/pleasant)

### Why -100 to +100 Scale?

- **Symmetric** - Equal range for positive and negative
- **Intuitive** - Percentage-like interpretation
- **Granular** - Enough precision without false accuracy
- **Comparable** - Easy to compare across beliefs

### Why Engagement Score?

- **Prioritizes important debates** - What people actually care about
- **Balances interest and conviction** - Both matter
- **Simple calculation** - Easy to understand and compute
- **Sortable** - Natural default ordering

### Why Templates?

- **Domain expertise** - Different topics need different criteria
- **Consistency** - Standardized scoring within topic types
- **Flexibility** - Customizable for specific needs
- **Learning** - Templates teach users what matters in each domain
