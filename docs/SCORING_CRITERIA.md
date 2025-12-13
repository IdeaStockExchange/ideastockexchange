# Objective Scoring Criteria for Belief Dimensions

## Overview

This document provides operationalized scoring criteria for evaluating beliefs across three dimensions: **Purpose**, **Function**, and **Form**. Each dimension has specific, measurable indicators that map to the -100% to +100% spectrum.

---

## Core Scoring Principles

### Universal Rules

1. **Spectrum Anchoring**
   - -100% = Maximally harmful/ineffective/poor
   - 0% = Neutral/mixed/contextual
   - +100% = Maximally beneficial/effective/excellent

2. **Evidence Requirements**
   - Scores must be justified with observable evidence
   - Multiple indicators strengthen confidence
   - Contradictory evidence reduces certainty

3. **Composite Scoring**
   - Overall score = weighted average of sub-indicators
   - More operationalizable indicators (Function) get higher weights
   - Less certain scores should note confidence intervals

4. **Engagement Score Calculation**
   ```
   Engagement Score = Interest Count × |Conviction|

   Where:
   - Interest Count = Number of people who care about this belief
   - Conviction = Absolute value of spectrum position (-100 to +100)
   ```

---

## 1. Purpose Dimension (Axiological Value)

**Core Question:** *Is it right? Does it serve good ends through acceptable means?*

### Scoring Framework

| Score Range | Interpretation | Indicators |
|-------------|----------------|------------|
| **+75 to +100** | Highly ethical, serves collective good | Clear alignment with widely held moral principles; demonstrable benefit to intended beneficiaries; transparent and just means |
| **+25 to +75** | Generally positive intent, some trade-offs | Mostly aligned with ethical norms; benefits real stakeholders; minor concerns about means or side effects |
| **-25 to +25** | Mixed motives, contextual | Competing interests; unclear beneficiaries; means are standard but questionable; depends heavily on implementation |
| **-75 to -25** | Problematic intent, serves narrow interests | Primarily benefits creators at expense of stated beneficiaries; misleading framing; ethically dubious means |
| **-100 to -75** | Actively harmful intent, exploitative | Deliberately deceptive; exploits vulnerable populations; violates fundamental moral principles |

### Operationalized Indicators

#### A. Moral Character (Weight: 30%)

**Measurement Criteria:**
- **Means evaluation**: Do methods align with stated values?
  - Transparent processes: +20 to +30
  - Hidden mechanisms: -20 to -30
  - Deceptive practices: -60 to -100

- **Ends evaluation**: Are goals intrinsically valuable?
  - Universal human flourishing: +60 to +100
  - Narrow group benefit: -20 to +20
  - Exploitation of others: -100 to -60

**Example Scoring:**
```
Belief: "Universal basic income reduces poverty"
Means: Transparent redistribution (+25)
Ends: Reduces suffering, increases autonomy (+80)
Moral Character Score: +52.5 (weighted average)
```

#### B. Interests Analysis (Weight: 40%)

**Measurement Criteria:**
- **Advertised beneficiaries vs. actual beneficiaries gap**
  - Perfect alignment: +80 to +100
  - Some misalignment: -20 to +40
  - Opposite beneficiaries: -100 to -60

- **Distribution of costs and benefits**
  - Costs borne by those who benefit: +40 to +60
  - Costs externalized to others: -40 to 0
  - Benefits concentrated, costs dispersed: -80 to -100

**Evidence Requirements:**
- Follow the money: funding sources, revenue models
- Stakeholder analysis: who gains, who loses, how much
- Historical outcomes: track record with similar initiatives

**Example Scoring:**
```
Belief: "This social media platform connects people"
Advertised: Connect users (+80 claimed)
Actual: Maximize engagement for ad revenue (+20 to users, +90 to platform)
Gap: -60
Distribution: Users pay with attention/data, platform profits
Interests Analysis Score: -45
```

#### C. Values Alignment (Weight: 30%)

**Measurement Criteria:**
- **Core principles support**
  - Autonomy: Does it increase or reduce self-determination?
  - Justice: Does it promote fairness or entrench inequality?
  - Dignity: Does it respect or diminish human worth?
  - Sustainability: Does it support or undermine long-term wellbeing?

- **Scoring Matrix:**

| Principle | Strong Support | Weak Support | Neutral | Weak Violation | Strong Violation |
|-----------|---------------|--------------|---------|----------------|------------------|
| Autonomy | +80 to +100 | +30 to +60 | -10 to +20 | -60 to -30 | -100 to -80 |
| Justice | +80 to +100 | +30 to +60 | -10 to +20 | -60 to -30 | -100 to -80 |
| Dignity | +80 to +100 | +30 to +60 | -10 to +20 | -60 to -30 | -100 to -80 |
| Sustainability | +80 to +100 | +30 to +60 | -10 to +20 | -60 to -30 | -100 to -80 |

**Example Scoring:**
```
Belief: "Gig economy provides flexible work opportunities"
Autonomy: +40 (flexible hours, but algorithmic control)
Justice: -20 (no benefits, wage pressure)
Dignity: -30 (precarious, limited rights)
Sustainability: -40 (no safety net, burnout risk)
Values Alignment Score: -12.5 (average)
```

### Purpose Dimension Final Score

```
Purpose Score = (Moral Character × 0.3) + (Interests Analysis × 0.4) + (Values Alignment × 0.3)
```

---

## 2. Function Dimension (Instrumental Value)

**Core Question:** *Does it work? Does it achieve stated goals effectively?*

### Scoring Framework

| Score Range | Interpretation | Indicators |
|-------------|----------------|------------|
| **+75 to +100** | Exceptional performance | Consistently exceeds goals; validated by rigorous evidence; cost-effective; reliable |
| **+25 to +75** | Adequate performance | Meets most goals; some supporting evidence; reasonable cost; generally reliable |
| **-25 to +25** | Inconsistent performance | Mixed results; limited evidence; uncertain cost-benefit; variable reliability |
| **-75 to -25** | Poor performance | Fails to meet goals; contrary evidence; inefficient; unreliable |
| **-100 to -75** | Counterproductive | Actively worsens intended outcomes; strong contrary evidence; wasteful; harmful |

### Operationalized Indicators

#### A. Effectiveness (Weight: 50%)

**Measurement Criteria:**
- **Goal achievement rate**
  - Measured outcomes vs. stated objectives
  - Evidence quality: RCTs (+highest weight), observational studies, anecdotal

**Scoring Formula:**
```
Effectiveness Score = (Actual Outcome / Intended Outcome) × 100 × Evidence Quality Multiplier

Evidence Quality Multipliers:
- Meta-analysis of RCTs: 1.0
- Single RCT: 0.9
- Quasi-experimental: 0.7
- Observational: 0.5
- Anecdotal: 0.3
- No evidence: 0.0
```

**Example Scoring:**
```
Belief: "This drug reduces blood pressure"
RCT shows: 15 mmHg reduction vs. 20 mmHg target
Effectiveness: (15/20) × 100 × 0.9 = +67.5

Belief: "Meditation reduces stress"
Observational study: 40% report reduced stress
Effectiveness: 40 × 0.5 = +20
```

**Special Cases:**
- If actual outcome is negative (makes problem worse): -100 to -50
- If no measurable change: -10 to +10

#### B. Efficiency (Weight: 30%)

**Measurement Criteria:**
- **Cost-benefit ratio**
  - Compare to best available alternatives
  - Include opportunity costs

**Scoring Formula:**
```
Efficiency Score = ((Benefit - Cost) / Cost) × Scaling Factor

Where:
- Benefit = Total value generated (monetized or standardized units)
- Cost = Total resources consumed
- Scaling Factor = Normalization to -100 to +100 range
```

**Benchmarking:**
- Best-in-class alternative: Set as +80 baseline
- Industry standard: +20 to +40
- Below standard: -20 to 0
- Wasteful: -80 to -100

**Example Scoring:**
```
Belief: "Electric cars reduce emissions cost-effectively"
Electric car: $30k, saves 5 tons CO2/year over 10 years (50 tons)
Gas car: $25k, baseline
Carbon offset cost: $50/ton

Benefit: 50 tons × $50 = $2,500
Additional cost: $5,000
Net: -$2,500 over 10 years
Efficiency: Negative short-term, but improving
Score: +20 (accounting for future cost declines and externalities)
```

#### C. Reliability/Stewardship (Weight: 20%)

**Measurement Criteria:**
- **Consistency of performance over time**
  - Standard deviation of outcomes
  - Failure rate
  - Maintenance requirements

**Scoring Rubric:**
- **Failure Rate:**
  - <1% failure: +80 to +100
  - 1-5% failure: +40 to +60
  - 5-15% failure: 0 to +30
  - 15-30% failure: -30 to 0
  - >30% failure: -100 to -60

- **Quality of Management:**
  - Proactive maintenance: +20
  - Reactive but adequate: 0
  - Neglectful: -40 to -80

**Example Scoring:**
```
Belief: "This bridge is safe"
Inspection record: Annual maintenance, 2% defect rate
Failure history: 0 structural failures in 30 years
Stewardship: Well-maintained (+20)
Failure rate: 2% (+60)
Reliability Score: +40 (weighted average)
```

### Function Dimension Final Score

```
Function Score = (Effectiveness × 0.5) + (Efficiency × 0.3) + (Reliability × 0.2)
```

---

## 3. Form Dimension (Aesthetic/Formal Value)

**Core Question:** *Is it pleasant, orderly, and appropriate for its context?*

### Scoring Framework

| Score Range | Interpretation | Indicators |
|-------------|----------------|------------|
| **+75 to +100** | Exceptional experience | Beautiful, intuitive, harmonious; widely praised |
| **+25 to +75** | Pleasant experience | Attractive, clear, fits well; generally liked |
| **-25 to +25** | Adequate/unremarkable | Functional but plain; neutral reactions |
| **-75 to -25** | Unpleasant experience | Ugly, confusing, mismatched; widely criticized |
| **-100 to -75** | Severely poor form | Repulsive, chaotic, deeply inappropriate |

### Operationalized Indicators

#### A. Appeal & Presentation (Weight: 35%)

**Measurement Criteria:**
- **Aesthetic quality** (subjective but measurable via surveys)
  - User ratings: Average appeal score (1-5 stars) → map to -100 to +100
  - Expert assessments: Design awards, critical reviews

**Scoring Formula:**
```
Appeal Score = ((Average Rating - 3) / 2) × 100

Where:
- 5 stars → +100
- 4 stars → +50
- 3 stars → 0
- 2 stars → -50
- 1 star → -100
```

**Example Scoring:**
```
Belief: "This building is architecturally significant"
Public survey: 4.2/5 stars
Appeal Score: ((4.2 - 3) / 2) × 100 = +60
Design awards: Winner of national architecture prize (+20 bonus)
Final Appeal: +80
```

#### B. Order vs. Chaos (Weight: 35%)

**Measurement Criteria:**
- **Cognitive load** (for designed objects/systems)
  - Time to comprehend: Faster = higher score
  - Error rate in use: Lower = higher score
  - Perceived simplicity: Survey-based

**Scoring Rubric:**
- **Information Architecture:**
  - Clear hierarchy, intuitive navigation: +60 to +100
  - Usable but requires learning: +20 to +50
  - Confusing, inconsistent: -20 to +10
  - Chaotic, incomprehensible: -100 to -40

**Measurement Methods:**
- Time to complete standard task (compared to benchmark)
- System Usability Scale (SUS) score: Map 0-100 to -100 to +100
- Clutter metric: Number of elements / optimal number

**Example Scoring:**
```
Belief: "This city's layout is well-designed"
Navigation: Average visitor finds destination in 10 min vs. 15 min benchmark
Improvement: +33%
Street grid: Consistent pattern (+40)
Signage: Clear but occasionally missing (+20)
Order Score: +35 (composite)
```

#### C. Harmony & Style (Weight: 30%)

**Measurement Criteria:**
- **Contextual fit**
  - Alignment with environment/culture/purpose
  - Consistency with established patterns

**Scoring Criteria:**
- **Cultural Appropriateness:**
  - Deeply resonant with context: +80 to +100
  - Fits well: +30 to +60
  - Neutral/generic: -10 to +20
  - Mismatched: -60 to -30
  - Offensive/jarring: -100 to -80

- **Internal Consistency:**
  - Unified style throughout: +40 to +60
  - Mostly consistent: +10 to +30
  - Inconsistent elements: -20 to 0
  - Incoherent mix: -60 to -40

**Example Scoring:**
```
Belief: "This modern art installation fits the historic plaza"
Public reaction: 60% positive, 30% neutral, 10% negative
Contextual fit: Intentional contrast, sparks dialogue (+20)
Materials: High-quality, respectful execution (+40)
Expert opinion: Controversial but thoughtful (+30)
Harmony Score: +30 (balanced view)
```

### Form Dimension Final Score

```
Form Score = (Appeal × 0.35) + (Order × 0.35) + (Harmony × 0.30)
```

---

## Confidence Scoring

### Evidence Quality Matrix

Every belief score should include a confidence level:

```javascript
confidenceLevel = {
  high: { // 90-100% confident
    indicators: 'Multiple high-quality sources, strong evidence, clear metrics',
    requirements: '3+ independent sources, rigorous methodology'
  },
  medium: { // 60-89% confident
    indicators: 'Some evidence, reasonable inference, standard metrics',
    requirements: '1-2 sources, or indirect evidence'
  },
  low: { // 30-59% confident
    indicators: 'Limited evidence, subjective assessment, unclear metrics',
    requirements: 'Anecdotal or preliminary data'
  },
  speculative: { // <30% confident
    indicators: 'No direct evidence, theoretical, opinion-based',
    requirements: 'Conjecture or extrapolation'
  }
}
```

### Displaying Confidence

```
Score: +65 ± 15 (Medium Confidence)
       └─ Score  └─ Range  └─ Level
```

---

## Controversy Score

Measures disagreement spread:

```javascript
controversyScore = standardDeviation(allBeliefScores) × numberOfBeliefs

// Higher controversy = more spread-out beliefs
// Indicates active debate vs. consensus
```

---

## Practical Scoring Workflow

### Step-by-Step Process

1. **Identify Dimension**
   - What type of value judgment is being made?
   - Purpose (why), Function (how well), or Form (how it feels)?

2. **Gather Evidence**
   - Purpose: Stakeholder analysis, stated goals, actual impacts
   - Function: Performance data, comparative benchmarks, reliability records
   - Form: User feedback, expert reviews, usability metrics

3. **Score Sub-Indicators**
   - Use specific rubrics above
   - Document evidence source for each indicator

4. **Calculate Weighted Average**
   - Apply dimension-specific weights
   - Note any outlier indicators

5. **Assess Confidence**
   - Quality of evidence
   - Number of independent sources
   - Clarity of metrics

6. **Document & Review**
   - Record final score with range
   - List key evidence
   - Note any caveats or context

---

## Example: Complete Belief Scoring

**Belief:** "Remote work increases productivity"

### Purpose Dimension
- Moral Character: +40 (respects autonomy, reduces commute harm)
- Interests: +60 (benefits workers and some employers genuinely)
- Values: +50 (autonomy +60, justice +40, sustainability +70)
- **Purpose Score: +51**

### Function Dimension
- Effectiveness: +30 (Meta-analysis shows 5-10% productivity gain, quality 0.9)
- Efficiency: +40 (Reduces office costs, saves commute time)
- Reliability: +20 (Varies by role, management quality)
- **Function Score: +32**

### Form Dimension
- Appeal: +45 (Most workers prefer it, 4.2/5 rating)
- Order: +10 (Can be chaotic without structure, needs discipline)
- Harmony: +30 (Fits modern tech work, less suitable for collaborative tasks)
- **Form Score: +29**

### Overall Belief Profile

```
Remote Work Productivity Belief
├─ Purpose: +51 (High confidence)
├─ Function: +32 (Medium confidence)
└─ Form: +29 (Medium confidence)

Engagement Score: 450 interested × |32| conviction = 14,400
Controversy: Moderate (SD = 35 across 250 beliefs)
```

---

**Next:** See `TOPIC_TEMPLATES.md` for pre-configured scoring templates for different topic types.
