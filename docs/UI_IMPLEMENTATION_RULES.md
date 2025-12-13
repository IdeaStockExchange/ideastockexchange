# UI Implementation Rules for Topics Page

## Overview

This document defines the complete UI specification for the Topics Page, including tabs, filters, default views, interactions, and visual design.

---

## Page Structure

### Layout Hierarchy

```
┌─────────────────────────────────────────────────────────┐
│ Topic Header                                             │
│ - Topic Title                                           │
│ - Overall Score Indicator                               │
│ - Belief Count                                          │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│ Dimension Tabs                                          │
│ [All] [Purpose] [Function] [Form]                       │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│ Controls Bar                                            │
│ Sort: [Engagement ▼] | Filter: [All Positions ▼]       │
│ View: [●List ○Spectrum]                                │
└─────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────┐
│                                                         │
│ Beliefs Display Area                                    │
│ (List view or Spectrum visualization)                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Tab System

### Tab Configuration

| Tab | Description | Shows |
|-----|-------------|-------|
| **All** | Default view | All beliefs across all dimensions |
| **Purpose** | Axiological value | Beliefs about goals, morality, intent |
| **Function** | Instrumental value | Beliefs about effectiveness, efficiency |
| **Form** | Aesthetic/formal value | Beliefs about experience, presentation |

### Tab Behavior

**Default Tab:** `All`

**Tab Switching:**
- Clicking a tab filters beliefs by dimension
- Active tab gets visual highlighting (bold + underline or colored background)
- Belief count updates to show filtered count
- URL updates with dimension parameter: `?dimension=purpose`

**Visual States:**
- **Active:** Bold text, primary color background (#667eea), white text
- **Inactive:** Regular text, subtle gray background, dark text
- **Hover:** Light background color shift, cursor pointer

### Tab Badge Counts

Each tab shows the count of beliefs in that dimension:

```
[All (247)] [Purpose (89)] [Function (121)] [Form (37)]
```

---

## Filter System

### Primary Filters

#### 1. Sort Filter

**Options:**
- **Engagement Score** (Default) - `interest × conviction`
- **Conviction** - How strongly held
- **Interest** - How many people care
- **Recency** - Most recently added
- **Controversy** - Highest disagreement spread

**Implementation:**
```javascript
sortOptions = {
  engagement: (a, b) => b.engagementScore - a.engagementScore,
  conviction: (a, b) => Math.abs(b.spectrumPosition) - Math.abs(a.spectrumPosition),
  interest: (a, b) => b.interestCount - a.interestCount,
  recency: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  controversy: (a, b) => b.controversyScore - a.controversyScore
}
```

#### 2. Position Filter

**Options:**
- **All Positions** (Default)
- **Highly Beneficial** (+75% to +100%)
- **Moderately Beneficial** (+25% to +75%)
- **Mixed/Neutral** (-25% to +25%)
- **Moderately Harmful** (-75% to -25%)
- **Highly Harmful** (-100% to -75%)

**Visual Indicators:**
Each filter option shows count and color coding:
```
● Highly Beneficial (45) - Green
● Moderately Beneficial (78) - Light green
● Mixed/Neutral (34) - Gray
● Moderately Harmful (56) - Orange
● Highly Harmful (34) - Red
```

#### 3. View Mode Toggle

**Options:**
- **List View** (Default) - Traditional list with cards
- **Spectrum View** - Visual distribution along -100% to +100% axis

---

## Default View Configuration

### On Page Load

```javascript
defaultView = {
  tab: 'all',
  sort: 'engagement',
  positionFilter: 'all',
  viewMode: 'list',
  itemsPerPage: 20
}
```

### URL State Management

All view settings persist in URL for shareability:

```
/topics/artificial-intelligence?dimension=all&sort=engagement&position=all&view=list&page=1
```

---

## View Modes

### List View

**Card Structure:**
```
┌─────────────────────────────────────────────────────────┐
│ [Score Badge] Belief Title                              │
│ Dimension: Purpose | Engagement: 847                    │
│ Brief description or excerpt (max 160 characters)...    │
│ 👥 342 interested | 💬 89 responses | 🔗 12 links       │
└─────────────────────────────────────────────────────────┘
```

**Score Badge:**
- Position on spectrum (-100% to +100%)
- Color-coded:
  - `+75 to +100`: Dark green (#10b981)
  - `+25 to +75`: Light green (#34d399)
  - `-25 to +25`: Gray (#6b7280)
  - `-75 to -25`: Orange (#f59e0b)
  - `-100 to -75`: Red (#ef4444)
- Font: Bold, large (18px)

**Interaction:**
- Hover: Slight elevation shadow
- Click: Navigate to full belief detail page

### Spectrum View

**Visual Layout:**
```
         -100%        -50%          0%         +50%        +100%
Harmful  ←─────────────┼─────────────┼─────────────┼─────────────→  Beneficial
           ●                 ●●        ●●●           ●●              ●●●●
         (Red)            (Orange)   (Gray)      (Lt Green)      (Dk Green)
```

**Features:**
- Horizontal axis from -100% (left/red) to +100% (right/green)
- Each belief represented as a dot
- Dot size = engagement score (larger = higher engagement)
- Hover shows belief title + score
- Click navigates to belief detail
- Vertical jitter prevents overlap

**Implementation Detail:**
```javascript
spectrumVisualization = {
  width: '100%',
  height: '400px',
  dotSize: (engagement) => Math.max(8, Math.min(24, engagement / 50)),
  verticalJitter: () => Math.random() * 60 - 30, // ±30px variance
  colorMap: (position) => {
    if (position >= 75) return '#10b981'
    if (position >= 25) return '#34d399'
    if (position >= -25) return '#6b7280'
    if (position >= -75) return '#f59e0b'
    return '#ef4444'
  }
}
```

---

## Responsive Design

### Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Desktop | ≥1024px | Full layout, side-by-side controls |
| Tablet | 768-1023px | Stacked controls, narrower spectrum |
| Mobile | <768px | Hamburger tab menu, simplified spectrum |

### Mobile Adaptations

**Tabs:**
- Convert to dropdown select menu on mobile
- Shows current dimension with count

**Filters:**
- Collapse into expandable "Filters" button
- Modal overlay for filter selection

**Spectrum View:**
- Rotate to vertical orientation on mobile
- Top = +100% (beneficial), Bottom = -100% (harmful)

---

## Accessibility

### Keyboard Navigation

- `Tab`: Navigate through tabs, filters, and belief cards
- `Enter/Space`: Activate selected element
- `Arrow keys`: Navigate within dropdown filters
- `Esc`: Close open dropdowns/modals

### Screen Reader Support

```html
<nav aria-label="Belief dimensions">
  <button role="tab" aria-selected="true" aria-controls="all-beliefs">
    All <span class="count">(247)</span>
  </button>
</nav>

<select aria-label="Sort beliefs by">
  <option value="engagement">Engagement Score</option>
</select>

<article aria-label="Belief card" tabindex="0">
  <h3>Belief Title</h3>
  <p aria-label="Spectrum position">+78% Beneficial</p>
</article>
```

### Color Contrast

All color combinations meet WCAG AA standards:
- Text on colored backgrounds: minimum 4.5:1 contrast
- Score badges include text labels in addition to color
- Spectrum view includes position labels for screen readers

---

## Performance Considerations

### Lazy Loading

- Load initial 20 beliefs
- Infinite scroll or pagination for additional results
- Virtualized list for 1000+ beliefs

### Caching

```javascript
cacheStrategy = {
  topicData: 'Cache for 5 minutes',
  beliefList: 'Cache per filter combination',
  spectrumData: 'Pre-compute on server, cache client-side'
}
```

### Optimistic UI

- Tab switching: Instant visual feedback
- Filter changes: Show loading skeleton
- Sort changes: Animate reordering

---

## Animation Specifications

### Tab Switching
```css
.tab-content {
  transition: opacity 200ms ease-in-out;
}
```

### Card Hover
```css
.belief-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 150ms ease-out;
}
```

### Spectrum Dots
```css
.spectrum-dot {
  transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.spectrum-dot:hover {
  transform: scale(1.3);
}
```

---

## Error States

### No Beliefs Found

```
┌─────────────────────────────────────────────────────────┐
│           🔍 No beliefs found                            │
│                                                         │
│    No beliefs match your current filters.               │
│    Try adjusting your search criteria.                  │
│                                                         │
│         [Clear All Filters]                             │
└─────────────────────────────────────────────────────────┘
```

### Loading State

```
┌─────────────────────────────────────────────────────────┐
│  ┌──────────────────────┐                               │
│  │ ████████░░░░░░░░     │ Loading...                    │
│  └──────────────────────┘                               │
│                                                         │
│  [Skeleton card]                                        │
│  [Skeleton card]                                        │
│  [Skeleton card]                                        │
└─────────────────────────────────────────────────────────┘
```

---

## Component Reusability

### Shared Components

All UI components should be framework-agnostic and reusable:

- `<TabGroup>` - Generic tab component
- `<FilterDropdown>` - Reusable filter selector
- `<BeliefCard>` - Consistent belief display
- `<SpectrumChart>` - Spectrum visualization
- `<ScoreBadge>` - Color-coded score indicator
- `<EmptyState>` - No results display

---

## Implementation Checklist

- [ ] Create tab component with active state management
- [ ] Build filter dropdown with multi-select support
- [ ] Implement sort logic for all sort options
- [ ] Create belief card component with engagement metrics
- [ ] Build spectrum visualization with D3.js or Canvas
- [ ] Add URL state management for shareable links
- [ ] Implement responsive breakpoints
- [ ] Add keyboard navigation support
- [ ] Create loading and error states
- [ ] Write accessibility labels and ARIA attributes
- [ ] Add animations and transitions
- [ ] Implement lazy loading/virtualization
- [ ] Test on mobile, tablet, and desktop
- [ ] Add dark mode support (optional)

---

**Next:** See `SCORING_CRITERIA.md` for objective scoring rules for each dimension.
