# Topic Templates for Different Subject Types

## Overview

This document provides pre-configured scoring templates and guidance for evaluating four major topic categories: **Policies**, **Products**, **People**, and **Concepts**. Each template adapts the core Purpose/Function/Form framework with domain-specific indicators.

---

## Template 1: Policies

**Examples:** Tax reform, environmental regulation, education policy, healthcare systems

### Purpose Dimension — *Is the policy just and well-intentioned?*

#### Weighted Indicators (Policy-Specific)

| Indicator | Weight | Key Questions |
|-----------|--------|---------------|
| **Distributional Justice** | 40% | Who benefits? Who bears costs? Is burden fairly shared? |
| **Rights Protection** | 30% | Does it protect or violate fundamental rights? |
| **Democratic Legitimacy** | 20% | How was it created? Does it reflect public will? |
| **Moral Hazards** | 10% | Does it create perverse incentives? |

#### Scoring Guide

**Distributional Justice:**
```
+80 to +100: Progressive, helps most vulnerable
+30 to +60:  Broadly benefits majority
-10 to +20:  Neutral or mixed effects
-60 to -30:  Regressive, concentrates benefits upward
-100 to -80: Exploitative, directly harms vulnerable
```

**Rights Protection:**
```
+80 to +100: Expands fundamental rights
+30 to +60:  Protects existing rights
-10 to +20:  Minor trade-offs
-60 to -30:  Significant rights infringement
-100 to -80: Authoritarian, oppressive
```

**Example:**
```yaml
Policy: "Universal Basic Income"
Purpose Score:
  Distributional Justice: +75 (directly helps lowest income)
  Rights Protection: +40 (increases autonomy, minor work disincentive concern)
  Democratic Legitimacy: +30 (some public support, untested at scale)
  Moral Hazards: -10 (concern about reduced work incentive)
Overall Purpose: +48
```

---

### Function Dimension — *Does the policy achieve its stated goals?*

#### Weighted Indicators (Policy-Specific)

| Indicator | Weight | Key Questions |
|-----------|--------|---------------|
| **Empirical Effectiveness** | 50% | Does it solve the stated problem? What does evidence show? |
| **Cost-Effectiveness** | 30% | Is it the most efficient solution? What are opportunity costs? |
| **Implementation Feasibility** | 20% | Can it be administered reliably? Historical track record? |

#### Scoring Guide

**Empirical Effectiveness:**
- **Strong RCT evidence:** Base score on outcome magnitude
- **Observational data:** Discount by 30-50%
- **No evidence:** 0 to -20 (untested policies get penalty)

**Cost-Effectiveness Benchmarks:**
```
Compare to:
1. Status quo
2. Best alternative policy
3. International best practices

Score relative to best available alternative:
+80 to +100: 2x better than best alternative
+30 to +60:  Better than alternatives
-10 to +20:  Similar to alternatives
-60 to -30:  Worse than alternatives
-100 to -80: Counterproductive
```

**Example:**
```yaml
Policy: "Carbon Tax"
Function Score:
  Empirical Effectiveness: +65 (strong evidence from BC, Sweden)
  Cost-Effectiveness: +55 (efficient vs. regulations, revenue neutral)
  Implementation Feasibility: +40 (requires political will, enforcement)
Overall Function: +56
```

---

### Form Dimension — *Is the policy well-crafted and politically viable?*

#### Weighted Indicators (Policy-Specific)

| Indicator | Weight | Key Questions |
|-----------|--------|---------------|
| **Policy Design Quality** | 40% | Clear, comprehensive, internally consistent? |
| **Political Viability** | 35% | Can it pass? Does it have public support? |
| **Communication/Framing** | 25% | Well-explained? Persuasive messaging? |

#### Scoring Guide

**Policy Design Quality:**
- Legal drafting clarity: +20 to +40
- Loophole prevention: +10 to +30
- Unintended consequence mitigation: +10 to +30

**Political Viability:**
```
Poll Support:
>60% approval: +60 to +80
40-60% approval: +20 to +40
30-40% approval: 0 to +20
<30% approval: -40 to 0
```

**Example:**
```yaml
Policy: "Ranked Choice Voting"
Form Score:
  Policy Design: +70 (clear rules, well-tested)
  Political Viability: +20 (some states, strong partisan opposition)
  Communication: +50 (simple concept, good messaging)
Overall Form: +47
```

---

## Template 2: Products

**Examples:** Software apps, consumer goods, services, platforms

### Purpose Dimension — *Does it serve users' genuine interests?*

#### Weighted Indicators (Product-Specific)

| Indicator | Weight | Key Questions |
|-----------|--------|---------------|
| **User Value vs. Extraction** | 50% | Does it genuinely help users or exploit them? |
| **Ethical Design** | 30% | Transparent? Respects privacy? Addictive? |
| **Stakeholder Alignment** | 20% | Are business incentives aligned with user benefit? |

#### Scoring Guide

**User Value vs. Extraction:**
```
+80 to +100: Solves real problem, minimal dark patterns
+30 to +60:  Useful but some manipulation
-10 to +20:  Marginal value, aggressive monetization
-60 to -30:  Exploitative, preys on vulnerabilities
-100 to -80: Actively harmful (e.g., predatory lending apps)
```

**Ethical Design Checklist:**
- Privacy-respecting: +30
- No dark patterns: +30
- Transparent pricing: +20
- Accessible/inclusive: +20

**Example:**
```yaml
Product: "Social Media Platform X"
Purpose Score:
  User Value: -30 (some connection, but optimized for engagement/ads)
  Ethical Design: -40 (dark patterns, privacy issues, addictive)
  Stakeholder Alignment: -50 (profits from user attention, misaligned)
Overall Purpose: -38
```

---

### Function Dimension — *Does the product work well?*

#### Weighted Indicators (Product-Specific)

| Indicator | Weight | Key Questions |
|-----------|--------|---------------|
| **Core Functionality** | 40% | Does it do what it claims? Performance metrics? |
| **Reliability** | 30% | Uptime, bug rate, consistency? |
| **Value for Money** | 30% | Price vs. alternatives? TCO? |

#### Scoring Guide

**Core Functionality:**
- Feature completion: % of promised features working
- Performance benchmarks: Speed vs. competitors
- User success rate: % achieving goals with product

**Reliability Metrics:**
```
Uptime:
>99.9%: +80 to +100
99-99.9%: +50 to +70
95-99%: +20 to +40
<95%: -50 to +10

Bug Severity:
Critical bugs: -20 per unresolved
Minor bugs: -5 per unresolved
```

**Example:**
```yaml
Product: "Smartphone Model Y"
Function Score:
  Core Functionality: +75 (excellent performance, all features work)
  Reliability: +60 (99.2% no-issue rate, occasional software bugs)
  Value for Money: +40 (premium price, good longevity)
Overall Function: +60
```

---

### Form Dimension — *Is it pleasant and easy to use?*

#### Weighted Indicators (Product-Specific)

| Indicator | Weight | Key Questions |
|-----------|--------|---------------|
| **User Experience (UX)** | 45% | Intuitive? Delightful? Frustrating? |
| **Aesthetic Design** | 30% | Beautiful? Attention to detail? |
| **Fit for Purpose** | 25% | Appropriate for target user and context? |

#### Scoring Guide

**UX Metrics:**
- System Usability Scale (SUS): Direct mapping 0-100 → -100 to +100
- Time to competency: Faster = higher score
- Net Promoter Score (NPS): Map -100 to +100 to score

**Aesthetic Design:**
- Design awards: +20 bonus
- User aesthetic ratings: Survey-based (1-5 stars → -100 to +100)

**Example:**
```yaml
Product: "Design Software Z"
Form Score:
  UX: +50 (SUS 75, powerful but steep learning curve)
  Aesthetic: +85 (beautiful interface, industry-leading design)
  Fit for Purpose: +70 (perfect for professionals, overkill for hobbyists)
Overall Form: +66
```

---

## Template 3: People (Public Figures)

**Examples:** Politicians, CEOs, activists, artists, thought leaders

### Purpose Dimension — *Do they pursue worthwhile goals ethically?*

#### Weighted Indicators (People-Specific)

| Indicator | Weight | Key Questions |
|-----------|--------|---------------|
| **Stated vs. Revealed Values** | 40% | Do actions match words? Hypocrisy gap? |
| **Impact on Society** | 35% | Net positive or negative contribution? |
| **Integrity & Ethics** | 25% | Honest? Respectful of norms? Scandals? |

#### Scoring Guide

**Stated vs. Revealed Values:**
```
+80 to +100: Exceptional consistency, walks the talk
+30 to +60:  Generally consistent, minor contradictions
-10 to +20:  Mixed record, some hypocrisy
-60 to -30:  Major contradictions, opportunistic
-100 to -80: Completely cynical, purely self-serving
```

**Impact on Society:**
- Measure via: Policy outcomes, cultural influence, business practices
- Net lives improved/harmed (quantitative when possible)

**Integrity:**
- Major scandals: -30 per verified incident
- Ethical violations: -50 to -100
- Transparency: +20 to +40

**Example:**
```yaml
Person: "Politician A"
Purpose Score:
  Stated vs. Revealed: +30 (mostly consistent, some compromises)
  Impact: +45 (passed helpful legislation, some missed opportunities)
  Integrity: +60 (clean record, transparent)
Overall Purpose: +44
```

---

### Function Dimension — *Are they effective at their role?*

#### Weighted Indicators (People-Specific)

| Indicator | Weight | Key Questions |
|-----------|--------|---------------|
| **Track Record** | 50% | Measurable accomplishments vs. stated goals? |
| **Competence** | 30% | Expertise, decision quality, learning? |
| **Leadership/Execution** | 20% | Ability to mobilize, deliver results? |

#### Scoring Guide

**Track Record:**
- Goal achievement rate: % of campaign promises kept, projects completed
- Quality of outcomes: Did they work as intended?

**Competence:**
- Domain expertise: Credentials, demonstrated knowledge
- Decision quality: % of decisions validated by outcomes
- Adaptability: Learning from mistakes

**Example:**
```yaml
Person: "CEO B"
Function Score:
  Track Record: +70 (grew company 300%, 4/5 major initiatives successful)
  Competence: +80 (deep industry expertise, strong strategic vision)
  Leadership: +65 (inspires teams, some execution challenges)
Overall Function: +72
```

---

### Form Dimension — *Are they compelling and appropriate?*

#### Weighted Indicators (People-Specific)

| Indicator | Weight | Key Questions |
|-----------|--------|---------------|
| **Communication Skill** | 40% | Persuasive? Clear? Authentic? |
| **Public Presence** | 30% | Charisma, likability, appropriateness? |
| **Fit for Role** | 30% | Match between persona and position? |

#### Scoring Guide

**Communication Skill:**
- Clarity: Easily understood (+30 to +50)
- Persuasiveness: Changes minds (+20 to +40)
- Authenticity: Genuine vs. scripted (+10 to +30)

**Public Presence:**
- Approval ratings: Direct mapping to score
- Charisma: Subjective but survey-measurable

**Example:**
```yaml
Person: "Activist C"
Form Score:
  Communication: +75 (eloquent, inspiring speaker)
  Public Presence: +55 (charismatic, polarizing)
  Fit for Role: +80 (perfectly embodies movement values)
Overall Form: +69
```

---

## Template 4: Concepts (Abstract Ideas)

**Examples:** Democracy, capitalism, AI alignment, effective altruism

### Purpose Dimension — *Does it point toward good ends?*

#### Weighted Indicators (Concept-Specific)

| Indicator | Weight | Key Questions |
|-----------|--------|---------------|
| **Intrinsic Value Orientation** | 50% | Does it prioritize worthy goals? |
| **Moral Framework** | 30% | What values does it encode? |
| **Potential for Misuse** | 20% | Can it justify harm? Historical record? |

#### Scoring Guide

**Intrinsic Value Orientation:**
```
+80 to +100: Promotes universal flourishing
+30 to +60:  Generally positive, some tensions
-10 to +20:  Neutral, depends on interpretation
-60 to -30:  Prioritizes harmful ends
-100 to -80: Fundamentally destructive
```

**Moral Framework:**
- Evaluates against: autonomy, justice, care, dignity
- Check for: Exclusions, who it devalues

**Example:**
```yaml
Concept: "Effective Altruism"
Purpose Score:
  Intrinsic Value: +85 (maximize good, help others)
  Moral Framework: +60 (utilitarian, sometimes cold calculus)
  Misuse Potential: +40 (can justify neglecting nearby for distant)
Overall Purpose: +67
```

---

### Function Dimension — *Is it intellectually coherent and applicable?*

#### Weighted Indicators (Concept-Specific)

| Indicator | Weight | Key Questions |
|-----------|--------|---------------|
| **Internal Consistency** | 40% | Logical? Free of contradictions? |
| **Explanatory Power** | 35% | Does it accurately describe reality? Predictive? |
| **Practical Applicability** | 25% | Can it guide action? Operationalizable? |

#### Scoring Guide

**Internal Consistency:**
- Formal logic check: No contradictions (+40 to +60)
- Edge case coherence: Handles boundary cases (+20 to +40)

**Explanatory Power:**
- Empirical validation: Does it match observations?
- Predictive accuracy: Can it forecast outcomes?

**Example:**
```yaml
Concept: "Free Market Capitalism"
Function Score:
  Internal Consistency: +50 (mostly coherent, some paradoxes)
  Explanatory Power: +60 (explains much, misses externalities)
  Practical Applicability: +70 (widely implemented, clear principles)
Overall Function: +59
```

---

### Form Dimension — *Is it elegant and well-articulated?*

#### Weighted Indicators (Concept-Specific)

| Indicator | Weight | Key Questions |
|-----------|--------|---------------|
| **Simplicity/Elegance** | 40% | Parsimonious? Occam's razor? |
| **Clarity of Expression** | 35% | Well-defined? Easily understood? |
| **Cultural Resonance** | 25% | Does it speak to human experience? |

#### Scoring Guide

**Simplicity/Elegance:**
```
+80 to +100: Beautifully simple, profound
+30 to +60:  Clear, reasonable complexity
-10 to +20:  Unnecessarily complex
-60 to -30:  Convoluted, obscure
-100 to -80: Incomprehensible jargon
```

**Clarity of Expression:**
- Measurable by: Time to explain to novice
- Ambiguity: Few vs. many interpretations

**Example:**
```yaml
Concept: "Occam's Razor"
Form Score:
  Simplicity: +95 (perfectly elegant principle)
  Clarity: +85 (easily stated, widely understood)
  Cultural Resonance: +75 (appeals to desire for understanding)
Overall Form: +85
```

---

## Template Selection Guide

### Quick Reference

| Topic Type | Use This Template | Key Adaptations |
|------------|-------------------|-----------------|
| **Government action** | Policy | Focus on distributional justice, evidence |
| **Market offering** | Product | Focus on user value, UX, reliability |
| **Individual actor** | People | Focus on integrity, track record, fit |
| **Abstract framework** | Concept | Focus on coherence, explanatory power |

### Hybrid Topics

Some topics blend categories. Use combined scoring:

**Example: "Tesla" (Company + Product + Person)**
- Purpose: Evaluate as Product (user value) + Person (Elon Musk's intent)
- Function: Product functionality + Company effectiveness
- Form: Product UX + Brand identity

**Example: "Universal Healthcare" (Policy + Concept)**
- Purpose: Policy (distributional justice) + Concept (moral framework)
- Function: Policy (empirical evidence) + Concept (coherence)
- Form: Policy (political viability) + Concept (cultural resonance)

---

## Customization Guidelines

### Creating New Templates

1. **Identify core domain concerns**
   - What matters most in this domain?
   - What can be measured?

2. **Adapt indicator weights**
   - Increase weight for operationalizable metrics
   - Reduce weight for subjective assessments

3. **Define domain-specific benchmarks**
   - What are the best-in-class examples?
   - What are common failure modes?

4. **Test with examples**
   - Score 5-10 examples from the domain
   - Refine weights based on face validity

---

## Implementation in Code

Each template should be represented as a configuration object:

```javascript
const TEMPLATES = {
  policy: {
    purpose: {
      distributional_justice: { weight: 0.4, rubric: '...' },
      rights_protection: { weight: 0.3, rubric: '...' },
      democratic_legitimacy: { weight: 0.2, rubric: '...' },
      moral_hazards: { weight: 0.1, rubric: '...' }
    },
    function: { /* ... */ },
    form: { /* ... */ }
  },
  product: { /* ... */ },
  person: { /* ... */ },
  concept: { /* ... */ }
}
```

---

**Next:** See `src/models/` for TypeScript/JavaScript implementation of these templates.
